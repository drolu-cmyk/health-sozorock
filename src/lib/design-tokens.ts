export const designTokens = {
  color: {
    foundation: {
      950: "#071727",
      900: "#0b2136",
      800: "#12304a",
      700: "#174363",
    },
    access: {
      700: "#047857",
      600: "#059669",
      100: "#d1fae5",
    },
    signal: {
      600: "#2563eb",
      100: "#dbeafe",
    },
    assurance: {
      600: "#7c3aed",
      100: "#ede9fe",
    },
    warning: {
      600: "#ca8a04",
      100: "#fef3c7",
    },
    surface: "#f7fafc",
    line: "#d9e2ec",
    white: "#ffffff",
  },
  typography: {
    family: "Arial, Helvetica, sans-serif",
    tracking: {
      normal: "0",
      label: "0.14em",
    },
  },
  spacing: {
    pageX: "1.25rem",
    sectionY: "3.5rem",
    card: "1.5rem",
    compactGap: "0.75rem",
    standardGap: "1.25rem",
  },
  radius: {
    card: "0.5rem",
    control: "0.5rem",
  },
  status: {
    ready: {
      background: "#d1fae5",
      text: "#047857",
    },
    review: {
      background: "#fef3c7",
      text: "#ca8a04",
    },
    assurance: {
      background: "#ede9fe",
      text: "#7c3aed",
    },
    signal: {
      background: "#dbeafe",
      text: "#2563eb",
    },
  },
  layers: {
    resident: {
      standard: "simple, clear, private, human",
      surfaceClass: "border-access-600/20 bg-white",
      labelClass: "text-access-700",
      contentClass: "text-foundation-700",
    },
    county: {
      standard: "geospatial, decision-driven, action-oriented, assurance-controlled",
      surfaceClass: "border-foundation-800/20 bg-foundation-950 text-white",
      labelClass: "text-access-100",
      contentClass: "text-blue-100",
    },
  },
} as const;
