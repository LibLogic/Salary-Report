var fs = require("fs");

// This function gathers our needed elements
// and places them in one consolidated json file,
// where each line represents a current employeeID,
// firstNmae, lastName, department and salary
// like this: [1001, "first", "last", "dept", 55000]


// read the all_data.json file
var data = fs.readFileSync("all_data.json", 'utf8');
data = JSON.parse(data);

var workingFile = [];

// filter salaries for salaries with
// current employees only
var salaries = data[3].filter(function(elem){
	return elem[3] == '9999-01-01';
});

// Finds the department name by matching 
// the deptId. Returns an array with
// dept name and dept id as elements
function currentDept(deptId){
	var depts = data[0].filter(function(elem){ 
	return elem[0] == deptId;
	});
	return depts[0][1];
}

// iterating through each remaining salary and
// try to match the empID with some element
// from within our all_data file
salaries.forEach(function(sal, index){
	
	// No match so keep checking next element 
	// until a match is found
	while (data[2][index][0] != sal[0]) {
		data[2].shift();
	}
	
	// No match so keep checking next element 
	// until a match is found	
	while (data[1][index][0] != sal[0]) {
		data[1].shift();
	}	
	
// Creates a 2d array containg all pertinent data
// data extracted from all files
	var deptIdFromDepts  = data[1][index][1];	
	var firstName = data[2][index][2];
	var lastName = data[2][index][3];
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


