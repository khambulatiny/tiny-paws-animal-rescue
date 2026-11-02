/* =========================================================
   Tiny Paws – reusable real-time form validation
   Rules are read from each field's attributes:
   required, type="email", data-rule="sa-phone|future-date|name",
   minlength, min, max. Errors appear under the field on blur/input.
   ========================================================= */
var TinyPawsValidator = (function () {
  "use strict";
  var SA_PHONE = /^(?:\+27|0)[1-8]\d{8}$/;          // e.g. 082 123 4567 or +27 82 123 4567
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var NAME = /^[A-Za-zÀ-ÿ' -]{2,}$/;

  function labelText(field) {
    var label = document.querySelector('label[for="' + field.id + '"]');
    return label ? label.textContent.replace("*", "").trim() : "This field";
  }

  function check(field) {
    var v = field.type === "checkbox" ? field.checked : field.value.trim();
    var rule = field.dataset.rule;
    var name = labelText(field);

    if (field.required && (v === "" || v === false)) {
      if (field.type === "checkbox") return "Please tick this box to continue.";
      if (field.tagName === "SELECT") return "Please choose an option for " + name.toLowerCase() + ".";
      return "Please enter your " + name.toLowerCase() + ".";
    }
    if (v === "" || v === false) return "";

    if (rule === "name" && !NAME.test(v)) return "Please use letters only (at least 2).";
    if (field.type === "email" && !EMAIL.test(v)) return "Please enter a valid email address, e.g. name@example.com.";
    if (rule === "sa-phone" && !SA_PHONE.test(v.replace(/[\s()-]/g, "")))
      return "Please enter a valid South African number, e.g. 082 123 4567 or +27 82 123 4567.";
    if (rule === "future-date") {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var chosen = new Date(v + "T00:00:00");
      if (isNaN(chosen)) return "Please choose a valid date.";
      if (chosen < today) return "The date cannot be in the past.";
      if (chosen.getDay() === 0) return "We are closed on Sundays – please choose Monday to Saturday.";
    }
    if (field.type === "number") {
      var n = Number(v);
      if (!Number.isInteger(n)) return "Please enter a whole number.";
      if (field.min !== "" && n < Number(field.min)) return "Please enter at least " + field.min + ".";
      if (field.max !== "" && n > Number(field.max)) return "Please enter " + field.max + " or fewer.";
    }
    if (field.minLength > 0 && v.length < field.minLength)
      return "Please write at least " + field.minLength + " characters (" + v.length + " so far).";
    return "";
  }

  function show(field, msg) {
    var group = field.closest(".form-group") || field.parentNode;
    var err = group.querySelector(".field-error");
    if (!err) {
      err = document.createElement("p");
      err.className = "field-error";
      err.id = field.id + "-error";
      err.setAttribute("aria-live", "polite");
      group.appendChild(err);
      field.setAttribute("aria-describedby", ((field.getAttribute("aria-describedby") || "") + " " + err.id).trim());
    }
    err.textContent = msg;
    field.classList.toggle("is-invalid", !!msg);
    field.classList.toggle("is-valid", !msg && (field.type === "checkbox" ? field.checked : field.value.trim() !== ""));
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }

  function validateField(field) { return show(field, check(field)); }

  function attach(form) {
    form.noValidate = true;
    var fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(function (f) {
      if (f.type === "submit" || f.type === "hidden" || f.name === "_gotcha") return;
      f.addEventListener("blur", function () { f.dataset.touched = "1"; validateField(f); });
      f.addEventListener("input", function () { if (f.dataset.touched) validateField(f); });
      f.addEventListener("change", function () { f.dataset.touched = "1"; validateField(f); });
    });
  }

  function validateForm(form) {
    var ok = true, firstBad = null;
    form.querySelectorAll("input, select, textarea").forEach(function (f) {
      if (f.type === "submit" || f.type === "hidden" || f.name === "_gotcha") return;
      f.dataset.touched = "1";
      if (!validateField(f)) { ok = false; if (!firstBad) firstBad = f; }
    });
    if (firstBad) firstBad.focus();
    return ok;
  }

  function resetForm(form) {
    form.reset();
    form.querySelectorAll(".is-valid, .is-invalid").forEach(function (f) { f.classList.remove("is-valid", "is-invalid"); f.removeAttribute("aria-invalid"); });
    form.querySelectorAll(".field-error").forEach(function (e) { e.textContent = ""; });
    form.querySelectorAll("[data-touched]").forEach(function (f) { delete f.dataset.touched; });
  }

  return { attach: attach, validateForm: validateForm, resetForm: resetForm };
})();
