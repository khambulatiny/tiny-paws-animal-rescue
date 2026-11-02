/* =========================================================
   Tiny Paws – accessible gallery lightbox (about.html)
   Click/Enter opens, ←/→ navigate, Esc or click outside closes.
   ========================================================= */
(function () {
  "use strict";
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  if (!items.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Image viewer");
  box.hidden = true;
  box.innerHTML =
    '<button type="button" class="lightbox-btn lightbox-close" aria-label="Close image viewer">&times;</button>' +
    '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous image">&#8249;</button>' +
    '<figure class="lightbox-figure"><img class="lightbox-img" src="" alt=""><figcaption class="lightbox-caption"></figcaption></figure>' +
    '<button type="button" class="lightbox-btn lightbox-next" aria-label="Next image">&#8250;</button>';
  document.body.appendChild(box);

  var img = box.querySelector(".lightbox-img");
  var caption = box.querySelector(".lightbox-caption");
  var current = 0, lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var thumb = items[current].querySelector("img");
    var cap = items[current].querySelector("figcaption");
    img.src = thumb.getAttribute("src").replace("-400.", "-800.");
    img.alt = thumb.alt;
    caption.textContent = (cap ? cap.textContent : thumb.alt) + "  (" + (current + 1) + " of " + items.length + ")";
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.classList.add("lightbox-open");
    box.querySelector(".lightbox-close").focus();
  }
  function close() {
    box.hidden = true;
    document.body.classList.remove("lightbox-open");
    if (lastFocus) lastFocus.focus();
  }

  items.forEach(function (item, i) {
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "Enlarge image: " + item.querySelector("img").alt);
    item.addEventListener("click", function () { open(i); });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });

  box.querySelector(".lightbox-close").addEventListener("click", close);
  box.querySelector(".lightbox-prev").addEventListener("click", function () { show(current - 1); });
  box.querySelector(".lightbox-next").addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });

  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "Tab") {
      // keep focus inside the dialog
      var f = box.querySelectorAll("button"), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Swipe support on touch screens
  var startX = null;
  box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
