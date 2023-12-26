import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

export default async function refresh() {
  const res = await fetch('https://accounts.zoho.com/oauth/v2/token?' + new URLSearchParams({
    client_id: '1000.1H0YROICNDAQO9YFY9AXS3KD77IBQX',
    grant_type: 'refresh_token',
    refresh_token: process.env.REFRESH,
    client_secret: process.env.SECRET
  }), {
    method: 'POST'
  })
  const json = await res.json();
  return json.access_token
}
