import fetch from "node-fetch";
import appendContactRoles from "./appendContactRoles.js"
import dotenv from 'dotenv';
dotenv.config();

const CVID = process.env.CVID;
const FIELDS = [
  "Opportunity_Name",
  "Stage",
  "Type"
]

const dummyOpps = [
  {
    id: '2516069000015268543',
    oppName: 'Najib Canaan Project',
    stage: 'WON',
    type: 'FWC'
  },
  {
    id: '2516069000015218460',
    oppName: 'San Remo 16th Floor',
    stage: 'WON',
    type: 'NYS'
  },
  {
    id: '2516069000015218426',
    oppName: '124 Willow',
    stage: 'WON',
    type: 'NYS'
  },
  {
    id: '2516069000015083635',
    oppName: 'Jones Family Office',
    stage: 'WON',
    type: 'FWC'
  },
  {
    id: '2516069000014978563',
    oppName: '300CPW',
    stage: 'WON',
    type: 'NYS'
  },
  {
    id: '2516069000014883001',
    oppName: '2 Avery Place PH',
    stage: 'WON',
    type: 'BMS'
  },
  {
    id: '2516069000014560127',
    oppName: '103 Penzance Road, Woods Hole',
    stage: 'WON',
    type: 'SCR'
  },
  {
    id: '2516069000014542145',
    oppName: '118 Farm Court',
    stage: 'WON',
    type: 'NYH'
  },
  {
    id: '2516069000014342550',
    oppName: 'Houlihan Lawrence',
    stage: 'WON',
    type: 'FWC'
  },
  {
    id: '2516069000014342533',
    oppName: '120 Bank Street',
    stage: 'WON',
    type: 'NYS'
  },
]

export default async function getOpportunities(auth) {

  let allOpps = [];
  let moreRecords = true;
  let page = 1;

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
    moreRecords = json.info.more_records;
    page++;
    allOpps = allOpps.concat(json.data)
  }


  allOpps = allOpps.map(opp => ({ id: opp.id, oppName: opp.Deal_Name, stage: opp.Stage, type: opp.Type }))

  await appendContactRoles(allOpps, auth)

  return allOpps;
}