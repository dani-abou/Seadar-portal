import makeRow from "./makeRow.js";
import fs from 'fs';

const HEADER = "Type,Stage,Opportunity Name,Architect,Landscape Architect,Designer,Property Owner,Owner Rep,RE Broker,Building Manager,Other\n";

export default function writeCSV(opps) {
  const fullString = opps.reduce((acc, curr) => acc + makeRow(curr), HEADER);
  console.log(fullString);


  fs.writeFile('./Contacts_To_Opp.csv', fullString, function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
      console.log('It\'s saved!');
    }
  });
}

