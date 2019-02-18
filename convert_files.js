var fs = require("fs");
var readline = require('readline');

convertFile("load_dept_names.txt");
convertFile("load_dept_emp.txt");
convertFile("load_employees.txt");
convertFile("load_salaries.txt");

// var buildObj = {};
var threeDeepArray = [];
var fileCount = 0;
function convertFile(file){
	var myInterface = readline.createInterface({
	  input: fs.createReadStream(file)
	});
	// var lineno = 0;
	var twoDeepArray = [];
	myInterface.on('line', function (line) {
		// lineno++;
		line = line.replace(/\(|\)\,|\)|\s/g, "").replace(/\'/g, "\"");
		line = JSON.parse('[' + line + ']');
// if(lineno == 16){
		twoDeepArray.push(line);
// }
	});

	myInterface.on
	('close', function(){
		fileCount++;
		threeDeepArray.push(twoDeepArray);
		if (fileCount == 4){
			// console.log(threeDeepArray); 
// var keyName = file.split('.')[0];
// buildObj[keyName] = buildArray;
// fs.writeFile("new_" + file.split('.')[0] + ".txt", JSON.stringify(buildObj), function(err){
			fs.writeFile("files_as_array.txt", JSON.stringify(threeDeepArray), function(err){
				if(err){ throw err }
			});	
		}
		fs.rename(file, "oldFiles/" + file, function(err){
			if (err) { throw err }
		});	
	});
}