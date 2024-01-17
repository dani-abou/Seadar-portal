import egnyteAuth from "./auth.js";
import fetch from "node-fetch";

const PATH = "Private/dabouhamad/zohoAccounts"

export default async function uploadFile(filename, fileContents) {
  const token = await egnyteAuth();

  const res = await fetch(`https://seadar.egnyte.com/pubapi/v1/fs-content/${PATH}/${filename}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "text/plain"
    },
    body: fileContents
  })

  console.log("Completed")

}