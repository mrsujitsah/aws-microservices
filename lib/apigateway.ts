import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface SwnApigatewayProps{
    basketMicroservice: IFunction;
    productMicroservice: IFunction
}

export class SwnApiGateway extends Construct{

    constructor(scope: Construct, id: string, props: SwnApigatewayProps){
        super(scope, id);


        this.createProductApi(props.productMicroservice);
        this.createBasketApi(props.basketMicroservice);

        
    }

    createBasketApi(basketMicroservice: IFunction) {
       const apigw =new LambdaRestApi(this, 'basketApi', {
        restApiName:'Basket Service',
        handler: basketMicroservice,
        proxy: false
       });

       const basket = apigw.root.addResource('basket');
        basket.addMethod('GET'); //GET method /product
        basket.addMethod('POST')
    
        const singleBasket = basket.addResource('{userName}'); //basket/{userName}
        singleBasket.addMethod('GET'); //GET /basket/{userName}
        singleBasket.addMethod('DELETE');//DELETE /basket/{userName}

        const basketCheckout = basket.addResource('checkout');
        basketCheckout.addMethod('POST'); //POST /basket


    }
    
    createProductApi(productMicroservice: IFunction) {
        const apigw = new LambdaRestApi(this, 'productApi', {
            restApiName: 'Product Service',
            handler: productMicroservice,
            proxy: false
        });

        const product = apigw.root.addResource('product');
        product.addMethod('GET'); //GET method /product
        product.addMethod('POST')
    
        const singleProduct = product.addResource('{id}'); //product/{id}
        singleProduct.addMethod('GET'); //GET /product/{id}
        singleProduct.addMethod('PUT'); //PUT /product/{id}
        singleProduct.addMethod('DELETE');//DELETE /product/{id}

    }
}