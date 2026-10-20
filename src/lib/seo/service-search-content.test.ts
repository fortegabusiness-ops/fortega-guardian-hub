import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { isNonPricingQuestion } from "./service-search-content";

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
});