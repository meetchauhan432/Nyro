# Historical prototype notes (V3–V6)

Archived from the supplied V6 README. These notes describe earlier implementations, not the current architecture.

## V3 — Member administration and design refinements

Expand Users & roles in the sidebar to browse SA, NSM, SH, CNF, MD, DT and RT. The horizontal hierarchy strip was removed. Create user opens a local demo form, selecting a role and eligible parent; new records start Active with Pending KYC. The immediate-parent role rule is illustrative and requires business approval. Use fictional mobile numbers of the form `90000xxxxx` and email addresses ending in `@example.invalid`. Never enter real personal or identity information.

Select any member for a full profile page with Profile, Schemes, Security, KYC upload, Wallet lock, Parent mapping and Device mapping sections. Profile, scheme and parent changes update the local directory. The remaining sections are clearly marked read-only / not connected. All changes are in memory and reset on page reload or demo reset. No real credentials, messages, documents, financial restrictions or API calls are created.

V3 adds refined row, icon, navigation, wallet and button hover feedback, profile-tab transitions, mobile form stacking and selective glass effects. Reduced-motion preferences are respected.

## V4 — Motion polish

Wallet numbers now animate to the actual local balance using a presentation-only counter; top-ups and payouts animate between old and new balances. The privacy toggle masks immediately, and reduced-motion mode displays the exact balance without animation. The wallet torch effect is removed; the restrained geometric ribbon appears once on entry. Quick-service icons remain upright, with a subtle underline and elevation on desktop hover. All existing V3 member and financial features are retained. The Vite build attempt remains blocked by missing installed dependencies.

## V5 — Brand and motion refinement

The existing dashboard composition is unchanged. Wallet counters use a 520 ms initial duration and a 340 ms update duration. The background contours drift on independent 15- and 19-second cycles. In the profile menu, choose Pause wallet background motion to stop them or Resume to restart; system reduced-motion preferences disable the effect. The expanded logo is larger, role rows are at least 41 CSS pixels high on desktop and 44 on mobile, and the menu scrolls instead of shrinking its labels. These changes do not alter financial calculations or introduce API calls. All data remains fictional.

## V6 — Hover and scroll refinement

V6 preserves V5's layout, branding and fictional demo workflows. Desktop controls now use restrained elevation, color transitions, animated accents and stable icons. The header gains a thin progress line while scrolling, and offscreen sections gently reveal on their first entry. Native scrolling is retained, with no scroll hijacking. On touch screens the feedback is momentary; reduced-motion settings are respected. The standalone preview was tested in Chromium, but the production Vite build requires installed dependencies and remains unverified.
