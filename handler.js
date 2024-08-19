const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.listJobs = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_JOBS,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch jobs' }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
  }
};


module.exports.listApplications = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_APPLICATIONS,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch jobs' }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
  }
};

module.exports.applyJob = async (event) => {
  const data = JSON.parse(event.body);

  if (typeof data.name !== 'string' || typeof data.jobId !== 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid input' }),
    };
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE_APPLICATIONS,
    Item: {
      applicationId: uuidv4(),
      jobId: data.jobId,
      name: data.name,
      appliedAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Application successful' }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not apply for job' }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
  }
};