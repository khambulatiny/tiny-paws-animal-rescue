# Tiny Paws Animal Rescue – Website

A responsive website for **Tiny Paws Animal Rescue** (24 Market Street, Eendraught). It is built with **HTML5 and CSS3 only** and has no JavaScript. The proposed domain is `www.tinypawsrescue.co.za`.

## 1. File structure

```
Gugu_Khambula_Part2/
├── index.html          Home: hero, how to help, featured animals, stats, success stories
├── about.html          About Us: history, mission & vision, what we do, gallery
├── adopt.html          Adopt: animal profiles, adoption process, adoption enquiry form
├── get-involved.html   Get Involved: donations (#donate) and volunteer registration (#volunteer)
├── contact.html        Contact Us: contact details, opening hours, contact form, FAQ (#faq)
├── css/
│   └── style.css       One external stylesheet shared by every page
├── images/             Photos in 400px and 800px widths, in .jpg and .webp
└── README.md
```

To view the site, open `index.html` in any modern browser.

## 2. Linking the stylesheet

Every page has this line inside `<head>`:

```html
<link rel="stylesheet" href="css/style.css">
```

The Poppins font comes from Google Fonts and is loaded before the stylesheet:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## 3. Example HTML structure (homepage)

This shows how the classes are applied. All class names use kebab-case.

```html
<a class="skip-link" href="#main-content">Skip to main content</a>

<header class="site-header">
  <div class="container nav-bar">
    <a href="index.html" class="logo">…</a>
    <input type="checkbox" id="nav-toggle" class="nav-toggle">        <!-- hamburger state -->
    <label for="nav-toggle" class="nav-toggle-label">…3 × .hamburger-line…</label>
    <nav class="main-nav" aria-label="Main navigation">
      <ul class="nav-list">
        <li><a href="index.html" class="nav-link" aria-current="page">Home</a></li>
        …
      </ul>
    </nav>
  </div>
</header>

<main id="main-content">
  <section class="hero-section">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">…</h1>
        <p class="hero-text">…</p>
        <div class="btn-group">
          <a class="btn btn-primary btn-pulse">Adopt an Animal</a>
          <a class="btn btn-light">Donate</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header"><h5>…</h5><h2>…</h2><p>…</p></div>
      <div class="card-grid">
        <article class="animal-card">
          <picture class="animal-image">
            <source type="image/webp" srcset="images/beagle-max-400.webp 400w, images/beagle-max-800.webp 800w" sizes="…">
            <img src="images/beagle-max-400.jpg" srcset="… 400w, … 800w" sizes="…" alt="…" width="400" height="300" loading="lazy">
          </picture>
          <div class="animal-body">
            <h3>Max</h3>
            <ul class="tag-list"><li class="tag tag-blue">Dog</li>…</ul>
            <p>…</p>
            <a class="btn btn-primary">Adopt Max</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section-alt">… .testimonial-card …</section>
  <section class="section"><div class="container"><div class="cta-banner">…</div></div></section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">…</div>
    <div class="footer-bottom">…</div>
  </div>
</footer>
```

## 4. Key CSS decisions

| Decision | Why |
|---|---|
| **Colour palette from the proposal**: light blue `#5AA9E6`, white, soft green `#7CC6A4` | Blue feels calm and trustworthy, green stands for care and nature, and white keeps pages clean. Text and buttons use darker shades (`#1C5A85` blue and `#25694A` green) so that contrast is at least 4.5:1, which meets WCAG AA. |
| **Poppins throughout, with an Arial fallback** | The proposal says the same font should be used everywhere. Headings are bold and larger. `h5` is styled as an uppercase "eyebrow" subheading. |
| **Custom properties in `:root`** | Colours, fonts, spacing (xs 0.5rem to xl 6rem), border radius, shadows and transitions are each defined once, so the whole theme can be changed in one place. |
| **Mobile-first** | The base styles are written for a 320px phone. Wider layouts are added with `min-width` queries at 481px, 769px, 1024px and 1440px. |
| **`clamp()` for type and spacing** | Headings and section padding scale smoothly between phone and desktop sizes, so fewer breakpoints are needed. |
| **`repeat(auto-fit, minmax(min(300px, 100%), 1fr))`** | Card grids reflow from 1 to 3 columns without media queries. The `min()` stops cards overflowing on 320px screens. |
| **Hamburger menu using a hidden checkbox** | The mobile menu works without JavaScript. The label turns into an ✕ when the menu is open, and it shows a focus ring for keyboard users. |
| **Hero background with an `image-set()` and a gradient overlay** | Screens get a 1x or 2x image as needed, and the dark overlay keeps the white text readable. |
| **`<picture>` with a WebP `<source>` and a JPEG fallback, plus `srcset`/`sizes`** | Phones download the 400px image and larger screens get the 800px one. WebP files are smaller, and JPEG covers older browsers. |
| **Native `<details>`/`<summary>` for the FAQ** | The accordion needs no JavaScript and is accessible by default. |
| **Accessibility** | Includes a skip link, `:focus-visible` outlines, a `.sr-only` utility, touch targets of at least 44px, `aria-current` on the active page, labels on every form field, and `prefers-reduced-motion` support. |
| **Print styles** | Navigation, forms and backgrounds are hidden in print, link URLs are printed, and FAQ answers are expanded. |

## 5. Responsive testing checklist

- [ ] No horizontal scrolling at 320px, 375px, 768px, 1024px or 1440px
- [ ] The hamburger appears at 768px and below, opens and closes, and the links work
- [ ] The full navigation shows in one row at 769px and above
- [ ] Cards stack into 1 column on phones and show 2–3 columns on larger screens
- [ ] The gallery shows 2, then 3, then 4 columns (phone, tablet, desktop)
- [ ] The contact page shows 1 column on phones and 2 columns from 769px
- [ ] Form fields fill the width on phones and sit in 2 columns from 481px
- [ ] Hero text is readable and the buttons stack full-width at 480px and below
- [ ] Images keep their shape (no stretching) and are sharp on retina screens
- [ ] Tabbing through a page shows a visible focus ring on every link, button and field
- [ ] The skip link appears on the first Tab press
- [ ] Every FAQ item opens and closes with the mouse and with the keyboard (Enter/Space)
- [ ] Print preview (Ctrl/Cmd + P) gives a clean, readable page
- [ ] With "Reduce motion" turned on in the OS, the animations stop
- [ ] A Lighthouse check (DevTools → Lighthouse) scores 90+ for Accessibility

## 6. Browser developer tools guide

1. Open the site in **Chrome** (Edge and Firefox work in a similar way).
2. Press **F12** (Windows) or **Cmd + Option + I** (Mac) to open DevTools.
3. Click the **Toggle device toolbar** icon (phone/tablet), or press **Ctrl/Cmd + Shift + M**.
4. From the **Dimensions** dropdown choose **Responsive**, then type each width:

| Width | Represents | What to check |
|---|---|---|
| **320px** | Small phone (iPhone SE 1st gen) | Nothing is cut off, buttons are full width, the hamburger works |
| **375px** | Standard phone (iPhone SE / 12 mini) | Card and form layout, text size |
| **768px** | Tablet portrait (iPad) | The hamburger still shows; the gallery has 2 columns |
| **1024px** | Tablet landscape / small laptop | Inline navigation, 2-column split sections, 4-column gallery |
| **1440px** | Desktop | Wider container, spacing, the hero looks balanced |

5. Scroll through **every page** at each width.
6. To test the hover and focus states, right-click an element, choose **Inspect**, then in the **Styles** panel click **:hov** and tick `:hover` or `:focus-visible`.
7. To check contrast, click a text element in the **Elements** panel. The colour picker shows its contrast ratio, and ✓ AA means it passes.
8. To test reduced motion, press **Cmd/Ctrl + Shift + P**, type *Rendering*, then set *Emulate CSS prefers-reduced-motion* to *reduce*.

## 7. Screenshot guidance (for submission)

Take screenshots with DevTools so the sizes are consistent:

1. Set the width in the device toolbar (see above).
2. Open the **⋮** menu in the device toolbar and choose **Capture full size screenshot**. This saves the whole page, not only the visible part.
3. Save the files with clear names, for example:

| View | Width | Suggested file name |
|---|---|---|
| Desktop | 1440px | `home-desktop-1440.png`, `adopt-desktop-1440.png`, … |
| Tablet | 768px | `home-tablet-768.png`, … |
| Mobile | 375px | `home-mobile-375.png`, plus one with the **menu open**: `nav-open-mobile-375.png` |

Take at least one screenshot of every page at each of the three sizes. Also include a close-up of a form with a field focused, to show the focus state.

## 8. Placeholders to replace before going live

- **Phone number** and **banking details** (contact page and Get Involved page) are shown as `[…]`.
- **Stats** (150+ rescued, and so on), **testimonials**, the **adoption fee** wording and the **opening hours** are sample content that the organisation should confirm.
- **Forms** use `action="#"`, which means they do not send anything yet. They need a form handler, such as the hosting provider's mail script or a service like Formspree, or the JavaScript planned for Stage 5 of the project plan.

## 9. Image credits

The animal photos are from [Unsplash](https://unsplash.com) and are free to use under the Unsplash License. They should be replaced with Tiny Paws' own photos of their rescued animals.
