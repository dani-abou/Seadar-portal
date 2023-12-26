import fetch from "node-fetch";

const CONTACT_FIELDS = [
  "First_Name",
  "Last_Name",
  "Contact_Type"
]

export default async function getContactRoles(id, auth) {

  const res = await fetch(`https://www.zohoapis.com/crm/v5/Deals/${id}/Contact_Roles?` + new URLSearchParams({
    fields: CONTACT_FIELDS,
  }), {
    method: "GET",
    headers: { "Authorization": `Zoho-oauthtoken ${auth}` },
  })
  console.log("Fetched: ", id);

  try {
    const json = (await res.json()).data;
    return format(json);
  } catch (e) {
    console.log(e.message);
    return {}
  }
}
const roles = [
  "Architect",
  "Landscape Architect",
  "Designer",
  "Property Owner",
  "Owner Rep",
  "RE Broker",
  "Building Manager",
  "Other"
]

const ROLE_BANK = {
  "Owner's Rep": "Owner Rep",
  "Interior Designer": "Designer",
  "RE Broker/Services": "RE Broker",
  "Property Owner / Rep": "Property Owner",
  "Employee": "Owner Rep",
  "Building Management": "Building Manager",
  "Developer": "RE Broker",
  "Architect - Landscape": "Landscape Architect",
  "Client - Residential": "Property Owner",
}

function format(json) {
  let out = {};
  json.forEach(contact => {
    const name = `${contact.First_Name} ${contact.Last_Name}`;
    let role = contact.Contact_Role?.name || contact.Contact_Type[0];

    if (!role) { role = "Property Owner"; }
    else if (ROLE_BANK[role]) role = ROLE_BANK[role];
    else if (!ROLE_BANK[role] && !roles.includes(role)) role = "Other"

    if (!out[role]) out[role] = [];
    out[role].push(name);
  })
  return out;
}