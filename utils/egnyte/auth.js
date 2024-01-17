import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();

const body = {
  client_id: process.env.EGNYTE_ID,
  client_secret: process.env.EGNYTE_SECRET,
  username: process.env.EGNYTE_USER,
  password: process.env.EGNYTE_PASSWORD,
  grant_type: "password"
}
const formattedBody = new URLSearchParams(body).toString();


export default async function egnyteAuth() {
  const res = await fetch("https://seadar.egnyte.com/puboauth/token?", {
    method: "POST",
    headers: {
      "Host": "seadar.egnyte.com",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formattedBody
  })
  const json = await res.json();

  return json.access_token;
}