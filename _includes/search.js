window.onload = function() {
  var searchTerm = getQueryVariable('query');
  if (searchTerm) {
    document.getElementById('search-box').setAttribute('value', searchTerm);
    search(searchTerm);
  }
}

function search(query) {
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      var results = [];
      data.forEach(item => {
        var title = item.title;
        var excerpt = item.excerpt;
        var url = item.url;
        if (title.toLowerCase().indexOf(query.toLowerCase()) != -1 ||
            excerpt.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          results.push('<li><a href="' + url + '">' + title + '</a></li>');
        }
      });
      if (results.length > 0) {
        document.getElementById('search-results').innerHTML = results.join('');
      } else {
        document.getElementById('search-results').innerHTML = '<li>No results found</li>';
      }
    });
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return false;
}
