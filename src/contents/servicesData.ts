import { ClipboardList, Cloud, Code, Lightbulb, Ruler, ShieldCheck, Wrench } from "lucide-react";

export const services = [
  {
    label: "Conseil et stratégie IT",
    slug: "conseil-strategie-it",
    icon: Lightbulb,
    description: "Nous accompagnons votre entreprise dans la définition d’une stratégie technologique claire, durable et alignée avec vos objectifs de croissance.",
    details: [
      "Audit complet de vos systèmes informatiques",
      "Conception d’architectures IT adaptées à vos besoins",
      "Conseil en transformation digitale et innovation",
      "Optimisation des ressources et réduction des coûts opérationnels",
    ],
  },
  {
    label: "Réseaux et cybersécurité",
    slug: "reseaux-cybersecurite",
    icon: ShieldCheck,
    description: "Protégez vos données et assurez la continuité de vos services grâce à une cybersécurité renforcée et des réseaux résilients.",
    details: [
      "Détection et prévention des cyberattaques",
      "Mise en place de pare-feu, antivirus et solutions EDR",
      "Surveillance en temps réel et gestion des incidents",
      "Conformité réglementaire (RGPD, ISO 27001, etc.)",
    ],
  },
  {
    label: "Solutions cloud et hébergement",
    slug: "cloud-hebergement",
    icon: Cloud,
    description: "Bénéficiez de la flexibilité et de la sécurité du cloud pour héberger vos applications, vos données et vos services IT.",
    details: [
      "Migration vers le cloud (privé, public, hybride)",
      "Hébergement sécurisé de vos applications critiques",
      "Optimisation des performances et de la consommation cloud",
      "Plans de reprise après sinistre (PRA) et sauvegardes automatiques",
    ],
  },
  {
    label: "Développement et intégration",
    slug: "developpement-integration",
    icon: Code,
    description: "Nous développons des solutions logicielles et applications sur mesure, intégrées à vos processus métiers pour maximiser votre productivité.",
    details: [
      "Applications web et mobiles modernes",
      "Intégration d’API, ERP et CRM",
      "Automatisation des processus métiers",
      "Méthodologie agile et DevOps pour un déploiement rapide",
    ],
  },
  {
    label: "Support et maintenance IT",
    slug: "support-maintenance",
    icon: Wrench,
    description: "Garantissez la performance de vos infrastructures grâce à notre support technique réactif et à notre maintenance proactive.",
    details: [
      "Assistance technique 24/7 sur site ou à distance",
      "Maintenance préventive et corrective",
      "Surveillance proactive des systèmes IT",
      "Interventions rapides pour limiter les interruptions",
    ],
  },
  {
    label: "Étude & Ingénierie",
    slug: "etude-ingenierie",
    icon: Ruler,
    description: "Nous menons des études approfondies et concevons des solutions techniques innovantes pour répondre à vos besoins les plus complexes.",
    details: [
      "Études de faisabilité technique et financière",
      "Conception et modélisation d’architectures IT",
      "Prototypage et validation de solutions",
      "Accompagnement de la phase de déploiement",
    ],
  },
  {
    label: "Gestion de projets IT",
    slug: "gestion-projets",
    icon: ClipboardList,
    description: "Nous assurons la gestion complète de vos projets IT en garantissant une coordination optimale des équipes et une livraison dans les délais.",
    details: [
      "Gestion agile (Scrum, Kanban) ou classique (PMI, PRINCE2)",
      "Suivi budgétaire et gestion des risques",
      "Planification et coordination des ressources",
      "Tableaux de bord et reporting de l’avancement",
    ],
  },
];
