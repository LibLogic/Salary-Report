var fs = require("fs");

var data = fs.readFileSync("files_as_array.txt", 'utf8');
data = JSON.parse(data);

var workingFile = [];
// filter salaries for current employees only
var salaries = data[3].filter(function(elem){
	return elem[3] == '9999-01-01';
});
// For each departmant scan through each
// line from file looking for matching
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
// Finds the department name
// by matching the dept id. Returns an array with
// dept name and dept id as elements
	function currentDept(deptId){
		var depts = data[0].filter(function(elem){
		return elem[0] == deptId;
		});
		return depts[0][1];
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
fs.writeFile("output-file.txt", JSON.stringify(workingFile), function(err){
				if(err){ throw err }
// moves processed file into folder				
		fs.rename("files_as_array.txt", "processedFiles/files_as_array.txt", function(err){
			if (err) { throw err }
		});					
});	


