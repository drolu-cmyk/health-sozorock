export type ResidentScreenId =
  | "home"
  | "start"
  | "voice"
  | "day"
  | "hubs"
  | "providerPathway"
  | "howItWorks"
  | "privacy"
  | "accessibility"
  | "about";

export type ResidentNeedId =
  | "localSupport"
  | "healthAccessDay"
  | "digitalHelp"
  | "voiceAccess"
  | "providerPathway";

export type ConsentCapability = "microphone" | "location" | "aiGuidance";

export type ScreenStateName =
  | "default"
  | "empty"
  | "loading"
  | "error"
  | "offline"
  | "permissionDenied"
  | "serviceUnavailable"
  | "safetyBoundary";

export type ResidentNeed = {
  id: ResidentNeedId;
  title: string;
  description: string;
  guidance: string;
  nextScreen: ResidentScreenId;
};

export type VoiceTopic = {
  id: string;
  label: string;
  prompt: string;
  response: string;
};

export type HubCard = {
  id: string;
  name: string;
  hubType: string;
  address: string;
  city: string;
  county: string;
  zipCode: string;
  distanceLabel: string;
  hours: string;
  accessSupport: string[];
  accessibilityNotes: string;
  phoneOrWebsite: string;
  directionsLabel: string;
  verificationStatus: string;
  lastUpdated: string;
  privacyNote: string;
  partnerStatus: string;
  latitude: number;
  longitude: number;
};

export type HealthAccessDayEvent = {
  id: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  county: string;
  zipCode: string;
  whatToExpect: string[];
  whatToBring: string[];
  whatIsNotCollected: string[];
  whoItIsFor: string;
  accessibilityNotes: string;
  registrationStatus: string;
  contactOrNextStep: string;
  eventStatus: string;
  lastUpdated: string;
  latitude: number;
  longitude: number;
};

export type DataClassification = {
  category: string;
  purpose: string;
  required: string;
  stored: string;
  retention: string;
  consent: string;
  deletion: string;
  risk: "Low" | "Medium" | "High";
  residentExplanation: string;
};
