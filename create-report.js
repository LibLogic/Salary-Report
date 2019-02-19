var fs = require("fs");

var data = fs.readFileSync("output-file.txt", 'utf8');
data = JSON.parse(data);

// create an array of departments
var departments = [];
data.forEach(function(elem){
	while (departments.indexOf(elem[3]) == -1){
		departments.push(elem[3]);
	}
});

var deptTotals = [];
var deptTotal = 0;
departments.forEach(function(dept){
		data.forEach(function(elem){
			if(elem[3] === dept) {
					deptTotal += elem[4];
			}
		});
		deptTotals.push([dept, deptTotal]);
		deptTotal = 0;
});

console.log(deptTotals);