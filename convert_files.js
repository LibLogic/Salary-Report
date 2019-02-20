var fs = require("fs");
var readline = require('readline');

convertFile("load_dept_names.txt");
convertFile("load_dept_emp.txt");
convertFile("load_employees.txt");
convertFile("load_salaries.txt");

// This function create3 a 3 dimensional array with each
// file as an element in the array
var threeDeepArray = [];
var fileCount = 0;
function convertFile(file){
	var myInterface = readline.createInterface({
	  input: fs.createReadStream(file)
	});
	
	// creates a 2 dimensional array with each
	// element being a line from the file
	var twoDeepArray = [];
	myInterface.on('line', function (line) {
		line = line.replace(/\(|\)\,|\)|\s/g, "").replace(/\'/g, "\"");
		line = JSON.parse('[' + line + ']');
		twoDeepArray.push(line);
	});
// put eah 2 dimensional array into another "3d" array
	myInterface.on
	('close', function(){
		fileCount++;
		threeDeepArray.push(twoDeepArray);
		if (fileCount == 4){
			
// Save 3d array to a file
			fs.writeFile("files_as_array.json", JSON.stringify(threeDeepArray), function(err){
				if(err){ throw err }
			});	
		}
		
// Move original files into a folder
		fs.rename(file, "processedFiles/" + file, function(err){
			if (err) { throw err }
		});	
	});
}

			// console.log(threeDeepArray); 
// var keyName = file.split('.')[0];
// buildObj[keyName] = buildArray;
// fs.writeFile("new_" + file.split('.')[0] + ".txt", JSON.stringify(buildObj), function(err){