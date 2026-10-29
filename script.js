(function () {
  var cats = window.CATEGORIES || [];
  var sites = window.SITES || [];
  var list = document.getElementById("list");

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function domain(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return url; }
  }

  // One section per category; empty categories are skipped.
  cats.forEach(function (c) {
    var items = sites.filter(function (s) { return s.category === c.key; });
    if (!items.length) return;

    var sec = el("section", "group");
    sec.appendChild(el("h2", null, c.label));
    var ul = el("ul");
    items.forEach(function (s) {
      var a = el("a", "item");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.appendChild(el("span", "name", s.name));
      a.appendChild(el("span", "domain", domain(s.url)));
      a.appendChild(el("p", "blurb", s.blurb));
      var li = el("li");
      li.appendChild(a);
      ul.appendChild(li);
    });
    sec.appendChild(ul);
    list.appendChild(sec);
  });

  document.getElementById("count").textContent =
    sites.length + (sites.length === 1 ? " site" : " sites");
})();
