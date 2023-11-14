import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface SwnMicroservicesProps{
    productTable: ITable;
    basketTable: ITable;
    orderTable: ITable;
}

export class SwnMicroservices extends Construct{

  public readonly productMicroservice: NodejsFunction;
  public readonly basketMicroservice: NodejsFunction;
  public readonly orderingMicroservice: NodejsFunction;

    
  constructor(scope: Construct, id: string, props: SwnMicroservicesProps){
    super(scope, id);
    
    this.productMicroservice = this.createProductMicroservice(props.productTable);

    this.basketMicroservice = this.createBasketMicroservice(props.basketTable);

    this.orderingMicroservice = this.createOrderMicroservice(props.orderTable);
  }


  private createOrderMicroservice(orderTable: ITable): NodejsFunction {
    const orderingFunctionProps: NodejsFunctionProps = {
      bundling:{
        externalModules:[
          'aws-sdk',
        ],
      },
      environment:{
        PRIMARY_KEY: 'userName',
        DYNAMODB_TABLE_NAME: orderTable.tableName
      },
      runtime: Runtime.NODEJS_18_X,
    }

    const orderFunction = new NodejsFunction(this, 'orderingLambdaFuntion', {
      entry: join(__dirname, '/../src/ordering/index.js'),
      ...orderingFunctionProps,
    });

    orderTable.grantReadWriteData(orderFunction);
    return orderFunction;

  }


  private createBasketMicroservice(basketTable: ITable): NodejsFunction {
    const basketFunctionProps: NodejsFunctionProps = {
      bundling:{
        externalModules:[
          'aws-sdk',
        ],
      },
      environment:{
        PRIMARY_KEY: 'userName',
        DYNAMODB_TABLE_NAME: basketTable.tableName
      },
      runtime: Runtime.NODEJS_18_X,
    }

    const basketFunction = new NodejsFunction(this, 'basketLambdaFunction', {
      entry: join(__dirname, '/../src/basket/index.js'),
      ...basketFunctionProps,
    });

    basketTable.grantReadWriteData(basketFunction);

    return basketFunction;
  }

    private createProductMicroservice(productTable: ITable): NodejsFunction{
      const nodeJsFunctionProps: NodejsFunctionProps = {
        bundling: {
          externalModules:[
            'aws-sdk'
          ]
        },
        environment: {
          PRIMARY_KEY : 'id',
          DYNAMODB_TABLE_NAME: productTable.tableName
        },
        runtime: Runtime.NODEJS_18_X
      }
  
      const productFunction = new NodejsFunction(this, 'productLambdaFunction', {
        entry: join(__dirname, `/../src/product/index.js`),
        ...nodeJsFunctionProps
      });

      productTable.grantReadWriteData(productFunction);

      return productFunction;
    } 
}