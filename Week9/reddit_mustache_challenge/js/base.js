var last_response;

$(document).ready(function(){

  getLaughs();
  $("footer a").eq(0).click(previous)
  $("footer a").eq(1).click(loadMore)
  $("footer a").eq(2).click(next)

});

function getLaughs() {
  // Make Api Request
  $.get("http://www.reddit.com/r/funny.json")
  .success(function(response) {
    last_response = response;
    renderGallery(response);
  })
}

function renderGallery(response) {
  var gallery = $('#gallery');

  // for now, grab just the first response item
  // eventually we'll need to do this in a loop
  items = response.data.children
  for(var i = 0; i < items.length; i++) {
    item_data = items[i].data
    if(item_data.thumbnail == 'nsfw')
      item_data.thumbnail = 'http://www.imgbase.info/images/safe-wallpapers/animals/cat/37493_cat_kitten_orange_kitten.jpg'
    // now, let's build the raw html for our item
    var item_html = $("#post-prototype").html();
    item_html = Mustache.render(item_html, item_data);
    gallery.append(item_html);
  }
}

function loadMore() {
  $.get("http://www.reddit.com/r/funny.json?after=" + last_response.data.after)
  .success(function(response) {
    last_response = response;
    renderGallery(response);
  })
}
function next() {
  $('#gallery').html('');
  $.get("http://www.reddit.com/r/funny.json?after=" + last_response.data.after)
  .success(function(response) {
    last_response = response;
    renderGallery(response);
  })
}
function previous() {
  $('#gallery').html('');
  $.get("http://www.reddit.com/r/funny.json?before=" + last_response.data.before)
  .success(function(response) {
    last_response = response;
    renderGallery(response);
  })
}
