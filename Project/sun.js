
//Ready
$(document).ready(function() {
	// Put your code in here!

	updateTime();
	getLocation();
});

function updateTime() {
	var time = new Date().getTime();
	time = Math.round(time / 1000);
	var dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	$("#date_section #day_of_week").text(dayArray[moment.unix(time).format("E")-1]);
	$("#date_section #date").text(moment.unix(time).format("MMMM DD, YYYY"));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
    	var item_html = $("#error-prototype").html();
    	var item_data = { "errorTitle": "Sorry", "errorText": "Sorry, Geolocation is not supported by this browser."}
    	var innerHTML = Mustache.render(item_html, item_data);
    	$("#content").html(innerHTML);
    }
}

function showPosition(position) {

    var innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	

    $("#content").html("<h4>"+innerHTML+"<h4>");
}