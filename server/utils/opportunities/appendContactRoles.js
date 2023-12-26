import getContactRoles from "./getContactRoles.js";



export default async function appendContactRoles(opportunities, auth) {
  for (let opp of opportunities) {
    const contacts = await getContactRoles(opp.id, auth);
    Object.keys(contacts).forEach(k => {
      opp[k] = contacts[k];
    })
  }
}