const { Stack } = require('aws-cdk-lib');
// const sqs = require('aws-cdk-lib/aws-sqs');
const s3 = require('aws-cdk-lib/aws-s3');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigw = require('aws-cdk-lib/aws-apigateway');
 

class CdkTestStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // Lambda function that outptus "Hello World" connected to an API Gateway HTTP endpoint /hello
    const hello = new lambda.Function(this, 'my-cdk-hello-handler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler',
    });

    // define an API Gateway REST API resource backed by our "hello" function.
    // name the API Gateway resource "my-cdk-api-gw"
    // the API Gateway endpoint will be /hello GET only 
    const gw = new apigw.LambdaRestApi(this, 'my-cdk-api-gw', {
      handler: hello,
      proxy: false,
    }); 

    // add a resource to the API Gateway endpoint
    // name the resource "hello"
    // the resource will be /hello
    const helloResource = gw.root.addResource('hello');

    // add a method to the API Gateway endpoint
    // name the method "GET"
    // the method will be GET
    // the method will be backed by the hello Lambda function
    helloResource.addMethod('GET', new apigw.LambdaIntegration(hello));
    
    
  }
}

module.exports = { CdkTestStack }
