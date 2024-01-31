require('dotenv').config()
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
} = require("@aws-sdk/lib-dynamodb");
const AWS = require('aws-sdk');

const dynamoDBClient = new AWS.DynamoDB({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAQCXMNAIAKJDXKL7C",
    secretAccessKey: "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",
  },
});

// const client = new DynamoDBClient({
//     region: process.env.REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
//   });
//   const dynamoDBClient = DynamoDBDocumentClient.from(client);
  // dynamoDBClient.send
  const tableName = "transactions";

// function to get the user history
const getUserHistory = async (req, res) => {
  try {
    const params = {
      TableName: tableName,
    };

    const result = await dynamoDBClient.scan(params).promise();
    const itemFromDynamoDB = result.Items;
    // console.log(itemFromDynamoDB);
    
    res.status(200).json({ data: itemFromDynamoDB, message: 'User history retrieved from DynamoDB' });
  } catch (error) {
    console.error('Error retrieving user history from DynamoDB:', error);
    res.status(500).json({ message: 'Error retrieving user history from DynamoDB', error: error });
  }
}

// generating a rondom id for each row
const generateId = () => {
  const timestamp = new Date().getTime().toString();
  const random = Math.floor(Math.random() * 9000000000) + 1000000000; // Generates a random number between 1000000000 and 9999999999
  return timestamp + random;
};

// Add a new transaction to the Db
const postNewTransaction = async (req, res) => {
  try {
    const { amount, description, type, date } = req.body.data;
    console.log(req.body.data)
    const id = generateId();
    const params = {
      TableName: tableName,
      Item: {
        'id': { N: id.toString() },
        'description': { S: description },
        'amount': { N: amount.toString() },
        'type': { S: type },
        'date': { S: date.toString() },
        // 'month': { S: month },
        // 'year': { N: year.toString() },
      },
    };

    await dynamoDBClient.putItem(params).promise();

    res.status(200).json({ data: { amount, description, type, date }, message: 'Data added to DynamoDB' });
  } catch (error) {
    console.error('Error adding data to DynamoDB:', error);
    res.status(500).json({ message: 'Error adding data to DynamoDB', error: error });
  }
};

// Function to get total amount by month
const getTotalAmountByMonth = async () => {
  const params = {
    TableName: tableName,
    ProjectionExpression: '#amt, #date',
    ExpressionAttributeNames: {
      '#amt': 'amount',
      '#date': 'date',
    },
  };

  try {
    const result = await dynamoDBClient.scan(params).promise();
    // console.log('Raw result from DynamoDB:', result);

    // Process the result to calculate monthly totals
    const monthlyTotals = result.Items.reduce((totals, item) => {
      const monthYear = new Date(item.date.S).toISOString().slice(0, 7); // Extract YYYY-MM from ISO date
      totals[monthYear] = (totals[monthYear] || 0) + parseFloat(item.amount.N);
      return totals;
    }, {});

    console.log('Calculated monthly totals:', monthlyTotals);

    return monthlyTotals;
  } catch (error) {
    console.error('Error getting total amount by month:', error);
    throw error;
  }
};

// Function to fetch expense distribution by category
const getExpenseDistribution = async () => {
  const params = {
    TableName: tableName,
    ProjectionExpression: '#amt, #type',
    ExpressionAttributeNames: {
      '#amt': 'amount',
      '#type': 'type',
    },
  };

  try {
    const result = await dynamoDBClient.scan(params).promise();
    // console.log('Raw result from DynamoDB:', result);

    // Process the result to calculate the distribution
    const expenseDistribution = result.Items.reduce((distribution, item) => {
      const category = item.type.S;
      distribution[category] = (distribution[category] || 0) + parseFloat(item.amount.N);
      return distribution;
    }, {});

    console.log('Calculated expense distribution:', expenseDistribution);

    return expenseDistribution;
  } catch (error) {
    console.error('Error getting expense distribution:', error);
    throw error;
  }
};

// Function to fetch monthly spending for the type
const getMonthlyTypeSpending = async () => {
  const params = {
    TableName: 'transactions',
    ProjectionExpression: '#amt, #date, #type',
    ExpressionAttributeNames: {
      '#amt': 'amount',
      '#date': 'date',
      '#type': 'type',
    },
  };

  try {
    const result = await dynamoDBClient.scan(params).promise();
    // console.log('Raw result from DynamoDB:', result);

    // Process the result to calculate monthly spending for each type
    const monthlyTypeSpending = result.Items.reduce((typeSpending, item) => {
      try {
        const isoDateString = item.date.S;
        const monthYear = new Date(isoDateString).toISOString().slice(0, 7);
        const type = item.type.S;
        typeSpending[type] = typeSpending[type] || {};
        typeSpending[type][monthYear] = (typeSpending[type][monthYear] || 0) + parseFloat(item.amount.N);
      } catch (error) {
        console.error('Error processing date:', item.date.S);
      }
      return typeSpending;
    }, {});

    console.log('Calculated monthly spending for each type:', monthlyTypeSpending);

    return monthlyTypeSpending;
  } catch (error) {
    console.error('Error getting monthly spending for each type:', error);
    throw error;
  }
};

const getUserOverview = async (req,res) => {
  try {
    const totalAmountByMonth = await getTotalAmountByMonth();
    const expenseDistribution = await getExpenseDistribution();
    const monthlyTypeSpendingResult = await getMonthlyTypeSpending();

    res.status(200).json({
      totalAmountByMonth,
      expenseDistribution,
      monthlyTypeSpendingResult,
    });
  } catch (error) {
    console.error('Error fetching overview data:', error);
    res.status(500).json({ message: 'Error fetching overview data', error: error });
  }
}

module.exports = { 
  getUserHistory,  
  postNewTransaction, 
  getUserOverview
};