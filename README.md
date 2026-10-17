# Good Pages

A short list of websites worth keeping, served at <https://podor.org/good-pages/>.

## Add a site

Edit `sites.js` and add an entry to `SITES`:

```js
{
  name: "Site Name",
  url: "https://example.com/",
  category: "knowledge",   // knowledge | simulation | news
  blurb: "One sentence on what it is and why it's worth a visit.",
  added: "YYYY-MM-DD"
}
```

To add a category, add it to `CATEGORIES` in the same file.

Plain HTML/CSS/JS, no build step.
