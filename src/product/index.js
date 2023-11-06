import { DeleteItemCommand, GetItemCommand, PutItemCommand, QueryCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbCLient } from "./ddbClient";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {v4 as uuidv4} from 'uuid';

exports.handler = async function(event){
    console.log("request:", JSON.stringify(event, undefined, 2));
    let body;
    //TODO - swtich case event.httpmethod to perform CRUD operations with using ddbclient object.
    try {
        switch(event.httpMethod){
            case "GET":
                if(event.queryStringParameters != null){
                    body = await getProductsByCategory(event); //GET product/123?category=Phone
                }
                 else if(event.pathParameters != null){
                    body = await getProduct(event.pathParameters.id); //GET product/123
                }else{
                    body = await getAllProducts(); //GET product
                }
                break;
            case "POST":
                body = await createProduct(event); //POST product
                break;
            case "DELETE":
                body = await deleteProduct(event.pathParameters.id);
                break;
            case "PUT":
                body = await updateProduct(event.pathParameters.id);
                break;
            default:
                throw new Error(`Unsupported route: "${event.httpMethod}"`);
        
        }
        console.log(body);
        return{
            statusCode: 200,
            headers: {"Content-Type": "text/plain"},
            body: JSON.stringify({
            message: `Successfully finished operation: "${event.httpMethod}"` ,
            body: body,
            })
        }; 
    } catch (e) {
        console.error(e);
        return{
            returnCode: 500,
            body: JSON.stringify({
                message: "Failed to perform operation.",
                errorMsg: e.message,
                errorStack: e.stack,
            })
        };
    }
};

const getProduct = async (productId) => {
    console.log("getProduct");
    try{

        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({id: productId})
        };

        const {Item} = await ddbCLient.send(new GetItemCommand(params));
        console.log(Item)
        return (Item) ? unmarshall(Item) : {};

    }catch(e){
        console.log(e)
        throw e;
    }
}

const getAllProducts = async ()=> {
    console.log("getAllProducts");
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME
        };
        const {Items} = await ddbCLient.send(new ScanCommand(params))
        console.log(Items);
        return (Items) ? Items.map((item) => unmarshall(item)) : {};

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createProduct = async (event) => {
    console.log(`createProduct:"${event} "`);

    try {
        const productRequest = JSON.parse(event.body);

        const productId = uuidv4();
        productRequest.id = productId;

        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: marshall(productRequest || {})
        };
        const createResult = await ddbCLient.send(new PutItemCommand(params))
        console.log(createResult);
        return createProduct;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteProduct = async (productId) => {
    console.log("deleteProduct");

    try {
        const params ={
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({id: productId}),
        };
        const deleteResult = await ddbCLient.send(new DeleteItemCommand(params));
        console.log(deleteResult);
        return deleteResult;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateProduct = async (event) => {
    console.log("updateProduct");
    try {
        const requestBody = JSON.parse(event.body);
        const objKeys = Object.keys(requestBody);

        console.log(`updateProduct function. requestBody : "${requestBody}", objKeys: "${objKeys}"`)



        const params ={
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: marshall({id: event.pathParameters.id}),
            UpadateExpression: `SET ${objKeys.map((_, index) => `#key${index} = :value${index}`).join(", ")}`,
            ExpressionAttributeNames: objKeys.reduce((acc, key, index) => ({
                ...acc,
                [`#key${index}`]: requestBody[key],
            }), {}),
            ExpressionAttributeValues: marshall(objKeys.reduce((acc, key, index) =>({
                ...acc,
                [`:value${index}`] :requestBody[key],
            }), {})),
        };

        const updateResult = await ddbCLient.send(new UpdateItemCommand(params));
        console.log(updateResult);
        return updateResult;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getProductsByCategory = async (event) =>{
    console.log("getProductByCategory");

    try {
        const productId = event.pathParameters.id;
        const category = event.queryStringParameters.category;

        const params ={
            KeyConditionExpression: "id = :productId",
            FilterExpression: "contains (category, :category)",
            ExpressionAttributeValues:{
                "productId": { S: productId},
                "category": {S: category}
            },
            TableName: process.env.DYNAMODB_TABLE_NAME,
        }

        const {Items} = await ddbCLient.send(new QueryCommand(params));
        console.log(Items)
        return Items.map((item) => unmarshall(item));

    } catch (error) {
        console.log(error);
        throw error;
    }
}
