var response;
var after;
var before;

$(document).ready(function(){

  getLaughs();

  $("a#nextBtn").click(pressNextBtn);
  $("a#prevBtn").click(pressPrevBtn);
  $("a#loadMoreBtn").click(pressLoadMoreBtn);

});

function getLaughs() {
  // Make Api Request
  $.get("http://www.reddit.com/r/funny.json")
    .success(renderGallery);

  $('#gallery').html("<img id='loading' src='http://www.ajaxload.info/images/exemples/30.gif' alt='loading...' />");
}

function renderGallery(response) {
  var gallery = $('#gallery');
  $("#loading").remove();

  // for now, grab just the first response item
  // eventually we'll need to do this in a loop

  var items = response["data"]["children"];
  after = response["data"]["after"];
  before = response["data"]["before"]

  for (var i = 0; i < items.length; i++) {
    var item_data = items[i]["data"];

    // let's see what we've got
    console.log("here's the first item in the reddit api response object:",
                item_data);

    // now, let's build the raw html for our item
    var item_html = (
                      "<div class='item'>" +
                        "<img src='" + item_data["thumbnail"] + "' />" +
                        "<p>" + item_data["title"] + "</p>" +
                      "</div>"
                    );

    // and add it to the DOM!
    gallery.append(item_html);
  } 
}

function pressNextBtn() {
  $.get("http://www.reddit.com/r/funny.json"+"?count=25&after="+after)
    .success(renderGallery);

  $('#gallery').html("<img id='loading' src='http://www.ajaxload.info/images/exemples/30.gif' alt='loading...' />");
}

function pressPrevBtn() {
  $.get("http://www.reddit.com/r/funny.json"+"?count=25&before="+before)
    .success(renderGallery);

  $('#gallery').html("<img id='loading' src='http://www.ajaxload.info/images/exemples/30.gif' alt='loading...' />");
}

function pressLoadMoreBtn() {
  var localBefore = before;
  $.get("http://www.reddit.com/r/funny.json"+"?count=25&after="+after)
    .success(renderGallery)
    .always(function () { before = localBefore; });
  $('#gallery').append("<img id='loading' src='http://www.ajaxload.info/images/exemples/30.gif' alt='loading...' />");
  return false;
}