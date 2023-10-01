## CDK Lambda Function and API Gateway

This CDK project simplifies the process of creating a Lambda function and API Gateway using AWS Cloud Development Kit (CDK) and TypeScript.

### Prerequisites

Before you begin, ensure you have the following installed and set up:

- [Node.js and npm](https://nodejs.org/en/download/)
- AWS CLI configured with necessary credentials and permissions

### Steps

#### 1. **Create a New Project Folder**

Create a new folder for your CDK project. Replace `your-project-name` with a suitable name for your project.

```bash
mkdir your-project-name
cd your-project-name
```

#### 2. **Initialize the CDK Project**

Inside your project folder, initialize a new CDK project with TypeScript.

```bash
cdk init app --language javascript
```


#### 3. **Add Lambda Function and API Gateway Code**

Edit the `lib/your-project-name-stack.ts` file and add your Lambda function and API Gateway code to the `YourProjectNameStack` class. You can use AWS Lambda and API Gateway classes provided by CDK for this purpose.

Example code for creating a Lambda function and API Gateway:

```typescript
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

```

 

#### 4. **Synthesize the CDK Project**

Generate the CloudFormation template for your CDK project.

```bash
cdk synth
```

#### 5. **Deploy the CDK Project**

Deploy your CDK project, which will create the Lambda function and API Gateway resources in AWS.

```bash
cdk deploy
```

### Clean Up

To avoid incurring unnecessary costs, make sure to destroy the resources when you are done with your project.

```bash
cdk destroy
```

This will remove all the resources created by your CDK stack.