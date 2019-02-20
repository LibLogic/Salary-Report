var fs = require("fs");

// This function gathers our needed elements
// and places them in one consolidated json file,
// where each line represents a current employeeID,
// firstNmae, lastName, department and salary
// like this: [1001, "first", "last", "dept", 55000]


// read the all_data.json file
var data = fs.readFileSync("all_data.json", 'utf8');
data = JSON.parse(data);

// create variables for each file
var deptId_deptName = data[0];
var empId_deptId = data[1];
var empId_name = data[2];
var empId_salary = data[3];

var workingFile = [];

// filter salaries for salaries with
// current employees only
var salaries = empId_salary.filter(function(elem){
	return elem[3] == '9999-01-01';
});

// Finds the department name by matching 
// the deptId. Returns an array with
// dept name and dept id as elements
function currentDept(deptId){
	var depts = deptId_deptName.filter(function(elem){ 
		return elem[0] == deptId;
	});
	return depts[0][1];
}

// iterating through each remaining salary and
// try to match the empID with some element
// from within our all_data file
salaries.forEach(function(sal, line){
	
	// No match so keep checking next element 
	// until a match is found
	while (empId_name[line][0] != sal[0]) {
		empId_name.shift();
	}
	
	// No match so keep checking next element 
	// until a match is found	
	while (empId_deptId[line][0] != sal[0]) {
		empId_deptId.shift();
	}	
	
// Creates a 2d array containg all pertinent data
// data extracted from all files
	var deptIdFromDepts  = empId_deptId[line][1];	
	var firstName = empId_name[line][2];
	var lastName = empId_name[line][3];
	var elem = [];
	elem.push(sal[0], firstName, lastName, currentDept(deptIdFromDepts), sal[1]);
	workingFile.push(elem);
});

// writes 2d array to file
fs.writeFile("consolidated.json", JSON.stringify(workingFile), function(err){
				if(err){ throw err }
// moves processed file into folder				
		fs.rename("all_data.json", "processedFiles/all_data.json", function(err){
			if (err) { throw err }
		});					
});