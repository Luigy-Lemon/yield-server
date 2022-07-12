const fs = require('fs');

const storeStds = require('../src/api/storeStds');
const AWS = require('aws-sdk');
const { boostrapDB } = require('./bootstrapTable');
const credentials = new AWS.SharedIniFileCredentials({ profile: 'defillama' });
AWS.config.credentials = credentials;

(async () => {
  // where pools.json is a full database snapshot of the last pool object per day
  // containing timestamp, apy, pool fields
  const p = './pools.json';
  let data = JSON.parse(fs.readFileSync(p));
  const dataDB = boostrapDB(data, 'stds');
  const response = await storeStds(dataDB);
  console.log(response.body);
})();
