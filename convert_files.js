var fs = require("fs");
var readline = require('readline');

arrayFromFile("load_dept_names.txt");
arrayFromFile("load_dept_emp.txt");
arrayFromFile("load_employees.txt");
arrayFromFile("load_salaries.txt");

// var buildObj = {};
var threeDeepArray = [];
var fileCount = 0;
function arrayFromFile(file){
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
			console.log(threeDeepArray); 
// var keyName = file.split('.')[0];
// buildObj[keyName] = buildArray;
// fs.writeFile("new_" + file.split('.')[0] + ".txt", JSON.stringify(buildObj), function(err){
			fs.writeFile("three_dim_array.txt", JSON.stringify(threeDeepArray), function(err){
				if(err){ throw err }
			});	
		}
		fs.rename(file, "oldFiles/" + file, function(err){
			if (err) { throw err }
		});	
	});
}