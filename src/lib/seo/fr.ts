/**
 * French (fr-CA) pages for the Quebec market.
 *
 * Quebec-specific facts used here come from the same province data layer as the
 * English pages: private security is licensed by the Bureau de la sécurité
 * privée (BSP), and personal information — including video and access logs —
 * falls under Quebec's private-sector privacy regime as modernised by Law 25.
 */
import { CITIES, type City } from "./cities";

export const FR_CITIES: City[] = CITIES.filter((c) => c.province === "Quebec");

export const FR_CITY_BY_SLUG: Record<string, City> = Object.fromEntries(
  FR_CITIES.map((c) => [c.slug, c]),
);

export type FrService = { slug: string; name: string; desc: string };

export const FR_SERVICES: FrService[] = [
  {
    slug: "cctv",
    name: "Vidéosurveillance (CCTV)",
    desc: "Caméras IP haute définition, analyse vidéo intelligente et gestion vidéo infonuagique ou sur site.",
  },
  {
    slug: "access",
    name: "Contrôle d'accès",
    desc: "Cartes chiffrées, identifiants mobiles et biométrie, pour un site ou un parc immobilier complet.",
  },
  {
    slug: "intrusion",
    name: "Systèmes d'alarme et intrusion",
    desc: "Alarmes commerciales avec détection environnementale, boutons de panique et surveillance 24/7.",
  },
  {
    slug: "remote",
    name: "Télésurveillance et gardiennage à distance",
    desc: "Opérateurs en direct, patrouilles virtuelles, intervention vocale et vérification des alarmes.",
  },
  {
    slug: "guards",
    name: "Agents de sécurité",
    desc: "Gardiens sur place, patrouilles mobiles et sécurité d'événements, titulaires d'un permis du BSP.",
  },
  {
    slug: "smart",
    name: "Bâtiment intelligent et automatisation",
    desc: "Intégration de l'éclairage, du CVC, des portes et de la vidéo sur une seule plateforme.",
  },
  {
    slug: "cyber",
    name: "Cybersécurité",
    desc: "Segmentation réseau, durcissement des équipements, protection des terminaux et réponse aux incidents.",
  },
  {
    slug: "consulting",
    name: "Conseil et services professionnels",
    desc: "Évaluation des risques, conception de systèmes, devis techniques et gestion de projet.",
  },
];

export const FR_FACTS = {
  licensing:
    "Au Québec, la sécurité privée est encadrée par le Bureau de la sécurité privée (BSP) : l'agence et chaque agent doivent détenir un permis valide. Fortega travaille avec du personnel licencié et documente les permis applicables à chaque projet.",
  privacy:
    "Les images de vidéosurveillance et les journaux d'accès constituent des renseignements personnels. Le régime québécois, modernisé par la Loi 25, impose des obligations strictes de transparence, de consentement, de gouvernance et de déclaration des incidents — y compris une évaluation avant tout transfert de données hors Québec.",
  economy:
    "Manufacturier, aérospatiale, logistique, campus institutionnels et un marché commercial montréalais dense : la majorité des programmes de sécurité au Québec doivent couvrir plusieurs bâtiments, plusieurs quarts de travail et un va-et-vient constant de sous-traitants.",
  environment:
    "Le climat québécois — gel prolongé, neige, cycles de gel-dégel et sel de voirie — dicte le choix des boîtiers, des supports et du câblage extérieur, ainsi que l'entretien préventif des équipements installés dehors.",
};

export function frFaqs(city: City) {
  return [
    {
      q: `Fortega installe-t-elle des systèmes de sécurité à ${city.name} ?`,
      a: `Oui. Fortega conçoit, installe et entretient la vidéosurveillance, le contrôle d'accès, les systèmes d'alarme, la télésurveillance et la cybersécurité pour les entreprises de ${city.name} et de la région, d'un seul site jusqu'à un parc de plusieurs bâtiments.`,
    },
    {
      q: `Fortega détient-elle un permis pour travailler au Québec ?`,
      a: FR_FACTS.licensing,
    },
    {
      q: `Quelles règles de confidentialité s'appliquent aux caméras à ${city.name} ?`,
      a: `${FR_FACTS.privacy} Fortega documente la finalité, l'affichage, les droits d'accès et la durée de conservation à la remise du système.`,
    },
    {
      q: `Combien coûte un système de sécurité commercial à ${city.name} ?`,
      a: `Le prix dépend du nombre de portes et de caméras, de l'état du câblage, de la durée de conservation des images et de l'inclusion ou non de la surveillance. Fortega établit un prix après une évaluation gratuite du site à ${city.name}, jamais à partir d'une grille fixe.`,
    },
    {
      q: `En combien de temps une alarme est-elle traitée ?`,
      a: `Notre centre de surveillance canadien fonctionne 24 h sur 24 : l'événement est vérifié en temps réel, puis la procédure convenue est appliquée — autorités locales, personnel de garde ou intervention d'un agent.`,
    },
  ];
}
