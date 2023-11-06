exports.handler = async function(event) {
console.log("request:", JSON.stringify(event, undefined, 2));


switch(event.httpMethod){
    case 'GET':

        break;
    case 'POST':

        break;
    case 'DELETE':

        break;
    case 'PUT':

        break;
        
    default:
        throw new Error(`Unsupported route: "${event.httpMethod}"`);
}
    
    
    
    return {
        statusCode: 200,
        headers: {"Content-Type": "text/plain"},
        body: `Response from basket endpoint "${event.path}"`,
    }


    
}