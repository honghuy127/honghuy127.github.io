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
