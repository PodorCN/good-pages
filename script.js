(function () {
  var cats = window.CATEGORIES || [];
  var sites = window.SITES || [];
  var tabs = document.getElementById("tabs");
  var panel = document.getElementById("panel");
  var address = document.getElementById("address");

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

  // Favicon with a letter fallback if it fails to load.
  function icon(site) {
    var box = el("span", "icon", site.name.charAt(0).toUpperCase());
    var img = new Image();
    img.alt = "";
    img.onload = function () { if (img.naturalWidth > 1) { box.textContent = ""; box.appendChild(img); } };
    img.src = "https://www.google.com/s2/favicons?sz=64&domain=" + encodeURIComponent(domain(site.url));
    return box;
  }

  // One group per category inside the window.
  cats.forEach(function (c) {
    var g = el("section", "group");
    g.dataset.cat = c.key;
    g.style.setProperty("--c", "var(--" + c.key + ")");
    g.appendChild(el("h2", "group-label", c.label));

    var items = inCat(c.key);
    if (!items.length) {
      g.appendChild(el("p", "empty", "No tabs open here yet."));
    } else {
      var ul = el("ul", "rows");
      items.forEach(function (s) {
        var li = el("li");
        var a = el("a", "row");
        a.href = s.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.appendChild(icon(s));
        a.appendChild(el("span", "name", s.name));
        a.appendChild(el("span", "domain", domain(s.url) + " ↗"));
        a.appendChild(el("p", "blurb", s.blurb));
        li.appendChild(a);
        ul.appendChild(li);
      });
      g.appendChild(ul);
    }
    panel.appendChild(g);
  });

  // Tabs
  var options = [{ key: "all", label: "All", n: sites.length }].concat(
    cats.map(function (c) { return { key: c.key, label: c.label, n: inCat(c.key).length }; })
  );
  var buttons = options.map(function (o) {
    var b = el("button", "tab");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.dataset.key = o.key;
    if (o.key !== "all") {
      b.style.setProperty("--c", "var(--" + o.key + ")");
      b.appendChild(el("span", "dot"));
    }
    b.appendChild(document.createTextNode(o.label));
    b.appendChild(el("span", "n", String(o.n)));
    b.addEventListener("click", function () {
      show(o.key);
      history.replaceState(null, "", o.key === "all" ? location.pathname : "#" + o.key);
    });
    tabs.appendChild(b);
    return b;
  });

  function show(key) {
    buttons.forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.key === key)); });
    Array.prototype.forEach.call(panel.children, function (g) {
      g.hidden = key !== "all" && g.dataset.cat !== key;
    });
    address.textContent = "podor.org/good-pages/" + (key === "all" ? "" : "#" + key);
  }

  var start = location.hash.slice(1);
  show(cats.some(function (c) { return c.key === start; }) ? start : "all");

  document.getElementById("count").textContent =
    sites.length + (sites.length === 1 ? " tab open" : " tabs open");
})();
