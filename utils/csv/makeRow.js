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

export default function makeRow(opportunity) {
  const { type, oppName, stage, id, ...contacts } = opportunity;
  const numOfRows = Object.values(contacts).reduce((acc, current) => Math.max(acc, current.length), 0);
  let fullOpportunityString = ""

  if (numOfRows === 0) fullOpportunityString += `${type},${stage},"${oppName}",,,,,,,\n`

  for (var i = 0; i < numOfRows; i++) {
    let row;
    if (i == 0) {
      row = `${type},${stage},"${oppName}"`
    } else {
      row = ",,"
    }
    roles.forEach(role => {
      if (contacts[role] && contacts[role][i]) {
        row = `${row},"${contacts[role][i]}"`
      } else {
        row = `${row},`
      }
    })
    fullOpportunityString += row + "\n"
  }
  return fullOpportunityString;
}
