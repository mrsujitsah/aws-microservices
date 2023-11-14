"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnMicroservices = void 0;
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const constructs_1 = require("constructs");
const path_1 = require("path");
class SwnMicroservices extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        this.productMicroservice = this.createProductMicroservice(props.productTable);
        this.basketMicroservice = this.createBasketMicroservice(props.basketTable);
        this.orderingMicroservice = this.createOrderMicroservice(props.orderTable);
    }
    createOrderMicroservice(orderTable) {
        const orderingFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk',
                ],
            },
            environment: {
                PRIMARY_KEY: 'userName',
                DYNAMODB_TABLE_NAME: orderTable.tableName
            },
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
        };
        const orderFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'orderingLambdaFuntion', {
            entry: (0, path_1.join)(__dirname, '/../src/ordering/index.js'),
            ...orderingFunctionProps,
        });
        orderTable.grantReadWriteData(orderFunction);
        return orderFunction;
    }
    createBasketMicroservice(basketTable) {
        const basketFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk',
                ],
            },
            environment: {
                PRIMARY_KEY: 'userName',
                DYNAMODB_TABLE_NAME: basketTable.tableName
            },
            runtime: aws_lambda_1.Runtime.NODEJS_18_X,
        };
        const basketFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'basketLambdaFunction', {
            entry: (0, path_1.join)(__dirname, '/../src/basket/index.js'),
            ...basketFunctionProps,
        });
        basketTable.grantReadWriteData(basketFunction);
        return basketFunction;
    }
    createProductMicroservice(productTable) {
        const nodeJsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk'
                ]
            },
            environment: {
                PRIMARY_KEY: 'id',
                DYNAMODB_TABLE_NAME: productTable.tableName
            },
            runtime: aws_lambda_1.Runtime.NODEJS_18_X
        };
        const productFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'productLambdaFunction', {
            entry: (0, path_1.join)(__dirname, `/../src/product/index.js`),
            ...nodeJsFunctionProps
        });
        productTable.grantReadWriteData(productFunction);
        return productFunction;
    }
}
exports.SwnMicroservices = SwnMicroservices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm9zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pY3Jvc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdURBQWlEO0FBQ2pELHFFQUFvRjtBQUNwRiwyQ0FBdUM7QUFDdkMsK0JBQTRCO0FBUTVCLE1BQWEsZ0JBQWlCLFNBQVEsc0JBQVM7SUFPN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUE0QjtRQUNwRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFHTyx1QkFBdUIsQ0FBQyxVQUFrQjtRQUNoRCxNQUFNLHFCQUFxQixHQUF3QjtZQUNqRCxRQUFRLEVBQUM7Z0JBQ1AsZUFBZSxFQUFDO29CQUNkLFNBQVM7aUJBQ1Y7YUFDRjtZQUNELFdBQVcsRUFBQztnQkFDVixXQUFXLEVBQUUsVUFBVTtnQkFDdkIsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLFNBQVM7YUFDMUM7WUFDRCxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1NBQzdCLENBQUE7UUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ3RFLEtBQUssRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUM7WUFDbkQsR0FBRyxxQkFBcUI7U0FDekIsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sYUFBYSxDQUFDO0lBRXZCLENBQUM7SUFHTyx3QkFBd0IsQ0FBQyxXQUFtQjtRQUNsRCxNQUFNLG1CQUFtQixHQUF3QjtZQUMvQyxRQUFRLEVBQUM7Z0JBQ1AsZUFBZSxFQUFDO29CQUNkLFNBQVM7aUJBQ1Y7YUFDRjtZQUNELFdBQVcsRUFBQztnQkFDVixXQUFXLEVBQUUsVUFBVTtnQkFDdkIsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLFNBQVM7YUFDM0M7WUFDRCxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1NBQzdCLENBQUE7UUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ3RFLEtBQUssRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUseUJBQXlCLENBQUM7WUFDakQsR0FBRyxtQkFBbUI7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsV0FBVyxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRS9DLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFUyx5QkFBeUIsQ0FBQyxZQUFvQjtRQUNwRCxNQUFNLG1CQUFtQixHQUF3QjtZQUMvQyxRQUFRLEVBQUU7Z0JBQ1IsZUFBZSxFQUFDO29CQUNkLFNBQVM7aUJBQ1Y7YUFDRjtZQUNELFdBQVcsRUFBRTtnQkFDWCxXQUFXLEVBQUcsSUFBSTtnQkFDbEIsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLFNBQVM7YUFDNUM7WUFDRCxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1NBQzdCLENBQUE7UUFFRCxNQUFNLGVBQWUsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ3hFLEtBQUssRUFBRSxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUM7WUFDbEQsR0FBRyxtQkFBbUI7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWpELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQTFGRCw0Q0EwRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVGFibGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiXCI7XHJcbmltcG9ydCB7IFJ1bnRpbWUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgeyBOb2RlanNGdW5jdGlvbiwgTm9kZWpzRnVuY3Rpb25Qcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqc1wiO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcclxuXHJcbmludGVyZmFjZSBTd25NaWNyb3NlcnZpY2VzUHJvcHN7XHJcbiAgICBwcm9kdWN0VGFibGU6IElUYWJsZTtcclxuICAgIGJhc2tldFRhYmxlOiBJVGFibGU7XHJcbiAgICBvcmRlclRhYmxlOiBJVGFibGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTd25NaWNyb3NlcnZpY2VzIGV4dGVuZHMgQ29uc3RydWN0e1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgcHJvZHVjdE1pY3Jvc2VydmljZTogTm9kZWpzRnVuY3Rpb247XHJcbiAgcHVibGljIHJlYWRvbmx5IGJhc2tldE1pY3Jvc2VydmljZTogTm9kZWpzRnVuY3Rpb247XHJcbiAgcHVibGljIHJlYWRvbmx5IG9yZGVyaW5nTWljcm9zZXJ2aWNlOiBOb2RlanNGdW5jdGlvbjtcclxuXHJcbiAgICBcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3duTWljcm9zZXJ2aWNlc1Byb3BzKXtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcbiAgICBcclxuICAgIHRoaXMucHJvZHVjdE1pY3Jvc2VydmljZSA9IHRoaXMuY3JlYXRlUHJvZHVjdE1pY3Jvc2VydmljZShwcm9wcy5wcm9kdWN0VGFibGUpO1xyXG5cclxuICAgIHRoaXMuYmFza2V0TWljcm9zZXJ2aWNlID0gdGhpcy5jcmVhdGVCYXNrZXRNaWNyb3NlcnZpY2UocHJvcHMuYmFza2V0VGFibGUpO1xyXG5cclxuICAgIHRoaXMub3JkZXJpbmdNaWNyb3NlcnZpY2UgPSB0aGlzLmNyZWF0ZU9yZGVyTWljcm9zZXJ2aWNlKHByb3BzLm9yZGVyVGFibGUpO1xyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgY3JlYXRlT3JkZXJNaWNyb3NlcnZpY2Uob3JkZXJUYWJsZTogSVRhYmxlKTogTm9kZWpzRnVuY3Rpb24ge1xyXG4gICAgY29uc3Qgb3JkZXJpbmdGdW5jdGlvblByb3BzOiBOb2RlanNGdW5jdGlvblByb3BzID0ge1xyXG4gICAgICBidW5kbGluZzp7XHJcbiAgICAgICAgZXh0ZXJuYWxNb2R1bGVzOltcclxuICAgICAgICAgICdhd3Mtc2RrJyxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICBlbnZpcm9ubWVudDp7XHJcbiAgICAgICAgUFJJTUFSWV9LRVk6ICd1c2VyTmFtZScsXHJcbiAgICAgICAgRFlOQU1PREJfVEFCTEVfTkFNRTogb3JkZXJUYWJsZS50YWJsZU5hbWVcclxuICAgICAgfSxcclxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMThfWCxcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcmRlckZ1bmN0aW9uID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdvcmRlcmluZ0xhbWJkYUZ1bnRpb24nLCB7XHJcbiAgICAgIGVudHJ5OiBqb2luKF9fZGlybmFtZSwgJy8uLi9zcmMvb3JkZXJpbmcvaW5kZXguanMnKSxcclxuICAgICAgLi4ub3JkZXJpbmdGdW5jdGlvblByb3BzLFxyXG4gICAgfSk7XHJcblxyXG4gICAgb3JkZXJUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEob3JkZXJGdW5jdGlvbik7XHJcbiAgICByZXR1cm4gb3JkZXJGdW5jdGlvbjtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVCYXNrZXRNaWNyb3NlcnZpY2UoYmFza2V0VGFibGU6IElUYWJsZSk6IE5vZGVqc0Z1bmN0aW9uIHtcclxuICAgIGNvbnN0IGJhc2tldEZ1bmN0aW9uUHJvcHM6IE5vZGVqc0Z1bmN0aW9uUHJvcHMgPSB7XHJcbiAgICAgIGJ1bmRsaW5nOntcclxuICAgICAgICBleHRlcm5hbE1vZHVsZXM6W1xyXG4gICAgICAgICAgJ2F3cy1zZGsnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGVudmlyb25tZW50OntcclxuICAgICAgICBQUklNQVJZX0tFWTogJ3VzZXJOYW1lJyxcclxuICAgICAgICBEWU5BTU9EQl9UQUJMRV9OQU1FOiBiYXNrZXRUYWJsZS50YWJsZU5hbWVcclxuICAgICAgfSxcclxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMThfWCxcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiYXNrZXRGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnYmFza2V0TGFtYmRhRnVuY3Rpb24nLCB7XHJcbiAgICAgIGVudHJ5OiBqb2luKF9fZGlybmFtZSwgJy8uLi9zcmMvYmFza2V0L2luZGV4LmpzJyksXHJcbiAgICAgIC4uLmJhc2tldEZ1bmN0aW9uUHJvcHMsXHJcbiAgICB9KTtcclxuXHJcbiAgICBiYXNrZXRUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEoYmFza2V0RnVuY3Rpb24pO1xyXG5cclxuICAgIHJldHVybiBiYXNrZXRGdW5jdGlvbjtcclxuICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVQcm9kdWN0TWljcm9zZXJ2aWNlKHByb2R1Y3RUYWJsZTogSVRhYmxlKTogTm9kZWpzRnVuY3Rpb257XHJcbiAgICAgIGNvbnN0IG5vZGVKc0Z1bmN0aW9uUHJvcHM6IE5vZGVqc0Z1bmN0aW9uUHJvcHMgPSB7XHJcbiAgICAgICAgYnVuZGxpbmc6IHtcclxuICAgICAgICAgIGV4dGVybmFsTW9kdWxlczpbXHJcbiAgICAgICAgICAgICdhd3Mtc2RrJ1xyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcclxuICAgICAgICAgIFBSSU1BUllfS0VZIDogJ2lkJyxcclxuICAgICAgICAgIERZTkFNT0RCX1RBQkxFX05BTUU6IHByb2R1Y3RUYWJsZS50YWJsZU5hbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE4X1hcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICBjb25zdCBwcm9kdWN0RnVuY3Rpb24gPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgJ3Byb2R1Y3RMYW1iZGFGdW5jdGlvbicsIHtcclxuICAgICAgICBlbnRyeTogam9pbihfX2Rpcm5hbWUsIGAvLi4vc3JjL3Byb2R1Y3QvaW5kZXguanNgKSxcclxuICAgICAgICAuLi5ub2RlSnNGdW5jdGlvblByb3BzXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcHJvZHVjdFRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShwcm9kdWN0RnVuY3Rpb24pO1xyXG5cclxuICAgICAgcmV0dXJuIHByb2R1Y3RGdW5jdGlvbjtcclxuICAgIH0gXHJcbn0iXX0=