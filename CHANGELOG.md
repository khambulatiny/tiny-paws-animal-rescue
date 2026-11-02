# Changelog

All notable changes to the Tiny Paws Animal Rescue website. Dates use YYYY-MM-DD.

## [3.0.0] – 2026-11-02 – Part 3: JavaScript, SEO and deployment
### Added
- `js/main.js`: an accessible hamburger menu (aria-expanded, Esc to close), a back-to-top button, a sticky-header shadow, scroll-reveal animations, an animated stats counter, and a single-open FAQ accordion.
- `js/animals.js`: animal data in a JavaScript array, rendered on the Adopt and Home pages, with live case-insensitive search, category filter buttons, a no-results message and a result count.
- `js/lightbox.js`: a gallery lightbox with captions, previous/next, Esc and arrow keys, click-outside close, swipe, and a focus trap.
- `js/map.js` and a contact-page section: a Leaflet/OpenStreetMap map with a custom marker, a popup and a directions link.
- `js/validation.js`: real-time validation for every field (required fields, email, SA phone number, future date, number range, minimum length).
- `js/forms.js`: the adoption enquiry calculates an estimated cost and shows visit availability; the contact form sends email via Formspree with loading, success and error states; the volunteer form shows a confirmation.
- The adoption enquiry form gains enquiry type, preferred date, household size and consent fields. The contact form gains a phone field and a required subject.
- SEO: unique titles and descriptions, keywords, Open Graph and Twitter tags, canonical URLs and a favicon.
- `CHANGELOG.md`, and a fully rewritten README with features, setup, deployment and Harvard references.

### Changed
- Renamed the hero images to `rescue-puppy-hero-800.jpg` and `rescue-puppy-hero-1600.jpg`.
- Added meaningful alt text to the testimonial images.

### Deployed
- Published to GitHub Pages at https://khambulatiny.github.io/tiny-paws-animal-rescue/.

## [2.0.0] – 2025-09-25 – Part 2: CSS styling and responsive design
### Added
- An external stylesheet with custom properties, a mobile-first layout and breakpoints at 481, 769, 1024 and 1440px.
- A CSS-only hamburger menu, a `<details>` FAQ, responsive WebP/JPEG images with `srcset`, and print styles.
- Accessibility features: a skip link, focus-visible states, `.sr-only` and reduced-motion support.

## [1.0.0] – 2025-09 – Part 1: HTML structure
### Added
- Five semantic HTML pages: Home, About Us, Adopt, Get Involved and Contact Us.
- The adoption, volunteer and contact form structures.
