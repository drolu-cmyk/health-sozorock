export const productRoutes = {
  home: "/",
  resident: {
    home: "/resident",
    start: "/resident/start",
    voiceAccess: "/resident/voice-access",
    accessDay: "/resident/access-day",
    hubs: "/resident/hubs",
    providerPathway: "/resident/provider-pathway",
  },
  county: {
    home: "/county",
    operatingPicture: "/county/operating-picture",
    actionQueue: "/county/action-queue",
    assuranceLog: "/county/assurance-log",
    scenarioPlanning: "/county/scenario-planning",
  },
  model: "/about-model",
} as const;

export const residentRouteItems = [
  { href: productRoutes.resident.home, label: "Welcome", shortLabel: "Home" },
  { href: productRoutes.resident.start, label: "Access Start", shortLabel: "Start" },
  { href: productRoutes.resident.voiceAccess, label: "Voice Access", shortLabel: "Voice" },
  { href: productRoutes.resident.accessDay, label: "Access Day", shortLabel: "Day" },
  { href: productRoutes.resident.hubs, label: "Hubs", shortLabel: "Hubs" },
  { href: productRoutes.resident.providerPathway, label: "Provider Pathway", shortLabel: "Provider" },
] as const;

export const countyRouteItems = [
  { href: productRoutes.county.home, label: "Overview" },
  { href: productRoutes.county.operatingPicture, label: "Operating Picture" },
  { href: productRoutes.county.actionQueue, label: "Action Queue" },
  { href: productRoutes.county.assuranceLog, label: "Assurance Log" },
  { href: productRoutes.county.scenarioPlanning, label: "Scenario Planning" },
] as const;
