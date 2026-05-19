export { mockGeospatialProvider } from "@/lib/geospatial/mock-provider";
export type {
  AccessGapLevel,
  AccessPriority,
  GeospatialAccessSignal,
  GeospatialOperatingPicture,
  GeospatialProvider,
  HubCoverage,
  HubCoverageLevel,
  MapMarker,
  MapPoint,
  RecommendedAccessFocusArea,
  ServiceArea,
  TravelBurdenEstimate,
  TravelBurdenLevel,
} from "@/lib/geospatial/types";

import { mockGeospatialProvider } from "@/lib/geospatial/mock-provider";

export function getCountyGeospatialProvider() {
  return mockGeospatialProvider;
}
