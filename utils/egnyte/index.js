import egnyteAuth from "./auth.js";
import fetch from "node-fetch";

import dotenv from 'dotenv';
dotenv.config();

const PATH = "Private/dabouhamad/zohoAccounts"

// const dummyPath = "../../Contacts_To_Opp.csv"

export default async function uploadFile(filename, fileContents) {
  // const token = await egnyteAuth();

  const token = process.env.EGNYTE_TOKEN;

  const res = await fetch(`https://seadar.egnyte.com/pubapi/v1/fs-content/${PATH}/${filename}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "text/plain"
    },
    body: fileContents
  })
  // console.log(res);S
  const json = await res.json();
  // console.log(json);
  console.log("Completed")
}