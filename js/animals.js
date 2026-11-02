/* =========================================================
   Tiny Paws – animal data + dynamic rendering, live search
   and category filters (adopt.html) and the home page's
   featured animals.
   ========================================================= */
var TINY_PAWS_ANIMALS = [
  { name: "Max", species: "Dog", age: "3 years", sex: "Male", image: "beagle-max", fee: 950,
    alt: "Max, a smiling beagle with a black collar",
    text: "A happy beagle who loves walks, belly rubs and playing fetch. Great with children.", traits: ["good with kids", "active"] },
  { name: "Luna", species: "Cat", age: "2 years", sex: "Female", image: "cat-luna", fee: 650,
    alt: "Luna, a black and white cat peeking out of a box",
    text: "A curious and gentle cat who enjoys quiet afternoons and exploring cardboard boxes.", traits: ["calm", "indoor"] },
  { name: "Biscuit", species: "Dog", age: "6 months", sex: "Male", image: "corgi-biscuit", fee: 1100,
    alt: "Biscuit, a corgi-mix puppy with big ears",
    text: "A playful puppy full of energy and cuddles. Looking for an active family.", traits: ["puppy", "active"] },
  { name: "Bella", species: "Dog", age: "4 years", sex: "Female", image: "collie-bella", fee: 950,
    alt: "Bella, a brown and white collie mix on a beach",
    text: "Loyal, clever and loves the outdoors. Would suit a home with a garden.", traits: ["garden", "clever"] },
  { name: "Tiger", species: "Cat", age: "5 years", sex: "Male", image: "tabby-tiger", fee: 650,
    alt: "Tiger, a tabby cat with bright green eyes",
    text: "A calm, affectionate cat who loves sunny windowsills and chin scratches.", traits: ["calm", "affectionate"] },
  { name: "Pip", species: "Kitten", age: "10 weeks", sex: "Female", image: "kitten-pip", fee: 750,
    alt: "Pip, a fluffy kitten reaching up with one paw",
    text: "A tiny ball of fluff who loves chasing toys. Litter-trained and ready to go.", traits: ["playful", "litter-trained"] },
  { name: "Bruno", species: "Dog", age: "6 years", sex: "Male", image: "bulldog-bruno", fee: 850,
    alt: "Bruno, a French bulldog wearing a yellow hoodie",
    text: "A laid-back gentleman who enjoys short walks and long naps on the couch.", traits: ["calm", "flat-friendly"] },
  { name: "Mia", species: "Cat", age: "1 year", sex: "Female", image: "cat-mia", fee: 650,
    alt: "Mia, a tabby cat sitting on white stairs",
    text: "Shy at first but very loving once she trusts you. Best in a quiet home.", traits: ["shy", "quiet home"] },
  { name: "Ginger", species: "Cat", age: "3 years", sex: "Male", image: "cat-ginger", fee: 650,
    alt: "Ginger, an orange cat lying on a table",
    text: "Friendly and chatty, gets along with other cats and gentle dogs.", traits: ["friendly", "good with pets"] }
];

(function () {
  "use strict";

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cardHTML(a, linkHref) {
    var sizes = "(min-width: 1024px) 380px, (min-width: 769px) 45vw, 100vw";
    var img = "images/" + a.image;
    return '<article class="animal-card">' +
      '<picture class="animal-image">' +
        '<source type="image/webp" srcset="' + img + '-400.webp 400w, ' + img + '-800.webp 800w" sizes="' + sizes + '">' +
        '<img src="' + img + '-400.jpg" srcset="' + img + '-400.jpg 400w, ' + img + '-800.jpg 800w" sizes="' + sizes + '" alt="' + escapeHTML(a.alt) + '" width="400" height="300" loading="lazy">' +
      '</picture>' +
      '<div class="animal-body">' +
        '<h3>' + escapeHTML(a.name) + '</h3>' +
        '<ul class="tag-list" aria-label="Details">' +
          '<li class="tag tag-blue">' + a.species + '</li><li class="tag">' + a.age + '</li><li class="tag">' + a.sex + '</li>' +
        '</ul>' +
        '<p>' + escapeHTML(a.text) + '</p>' +
        '<p class="animal-fee">Adoption fee: <strong>R' + a.fee + '</strong></p>' +
        '<a href="' + linkHref + '" class="btn btn-primary" data-animal="' + escapeHTML(a.name) + '">Enquire about ' + escapeHTML(a.name) + '</a>' +
      '</div></article>';
  }

  /* ---------- Home page: featured animals ---------- */
  var featured = document.getElementById("featured-animals");
  if (featured) {
    featured.innerHTML = TINY_PAWS_ANIMALS.slice(0, 3).map(function (a) { return cardHTML(a, "adopt.html#adoption-form"); }).join("");
  }

  /* ---------- Adopt page: list + search + filters ---------- */
  var list = document.getElementById("animal-list");
  if (!list) return;
  var search = document.getElementById("animal-search");
  var filterBtns = document.querySelectorAll(".filter-btn");
  var status = document.getElementById("animal-status");
  var activeFilter = "all";

  function render() {
    var q = search.value.trim().toLowerCase();
    var results = TINY_PAWS_ANIMALS.filter(function (a) {
      var matchesFilter = activeFilter === "all" || a.species.toLowerCase() === activeFilter;
      var haystack = [a.name, a.species, a.age, a.sex, a.text, a.traits.join(" ")].join(" ").toLowerCase();
      return matchesFilter && (q === "" || haystack.indexOf(q) !== -1);
    });
    if (results.length === 0) {
      list.innerHTML = '<div class="no-results" role="status"><p class="no-results-icon" aria-hidden="true">🐾</p>' +
        '<p><strong>No animals match “' + escapeHTML(search.value.trim()) + '”.</strong></p>' +
        '<p>Try another word such as “calm”, “puppy” or “cat”, or <button type="button" class="link-btn" id="reset-search">show all animals</button>.</p></div>';
      document.getElementById("reset-search").addEventListener("click", reset);
    } else {
      list.innerHTML = results.map(function (a) { return cardHTML(a, "#adoption-form"); }).join("");
    }
    status.textContent = results.length + (results.length === 1 ? " animal" : " animals") + " found";
  }

  function reset() {
    search.value = "";
    activeFilter = "all";
    filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.filter === "all" ? "true" : "false"); });
    render();
    search.focus();
  }

  search.addEventListener("input", render);
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeFilter = btn.dataset.filter;
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      render();
    });
  });

  // Clicking "Enquire about X" pre-selects that animal in the enquiry form
  list.addEventListener("click", function (e) {
    var link = e.target.closest("[data-animal]");
    if (!link) return;
    var select = document.getElementById("adopt-animal");
    if (!select) return;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].text.indexOf(link.dataset.animal + " ") === 0) { select.selectedIndex = i; select.dispatchEvent(new Event("change")); }
    }
  });

  render();
})();
