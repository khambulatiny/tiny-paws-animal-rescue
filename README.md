# Tiny Paws Animal Rescue – Website

**Live site:** https://khambulatiny.github.io/tiny-paws-animal-rescue/
**Repository:** https://github.com/khambulatiny/tiny-paws-animal-rescue

## 1. Project overview

Tiny Paws Animal Rescue is a non-profit at **24 Market Street, Eendraught**. It rescues abandoned, abused and neglected dogs and cats, gives them vet care, and finds them permanent homes. This multi-page, responsive website lets visitors browse and search adoptable animals, send an adoption enquiry, donate, register as volunteers and contact the rescue.

**Purpose:** to get more animals adopted, bring in donations and volunteers, and answer common questions online so staff spend less time on the phone.

Part 2 built the HTML and CSS. Part 3, documented here, adds JavaScript interactivity, a map, a gallery lightbox, dynamic content with search, SEO, form validation and processing, a working email form, and deployment to GitHub Pages.

## 2. Pages

| Page | File | Contents |
|---|---|---|
| Home | `index.html` | Hero, ways to help, featured animals (rendered from JS data), animated stats, testimonials |
| About Us | `about.html` | History, mission and vision, what we do, **gallery with lightbox** |
| Adopt | `adopt.html` | **Animal listing rendered from a JS array with live search and filters**, adoption process, **adoption enquiry form with cost estimate** |
| Get Involved | `get-involved.html` | Donation options, **validated volunteer registration form** |
| Contact Us | `contact.html` | Contact details, opening hours, **contact form that sends an email**, **interactive Leaflet map**, FAQ accordion |

## 3. Features

### Interactive elements (`js/main.js`)
- An accessible hamburger menu. It uses a CSS checkbox, and JavaScript adds `aria-expanded` and closes the menu on link click or **Esc**.
- A sticky header gains a shadow when you scroll.
- A **back-to-top button** appears after scrolling. It scrolls smoothly and respects `prefers-reduced-motion`.
- Cards, stats and the gallery fade in as they scroll into view (IntersectionObserver).
- The home-page impact numbers count up when they come into view.
- The **FAQ accordion** uses native `<details>`, and only one answer is open at a time.
- Hover and focus effects apply to cards, buttons and gallery images.

### Interactive map (`js/map.js`)
- Leaflet 1.9.4 with OpenStreetMap tiles. It has a custom paw marker in the site colours.
- The popup shows the name, the address and a **Get directions** link to Google Maps.
- You can zoom and pan. Scroll-wheel zoom turns on only after you click the map, so the page doesn't get stuck while scrolling.
- The map is responsive (`clamp()` height), has a fallback message if Leaflet fails to load, and links to a larger OpenStreetMap view.

### Gallery lightbox (`js/lightbox.js`)
- Click a gallery image, or press Enter/Space on it, to open it enlarged at 800px with a caption and an “x of 8” counter.
- The lightbox has previous, next and close buttons, and supports **← / → / Esc**, click-outside-to-close and swipe on touch screens.
- Focus stays inside the dialog while it is open, then returns to the image you opened.
- Images use `loading="lazy"`, are served as WebP with a JPEG fallback, and come in 400px and 800px sizes through `srcset`.

### Dynamic content and search (`js/animals.js`)
- All animals are stored in the `TINY_PAWS_ANIMALS` array (name, species, age, sex, fee, description, traits).
- The array is rendered into the Adopt page (all animals) and the Home page (first 3).
- The **live search** updates on every keystroke. It is case-insensitive and searches the name, species, age, sex, description and traits (e.g. “calm”, “puppy”).
- **Category filter buttons** (All, Dogs, Cats, Kittens) use `aria-pressed` and combine with the search.
- A friendly **no-results** message has a “show all animals” reset button. A live result count is read out by screen readers.
- Clicking “Enquire about X” pre-selects that animal in the enquiry form.

### SEO
- Every page has a unique `<title>` (50–60 characters) with the business name and main keyword.
- Every page has a unique meta description (150–160 characters) and a short, page-specific `keywords` list.
- Open Graph and Twitter card tags, a canonical URL, `lang="en"`, the viewport meta tag and a theme colour.
- Semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`) with one `h1` per page.
- Image files have descriptive, hyphenated names (e.g. `beagle-max-800.jpg`, `rescue-puppy-hero-1600.jpg`), and every `<img>` has meaningful alt text.

## 4. Forms

### Shared validation (`js/validation.js`)
Every field is checked in real time, on blur and then on every input, and also on submit:

| Rule | Example |
|---|---|
| Required fields, selects and the consent checkbox | “Please choose an option for enquiry type.” |
| Name: letters only, at least 2 | “Please use letters only (at least 2).” |
| Email format | “Please enter a valid email address, e.g. name@example.com.” |
| **South African phone number** (`0XX XXX XXXX` or `+27 XX XXX XXXX`) | “Please enter a valid South African number…” |
| **Date not in the past**, and not a Sunday (closed) | “The date cannot be in the past.” |
| Number range (household 1–12) | “Please enter 12 or fewer.” |
| Minimum message length (20 characters) with a live count | “Please write at least 20 characters (8 so far).” |

Invalid fields get a red border, `aria-invalid="true"` and an error message linked with `aria-describedby`. Valid fields turn green. The form will not submit until everything is valid, and focus moves to the first invalid field.

### Adoption enquiry form (`adopt.html`) – processing and response
The fields are name, email, phone, enquiry type (Adopt / Meet-and-greet / Foster / Sponsor), animal, type of home, preferred visit date, number of people in the household, message and a consent checkbox. When the form is valid, the page shows a **personalised summary**:
- **The estimated cost**, calculated from the chosen animal's fee in the data array, plus the home check and starter pack, or the monthly sponsorship amount.
- **Visit availability** for the chosen date (Saturday time slots differ from weekday ones).
- Tailored advice, for example for a large household, or a flat with an active dog.

The form is then cleared.

### Contact form (`contact.html`) – real email via Formspree
The fields are name, email, phone, subject (dropdown) and message. The form is sent with `fetch()` to Formspree, which emails the message to the rescue's inbox. A hidden `_gotcha` field filters out spam bots.
- **While sending:** the button is disabled and shows a spinner and “Sending…”.
- **If it succeeds:** a success message appears and the form clears.
- **If it fails:** a friendly error appears with an email fallback, and the user's input stays in the form.

**Setup (one key needed):**
1. Create a free account at https://formspree.io.
2. Click **New form**, name it “Tiny Paws contact”, and enter the email address that should receive messages.
3. Copy the form ID (the part after `/f/`, for example `xqkrabcd`).
4. In `contact.html`, replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"`.
5. Submit the form once on the live site and confirm the email that Formspree sends you.

### Volunteer form (`get-involved.html`)
This form uses the same validation and shows a confirmation that summarises the volunteer's availability and interests.

## 5. Technologies used
- HTML5, CSS3 (custom properties, Grid, Flexbox, `clamp()`), vanilla JavaScript (ES5+, no frameworks)
- [Leaflet 1.9.4](https://leafletjs.com) and [OpenStreetMap](https://www.openstreetmap.org) tiles
- [Formspree](https://formspree.io) for sending email
- Google Fonts (Poppins)
- Git, GitHub and GitHub Pages

## 6. File structure
```
├── index.html, about.html, adopt.html, get-involved.html, contact.html
├── css/style.css          One shared stylesheet (Part 2 + Part 3 component styles)
├── js/main.js             Navigation, back-to-top, scroll reveal, counters, accordion
├── js/animals.js          Animal data array, rendering, search and filters
├── js/lightbox.js         Gallery lightbox
├── js/map.js              Leaflet map
├── js/validation.js       Reusable real-time validator
├── js/forms.js            Enquiry estimate, Formspree email, volunteer confirmation
├── images/                Descriptively named 400/800px JPG + WebP images
├── CHANGELOG.md
└── README.md
```

## 7. Setup and running locally
1. Clone the repository: `git clone https://github.com/khambulatiny/tiny-paws-animal-rescue.git`
2. Open `index.html` in a browser, or serve the folder with a local server for the most accurate testing: `python3 -m http.server 8000`, then go to http://localhost:8000.
3. The map tiles, Leaflet and Formspree need an internet connection.

## 8. Deployment (GitHub Pages)
The site is deployed from the `main` branch (root folder):
1. On GitHub, go to **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**, then **main** and **/ (root)**, and click **Save**.
3. After about 1 minute the site is live at https://khambulatiny.github.io/tiny-paws-animal-rescue/.
4. Every push to `main` redeploys the site automatically.

All file paths are relative, so the site works both locally and under the `/tiny-paws-animal-rescue/` sub-path.

## 9. Testing checklist
- [x] No console errors on any page (checked in Chrome)
- [x] No broken links or images. Every `src`, `srcset`, `href` and CSS `url()` was checked by script.
- [x] Hamburger menu, lightbox, search, filters, map and forms work on both desktop and a 375px mobile width
- [x] Keyboard only: Tab, Enter, Esc and the arrow keys work. Focus rings are visible.
- [ ] Contact form email received (after adding the Formspree ID)
- [ ] Lighthouse SEO and Accessibility scores of 90+ (run DevTools → Lighthouse on the live site)

## 10. Screenshots
_Add screenshots to a `screenshots/` folder and link them here:_

| View | File |
|---|---|
| Home – desktop | `screenshots/home-desktop.png` |
| Home – mobile, menu open | `screenshots/home-mobile-menu.png` |
| Adopt – search with no results | `screenshots/adopt-search.png` |
| Gallery lightbox | `screenshots/lightbox.png` |
| Contact – map and form errors | `screenshots/contact-validation.png` |
| Enquiry – cost estimate | `screenshots/enquiry-result.png` |

## 11. Changelog
See [CHANGELOG.md](CHANGELOG.md) for the full dated history.

## 12. References (Harvard style)

Formspree (2026) *Formspree – forms backend for static sites*. Available at: https://formspree.io/ (Accessed: 2 November 2026).

Google Fonts (2026) *Poppins*. Available at: https://fonts.google.com/specimen/Poppins (Accessed: 2 November 2026).

Leaflet (2023) *Leaflet 1.9.4 – an open-source JavaScript library for mobile-friendly interactive maps*. Available at: https://leafletjs.com/ (Accessed: 2 November 2026).

MDN Web Docs (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation (Accessed: 2 November 2026).

MDN Web Docs (2026) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 2 November 2026).

OpenStreetMap contributors (2026) *OpenStreetMap*. Available at: https://www.openstreetmap.org/copyright (Accessed: 2 November 2026).

Unsplash (2026) *Unsplash License* and photographs of dogs and cats used throughout the site. Available at: https://unsplash.com/license (Accessed: 2 November 2026). _[Add each photographer's name and photo URL here.]_

W3C WAI (2026) *ARIA Authoring Practices Guide – Dialog (Modal) pattern*. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ (Accessed: 2 November 2026).

Anthropic (2026) *Claude Code* [AI coding assistant]. Used to help write the JavaScript features, SEO metadata and documentation. Available at: https://claude.com/claude-code (Accessed: 2 November 2026).

## 13. Author
**Gugu Khambula**
GitHub: [@khambulatiny](https://github.com/khambulatiny)
Project: Tiny Paws Animal Rescue website, Part 3

---

## Appendix – Part 2 CSS documentation

### 2. Linking the stylesheet

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

### 3. Example HTML structure (homepage)

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

### 4. Key CSS decisions

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

### 5. Responsive testing checklist

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

### 6. Browser developer tools guide

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

### 7. Screenshot guidance (for submission)

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

