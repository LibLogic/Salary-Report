var fs = require("fs");
var readline = require('readline');

convertFile("load_dept_names.txt");
convertFile("load_dept_emp.txt");
convertFile("load_employees.txt");
convertFile("load_salaries.txt");

// This main function create3 a 3 dimensional 
// array with each data file as an element
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
	// put each 2 dimensional array into
	// 3 dimentional data array
	myInterface.on
	('close', function(){
		fileCount++;
		threeDeepArray.push(twoDeepArray);
		if (fileCount == 4){
			
			// Save data array to a file
			fs.writeFile("all_data.json", JSON.stringify(threeDeepArray), function(err){
				if(err){ throw err }
			});	
		}
		
		// Move original data files into a the" processedFiles" folder
		fs.rename(file, "processedFiles/" + file, function(err){
			if (err) { throw err }
		});	
	});
}
