import makeRow from "./makeRow.js";
import fs from 'fs';

const HEADER = "Type,Stage,Opportunity Name,Architect,Landscape Architect,Designer,Property Owner,Owner Rep,RE Broker,Building Manager,Other\n";

export default function writeCSV(opps, filePath) {
  console.log("Formatting output")
  const fullString = opps.reduce((acc, curr) => acc + makeRow(curr), HEADER);
  console.log("Writing output")

  //YEAR-MM-DD-Opportunity-roles

  fs.writeFile(filePath, fullString, function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
      console.log('It\'s saved!');
    }
  });
}

