var fs = require("fs");


// consolidated.json file contains all the required
// data in an array with elements like this 
// [ 10001, 'Georgi', 'Facello', 'd005', 'Development', 88958 ]
var data = fs.readFileSync("consolidated.json", 'utf8');
var consolidated = JSON.parse(data);

// create an array of only department names
var deptNames = [];
var deptIds = [];
consolidated.forEach(function(elem){
	while (deptNames.indexOf(elem[4]) == -1){
		deptNames.push(elem[4]);
		deptIds.push(elem[3]);
	}
});

// Compare each department in departments to the Department Name (index[4]) 
// in each line of consolidated to find a match. When matched, get that
// employees salary and accumulate it to the total for the
// current department. Log a report.
var gTotal = 0;
var deptTotal = 0;
var empCount = 0;
deptNames.forEach(function(deptName, i){
		console.log(` ${deptName} Department — ${deptIds[i]}`);
		consolidated.forEach(function(elem, index){
			if(elem[4] === deptName) {
					empCount++;
					deptTotal += elem[5];
					console.log(`   ${empCount}. Employee Id: ${consolidated[index][0]}  —  Name: ${consolidated[index][1]} ${consolidated[index][2]}\t     Salary: ${consolidated[index][5].toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`);					
			}
		});
		console.log(` Total salary for the ${deptName} Department:     ${deptTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}\n`);
		gTotal += deptTotal;
		// reset the total and the empCount before iterating the next department
		deptTotal = 0;
		empCount = 0;
});
console.log(`             **  Total for all departments  —  ${gTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`);