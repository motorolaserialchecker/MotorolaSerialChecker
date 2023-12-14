var correctInput = false;
var currentSerial = '';
var currentMonth = '';
var currentYear = '';

$(function(){
	function checkSerial() {
		correctInput = false;
		var serial = document.getElementById("serial").value.trim();
		//serial = serial.replaceAll(' ', '');
		// Convert to uppercase
		serial = serial.toUpperCase();

		// Extract year and month from the serial
		const year = serial.charAt(4);
		const month = serial.charAt(5);

		// Map year code to year
		const yearMap = {
			'A': '2000', 'B': '2001', 'C': '2002', 'D': '2003',
			'E': '2004', 'F': '2005', 'G': '2006', 'H': '2007',
			'J': '2008', 'K': '2009', 'L': '2010', 'M': '2011',
			'N': '2012', 'P': '2013', 'Q': '2014', 'R': '2015',
			'S': '2016', 'T': '2017', 'U': '2018', 'V': '2019',
			'W': '2020', 'X': '2021', 'Y': '2022', 'Z': '2023'
		};
		const yearX = yearMap[year] || '';

		// Map month code to month
		const monthMap = {
			'A': 'January', 'B': 'January', 'C': 'February', 'D': 'February',
			'E': 'March', 'F': 'March', 'G': 'April', 'H': 'April',
			'J': 'May', 'K': 'May', 'L': 'June', 'M': 'June', 'N': 'July',
			'P': 'July', 'Q': 'August', 'R': 'August', 'S': 'September',
			'T': 'September', 'U': 'October', 'V': 'October', 'W': 'November',
			'X': 'November', 'Y': 'December', 'Z': 'December'
		};
		const monthX = monthMap[month] || '';

		// Check if yearX or monthX is empty
		var text = '';
		if ((serial.slice(0, 3) != "134" && serial.slice(0, 3) != "550") || !yearX || !monthX) {
			text = 'Please enter a valid serial number.';
			if(serial.slice(0,3)!="134" && serial.slice(0, 3) != "550" ) {
				document.getElementById("example").textContent = "The first 3 characters should be 134(CLS) or 550(DLR) - Ex. 134AQK1234";
			}
			else {
				document.getElementById("example").textContent = "You've entered an invalid S/N. Incorrect Format.  - Ex. 134AQK1234";
			}
		} else {
			correctInput = true;
			text = `${serial} was manufactured in ${monthX} of ${yearX}!`;
		}
		if(correctInput){
			currentSerial = serial;
			currentMonth = monthX;
			currentYear = yearX;
		}
		else {
			currentSerial = '';
			currentMonth = '';
			currentYear = '';
		}
		document.getElementById("serial").value = serial;
		return text;
	}
	document.getElementById("serialForm").addEventListener('submit', function(event){
		event.preventDefault();
		
		document.getElementById("output").textContent = checkSerial();
		updateHistoryTable();
	});
	document.getElementById("serial").addEventListener('input', function(event){
		var result = checkSerial();
		
		document.getElementById("output").textContent = "";

		document.getElementById("serial").value = document.getElementById("serial").value.replaceAll(' ', '');
		if(correctInput){
			document.getElementById("savebutton").disabled = false;
			document.getElementById("example").textContent = "";
		}
		else {
			document.getElementById("savebutton").disabled = true;
		}
		
		
	});
	function updateHistoryTable(){
		var table = document.getElementById('radioHistoryTable');
		var serialExists = false;
		Array.from(table.rows).forEach(function(historicSerial, date){
			console.log(historicSerial.cells[0].innerText);
			if(currentSerial === historicSerial.cells[0].innerText){
				serialExists = true;
			}
		});
		if(!serialExists){
			var newRow = table.insertRow();
			
			var leftCell = newRow.insertCell(0);
			var rightCell = newRow.insertCell(1);
			 
			leftCell.innerHTML = "<div>" + currentSerial + "</div>" ;
			rightCell.innerHTML = "<div>" + `${currentMonth} of ${currentYear}` + "</div>";
		}
	}
});

