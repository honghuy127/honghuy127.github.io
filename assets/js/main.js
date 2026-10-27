/* Author profile links toggle on small screens */

document.addEventListener("DOMContentLoaded", function () {
  var wrapper = document.querySelector(".author__urls-wrapper");
  if (!wrapper) return;

  var toggle = wrapper.querySelector("button");
  if (!toggle) return;

  toggle.addEventListener("click", function () {
    wrapper.classList.toggle("open");
  });

  document.addEventListener("click", function (event) {
    if (!wrapper.contains(event.target)) {
      wrapper.classList.remove("open");
    }
  });
});

/* Keep older news available in pages of five without leaving the homepage. */
document.addEventListener("DOMContentLoaded", function () {
  var browser = document.querySelector("[data-news-browser]");
  if (!browser) return;

  var viewport = browser.querySelector(".news-browser__viewport");
  var items = browser.querySelectorAll(".news-timeline > li");
  var navigation = browser.querySelector(".news-pagination");
  var previous = browser.querySelector("[data-news-previous]");
  var next = browser.querySelector("[data-news-next]");
  var status = browser.querySelector("[data-news-status]");
  var pageSize = 5;
  var pageCount = Math.ceil(items.length / pageSize);
  var currentPage = 0;

  if (pageCount <= 1) return;

  function showPage(page) {
    var focused = document.activeElement;
    currentPage = Math.max(0, Math.min(page, pageCount - 1));
    var start = currentPage * pageSize;

    items.forEach(function (item, index) {
      item.hidden = index < start || index >= start + pageSize;
    });

    previous.disabled = currentPage === 0;
    next.disabled = currentPage === pageCount - 1;
    status.textContent = "Page " + (currentPage + 1) + " of " + pageCount;
    viewport.scrollTop = 0;

    if (focused === previous && previous.disabled) next.focus();
    if (focused === next && next.disabled) previous.focus();
  }

  previous.addEventListener("click", function () {
    showPage(currentPage - 1);
  });
  next.addEventListener("click", function () {
    showPage(currentPage + 1);
  });

  showPage(0);
  navigation.hidden = false;
});
