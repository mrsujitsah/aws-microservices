import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface SwnApigatewayProps{
    basketMicroservice: IFunction
    productMicroservice: IFunction
    orderingMicroservice: IFunction
}

export class SwnApiGateway extends Construct{

    constructor(scope: Construct, id: string, props: SwnApigatewayProps){
        super(scope, id);
        //Product-API
        this.createProductApi(props.productMicroservice);
        //Basket-API
        this.createBasketApi(props.basketMicroservice);

        //Oder-API
        this.createOrderApi(props.orderingMicroservice);

        
    }


    private createOrderApi(orderMicroservice: IFunction) {
        //Ordering microservices api gateway 
        //root name = order

        //GET /order
        //GET /oder/{userName}

        const apigw = new LambdaRestApi(this, 'orderApi', {
            restApiName: 'Order Service',
            handler: orderMicroservice,
            proxy: false
        });

        const order = apigw.root.addResource('order');
        order.addMethod('GET')

        const singleOrder = order.addResource('{userName}')
        singleOrder.addMethod('GET')

      //  return singleOrder;




    }

    private createBasketApi(basketMicroservice: IFunction) {
        //Basket microservices api gateway
        //root name=basket
        //GET /basket
        // POST /basket
        
        // resource name = basket/{userName}
        // GET /basket/{userName}
        // DELETE /basket/{userName}

        // POST /basket/checkout


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
    
    private createProductApi(productMicroservice: IFunction) {
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