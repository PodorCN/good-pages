(function () {
  var cats = window.CATEGORIES || [];
  var sites = window.SITES || [];
  var filters = document.getElementById("filters");
  var shelves = document.getElementById("shelves");

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function domain(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return url; }
  }

  function inCat(key) {
    return sites.filter(function (s) { return s.category === key; });
  }

  // Shelves
  cats.forEach(function (c) {
    var shelf = el("section", "shelf");
    shelf.id = c.key;
    shelf.dataset.cat = c.key;

    var head = el("div", "shelf-head");
    head.appendChild(el("h2", null, c.label));
    head.appendChild(el("p", null, c.note));
    shelf.appendChild(head);

    var items = inCat(c.key);
    if (!items.length) {
      shelf.appendChild(el("p", "empty", "Nothing here yet."));
    } else {
      var ul = el("ul", "list");
      items.forEach(function (s) {
        var li = el("li");
        var a = el("a", "site");
        a.href = s.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.appendChild(el("span", "site-name", s.name));
        a.appendChild(el("span", "site-domain", domain(s.url)));
        a.appendChild(el("p", "site-blurb", s.blurb));
        li.appendChild(a);
        ul.appendChild(li);
      });
      shelf.appendChild(ul);
    }
    shelves.appendChild(shelf);
  });

  // Filter buttons
  var options = [{ key: "all", label: "All", n: sites.length }].concat(
    cats.map(function (c) { return { key: c.key, label: c.label, n: inCat(c.key).length }; })
  );
  var buttons = options.map(function (o) {
    var b = el("button", null, o.label);
    b.type = "button";
    b.dataset.key = o.key;
    b.appendChild(el("span", "n", String(o.n)));
    b.addEventListener("click", function () {
      show(o.key);
      history.replaceState(null, "", o.key === "all" ? location.pathname : "#" + o.key);
    });
    filters.appendChild(b);
    return b;
  });

  function show(key) {
    buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.key === key)); });
    Array.prototype.forEach.call(shelves.children, function (s) {
      s.hidden = key !== "all" && s.dataset.cat !== key;
    });
  }

  var start = location.hash.slice(1);
  show(cats.some(function (c) { return c.key === start; }) ? start : "all");

  document.getElementById("count").textContent =
    sites.length + (sites.length === 1 ? " site" : " sites");
})();
