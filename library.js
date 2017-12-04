function ClassFlag(cols, rows){
	var self = this;
	self.cols = cols;
	self.rows = rows;
	self.dfd = new $.Deferred();
	self.promise = self.dfd.promise();
	
	var vThird = function vThird(c, section){
		var x = section * 6;
		var xMax = x + 6;
		var y = 0;
		
		
		for(x; x < xMax; x++){
			for(y=0; y < 9; y++){
				colorPoint(x,y,c);
			}
		}
	}

	var grid = function grid(cols, rows){
		var tableString = "<table><tr><th></th>";
		
		for(var i = 0; i < cols; i++){
			tableString += "<th>" + i + "</th>"
		}
		tableString += "</tr>";
		
		for(var r = 0; r < rows; r++){
			tableString = tableString + "<tr class='gridrow'>";
			tableString += "<th>" + r + "</th>";
			for(var c = 0; c < cols; c++){
				tableString += "<td></td>";
			}
			tableString += "</tr>";
		}
		
		
		tableString = tableString + "</table>";
		
		$(function(){
			$("body").html(tableString);
			self.dfd.resolve();
		});
	}

	var colorPoint = function color (x, y, color){
		var row = $("tr.gridrow")[y];
		var col = $(row).find("td")[x];
		
		
		$(col).css('background-color', color);
	}

	var colorRow = function(index, color){
		var y = index;
		var x = 0;
		
		for(x; x < self.cols; x++){
			colorPoint(x,y,color);
		}
	}
	
	var colorColumn = function(index, color){
		var x = index;
		var y = 0;
		
		for(y; y < self.rows; y++){
			colorPoint(x,y,color);
		}
	}
	
	grid(self.cols, self.rows);
	
	return {
		width: self.cols,
		length: self.rows,
		colorPoint: colorPoint,
		colorRow: colorRow,
		colorColumn: colorColumn,
		promise: self.promise
	};
}


var flag = new ClassFlag(18, 9);

$.when(flag.promise).done(function(){
	colorFlag(flag);
});

