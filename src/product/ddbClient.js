import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const ddbCLient = new DynamoDBClient();
export {ddbCLient};