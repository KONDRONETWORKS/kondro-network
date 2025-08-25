import { 
  Settings, Shield, Cloud, Search, ClipboardCheck, Users, BookOpen, Code 
} from "lucide-react";

const services = [
  {
    label: "Ingénierie / Design",
    slug: "ingenierie-design",
    icon: Settings,
    description:
      "Nous concevons des architectures réseau et IT adaptées à vos besoins métiers, alliant performance, sécurité et évolutivité.",
    details: [
      "Études d’architecture HLD (High Level Design) et LLD (Low Level Design)",
      "Schémas de topologie réseau (LAN, WAN, Datacenter, Cloud, SD-WAN)",
      "Dimensionnement des infrastructures (serveurs, stockage, virtualisation)",
      "Intégration des contraintes de cybersécurité (segmentation, firewalling, zero trust)",
      "Conception de plans de continuité et de reprise d’activité (PCA/PRA)",
    ],
  },
  {
    label: "Implémentation",
    slug: "implementation",
    icon: Shield,
    description:
      "Nous assurons le déploiement et l’intégration de solutions technologiques avec des standards de qualité élevés.",
    details: [
      "Installation et configuration d’équipements réseau et sécurité (switches, routeurs, firewalls, WiFi, WLC)",
      "Intégration Datacenter (serveurs, hyperviseurs, stockage SAN/NAS, HCI, OpenStack/Kubernetes)",
      "Migration d’infrastructures (LAN, WAN, Cloud, VoIP, collaboration)",
      "Déploiement de solutions de sécurité (antivirus, EDR, IAM, VPN, MFA)",
      "Tests de performance, validation et mise en production",
    ],
  },
  {
    label: "Études",
    slug: "etudes",
    icon: Cloud,
    description:
      "Nous réalisons des études stratégiques et techniques pour orienter vos décisions et optimiser vos investissements.",
    details: [
      "Études de faisabilité (technique, économique, réglementaire)",
      "Benchmark technologique et comparaison de solutions (Cisco, Huawei, Fortinet, etc.)",
      "Capacity planning et anticipation de croissance",
      "Analyse de ROI/TCO (Return on Investment / Total Cost of Ownership)",
      "Études de migration (Cloud, IP/MPLS, SD-WAN, IPv6, etc.)",
    ],
  },
  {
    label: "Audit / AMOA",
    slug: "audit-amoa",
    icon: Search,
    description:
      "Nous vous accompagnons dans vos projets de transformation numérique avec un regard indépendant.",
    details: [
      "Audit technique (réseau, sécurité, systèmes, cloud, applicatif)",
      "Audit organisationnel (processus ITIL, gouvernance IT)",
      "Rédaction de cahiers des charges et dossiers d’appel d’offres",
      "Définition de la stratégie de sourcing (choix éditeurs/intégrateurs)",
      "Suivi des fournisseurs et validation des livrables",
      "Assistance aux tests d’acceptation et recette (UAT, FAT, SAT)",
    ],
  },
  {
    label: "Gestion de Projets",
    slug: "gestion-projets",
    icon: ClipboardCheck,
    description:
      "Nous pilotons vos projets IT et télécoms avec méthode et transparence.",
    details: [
      "Méthodologies de gestion (PMI, Prince2, Agile, Scrum)",
      "Élaboration de planning, budgets et RACI",
      "Gestion des risques et suivi qualité",
      "Coordination multi-équipes (internes, partenaires, éditeurs)",
      "Reporting exécutif et communication projet",
      "Conduite du changement et accompagnement utilisateurs",
    ],
  },
  {
    label: "Support et Exploitation",
    slug: "support-exploitation",
    icon: Users,
    description:
      "Nous assurons la disponibilité et la performance de vos systèmes 24/7.",
    details: [
      "Supervision proactive (NOC/SOC, monitoring 24/7, alerting)",
      "Maintenance préventive et corrective",
      "Gestion des incidents et des problèmes (ITIL)",
      "Patching et mises à jour régulières",
      "Services managés (Managed Firewall, Managed LAN, Managed Cloud)",
      "Optimisation continue des performances (capacity management, tuning)",
    ],
  },
  {
    label: "Formation IT",
    slug: "formation-it",
    icon: BookOpen,
    description:
      "Nous renforçons les compétences de vos équipes techniques et utilisateurs.",
    details: [
      "Formations réseaux et sécurité (Cisco CCNA/CCNP, Fortinet, Palo Alto)",
      "Formations systèmes et cloud (Linux, Windows Server, VMware, OpenStack, AWS, Azure)",
      "Formations DevOps et conteneurs (Docker, Kubernetes, CI/CD)",
      "Formation cybersécurité (SOC analyst, ITIL security, bonnes pratiques utilisateurs)",
      "Ateliers pratiques et labs personnalisés",
    ],
  },
  {
    label: "Développement d’applications",
    slug: "developpement-applications",
    icon: Code,
    description:
      "Nous développons des solutions logicielles et mobiles adaptées à vos métiers.",
    details: [
      "Développement d’applications web et mobiles (Android/iOS)",
      "Développement sur mesure (ERP, CRM, portail client, API)",
      "Intégration avec les systèmes existants (bases de données, middleware, API REST/SOAP)",
      "UX/UI design et prototypage",
      "Tests et assurance qualité (QA, UAT, automatisation)",
      "Maintenance évolutive et corrective des applications",
    ],
  },
];

export default services;