import date from 'date-and-time';
import opportunities from "./utils/opportunities/index.js";
import writeCSV from './utils/csv/index.js';
import refresh from './utils/auth/authToken.js';
import uploadFile from './utils/egnyte/index.js';

async function main() {
  const file = filePath();
  // const authToken = await refresh();

  // const opps = await opportunities(authToken);
  // writeCSV(opps, file);

  console.log(file);

  // await uploadFile(file);

}

const filePath = () => {
  const dateFormatted = date.format(new Date(), "MM-DD-YYYY");
  return `${dateFormatted}-Opportunity_Contacts.csv`
}

main();