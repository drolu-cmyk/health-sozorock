export type AccessRecordStatus = "ready" | "limited" | "permission";

export type AccessRecord = {
  city: string;
  county: string;
  hours: string;
  id: string;
  label: string;
  message: string;
  status: AccessRecordStatus;
  support: string;
  type: string;
  zip: string;
};

export const accessDirectoryRecords: AccessRecord[] = [
  {
    city: "Chapel Hill",
    county: "Orange County",
    hours: "Weekdays, 9:00 AM to 4:00 PM",
    id: "east-branch-access-desk",
    label: "East Branch Access Desk",
    message: "Reviewed access desk with digital readiness support.",
    status: "ready",
    support: "Device readiness, provider-platform preparation, and hub details.",
    type: "Library-based",
    zip: "27514",
  },
  {
    city: "Durham",
    county: "Durham County",
    hours: "Tuesdays and Thursdays, 11:00 AM to 5:00 PM",
    id: "northside-community-access-point",
    label: "Northside Community Access Point",
    message: "Health Access Day information and community access support.",
    status: "limited",
    support: "Health Access Day information, digital readiness, and access support.",
    type: "Community-based",
    zip: "27701",
  },
  {
    city: "Pittsboro",
    county: "Chatham County",
    hours: "Scheduled after consent-based review",
    id: "home-support-readiness-route",
    label: "Home Support Readiness Route",
    message: "Preparation support may be requested where approved.",
    status: "permission",
    support: "Preparation support for qualifying residents after review.",
    type: "Home-based",
    zip: "27312",
  },
];

export function searchAccessDirectory(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return accessDirectoryRecords;
  }

  return accessDirectoryRecords.filter((record) =>
    [record.zip, record.city, record.county, record.label, record.type]
      .map((value) => value.toLowerCase())
      .some((value) => value.includes(normalizedQuery)),
  );
}
