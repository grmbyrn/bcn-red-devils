# Site Improvements

## To Review
- [ ] Loading & error states: Add skeletons/loaders and clear error UI for APIs
- [x] Mobile responsiveness & navigation: Implement mobile-first responsive layout and collapsible nav/drawer
- [ ] Accessibility basics: Semantic HTML, keyboard focus states, skip links, meaningful alt text, color-contrast >= 4.5:1
- [ ] Content completeness: Add About, Membership/Join, Matchday Guides, Travel & Meetups, Merchandise, Contact, Newsletter signup, Donate/Sponsors pages
- [ ] Branding & visual polish: Consistent Man Utd-themed design system (red, black, white, typography, spacing, crest)

## UX & Content
- [ ] Clear CTAs: Prominent "Join", "Buy Tickets", "Sign up" CTAs on homepage and match pages
- [ ] Match pages enhancements: Opponent, kickoff time (timezone), venue, TV info, calendar/ICS export
- [ ] Event & meetups flow: RSVP/registration with capacity and reminders
- [ ] Search / filtering: Search and filters for news, matches, and events
- [ ] Pagination & infinite scroll: Paginated lists or infinite loading on NewsList and MatchesList
- [ ] User-generated content: Moderated forum or comments for supporters

## Accessibility & Internationalization
- [ ] ARIA & roles: Add ARIA labels/roles, correct heading order
- [ ] Keyboard navigation: All interactive items reachable via keyboard, visible focus ring
- [ ] Contrast and color-blind friendliness: Validate color palette, avoid conveying info by color alone
- [ ] i18n support: Add translations and locale-aware dates/times

## Performance & Technical
- [ ] Image optimization: Next.js image optimization, modern formats (AVIF/WebP)
- [ ] Code-splitting & lazy loading: Lazy-load non-critical components using Suspense/next/dynamic
- [ ] Caching & SWR: Use SWR/react-query for API calls with revalidation and background refresh
- [ ] Reduce JS & bundle size: Audit bundles, remove unused dependencies, prefer server components
- [ ] CDN & caching headers: Serve static assets from CDN with proper cache headers

## API & Data UX
- [ ] Robust fetch handling: Centralize fetch logic with timeouts, retries, exponential backoff
- [ ] Optimistic UI & feedback: Optimistic updates and clear success/error feedback for interactive flows
- [ ] Loading states per component: Per-component loaders so sections render progressively
- [ ] Offline and slow-network behavior: Graceful fallback and retry guidance

## Visual & Style
- [ ] Design system / tokens: CSS variables or theme provider for colors, spacing, type scale
- [ ] Typography: Strong headline weights, clear body font sizes, consistent line-height
- [ ] Card & list polish: Consistent spacing, image aspect-ratio, subtle elevation, hover states on NewsCard/EventCard
- [ ] Color & imagery: Club photo assets for hero/match visuals, subtle textures, consistent iconography
- [ ] Micro-interactions: Transitions for hover/focus, button presses, list loading

## Code Quality
- [ ] Prop typing & validation: Strict TypeScript props, no implicit any
- [ ] Server vs Client components: Server components for static content, client only where needed
- [ ] Centralized utilities: Shared api/lib fetch wrapper, date-format helpers, enums for match statuses
- [ ] Unit & integration tests: Tests for critical components and API utilities, E2E for key flows
- [ ] Folder organization: Small components, split presentational vs container logic, consistent naming

## SEO, Analytics & Social
- [ ] Meta & Open Graph: Page-level meta, OG tags, structured data for events/news
- [ ] Canonical URLs: Set canonical tags to avoid duplicate content
- [ ] Analytics & privacy: Analytics with consent banner, respect Do Not Track, anonymize PII

## Security & Compliance
- [ ] Input sanitization: Sanitize user-provided content, encode outputs to prevent XSS
- [ ] Environment secrets: Keys/URLs in env vars, never commit secrets
- [ ] GDPR & cookie consent: Cookie banner and privacy-focused data collection

## Testing & Observability
- [ ] Error reporting: Add Sentry or similar for runtime exceptions and API failures
- [ ] Performance monitoring: Lighthouse, Web Vitals, monitoring for regressions
- [ ] CI checks: Linting, type checks, and tests in CI

## Nice-to-haves / Future
- [ ] Membership dashboard: Profiles, membership tier, purchases, event history
- [ ] Merch store integration: Link to e-commerce or embed catalogue
- [ ] Live match updates: Live commentary/timeline and scoreboard widget
- [ ] Push notifications / emails: For match changes or event reminders
- [ ] Multimedia gallery: Photo/video galleries with lightbox and lazy loading