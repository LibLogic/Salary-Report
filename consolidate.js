var fs = require("fs");

////////////   This function gathers the required elements     ////////////////
////////////   and places them in one consolidated json file,  ////////////////
////////////   where each line will represent an               ////////////////
////////////   employeeID, firstNmae, lastName, department     ////////////////
////////////   and salary like this:                           ////////////////
////////////   [1001, "first", "last", "dept", 55000]          ////////////////


// read the all_data.json file
var data = fs.readFileSync("all_data.json", 'utf8');
data = JSON.parse(data);

// create variables for each file
var deptId_deptName = data[0];
var empId_deptId = data[1];
var empId_name = data[2];
var empId_salary = data[3];

var consolidated = [];

// filter salaries for salaries with
// current employees only
var salaries = empId_salary.filter(function(elem){
	return elem[3] == '9999-01-01';
});

// Filter deptId_deptName 
// Return only one department name
// according to the deptId passed in
function getCurrentDept(deptId){
	var currentDept = deptId_deptName.filter(function(elem){ 
		return elem[0] == deptId;
	});
	return currentDept[0][1];
}

// Iterate through each remaining salary and
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
	
// Creates a 2 dimensional array containg all pertinent
// data extracted from the various arrays
	var deptIdFromDepts  = empId_deptId[line][1];	
	var firstName = empId_name[line][2];
	var lastName = empId_name[line][3];
	var elem = [];
	elem.push(sal[0], firstName, lastName, getCurrentDept(deptIdFromDepts), sal[1]);
	consolidated.push(elem);
});

// writes 2d array to file
fs.writeFile("consolidated.json", JSON.stringify(consolidated), function(err){
		if(err){ throw err }
		// moves processed file into folder		
	fs.rename("all_data.json", "processedFiles/all_data.json", function(err){
		if (err) { throw err }
	});	
});