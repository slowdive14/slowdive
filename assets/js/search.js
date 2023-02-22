---
layout: null
---

(function() {
  var searchTerm, index, results;

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }

  function search() {
    searchTerm = getQueryVariable('query');
    if (!searchTerm) {
      return;
    }
    index = lunr(function() {
      this.field('title');
      this.field('content');
      this.ref('id');
      {% assign count = 0 %}
      {% for post in site.posts %}
        {% assign count = count | plus: 1 %}
        this.add({
          title: {{ post.title | jsonify }},
          content: {{ post.content | strip_html | jsonify }},
          id: {{ count }}
        });
      {% endfor %}
    });
    results = index.search(searchTerm);
    displayResults();
  }

  function displayResults() {
    var $results = $('#results-container');
    if (results.length) {
      $results.empty();
      results.forEach(function(result) {
        var item = '<li><a href="' + '{{ site.baseurl }}' + '/' + '{{ site.posts[result.ref].url }}' + '">' + '{{ site.posts[result.ref].title }}' + '</a></li>';
        $results.append(item);
      });
    } else {
      $results.html('<li>No results found</li>');
    }
  }

  search();
})();
