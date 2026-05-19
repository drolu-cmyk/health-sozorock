import { countyAccessSignals } from "@/lib/county-data";
import type {
  AccessPriority,
  GeospatialAccessSignal,
  GeospatialOperatingPicture,
  GeospatialProvider,
  HubCoverageLevel,
  MapPoint,
  TravelBurdenLevel,
} from "@/lib/geospatial/types";

const markerPositionsByZip: Record<string, MapPoint> = {
  "27514": { xPercent: 14, yPercent: 22 },
  "27516": { xPercent: 46, yPercent: 46 },
  "27703": { xPercent: 72, yPercent: 30 },
};

const serviceAreas = [
  {
    id: "mock-service-area-west",
    name: "West access planning area",
    zipCodes: ["27514", "27516"],
    coverage: "Moderate",
    planningNote: "Synthetic service area for hub coverage comparison.",
  },
  {
    id: "mock-service-area-east",
    name: "East access planning area",
    zipCodes: ["27703"],
    coverage: "Emerging",
    planningNote: "Synthetic service area for community access planning.",
  },
] as const;

const travelBurdenEstimates = [
  {
    zip: "27514",
    level: "Elevated",
    estimate: "Longer travel burden pattern",
    evidenceSource: "Synthetic access signal model",
  },
  {
    zip: "27516",
    level: "Moderate",
    estimate: "Moderate travel burden pattern",
    evidenceSource: "Synthetic access signal model",
  },
  {
    zip: "27703",
    level: "Low",
    estimate: "Lower travel burden pattern",
    evidenceSource: "Synthetic access signal model",
  },
] as const;

const hubCoverage = [
  {
    zip: "27514",
    level: "Limited",
    hubTypes: ["Community-based"],
    coverageNote: "Synthetic coverage gap for field activation planning.",
  },
  {
    zip: "27516",
    level: "Moderate",
    hubTypes: ["Library-based", "Community-based"],
    coverageNote: "Synthetic coverage signal for Digital Access Guide planning.",
  },
  {
    zip: "27703",
    level: "Emerging",
    hubTypes: ["Community-based", "Home-based"],
    coverageNote: "Synthetic coverage signal for hub growth planning.",
  },
] as const;

function buildAccessSignals(): GeospatialAccessSignal[] {
  return countyAccessSignals.map((signal) => {
    const marker = {
      id: `mock-marker-${signal.zip}`,
      zip: signal.zip,
      label: `ZIP ${signal.zip}`,
      priority: signal.priority as AccessPriority,
      position: markerPositionsByZip[signal.zip],
      recommendedAction: signal.nextAction,
    };

    return {
      zip: signal.zip,
      priority: signal.priority as AccessPriority,
      accessGap: signal.accessGap,
      hubCoverage: signal.hubCoverage as HubCoverageLevel,
      travelBurden: signal.travelBurden as TravelBurdenLevel,
      digitalReadiness: signal.digitalReadiness,
      engagement: signal.engagement,
      recommendedAction: signal.nextAction,
      marker,
    };
  });
}

function buildOperatingPicture(): GeospatialOperatingPicture {
  const accessSignals = buildAccessSignals();

  return {
    accessSignals,
    markers: accessSignals.map((signal) => signal.marker),
    serviceAreas: [...serviceAreas],
    travelBurdenEstimates: [...travelBurdenEstimates],
    hubCoverage: [...hubCoverage],
    recommendedFocusAreas: accessSignals.map((signal) => ({
      zip: signal.zip,
      priority: signal.priority,
      recommendedAction: signal.recommendedAction,
      rationale: [
        `${signal.accessGap} access gap`,
        `${signal.hubCoverage} hub coverage`,
        `${signal.travelBurden} travel burden`,
        signal.digitalReadiness,
      ],
      humanReviewRequired: true,
    })),
  };
}

export const mockGeospatialProvider: GeospatialProvider = {
  id: "mock-geospatial-provider",
  name: "Mock geospatial provider",
  mode: "mock",
  externalRequestsEnabled: false,
  getOperatingPicture: buildOperatingPicture,
};
