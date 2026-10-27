/* Mobile navigation toggle */
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
});

/* Light/dark theme toggle; the saved choice is applied early in head.html. */
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  var root = document.documentElement;
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function isDark() {
    return root.dataset.theme ? root.dataset.theme === "dark" : systemDark.matches;
  }

  function sync() {
    var dark = isDark();
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  toggle.addEventListener("click", function () {
    var theme = isDark() ? "light" : "dark";
    root.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {}
    sync();
  });

  if (systemDark.addEventListener) systemDark.addEventListener("change", sync);
  sync();
});

/* Email: the address is stored reversed and base64-encoded, and decoded only when a
   visitor clicks, so it never appears in the HTML or in a rendered-but-untouched page. */
function decodeEmail(encoded) {
  return atob(encoded).split("").reverse().join("");
}

document.addEventListener("click", function (event) {
  var link = event.target.closest("a[data-email]");
  if (!link) return;
  event.preventDefault();
  window.location.href = "mailto:" + decodeEmail(link.dataset.email);
});

/* Homepage news: show the latest five, expand the rest in place. */
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector("[data-news-toggle]");
  if (!toggle) return;

  var older = document.querySelectorAll("[data-news-older]");
  var label = toggle.querySelector("[data-news-toggle-label]");
  var collapsedText = label.textContent;

  function setExpanded(expanded) {
    older.forEach(function (item) { item.hidden = !expanded; });
    toggle.setAttribute("aria-expanded", String(expanded));
    label.textContent = expanded ? "Show fewer" : collapsedText;
  }

  toggle.addEventListener("click", function () {
    setExpanded(toggle.getAttribute("aria-expanded") !== "true");
  });

  setExpanded(false);
  toggle.hidden = false;
});

/* Contact: copy the email address on request. */
document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector("[data-copy-email]");
  if (!button || !navigator.clipboard) return;

  var label = button.querySelector("span");
  var original = label.textContent;
  button.hidden = false;
  button.addEventListener("click", function () {
    navigator.clipboard.writeText(decodeEmail(button.dataset.copyEmail)).then(function () {
      label.textContent = "Copied";
      setTimeout(function () { label.textContent = original; }, 1500);
    });
  });
});

/* Publications: type/topic filters and search, kept in the URL (?type=…&topic=…&q=…). */
document.addEventListener("DOMContentLoaded", function () {
  var tools = document.querySelector("[data-pub-tools]");
  if (!tools) return;

  var pubs = Array.prototype.slice.call(document.querySelectorAll(".pub"));
  var years = document.querySelectorAll(".pub-year");
  var search = tools.querySelector("[data-pub-search]");
  var count = tools.querySelector("[data-pub-count]");
  var empty = document.querySelector("[data-pub-empty]");
  var chips = tools.querySelectorAll("[data-filter]");
  var legacyTypes = { "journal-papers": "journal", "conference-papers": "conference", "book-chapters": "chapter", "others": "other" };
  var params = new URLSearchParams(window.location.search);
  var state = { type: params.get("type") || "all", topic: params.get("topic") || "all", q: params.get("q") || "" };
  var hash = window.location.hash.slice(1);

  if (legacyTypes[hash]) state.type = legacyTypes[hash];

  pubs.forEach(function (pub) {
    pub.searchText = Array.prototype.map.call(
      pub.querySelectorAll(".pub__badges, .pub__title, .pub__authors, .pub__venue"),
      function (part) { return part.textContent; }
    ).join(" ").toLowerCase();
  });

  function matches(pub) {
    if (state.type === "selected" && !pub.hasAttribute("data-selected")) return false;
    if (state.type !== "all" && state.type !== "selected" && pub.dataset.type !== state.type) return false;
    if (state.topic !== "all" && (" " + pub.dataset.topics + " ").indexOf(" " + state.topic + " ") === -1) return false;
    var terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    return terms.every(function (term) { return pub.searchText.indexOf(term) !== -1; });
  }

  function apply() {
    var shown = 0;
    pubs.forEach(function (pub) {
      var visible = matches(pub);
      pub.hidden = !visible;
      if (visible) shown += 1;
    });
    years.forEach(function (year) {
      var visible = year.querySelector(".pub:not([hidden])") !== null;
      year.hidden = !visible;
      var link = document.querySelector('.year-nav a[href="#' + year.id + '"]');
      if (link) link.parentNode.hidden = !visible;
    });
    chips.forEach(function (chip) {
      chip.setAttribute("aria-pressed", String(state[chip.dataset.filter] === chip.dataset.value));
    });
    count.textContent = shown === pubs.length ? "Showing all " + shown + " publications" : "Showing " + shown + " of " + pubs.length + " publications";
    empty.hidden = shown !== 0;

    var query = new URLSearchParams();
    if (state.type !== "all") query.set("type", state.type);
    if (state.topic !== "all") query.set("topic", state.topic);
    if (state.q) query.set("q", state.q);
    var url = window.location.pathname + (query.toString() ? "?" + query : "") + (legacyTypes[hash] ? "" : window.location.hash);
    window.history.replaceState(null, "", url);
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      state[chip.dataset.filter] = chip.dataset.value;
      apply();
    });
  });

  search.value = state.q;
  search.addEventListener("input", function () {
    state.q = search.value.trim();
    apply();
  });

  document.querySelector("[data-pub-reset]").addEventListener("click", function () {
    state = { type: "all", topic: "all", q: "" };
    search.value = "";
    apply();
  });

  // A link to one paper must show it, even if filters from the URL would hide it.
  var target = hash && document.getElementById(hash);
  if (target && target.classList.contains("pub") && !matches(target)) {
    state = { type: "all", topic: "all", q: "" };
  }

  tools.hidden = false;
  apply();
  if (target) target.scrollIntoView();
});

/* Publications: BibTeX panels and copy buttons */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-cite]").forEach(function (button) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    button.hidden = false;
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
    });
  });

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    var label = button.querySelector("span");
    var original = label.textContent;
    button.addEventListener("click", function () {
      var text = button.parentNode.querySelector("pre").textContent;
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(function () {
        label.textContent = "Copied";
        setTimeout(function () { label.textContent = original; }, 1500);
      });
    });
  });
});
