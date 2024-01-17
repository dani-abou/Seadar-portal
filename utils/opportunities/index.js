import fetch from "node-fetch";
import appendContactRoles from "./appendContactRoles.js"
import dotenv from 'dotenv';
dotenv.config();

const CVID = process.env.CVID;
const FIELDS = [
  "Opportunity_Name",
  "Stage",
  "Type",
  "Closing_Date"
]

export default async function getOpportunities(auth) {

  let allOpps = [];
  let moreRecords = true;
  let page = 1;
  console.log(auth, CVID)

  while (moreRecords) {
    const res = await fetch("https://www.zohoapis.com/crm/v5/Deals?" + new URLSearchParams({
      fields: FIELDS,
      cvid: CVID,
      page
    }), {
      method: "GET",
      headers: { "Authorization": `Zoho-oauthtoken ${auth}` },
    })
    const json = await res.json();
    // console.log(json);
    moreRecords = json.info.more_records;
    page++;
    allOpps = allOpps.concat(json.data)
  }

  allOpps = allOpps.map(opp => ({ id: opp.id, oppName: opp.Deal_Name, stage: opp.Stage, type: opp.Type, closingDate: opp.Closing_Date }))
  console.log(`Found ${allOpps.length} opportunities`);

  await appendContactRoles(allOpps, auth)

  return allOpps;
}