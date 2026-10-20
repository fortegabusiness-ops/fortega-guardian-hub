import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { compareSubstance } from "./location-draft-quality";
import { LOCATION_SERVICE_DRAFTS, getLocationServiceDraft } from "./location-service-drafts";
import { SERVICE_AREA_COMBOS } from "./service-areas";
import { isLocationGone } from "./location-eligibility";
import { REVIEW_CITY_INVENTORY } from "./cities";

describe("location draft safeguards", () => {
  test("city-name substitutions cannot pass the substance check", () => {
    const result = compareSubstance({ id: "a", city: "Toronto", province: "Ontario", text: "Plan cameras in Toronto Ontario with the same standard camera installation checklist." }, { id: "b", city: "Dawson", province: "Yukon", text: "Plan cameras in Dawson Yukon with the same standard camera installation checklist." });
    assert.equal(result.exactNameSwap, true);
    assert.equal(result.jaccard, 1);
  });
  test("review drafts never restore pilot service-city URLs", () => {
    assert.equal(LOCATION_SERVICE_DRAFTS.length, 1800);
    for (const draft of LOCATION_SERVICE_DRAFTS) {
      assert.equal(draft.approved, false);
      if (["dawson", "chetwynd", "happy-valley-goose-bay"].includes(draft.city.slug)) {
        assert.equal(isLocationGone(`/services/${draft.service.slug}/${draft.city.slug}`), true);
        assert.equal(SERVICE_AREA_COMBOS.some((area) => area.city === draft.city.slug), false);
      }
    }
  });
  test("unconfirmed guard delivery remains blocked", () => {
    for (const city of ["dawson", "chetwynd", "happy-valley-goose-bay"]) assert.equal(getLocationServiceDraft(city, "guards")?.status, "delivery-blocked");
  });
  test("national cybersecurity advice cannot count as city-specific evidence", () => {
    for (const city of ["dawson", "chetwynd", "happy-valley-goose-bay"]) assert.equal(getLocationServiceDraft(city, "cyber")?.status, "insufficient-local-evidence");
  });
  test("unresearched towns cannot count as locally researched or become eligible", () => {
    assert.equal(getLocationServiceDraft("iqaluit", "cctv")?.status, "insufficient-local-evidence");
    assert.equal(getLocationServiceDraft("iqaluit", "cctv")?.local, undefined);
    assert.equal(isLocationGone("/services/cctv/iqaluit"), true);
  });
  test("every one of 225 communities has eight review topics", () => {
    assert.equal(REVIEW_CITY_INVENTORY.length, 225);
    for (const city of REVIEW_CITY_INVENTORY) assert.equal(LOCATION_SERVICE_DRAFTS.filter(d => d.city.slug === city.slug).length, 8);
    assert.equal(SERVICE_AREA_COMBOS.length, 208);
    assert.equal(getLocationServiceDraft("not-a-real-town", "cctv"), undefined);
  });
  test("review editorial copy omits Fortega availability claims and caveats", () => {
    for (const draft of LOCATION_SERVICE_DRAFTS) {
      const copy = [draft.description, draft.plan.answer, ...draft.plan.checklist, draft.searchOverview, ...draft.faqs.flatMap(faq => [faq.q, faq.a])].join(" ");
      assert.equal(/Fortega.{0,100}(availability|eligibility|coverage)|personnel availability|local personnel availability|delivery arrangements require confirmation/i.test(copy), false, `${draft.city.slug}/${draft.service.slug}`);
    }
  });
  test("verified municipal facts remain separate from absent local evidence", () => {
    assert.equal(getLocationServiceDraft("lethbridge", "access")?.status, "needs-review");
    assert.equal(getLocationServiceDraft("lethbridge", "remote")?.local, undefined);
    assert.equal(getLocationServiceDraft("iqaluit", "intrusion")?.local?.sourceUrl, "https://iqaluit.ca/sites/default/files/alarm_contact_information_annual_revision_form_-_eng.pdf");
    assert.equal(getLocationServiceDraft("iqaluit", "guards")?.status, "delivery-blocked");
  });
  test("all 1800 drafts have jurisdiction context without granting city evidence or approval", () => {
    for (const draft of LOCATION_SERVICE_DRAFTS) {
      assert.ok(draft.jurisdiction, `${draft.city.slug}/${draft.service.slug}`);
      assert.equal(draft.jurisdiction.scope, "jurisdiction-reference-not-city-evidence");
      assert.equal(draft.approved, false);
      assert.ok(draft.jurisdiction.sourceUrl.startsWith("https://"));
      assert.equal(/wikipedia/i.test(draft.jurisdiction.sourceUrl), false);
      if (!draft.local && draft.service.slug !== "guards") assert.equal(draft.status, "insufficient-local-evidence");
    }
  });
});