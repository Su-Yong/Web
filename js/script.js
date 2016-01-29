window.onload = function() {
	var userAgent = window.navigator.userAgent.toLowerCase();
	if ( /iphone/.test(userAgent) || /android/.test(userAgent) || /opera/.test(userAgent) || /bada/.test(userAgent) ) {
		window.location = "/m/index.html";
	}
	setInterval(function() {
		var date = new Date();

		var year = date.getFullYear();
		var day = date.getDate();
		var dayMax = 31;
		var month = date.getMonth();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		switch(month) {
			case 2:
				dayMax = 28;
			break;
			case 4: case 6: case 9: case 11:
				dayMax = 30;
			break;
		}

		if(year == 2017) {
			var timer = document.getElementById("timer");
			timer.firstChild.nodeValue = "Happy 2017!";
		} else {
			var timer = document.getElementById("timer");
			hour++;
			minute++;
			if(second == 0) {
				minute--;
				second = 60;
			}
			if(minute == 0) {
				hour--;
				minute = 60;
			}
			if(hour == 0) {
				day--;
				hour = 24;
			}

			timer.firstChild.nodeValue = (11 - month) + " Month  " + (dayMax - day) + " Days  " + (24 - hour) + " Hours  " + (60 - minute) + " Minutes  " + (60 - second) + " Seconds";
		}
	}, 500);
}

function downblue() {
	window.open("https://docs.google.com/uc?authuser=0&id=0BynSEqQ9CpItdXgxdmR3NXY2UGM&export=download");
}

function downMipmapCreater() {
	window.open("https://play.google.com/store/apps/details?id=com.afterglow.mipmapcreater");
}
