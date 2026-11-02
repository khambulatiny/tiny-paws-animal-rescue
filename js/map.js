/* =========================================================
   Tiny Paws – interactive Leaflet + OpenStreetMap map (contact.html)
   Edit the data-lat / data-lng attributes on #rescue-map to move the marker.
   ========================================================= */
(function () {
  "use strict";
  var el = document.getElementById("rescue-map");
  if (!el) return;
  if (typeof L === "undefined") {
    el.innerHTML = '<p class="map-fallback">The map could not load. Our address is 24 Market Street, Eendraught.</p>';
    return;
  }
  var lat = parseFloat(el.dataset.lat), lng = parseFloat(el.dataset.lng);
  var map = L.map(el, { scrollWheelZoom: false }).setView([lat, lng], 16);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var icon = L.divIcon({ className: "map-pin", html: '<span aria-hidden="true">🐾</span>', iconSize: [44, 44], iconAnchor: [22, 44], popupAnchor: [0, -40] });
  var directions = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng;
  L.marker([lat, lng], { icon: icon, title: "Tiny Paws Animal Rescue", alt: "Tiny Paws Animal Rescue location" })
    .addTo(map)
    .bindPopup('<strong>Tiny Paws Animal Rescue</strong><br>24 Market Street, Eendraught<br>' +
      '<a href="' + directions + '" target="_blank" rel="noopener">Get directions ↗</a>')
    .openPopup();

  // Enable scroll-zoom only after the user clicks the map (stops page-scroll hijacking)
  map.on("click focus", function () { map.scrollWheelZoom.enable(); });
  map.on("mouseout blur", function () { map.scrollWheelZoom.disable(); });
  window.addEventListener("resize", function () { map.invalidateSize(); });
})();
