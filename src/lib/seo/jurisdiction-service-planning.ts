import records from "./jurisdiction-planning-records.json";

const SERVICE_APPLICATION: Record<string, string> = {
  cctv: "For CCTV, prepare the proposed views, recording purpose, retention policy and list of authorized users. Identify the property's governing privacy framework before selecting settings; an example institution's policy is not automatically this property's policy.",
  access: "For access control, document each opening's exit role, proposed lock and release behaviour. Identify the relevant building reviewer and the owner's requirements before altering hardware; electronic credentials do not settle a life-safety question.",
  intrusion: "For a business alarm system, separate intrusion zones from fire and environmental signals. Check the actual municipality's process, maintain authorized contact details and document testing; province-level background alone does not establish a premises alarm requirement.",
  remote: "For video monitoring, document who may view footage, what requires verification and which contacts receive escalation. Keep recording policy separate from operator duties and confirm the incident procedure for the actual premises.",
  smart: "For building automation, inventory controllers, schedules, manual overrides and connected sensors. Establish the building owner's requirements and review any alterations to regulated systems separately; a public-building example is not proof of compatibility or energy savings.",
  cyber: "For cybersecurity, identify the owner of cameras, controllers, recordings and administrator accounts. Review authentication, updates, network separation and incident responsibilities against the organization's actual obligations rather than copying a government-system policy unchanged.",
  consulting: "For a security assessment, identify the property's use, owner standards and applicable privacy or building-review responsibilities. Keep source assumptions and project findings separate, and document the questions that require an appropriate qualified review.",
  guards: "For security staffing requirements, define authorized duties, access permissions, incident records and supervision. Establish which owner instructions apply at the actual premises; a public-institution policy is not a universal staffing requirement.",
};

/** Jurisdiction background is deliberately separate from service-specific municipal evidence. */
export function getJurisdictionServicePlanning(provinceSlug: string, serviceSlug: string) {
  const record = (records as Record<string, { body: string; sourceTitle: string; sourceUrl: string; reviewed: string; scope: string }>)[provinceSlug];
  const application = SERVICE_APPLICATION[serviceSlug];
  if (!record || !application) return undefined;
  return { ...record, application, scope: "jurisdiction-reference-not-city-evidence" as const };
}