var fs = require("fs");

//////  This file gathers the required elements               //////////
//////  and places them in one consolidated json file,        //////////
//////  where each line will represent an                     //////////
//////  employeeID, firstName, lastName, deptId,              //////////
//////  deptName and salary like this:                        //////////
//////  [1001, "first", "last", "deptId", deptName", 55000]   //////////


// read the all_data.json file
var data = fs.readFileSync("all_data.json", 'utf8');
data = JSON.parse(data);

// create variables that represent each file
var deptId_deptName = data[0];
var empId_deptId = data[1];
var empId_name = data[2];
var empId_salary = data[3];

// This will be the final array
var consolidated = [];

// filter salaries for salaries with
// current employees only
var salaries = empId_salary.filter(function(elem){
	return elem[3] == '9999-01-01';
});

// Iterate through each of the remaining salaries
// and try to match the empId with various elements
// from within one line of the all_data file
salaries.forEach(function(sal, line){
	
	// checking if empId from salaries 
	// matches empId from empId_name file
	while (empId_name[line][0] != sal[0]) {
	// No match so keep shifting lines forward
	// and checking until a match is found
		empId_name.shift();
	}
	// The empId_name file had a match
	// so set some variables for the names
	var firstName = empId_name[line][2];
	var lastName = empId_name[line][3];
	
	// checking if empId from salaries 
	// matches empId from empId_deptId file	
	while (empId_deptId[line][0] != sal[0]) {
	// No match so keep shifting lines forward
	// and checking until a match is found
		empId_deptId.shift();
	}	
	// The empId_deptId file had a match
	// so set a variable for the deptId
	var theDeptId  = empId_deptId[line][1];
	
	// Gets the department name 
	// when given a deptId
	function getCurrentDept(deptId){
	var currentDept = deptId_deptName.filter(function(elem){ 
		return elem[0] == deptId;
	});
	return currentDept[0][1];
	}

	// Creates a 2 dimensional array containg all pertinent
	// data extracted using the while loops above
	var elem = [];
	elem.push(sal[0], firstName, lastName, theDeptId, getCurrentDept(theDeptId), sal[1]);
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