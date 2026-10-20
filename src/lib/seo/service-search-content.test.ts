import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { isNonPricingQuestion, getServiceSearchFaqs, PROJECT_ENQUIRY_FAQS } from "./service-search-content";

describe("non-pricing question eligibility", () => {
  test("pricing topics are ineligible for page questions", () => {
    for (const question of ["How much does an access control system cost?", "What are monitoring fees?", "Can I get a quote?", "What is the installation price?", "What budget is needed?", "What are hourly rates?"]) {
      assert.equal(isNonPricingQuestion(question), false);
    }
  });
  test("non-pricing service topics remain eligible", () => {
    assert.equal(isNonPricingQuestion("How does remote video monitoring work?"), true);
    assert.equal(isNonPricingQuestion("Can access control integrate with CCTV?"), true);
  });
  test("all eight services keep their complete published question set free of pricing topics", () => {
    for (const slug of ["consulting", "cctv", "intrusion", "access", "remote", "guards", "smart", "cyber"]) {
      const faqs = [...getServiceSearchFaqs(slug), ...PROJECT_ENQUIRY_FAQS];
      assert.ok(faqs.length >= 9, slug);
      for (const faq of faqs) assert.equal(isNonPricingQuestion(faq.q), true, faq.q);
    }
  });
});