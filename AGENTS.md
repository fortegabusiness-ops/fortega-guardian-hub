# Project rules

- Location expansion uses a reviewed draft stage before changing public eligibility; this prevents research drafts from silently restoring deleted URLs.
- City-only assessment eligibility is separate from core service-and-city combinations, and request deletion handling respects that split; a town's inclusion does not establish availability of every service there.
- Keep research sources and uncertainty with location-content drafts so factual claims can be checked before publication.
- Keep service-city review pages under a separate noindex review route; review data cannot grant production URL eligibility or sitemap inclusion.
- Treat normalized text similarity as a review signal, never a guarantee against spam classification; exclude shared service and delivery copy from local-substance comparisons.
- Run the standalone location-inventory and lexical-difference audit with `bun scripts/audit-location-expansion.ts` from the project root; it writes review reports only and cannot restore pages.
- Review drafts use a separate historical-city inventory and attributed reference records; missing local evidence stays explicitly flagged, and full-body duplicate grouping must accompany local-only similarity scores.
- Keep service search guidance and non-pricing FAQs in a shared browser-safe content module used by review drafts and existing service pages; visible FAQs and their structured data must use the same records to prevent divergence.