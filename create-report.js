var fs = require("fs");


// consolidated.json file contains all the required
// data in an array with elements like this 
// [ 10001, 'Georgi', 'Facello', 'Development', 88958 ]
var data = fs.readFileSync("consolidated.json", 'utf8');
var consolidated = JSON.parse(data);

// create an array of only department names
var departments = [];
consolidated.forEach(function(elem){
	while (departments.indexOf(elem[3]) == -1){
		departments.push(elem[3]);
	}
});

// compare index[3] in each line of consolidated to find a
// match in the department array. When matched, get that
// employees salary and accumulate it to the total for the
// current department. Console.log a report.
var deptTotal = 0;
departments.forEach(function(dept){
		console.log(`\n\n\n\t\t——————————— ${dept} Dept. ————— Employee & Salary Data ———————————————————\n`);
		consolidated.forEach(function(elem, index){
			if(elem[3] === dept) {
					deptTotal += elem[4];
					console.log(`\t\tEmp. Id: ${consolidated[index][0]}\t\tName: ${consolidated[index][1]} ${consolidated[index][2]}\t\tSalary: ${consolidated[index][4]}`);					
			}
		});
		console.log(`\n\t\t———————————————————————————————————— Dept. Salary Total: ${deptTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} ——————————`);
		// reset the total before iterating the next department
		deptTotal = 0;
});