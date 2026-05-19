export type AccessPriority = "High" | "Medium" | "Low";

export type AccessGapLevel = "High" | "Medium" | "Low";

export type HubCoverageLevel = "Limited" | "Moderate" | "Emerging" | "Strong";

export type TravelBurdenLevel = "Elevated" | "Moderate" | "Low";

export type GeospatialProviderMode = "mock";

export type MapPoint = {
  xPercent: number;
  yPercent: number;
};

export type MapMarker = {
  id: string;
  zip: string;
  label: string;
  priority: AccessPriority;
  position: MapPoint;
  recommendedAction: string;
};

export type GeospatialAccessSignal = {
  zip: string;
  priority: AccessPriority;
  accessGap: AccessGapLevel;
  hubCoverage: HubCoverageLevel;
  travelBurden: TravelBurdenLevel;
  digitalReadiness: string;
  engagement: string;
  recommendedAction: string;
  marker: MapMarker;
};

export type ServiceArea = {
  id: string;
  name: string;
  zipCodes: readonly string[];
  coverage: HubCoverageLevel;
  planningNote: string;
};

export type TravelBurdenEstimate = {
  zip: string;
  level: TravelBurdenLevel;
  estimate: string;
  evidenceSource: string;
};

export type HubCoverage = {
  zip: string;
  level: HubCoverageLevel;
  hubTypes: readonly string[];
  coverageNote: string;
};

export type RecommendedAccessFocusArea = {
  zip: string;
  priority: AccessPriority;
  recommendedAction: string;
  rationale: string[];
  humanReviewRequired: true;
};

export type GeospatialOperatingPicture = {
  accessSignals: GeospatialAccessSignal[];
  markers: MapMarker[];
  serviceAreas: ServiceArea[];
  travelBurdenEstimates: TravelBurdenEstimate[];
  hubCoverage: HubCoverage[];
  recommendedFocusAreas: RecommendedAccessFocusArea[];
};

export type GeospatialProvider = {
  id: string;
  name: string;
  mode: GeospatialProviderMode;
  externalRequestsEnabled: false;
  getOperatingPicture: () => GeospatialOperatingPicture;
};
