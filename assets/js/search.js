---
---
(function() {
  var searchTerm, searchButton, results, resultList, index;

  function highlightResult(str, search) {
    return str.replace(
      new RegExp(search, "gi"),
      (match) => `<mark>${match}</mark>`
    );
  }

  function search(query) {
    results = [];
    index = lunr(function() {
      this.ref("id");
      this.field("title", { boost: 10 });
      this.field("description", { boost: 5 });
      this.field("content");
      {% for post in site.posts %}
      this.add({
        id: {{ post.id }},
        title: {{ post.title | jsonify }},
        description: {{ post.description | jsonify }},
        content: {{ post.content | strip_html | jsonify }}
      });
      {% endfor %}
    });

    if (query !== "") {
      searchTerm = query;
      results = index.search(searchTerm).map(({ ref }) => parseInt(ref));
      showResults();
    } else {
      hideResults();
    }
  }

  function showResults() {
    resultList.innerHTML = "";
    results.forEach(function(result) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      var post = window.store[result];
      a.setAttribute("href", post.url);
      a.innerHTML = highlightResult(post.title, searchTerm);
      li.appendChild(a);
      resultList.appendChild(li);
    });
    resultsContainer.style.display = "block";
  }

  function 
