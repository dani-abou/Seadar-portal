import dotenv from 'dotenv';
import opportunities from "./utils/opportunities/index.js";
import writeCSV from './utils/csv/index.js';
import refresh from './utils/auth/authToken.js';
import fetch from 'node-fetch';

dotenv.config();

const authToken = '1000.42f099a7dfe14229d583ab16a24df132.693e6bf0dace874573f9f2f2ce8cd965'

async function main() {
  // const authToken = await refresh();

  // const opps = await opportunities(authToken);
  // writeCSV(opps);


  const res = await fetch('https://www.zohoapis.com/crm/v5/Deals/search?' + new URLSearchParams({
    criteria: 'Modified_Time:greater_equal:2023-12-22T09:28:12-05:00'
  }),
    {
      method: "GET",
      headers: { "Authorization": `Zoho-oauthtoken ${authToken}` },
    })
  const json = await res.json();
  console.log(json);
}





main();