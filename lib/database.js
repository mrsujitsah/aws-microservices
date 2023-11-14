"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnDatabase = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const constructs_1 = require("constructs");
class SwnDatabase extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        this.productTable = this.createProductTable();
        this.basketTable = this.createBasketTable();
        this.orderTable = this.createOrderTable();
    }
    //Dynamodb
    //order : PK : userName- SK: oderDate
    createOrderTable() {
        const orderTable = new aws_dynamodb_1.Table(this, 'order', {
            partitionKey: {
                name: 'userName',
                type: aws_dynamodb_1.AttributeType.STRING
            },
            sortKey: {
                name: 'orderDate',
                type: aws_dynamodb_1.AttributeType.STRING
            },
            tableName: 'order',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return orderTable;
    }
    createProductTable() {
        const productTable = new aws_dynamodb_1.Table(this, 'product', {
            partitionKey: {
                name: 'id',
                type: aws_dynamodb_1.AttributeType.STRING
            },
            tableName: 'product',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return productTable;
    }
    createBasketTable() {
        const basketTable = new aws_dynamodb_1.Table(this, 'basket', {
            partitionKey: {
                name: 'userName',
                type: aws_dynamodb_1.AttributeType.STRING
            },
            tableName: 'basket',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return basketTable;
    }
}
exports.SwnDatabase = SwnDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNEM7QUFDNUMsMkRBQXFGO0FBQ3JGLDJDQUFzQztBQUV0QyxNQUFhLFdBQVksU0FBUSxzQkFBUztJQU10QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUNwQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUU1QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBRTlDLENBQUM7SUFHRCxVQUFVO0lBQ1YscUNBQXFDO0lBQ3JDLGdCQUFnQjtRQUNiLE1BQU0sVUFBVSxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ3ZDLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUM3QjtZQUNELE9BQU8sRUFBQztnQkFDSixJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUM3QjtZQUNELFNBQVMsRUFBRSxPQUFPO1lBQ2xCLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsV0FBVyxFQUFFLDBCQUFXLENBQUMsZUFBZTtTQUM1QyxDQUFDLENBQUM7UUFFSCxPQUFPLFVBQVUsQ0FBQztJQUNyQixDQUFDO0lBRU8sa0JBQWtCO1FBQ3RCLE1BQU0sWUFBWSxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQzVDLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNO2FBQzNCO1lBQ0QsU0FBUyxFQUFFLFNBQVM7WUFDcEIsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztZQUNwQyxXQUFXLEVBQUUsMEJBQVcsQ0FBQyxlQUFlO1NBQzNDLENBQUMsQ0FBQztRQUNILE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsTUFBTSxXQUFXLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDMUMsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxVQUFVO2dCQUNoQixJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNO2FBQzdCO1lBQ0QsU0FBUyxFQUFFLFFBQVE7WUFDbkIsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztZQUNwQyxXQUFXLEVBQUUsMEJBQVcsQ0FBQyxlQUFlO1NBQzNDLENBQUMsQ0FBQztRQUNILE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQS9ERCxrQ0ErREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW1vdmFsUG9saWN5IH0gZnJvbSBcImF3cy1jZGstbGliXCI7XHJcbmltcG9ydCB7IEF0dHJpYnV0ZVR5cGUsIEJpbGxpbmdNb2RlLCBJVGFibGUsIFRhYmxlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1keW5hbW9kYlwiO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiXHJcblxyXG5leHBvcnQgY2xhc3MgU3duRGF0YWJhc2UgZXh0ZW5kcyBDb25zdHJ1Y3R7XHJcblxyXG4gICAgcHVibGljIHJlYWRvbmx5IHByb2R1Y3RUYWJsZSA6IElUYWJsZTtcclxuICAgIHB1YmxpYyByZWFkb25seSBiYXNrZXRUYWJsZTogSVRhYmxlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9yZGVyVGFibGU6IElUYWJsZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKXtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xyXG5cclxuICAgICAgICB0aGlzLnByb2R1Y3RUYWJsZSA9IHRoaXMuY3JlYXRlUHJvZHVjdFRhYmxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYmFza2V0VGFibGUgPSB0aGlzLmNyZWF0ZUJhc2tldFRhYmxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMub3JkZXJUYWJsZSA9IHRoaXMuY3JlYXRlT3JkZXJUYWJsZSgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9EeW5hbW9kYlxyXG4gICAgLy9vcmRlciA6IFBLIDogdXNlck5hbWUtIFNLOiBvZGVyRGF0ZVxyXG4gICAgY3JlYXRlT3JkZXJUYWJsZSgpOiBJVGFibGUge1xyXG4gICAgICAgY29uc3Qgb3JkZXJUYWJsZSA9IG5ldyBUYWJsZSh0aGlzLCAnb3JkZXInLCB7XHJcbiAgICAgICAgICAgIHBhcnRpdGlvbktleToge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ3VzZXJOYW1lJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNvcnRLZXk6e1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ29yZGVyRGF0ZScsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklOR1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0YWJsZU5hbWU6ICdvcmRlcicsXHJcbiAgICAgICAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcclxuICAgICAgICAgICAgYmlsbGluZ01vZGU6IEJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVFxyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgcmV0dXJuIG9yZGVyVGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVQcm9kdWN0VGFibGUoKTogSVRhYmxle1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RUYWJsZSA9IG5ldyBUYWJsZSh0aGlzLCAncHJvZHVjdCcsIHtcclxuICAgICAgICAgICAgcGFydGl0aW9uS2V5OiB7XHJcbiAgICAgICAgICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklOR1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0YWJsZU5hbWU6ICdwcm9kdWN0JyxcclxuICAgICAgICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxyXG4gICAgICAgICAgICBiaWxsaW5nTW9kZTogQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNUXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHByb2R1Y3RUYWJsZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjcmVhdGVCYXNrZXRUYWJsZSgpOiBJVGFibGV7XHJcbiAgICAgICAgY29uc3QgYmFza2V0VGFibGUgPSBuZXcgVGFibGUodGhpcywgJ2Jhc2tldCcsIHtcclxuICAgICAgICAgICAgcGFydGl0aW9uS2V5OiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAndXNlck5hbWUnLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGFibGVOYW1lOiAnYmFza2V0JyxcclxuICAgICAgICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxyXG4gICAgICAgICAgICBiaWxsaW5nTW9kZTogQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNUXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGJhc2tldFRhYmxlO1xyXG4gICAgfVxyXG59Il19