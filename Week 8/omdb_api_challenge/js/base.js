const omdbRequest_endpoint = "http://www.omdbapi.com/?";

$(document).ready(function(){
  console.log("Oooh yeah! Let's get coding!")
  $("button#search-by-title-button").click(pressSearchByTitleButton);



});

function pressSearchByTitleButton(event) {
	var request_url = loadRequestURL();

	$("#search-by-title-request pre").text(request_url);
	$.get(request_url)
		.success(outputResponse)
		.fail(outputError);
	$("#search-by-title-response pre").html("<img src='http://www.ajaxload.info/images/exemples/30.gif' alt='loading...' />");
}

function loadRequestURL() {

	return omdbRequest_endpoint + $('form#search-by-title-form').serialize();
}

function outputResponse(response) {
	var responseObject = jQuery.parseJSON(response);
	var isResponseSuccess = (responseObject["Response"] === 'True');

	if (responseObject.length) {
		$("#search-by-title-response pre").html(
			"<tr>
    			<td>Jill</td>
    			<td>Smith</td>
  			</tr>");

		var responseObjectKey = Object.keys(responseObject);


		for (var i = 0; i < responseObjectKey.length; i++) {
			var key = responseObjectKey[i];
			$("#search-by-title-response pre").html("");
		}

	} else {
		$("#search-by-title-response pre").text("Response Object Empty!");
	}

	if (isResponseSuccess) {
		var responseObjectKey = Object.keys(responseObject);

		$("#search-by-title-response pre").html("");

		if (true) {};

		for (var i = 0; i < responseObjectKey.length; i++) {
			var key = responseObjectKey[i];

		}
		$("#search-by-title-response pre").text(response);
	} else {
		var error = responseObject["Error"];
		$("#search-by-title-response pre").text(error);
	}

	
}

function outputError(response) {
	$("#search-by-title-response pre").text("Error!");
}