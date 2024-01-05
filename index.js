import dotenv from 'dotenv';
import opportunities from "./utils/opportunities/index.js";
import writeCSV from './utils/csv/index.js';
import refresh from './utils/auth/authToken.js';
import fetch from 'node-fetch';
import uploadFile from './utils/egnyte/index.js';

dotenv.config();

const filePath = './Contacts_To_Opp.csv'

async function main() {
  // const authToken = await refresh();

  // const opps = await opportunities(authToken);
  // writeCSV(opps, filePath);

  await uploadFile(filePath);

}





main();