/* =========================================================
   Tiny Paws – form processing
   1. Adoption enquiry: validates, then calculates an estimated
      cost + visit availability and shows a summary.
   2. Contact form: validates, then sends an email via Formspree
      (fetch/AJAX) with loading, success and error states.
   3. Volunteer form: validates and confirms registration.
   ========================================================= */
(function () {
  "use strict";
  if (typeof TinyPawsValidator === "undefined") return;
  var V = TinyPawsValidator;

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function showResult(box, type, html) {
    box.className = "form-result form-result-" + type;
    box.innerHTML = html;
    box.hidden = false;
    box.focus();
  }
  function rand(n) { return "R" + n.toLocaleString("en-ZA"); }

  /* ---------- Date input: block past dates in the picker ---------- */
  document.querySelectorAll('input[data-rule="future-date"]').forEach(function (d) {
    var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    d.min = t.toISOString().slice(0, 10);
  });

  /* ---------- 1. Adoption enquiry ---------- */
  var enquiry = document.getElementById("enquiry-form");
  if (enquiry) {
    V.attach(enquiry);
    var FEES = { Dog: 950, Puppy: 1100, Cat: 650, Kitten: 750 };
    enquiry.addEventListener("submit", function (e) {
      e.preventDefault();
      var result = document.getElementById("enquiry-result");
      if (!V.validateForm(enquiry)) {
        showResult(result, "error", "<p><strong>Please fix the highlighted fields</strong> and try again.</p>");
        result.focus(); enquiry.querySelector(".is-invalid").focus();
        return;
      }
      var d = new FormData(enquiry);
      var type = d.get("enquiry-type"), animal = d.get("animal"), home = d.get("home-type");
      var people = parseInt(d.get("household"), 10);
      var date = new Date(d.get("visit-date") + "T00:00:00");

      // Look up the animal's fee from the shared animal data when available
      var animalName = animal === "any" ? null : animal.split(" (")[0];
      var record = (window.TINY_PAWS_ANIMALS || []).filter(function (a) { return a.name === animalName; })[0];
      var species = animal === "any" ? "Dog" : animal.replace(/.*\((.*)\)/, "$1");
      var fee = record ? record.fee : FEES[species] || 950;

      var lines = [], total = 0;
      if (type === "adopt") {
        lines.push(["Adoption fee (vaccinations, sterilisation, microchip)", fee]); total += fee;
        lines.push(["Home check visit", 150]); total += 150;
        lines.push(["Starter pack (food, bowl, collar) – optional", 250]); total += 250;
      } else if (type === "foster") {
        lines.push(["Fostering – food and vet care supplied by Tiny Paws", 0]);
      } else if (type === "sponsor") {
        lines.push(["Monthly sponsorship (food + care)", 300]); total += 300;
      } else {
        lines.push(["Meet-and-greet visit", 0]);
      }

      // Availability: Saturdays are busiest, Sundays closed (already blocked by validation)
      var weekday = date.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      var slots = date.getDay() === 6 ? "09:00, 10:30 or 12:00 (Saturdays close at 14:00 – book early)" : "09:00, 11:00, 13:00 or 15:00";
      var tips = [];
      if (people >= 5) tips.push("With " + people + " people at home, a calm, sociable animal such as Bruno or Ginger may settle fastest.");
      if (home === "flat" && species === "Dog" && animalName && animalName !== "Bruno")
        tips.push("Note: " + animalName + " is an active dog. Please check that your building allows pets and has nearby walking space.");
      if (animal === "any") tips.push("Not sure yet? Our team will suggest matches for your home when we call you.");

      var typeLabel = enquiry.querySelector('#adopt-enquiry-type option[value="' + type + '"]').textContent;
      var html = '<h3>Thank you, ' + esc(d.get("name").split(" ")[0]) + '! 🐾</h3>' +
        '<p>We have received your <strong>' + esc(typeLabel.toLowerCase()) + '</strong> enquiry' +
        (animalName ? ' for <strong>' + esc(animalName) + '</strong>' : '') + '. We will confirm by email at <strong>' + esc(d.get("email")) +
        '</strong> or phone <strong>' + esc(d.get("phone")) + '</strong> within 2 working days.</p>' +
        '<h4>Your visit</h4><p>' + esc(weekday) + ' – available times: ' + slots + '.</p>' +
        '<h4>Estimated cost</h4><table class="estimate-table"><tbody>' +
        lines.map(function (l) { return '<tr><td>' + l[0] + '</td><td>' + (l[1] ? rand(l[1]) : "Free") + '</td></tr>'; }).join("") +
        '</tbody><tfoot><tr><th scope="row">Estimated total' + (type === "sponsor" ? " per month" : "") + '</th><td>' + (total ? rand(total) : "Free") + '</td></tr></tfoot></table>' +
        (tips.length ? '<ul class="result-tips">' + tips.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "");
      V.resetForm(enquiry);
      showResult(result, "success", html);
    });
  }

  /* ---------- 2. Contact form – real email via Formspree ---------- */
  var contact = document.getElementById("contact-form");
  if (contact) {
    V.attach(contact);
    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      var result = document.getElementById("contact-result");
      if (!V.validateForm(contact)) {
        showResult(result, "error", "<p><strong>Please fix the highlighted fields</strong> before sending.</p>");
        contact.querySelector(".is-invalid").focus();
        return;
      }
      var btn = contact.querySelector('button[type="submit"]');
      var name = contact.elements.name.value.trim().split(" ")[0];
      var subject = contact.elements.subject.value;
      btn.disabled = true; btn.classList.add("is-loading");
      btn.querySelector(".btn-label").textContent = "Sending…";
      result.hidden = true;

      var data = new FormData(contact);
      data.append("_subject", "Website enquiry: " + subject);

      fetch(contact.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("Server responded " + res.status);
          V.resetForm(contact);
          showResult(result, "success", "<h3>Message sent! ✉️</h3><p>Thanks " + esc(name) + ", your message about <strong>" + esc(subject.toLowerCase()) +
            "</strong> has been emailed to our team. We usually reply within 1 working day.</p>");
        })
        .catch(function () {
          showResult(result, "error", "<h3>Sorry, your message could not be sent.</h3><p>Please check your internet connection and try again, or email us directly at " +
            '<a href="mailto:info@tinypawsrescue.co.za">info@tinypawsrescue.co.za</a>. Your message has not been lost – it is still in the form.</p>');
        })
        .finally(function () {
          btn.disabled = false; btn.classList.remove("is-loading");
          btn.querySelector(".btn-label").textContent = "Send message";
        });
    });
  }

  /* ---------- 3. Volunteer registration ---------- */
  var vol = document.getElementById("volunteer-form");
  if (vol) {
    V.attach(vol);
    vol.addEventListener("submit", function (e) {
      e.preventDefault();
      var result = document.getElementById("volunteer-result");
      if (!V.validateForm(vol)) {
        showResult(result, "error", "<p><strong>Please fix the highlighted fields</strong> and try again.</p>");
        vol.querySelector(".is-invalid").focus();
        return;
      }
      var interests = Array.prototype.map.call(vol.querySelectorAll('input[name="interest"]:checked'), function (c) { return c.parentNode.textContent.trim(); });
      var name = vol.elements.name.value.trim().split(" ")[0];
      var when = vol.elements.availability.value;
      V.resetForm(vol);
      showResult(result, "success", "<h3>Welcome to the team, " + esc(name) + "! 🤝</h3><p>You are registered for <strong>" + esc(when.toLowerCase()) + "</strong>" +
        (interests.length ? " to help with <strong>" + esc(interests.join(", ").toLowerCase()) + "</strong>" : "") +
        ". Our volunteer coordinator will contact you to book a 1-hour orientation.</p>");
    });
  }
})();
