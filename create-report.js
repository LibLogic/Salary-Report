var fs = require("fs");

// output-file.txt contains all the data needed
// in an array with elements like this 
// [ 10001, 'Georgi', 'Facello', 'Development', 88958 ]
var data = fs.readFileSync("consolidated.json", 'utf8');
data = JSON.parse(data);

// create an array of only departments
var departments = [];
data.forEach(function(elem){
	while (departments.indexOf(elem[3]) == -1){
		departments.push(elem[3]);
	}
});


// data[0] looks like this [ 10001, 'Georgi', 'Facello', 'Development', 88958 ]

// scan position [3] in each element in the  data array for a match in deptartments array
// that was created above. When matched get the employees total contribution and
// accumulate all totals from each employee in each department.
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