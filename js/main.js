/* =========================================================
   Tiny Paws Animal Rescue – site-wide interactivity
   Hamburger nav, back-to-top, sticky header, scroll reveal,
   animated stats counter, FAQ accordion (one open at a time).
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile navigation (enhances the CSS checkbox menu) ---------- */
  var navToggle = document.getElementById("nav-toggle");
  if (navToggle) {
    var navLabel = document.querySelector(".nav-toggle-label");
    var syncNav = function () {
      navToggle.setAttribute("aria-expanded", navToggle.checked ? "true" : "false");
      document.body.classList.toggle("nav-open", navToggle.checked);
    };
    navToggle.setAttribute("aria-controls", "main-nav");
    var nav = document.querySelector(".main-nav");
    if (nav) nav.id = "main-nav";
    navToggle.addEventListener("change", syncNav);
    // Close the menu after a link is chosen or when Esc is pressed
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () { navToggle.checked = false; syncNav(); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.checked) { navToggle.checked = false; syncNav(); navToggle.focus(); }
    });
    if (navLabel) navLabel.removeAttribute("aria-hidden");
    syncNav();
  }

  /* ---------- Sticky header shadow + back-to-top button ---------- */
  var header = document.querySelector(".site-header");
  var topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.className = "back-to-top";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(topBtn);
  topBtn.addEventListener("click", function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  var onScroll = function () {
    var y = window.scrollY;
    topBtn.classList.toggle("is-visible", y > 400);
    if (header) header.classList.toggle("is-scrolled", y > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal for cards ---------- */
  var revealEls = document.querySelectorAll(".feature-card, .testimonial-card, .stat, .section-header, .gallery-item");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); revealObs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { el.classList.add("reveal"); revealObs.observe(el); });
  }

  /* ---------- Animated stats counter (home page) ---------- */
  var stats = document.querySelectorAll(".stat-number");
  if (stats.length && "IntersectionObserver" in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var match = el.textContent.match(/^(\d+)(.*)$/);
        countObs.unobserve(el);
        if (!match) return;
        var target = parseInt(match[1], 10), suffix = match[2], start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1200, 1);
          el.textContent = Math.round(target * p) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (s) { countObs.observe(s); });
  }

  /* ---------- FAQ accordion: only one answer open at a time ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
