"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnEventBus = void 0;
const aws_events_1 = require("aws-cdk-lib/aws-events");
const aws_events_targets_1 = require("aws-cdk-lib/aws-events-targets");
const constructs_1 = require("constructs");
class SwnEventBus extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        //Eventbus
        const bus = new aws_events_1.EventBus(this, 'SwnEventBus', {
            eventBusName: 'SwnEventBus'
        });
        const checkoutBasketRule = new aws_events_1.Rule(this, 'CheckoutBasketRule', {
            eventBus: bus,
            enabled: true,
            description: 'When basket microservice checkout the basket',
            eventPattern: {
                source: ['com.swn.basket.checkoutbasket'],
                detailType: ['CheckoutBasket'],
            },
            ruleName: 'CheckoutBasketRule'
        });
        checkoutBasketRule.addTarget(new aws_events_targets_1.LambdaFunction(props.targetFuntion));
        bus.grantPutEventsTo(props.publisherFunction);
    }
}
exports.SwnEventBus = SwnEventBus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRidXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudGJ1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBd0Q7QUFDeEQsdUVBQWdFO0FBRWhFLDJDQUF1QztBQU92QyxNQUFhLFdBQVksU0FBUSxzQkFBUztJQUV0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXVCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsVUFBVTtRQUNWLE1BQU0sR0FBRyxHQUFHLElBQUkscUJBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQzFDLFlBQVksRUFBRSxhQUFhO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxpQkFBSSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUM5RCxRQUFRLEVBQUUsR0FBRztZQUNiLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLDhDQUE4QztZQUMzRCxZQUFZLEVBQUU7Z0JBQ1osTUFBTSxFQUFDLENBQUMsK0JBQStCLENBQUM7Z0JBQ3hDLFVBQVUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQy9CO1lBQ0QsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDLENBQUM7UUFFRixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxtQ0FBYyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBRXRFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUdwRCxDQUFDO0NBQ0o7QUEzQkQsa0NBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRCdXMsIFJ1bGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWV2ZW50c1wiO1xyXG5pbXBvcnQgeyBMYW1iZGFGdW5jdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZXZlbnRzLXRhcmdldHNcIjtcclxuaW1wb3J0IHsgSUZ1bmN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuXHJcbmludGVyZmFjZSBTd25FdmVudEJ1c1Byb3Bze1xyXG4gICAgcHVibGlzaGVyRnVuY3Rpb246IElGdW5jdGlvbixcclxuICAgIHRhcmdldEZ1bnRpb246IElGdW5jdGlvblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3duRXZlbnRCdXMgZXh0ZW5kcyBDb25zdHJ1Y3R7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN3bkV2ZW50QnVzUHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9FdmVudGJ1c1xyXG4gICAgICAgIGNvbnN0IGJ1cyA9IG5ldyBFdmVudEJ1cyh0aGlzLCAnU3duRXZlbnRCdXMnLCB7XHJcbiAgICAgICAgICAgIGV2ZW50QnVzTmFtZTogJ1N3bkV2ZW50QnVzJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICAgICAgY29uc3QgY2hlY2tvdXRCYXNrZXRSdWxlID0gbmV3IFJ1bGUodGhpcywgJ0NoZWNrb3V0QmFza2V0UnVsZScsIHtcclxuICAgICAgICAgICAgZXZlbnRCdXM6IGJ1cyxcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdXaGVuIGJhc2tldCBtaWNyb3NlcnZpY2UgY2hlY2tvdXQgdGhlIGJhc2tldCcsXHJcbiAgICAgICAgICAgIGV2ZW50UGF0dGVybjoge1xyXG4gICAgICAgICAgICAgIHNvdXJjZTpbJ2NvbS5zd24uYmFza2V0LmNoZWNrb3V0YmFza2V0J10sXHJcbiAgICAgICAgICAgICAgZGV0YWlsVHlwZTogWydDaGVja291dEJhc2tldCddLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBydWxlTmFtZTogJ0NoZWNrb3V0QmFza2V0UnVsZSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgICAgICBjaGVja291dEJhc2tldFJ1bGUuYWRkVGFyZ2V0KG5ldyBMYW1iZGFGdW5jdGlvbihwcm9wcy50YXJnZXRGdW50aW9uKSk7XHJcblxyXG4gICAgICAgICAgIGJ1cy5ncmFudFB1dEV2ZW50c1RvKHByb3BzLnB1Ymxpc2hlckZ1bmN0aW9uKSBcclxuICAgICAgICAgIFxyXG5cclxuICAgIH1cclxufSJdfQ==