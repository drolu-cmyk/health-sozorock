"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "@/components/footer";
import type { AccessRecord } from "@/lib/access-directory";
import { brand } from "@/lib/brand";
import {
  healthAccessDayEvents,
  residentHubExamples,
} from "@/lib/resident-data";
import { voiceAccessSafetyCopy } from "@/lib/voice-access-data";

type NeedKey =
  | "local-support"
  | "health-access-day"
  | "digital-readiness"
  | "voice-access"
  | "provider-readiness";

type AppScreen =
  | "start"
  | "find"
  | "voice"
  | "prepare"
  | "hubs"
  | "support"
  | "saved"
  | "settings";
type AuthMode = "signup" | "login";
type StepStatus = AccessRecord["status"];

type ResidentSession = {
  createdAt: string;
  email: string;
  name: string;
  sessionId: string;
  zip: string;
};

type SessionResponse = {
  authenticated?: boolean;
  error?: string;
  message?: string;
  session?: ResidentSession | null;
};

type StoredResidentProfile = {
  email: string;
  name: string;
  zip: string;
};

type SpeechRecognitionEventResult = {
  transcript: string;
};

type SpeechRecognitionEventLike = {
  results: ArrayLike<ArrayLike<SpeechRecognitionEventResult>>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    __sozorockHealthReady?: boolean;
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

const profileStorageKey = "sozorock-health-resident-profiles";
const savedStepStorageKey = "sozorock-health-next-step";
const publicBoundary =
  "SozoRock® Health does not give medical advice or replace licensed care.";
const accessFallback =
  "The app works without microphone or location access.";

const appScreens: Array<{
  description: string;
  key: AppScreen;
  label: string;
}> = [
  {
    description: "Choose what you need and see the next action.",
    key: "start",
    label: "Start",
  },
  {
    description: "Search by ZIP code, city, or county.",
    key: "find",
    label: "Find access",
  },
  {
    description: "Talk to Voice Access or type instead.",
    key: "voice",
    label: "Voice Access",
  },
  {
    description: "Get ready for provider-led care.",
    key: "prepare",
    label: "Prepare",
  },
  {
    description: "Explore Health Access Days and hubs.",
    key: "hubs",
    label: "Hubs",
  },
  {
    description: "Request support when the app cannot help.",
    key: "support",
    label: "Support",
  },
  {
    description: "Review the step you saved.",
    key: "saved",
    label: "Saved",
  },
  {
    description: "Review privacy, consent, and sign out.",
    key: "settings",
    label: "Settings",
  },
];

const needs: Array<{
  description: string;
  key: NeedKey;
  label: string;
  nextStep: string;
  screen: AppScreen;
}> = [
  {
    description:
      "Find reviewed hubs, events, and access support near a ZIP code, city, or county.",
    key: "local-support",
    label: "Find access near me",
    nextStep: "Search by ZIP code, city, or county.",
    screen: "find",
  },
  {
    description:
      "See Health Access Day information and what to expect before attending.",
    key: "health-access-day",
    label: "Find a Health Access Day",
    nextStep: "Review listed event information.",
    screen: "hubs",
  },
  {
    description:
      "Prepare a device, connection, documents, and questions for provider-led care.",
    key: "digital-readiness",
    label: "Prepare for your visit",
    nextStep: "Use the provider-readiness checklist.",
    screen: "prepare",
  },
  {
    description:
      "Use guided text now while voice stays gated by consent and safety checks.",
    key: "voice-access",
    label: "Talk to Voice Access",
    nextStep: "Type instead until Voice Access is opened for your area.",
    screen: "voice",
  },
  {
    description:
      "Understand what SozoRock® Health does and what licensed providers keep responsible for.",
    key: "provider-readiness",
    label: "Provider-led pathway",
    nextStep: "Review readiness steps and boundaries.",
    screen: "prepare",
  },
];

const readinessChecklist = [
  "Write down your main question for the provider.",
  "Bring insurance or payment information if the provider asks for it.",
  "Bring current medication information for the licensed provider to review.",
  "Check your device, internet, email, and provider platform access.",
  "Ask what happens next before you leave or end the provider visit.",
];

const aiGuidanceByNeed: Record<NeedKey, string> = {
  "digital-readiness":
    "Start with your visit checklist. SozoRock® Health can help you organize what to bring and what to ask, but the provider makes care decisions.",
  "health-access-day":
    "Review the listed Health Access Day details, check the location and time, and use support if no event is listed near you right now.",
  "local-support":
    "Search by ZIP code, city, or county. If a nearby access point is not listed, use the support path so an approved operator can review the gap.",
  "provider-readiness":
    "Providers keep their platforms. SozoRock® Health helps you get ready, understand the path, and ask clearer questions before provider-led care.",
  "voice-access":
    "Voice Access is visible, but guided text is available now. The app works without microphone access.",
};

const statusLabel: Record<StepStatus, string> = {
  limited: "Limited access",
  permission: "Requires your permission",
  ready: "Enabled",
};

const statusClass: Record<StepStatus, string> = {
  limited: "border-warning-600/40 bg-warning-100 text-warning-600",
  permission: "border-signal-600/40 bg-signal-100 text-signal-600",
  ready: "border-access-600/40 bg-access-100 text-access-700",
};

const appIcons: Record<AppScreen, string> = {
  find: "search",
  hubs: "hub",
  prepare: "check",
  saved: "saved",
  settings: "settings",
  start: "home",
  support: "heart",
  voice: "voice",
};

const needIcons: Record<NeedKey, string> = {
  "digital-readiness": "check",
  "health-access-day": "calendar",
  "local-support": "pin",
  "provider-readiness": "saved",
  "voice-access": "voice",
};

function AppIcon({
  name,
  className = "",
}: {
  className?: string;
  name: string;
}) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
  };

  const paths: Record<string, React.ReactNode> = {
    calendar: (
      <>
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M4 9h16" />
        <rect height="17" rx="4" width="16" x="4" y="5" />
      </>
    ),
    check: (
      <>
        <path d="M9 12l2 2 4-5" />
        <rect height="18" rx="5" width="16" x="4" y="3" />
      </>
    ),
    heart: (
      <path d="M20 8.5c0 5-8 9.5-8 9.5s-8-4.5-8-9.5A4.5 4.5 0 0 1 12 5a4.5 4.5 0 0 1 8 3.5Z" />
    ),
    home: (
      <>
        <path d="M4 11.5 12 5l8 6.5" />
        <path d="M6.5 10.5V19h11v-8.5" />
        <path d="M10 19v-5h4v5" />
      </>
    ),
    hub: (
      <>
        <path d="M4 20h16" />
        <path d="M7 20V8l5-3 5 3v12" />
        <path d="M10 11h4" />
        <path d="M10 15h4" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    saved: (
      <path d="M7 4h10a1 1 0 0 1 1 1v16l-6-3-6 3V5a1 1 0 0 1 1-1Z" />
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m15 15 5 5" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 3.1a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 3.1h5l.3-3.1a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5a7 7 0 0 0 .1-1Z" />
      </>
    ),
    voice: (
      <>
        <path d="M4 12v0" />
        <path d="M8 8v8" />
        <path d="M12 5v14" />
        <path d="M16 8v8" />
        <path d="M20 12v0" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] ?? paths.home}</svg>;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readProfiles() {
  if (typeof window === "undefined") {
    return [] as StoredResidentProfile[];
  }

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(profileStorageKey) ?? "[]",
    ) as StoredResidentProfile[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ResidentAccessApp() {
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [session, setSession] = useState<ResidentSession | null>(null);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPasscode, setAuthPasscode] = useState("");
  const [authZip, setAuthZip] = useState("27514");
  const [authMessage, setAuthMessage] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<AppScreen>("start");
  const [selectedNeed, setSelectedNeed] = useState<NeedKey>("local-support");
  const [query, setQuery] = useState("27514");
  const [results, setResults] = useState<AccessRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [voiceConsent, setVoiceConsent] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState(
    "Voice Access is limited access. You can continue with guided text.",
  );
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [typedVoiceText, setTypedVoiceText] = useState(
    "I need help finding access near my ZIP code.",
  );
  const [supportConsent, setSupportConsent] = useState(false);
  const [savedStep, setSavedStep] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportStatus, setSupportStatus] = useState("");
  const [guidance, setGuidance] = useState(aiGuidanceByNeed["local-support"]);
  const [isGuidanceLoading, setIsGuidanceLoading] = useState(false);
  const [completedItems, setCompletedItems] = useState<string[]>([
    readinessChecklist[0],
  ]);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const selectedNeedConfig = useMemo(
    () => needs.find((need) => need.key === selectedNeed) ?? needs[0],
    [selectedNeed],
  );
  const nextStep = selectedNeedConfig.nextStep;
  const hasSpeechRecognition =
    typeof window !== "undefined" &&
    Boolean(window.SpeechRecognition ?? window.webkitSpeechRecognition);
  const firstName = session?.name.split(" ")[0] || "Olu";

  useEffect(() => {
    window.__sozorockHealthReady = true;
    window.queueMicrotask(() => setIsHydrated(true));

    let mounted = true;

    async function loadSession() {
      const response = await fetch("/api/account/session", {
        cache: "no-store",
      }).catch(() => null);
      const data = (await response?.json().catch(() => null)) as
        | SessionResponse
        | null;

      if (!mounted) {
        return;
      }

      if (data?.authenticated && data.session) {
        setSession(data.session);
        setQuery(data.session.zip || "27514");
        setAuthZip(data.session.zip || "27514");
      }

      const saved = window.localStorage.getItem(savedStepStorageKey);
      if (saved) {
        setSavedStep(saved);
      }
    }

    void loadSession();
    return () => {
      mounted = false;
      window.__sozorockHealthReady = false;
    };
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    const controller = new AbortController();

    async function runSearch() {
      setIsSearching(true);
      try {
        const response = await fetch(
          `/api/access/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        const data = (await response.json().catch(() => null)) as
          | { results?: AccessRecord[] }
          | null;
        setResults(data?.results ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }

    const timeout = window.setTimeout(runSearch, 180);
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query, session]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const controller = new AbortController();

    async function requestGuidance() {
      setIsGuidanceLoading(true);
      try {
        const response = await fetch("/api/ai/guidance", {
          body: JSON.stringify({
            need: selectedNeed,
            prompt: selectedNeedConfig.description,
            query,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          signal: controller.signal,
        });
        const data = (await response.json().catch(() => null)) as
          | { answer?: string }
          | null;
        setGuidance(data?.answer ?? aiGuidanceByNeed[selectedNeed]);
      } catch {
        if (!controller.signal.aborted) {
          setGuidance(aiGuidanceByNeed[selectedNeed]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsGuidanceLoading(false);
        }
      }
    }

    void requestGuidance();
    return () => controller.abort();
  }, [query, selectedNeed, selectedNeedConfig.description, session]);

  function chooseNeed(key: NeedKey) {
    const need = needs.find((item) => item.key === key) ?? needs[0];
    setSelectedNeed(key);
    setActiveScreen(need.screen);
  }

  function toggleChecklist(item: string) {
    setCompletedItems((current) =>
      current.includes(item)
        ? current.filter((existing) => existing !== item)
        : [...current, item],
    );
  }

  function saveNextStep() {
    const value = `${selectedNeedConfig.label}: ${nextStep}`;
    window.localStorage.setItem(savedStepStorageKey, value);
    setSavedStep(value);
  }

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthBusy(true);
    setAuthMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "")
        .trim()
        .toLowerCase();
      const passcode = String(formData.get("passcode") ?? "").trim();
      const name = String(formData.get("name") ?? "").trim();
      const zip = String(formData.get("zip") ?? "").trim();
      const profiles = readProfiles();
      const existingProfile = profiles.find((profile) => profile.email === email);
      const nextProfile: StoredResidentProfile = {
        email,
        name: name || existingProfile?.name || "Resident",
        zip: zip || existingProfile?.zip || "27514",
      };
      const nextProfiles = existingProfile
        ? profiles.map((profile) =>
            profile.email === email ? nextProfile : profile,
          )
        : [...profiles, nextProfile];
      window.localStorage.setItem(profileStorageKey, JSON.stringify(nextProfiles));

      const account =
        authMode === "signup"
          ? nextProfile
          : {
              email,
              name: existingProfile?.name ?? "Resident",
              zip: existingProfile?.zip || zip,
            };

      const immediateSession: ResidentSession = {
        createdAt: new Date().toISOString(),
        email: account.email,
        name: account.name,
        sessionId: window.crypto.randomUUID(),
        zip: account.zip,
      };
      setSession(immediateSession);
      setQuery(immediateSession.zip || "27514");
      setAuthZip(immediateSession.zip || "27514");
      setAuthPasscode("");
      setAuthMessage(
        authMode === "signup" ? "Account ready." : "Welcome back.",
      );

      const response = await fetch("/api/account/session", {
        body: JSON.stringify({
          action: authMode,
          email: account.email,
          name: account.name,
          passcode,
          zip: account.zip,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json().catch(() => null)) as
        | SessionResponse
        | null;

      if (!response.ok || !data?.session) {
        setAuthMessage(data?.error ?? "This option is temporarily unavailable.");
        return;
      }

      setSession(data.session);
      setQuery(data.session.zip || "27514");
      setAuthZip(data.session.zip || "27514");
      setAuthPasscode("");
      setAuthMessage(data.message ?? "Account ready.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function signOut() {
    await fetch("/api/account/session", {
      body: JSON.stringify({ action: "signout" }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).catch(() => null);
    setSession(null);
    setActiveScreen("start");
    setAuthMode("login");
    setAuthMessage("Signed out.");
  }

  async function requestVoiceAccess() {
    setVoiceMessage("Checking Voice Access readiness...");
    try {
      const response = await fetch("/api/voice/session", {
        body: JSON.stringify({
          consent: voiceConsent,
          language: "en-US",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json().catch(() => null)) as
        | { error?: string; fallbackPath?: string; state?: string }
        | null;
      setVoiceMessage(
        data?.error ??
          `Voice Access state: ${data?.state ?? "Limited access"}. ${
            data?.fallbackPath ?? "Type instead"
          }.`,
      );
    } catch {
      setVoiceMessage(
        "This option is temporarily unavailable. You can continue with guided text.",
      );
    }
  }

  function startTalking() {
    if (!voiceConsent) {
      setVoiceMessage("This option needs your permission before it can be used.");
      return;
    }

    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceMessage("You can continue with guided text.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();
      setSpokenText(transcript);
      setTypedVoiceText(transcript || typedVoiceText);
      setVoiceMessage(
        transcript
          ? "Speech captured. Review it, then continue with guided text."
          : "You can continue with guided text.",
      );
    };
    recognition.onerror = () => {
      setVoiceMessage("You can continue with guided text.");
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    setIsListening(true);
    setVoiceMessage("Listening...");
    recognition.start();
  }

  function stopTalking() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  async function submitSupport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSupportStatus("Preparing support request...");

    try {
      const response = await fetch("/api/support", {
        body: JSON.stringify({
          consent: supportConsent,
          message: supportMessage,
          need: selectedNeed,
          query,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json().catch(() => null)) as
        | { caseId?: string; error?: string; message?: string }
        | null;
      setSupportStatus(
        response.ok
          ? `${data?.message ?? "Support request prepared."} ${
              data?.caseId ? `Case ${data.caseId}` : ""
            }`
          : data?.error ?? "This option is temporarily unavailable.",
      );
    } catch {
      setSupportStatus(
        "This option is temporarily unavailable. You can still email support.",
      );
    }
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-white text-foundation-950">
        <section className="mx-auto grid min-h-screen max-w-6xl gap-6 px-5 py-6 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-lg bg-teal-900 p-8 text-white shadow-xl shadow-foundation-950/10 sm:p-10">
            <div>
              <p className="text-base font-bold tracking-normal">
                {brand.publicLockup}
              </p>
              <h1 className="mt-10 max-w-xl text-4xl font-bold leading-tight tracking-normal sm:text-6xl">
                {brand.promise}
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white">
                Find a clear next step for access, readiness, and support.
              </p>
              <div className="mt-10 rounded-lg border border-white/20 bg-teal-800 p-5">
                <p className="text-lg font-bold">
                  Not a clinic. Not a provider.
                </p>
                <p className="mt-1 text-lg font-bold">
                  No medical decisions or care plans.
                </p>
                <p className="mt-4 text-sm leading-6 text-white">
                  Search by ZIP code, city, or county. Type instead of using the
                  microphone. Ask support for help when the app cannot find the
                  right path.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-white p-5 shadow-xl shadow-foundation-950/10 sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-teal-700">
                  Resident app
                </p>
                <h2 className="mt-1 text-3xl font-bold">
                  {authMode === "signup" ? "Sign up" : "Welcome back"}
                </h2>
              </div>
              <span className="rounded-full border border-line px-4 py-2 text-sm font-bold text-foundation-700">
                English
              </span>
            </div>
            <div
              aria-label="Choose account action"
              className="grid rounded-lg border border-line bg-surface p-1 sm:grid-cols-2"
              role="tablist"
            >
              {(["signup", "login"] as const).map((mode) => (
                <button
                  aria-selected={authMode === mode}
                  className={`min-h-12 rounded-lg px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2 ${
                    authMode === mode
                      ? "bg-teal-900 text-white"
                      : "text-foundation-800 hover:bg-white"
                  }`}
                  data-testid={`auth-${mode}-tab`}
                  key={mode}
                  onClick={() => {
                    setAuthMode(mode);
                    setAuthMessage("");
                  }}
                  role="tab"
                  type="button"
                >
                  {mode === "signup" ? "Sign up" : "Log in"}
                </button>
              ))}
            </div>

            <form
              className="mt-6 grid gap-4"
              data-testid="auth-form"
              method="post"
              onSubmit={submitAuth}
            >
              {authMode === "signup" ? (
                <label className="grid gap-2 text-sm font-bold">
                  Name or initials
                  <input
                    autoComplete="name"
                    className="min-h-14 rounded-lg border border-line px-4 text-base font-normal outline-none focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
                    data-testid="auth-name"
                    name="name"
                    onChange={(event) => setAuthName(event.target.value)}
                    type="text"
                    value={authName}
                  />
                </label>
              ) : null}
              <label className="grid gap-2 text-sm font-bold">
                Email
                <input
                  autoComplete="email"
                  className="min-h-14 rounded-lg border border-line px-4 text-base font-normal outline-none focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
                  data-testid="auth-email"
                  name="email"
                  onChange={(event) => setAuthEmail(event.target.value)}
                  required
                  type="email"
                  value={authEmail}
                />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Passcode
                <input
                  autoComplete={
                    authMode === "signup" ? "new-password" : "current-password"
                  }
                  className="min-h-14 rounded-lg border border-line px-4 text-base font-normal outline-none focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
                  data-testid="auth-passcode"
                  minLength={6}
                  name="passcode"
                  onChange={(event) => setAuthPasscode(event.target.value)}
                  required
                  type="password"
                  value={authPasscode}
                />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                ZIP code, city, or county
                <input
                  autoComplete="postal-code"
                  className="min-h-14 rounded-lg border border-line px-4 text-base font-normal outline-none focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
                  data-testid="auth-zip"
                  name="zip"
                  onChange={(event) => setAuthZip(event.target.value)}
                  type="text"
                  value={authZip}
                />
              </label>
              <button
                className="min-h-14 rounded-lg bg-teal-900 px-5 text-base font-bold text-white shadow-lg shadow-foundation-950/15 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2 disabled:opacity-60"
                data-testid="auth-submit"
                disabled={authBusy || !isHydrated}
                type="submit"
              >
                {!isHydrated
                  ? "Getting ready..."
                  : authBusy
                  ? "Working..."
                  : authMode === "signup"
                    ? "Sign up"
                    : "Log in"}
              </button>
              {authMessage ? (
                <p
                  className="rounded-lg border border-line bg-surface p-3 text-sm font-semibold text-foundation-800"
                  role="status"
                >
                  {authMessage}
                </p>
              ) : null}
            </form>

            <p className="mt-6 text-center text-sm leading-6 text-foundation-700">
              {publicBoundary} {accessFallback}
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-foundation-950">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[280px_1fr]">
        <aside className="hidden bg-teal-900 p-6 text-white lg:flex lg:flex-col">
          <div>
            <p className="text-2xl font-bold leading-tight">
              {brand.publicLockup}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {brand.promise}
            </p>
          </div>
          <nav
            aria-label="Resident app screens"
            className="mt-10 grid gap-2"
          >
            {appScreens.map((screen) => (
              <button
                aria-label={`Open ${screen.label}`}
                className={`flex min-h-14 items-center gap-3 rounded-lg px-4 text-left text-base font-bold focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2 ${
                  activeScreen === screen.key
                    ? "bg-white text-teal-900 shadow-lg shadow-black/15"
                    : "text-white hover:bg-teal-800"
                }`}
                key={screen.key}
                onClick={() => setActiveScreen(screen.key)}
                type="button"
              >
                <span className="grid size-9 place-items-center rounded-lg border border-white/20 bg-teal-800">
                  <AppIcon className="size-5" name={appIcons[screen.key]} />
                </span>
                <span>{screen.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-lg border border-white/20 bg-teal-800 p-5">
            <p className="text-base font-bold">Not a clinic.</p>
            <p className="text-base font-bold">Not a provider.</p>
            <p className="mt-2 text-sm leading-6 text-white">
              {brand.trustBoundary} Your information is private and secure.
            </p>
          </div>
        </aside>

        <section className="grid gap-5 px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-access-700">
                {brand.publicLockup}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-normal sm:text-4xl">
                Welcome, {firstName}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="hidden min-h-11 rounded-full border border-line px-4 text-sm font-bold text-foundation-800 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2 sm:inline-flex sm:items-center"
                onClick={() => setActiveScreen("support")}
                type="button"
              >
                Request support
              </button>
              <button
                className="min-h-11 rounded-full border border-line px-4 text-sm font-bold text-foundation-800 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
                onClick={signOut}
                type="button"
              >
                Sign out
              </button>
            </div>
          </header>

          <nav
            aria-label="Resident app screens"
            className="grid grid-cols-3 gap-2 lg:hidden"
          >
            {appScreens.map((screen) => (
              <button
                className={`min-h-12 rounded-lg px-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2 ${
                  activeScreen === screen.key
                    ? "bg-teal-900 text-white"
                    : "border border-line bg-white text-foundation-800"
                }`}
                key={screen.key}
                onClick={() => setActiveScreen(screen.key)}
                type="button"
              >
                {screen.label}
              </button>
            ))}
          </nav>

          <article className="relative overflow-hidden rounded-lg border border-line bg-warm-100 p-5 shadow-xl shadow-foundation-950/5 sm:p-8">
            <div className="relative grid gap-6 xl:grid-cols-[1fr_320px] xl:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">
                  What do you need today?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-foundation-700">
                  Search by ZIP code, city, or county. We will show the clearest
                  next step we can find.
                </p>
                <label className="mt-6 grid gap-2 text-sm font-bold text-foundation-950">
                  Search by ZIP code, city, or county
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      className="min-h-14 flex-1 rounded-lg border border-line bg-white px-4 text-base font-normal outline-none shadow-sm focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
                      onChange={(event) => setQuery(event.target.value)}
                      type="search"
                      value={query}
                    />
                    <button
                      className="min-h-14 rounded-lg bg-access-700 px-7 text-base font-bold text-white shadow-lg shadow-access-700/20 hover:bg-access-600 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                      onClick={() => setActiveScreen("find")}
                      type="button"
                    >
                      Search
                    </button>
                  </div>
                </label>
              </div>
              <div className="rounded-lg border border-access-600/20 bg-white p-5 shadow-sm">
                <p className="text-sm font-bold text-access-700">
                  Guided next step
                </p>
                  <p className="mt-2 text-base font-bold text-foundation-950">
                  {results[0]?.label ?? "Search first, then choose a next step."}
                </p>
                <p className="mt-2 text-sm leading-6 text-foundation-700">
                  {isGuidanceLoading ? "Preparing guidance..." : guidance}
                </p>
                <button
                  className="mt-4 min-h-11 w-full rounded-lg bg-teal-900 px-4 text-sm font-bold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
                  onClick={saveNextStep}
                  type="button"
                >
                  Save my next step
                </button>
              </div>
            </div>
            {savedStep ? (
              <p
                className="mt-5 rounded-lg border border-access-600/30 bg-access-100 p-3 text-sm font-bold text-access-700"
                role="status"
              >
                Saved: {savedStep}
              </p>
            ) : null}
          </article>

          {activeScreen === "start" ? (
            <article className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-2xl font-bold">Choose one path</h2>
                <p className="mt-2 text-sm leading-6 text-foundation-700">
                  Start with the thing you need now. You can switch anytime.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {needs.map((need) => (
                  <button
                    className={`min-h-32 rounded-lg border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2 ${
                      selectedNeed === need.key
                        ? "border-access-600 bg-access-100 shadow-sm"
                        : "border-line bg-white hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                    key={need.key}
                    onClick={() => chooseNeed(need.key)}
                    type="button"
                  >
                    <span className="mb-4 grid size-10 place-items-center rounded-lg bg-teal-900 text-white">
                      <AppIcon className="size-5" name={needIcons[need.key]} />
                    </span>
                    <span className="block text-base font-bold text-foundation-950">
                      {need.label}
                    </span>
                    <span className="mt-3 block text-sm font-bold text-access-700">
                      {need.nextStep}
                    </span>
                  </button>
                ))}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold">Voice Access</h2>
                    <span className="rounded-full border border-signal-600/25 bg-signal-100 px-3 py-1 text-xs font-bold text-signal-600">
                      Requires permission
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-foundation-700">
                    Voice is optional. The app works with guided text.
                  </p>
                  <div className="mt-4 grid gap-3">
                    <button
                      className="min-h-12 rounded-lg bg-teal-900 px-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
                      onClick={() => setActiveScreen("voice")}
                      type="button"
                    >
                      Start talking
                    </button>
                    <button
                      className="min-h-12 rounded-lg border border-line px-4 text-sm font-bold text-foundation-950 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                      onClick={() => setActiveScreen("voice")}
                      type="button"
                    >
                      Type instead
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-2xl font-bold">Support</h2>
                  <p className="mt-3 text-sm leading-6 text-foundation-700">
                    If the app cannot help, ask a person to review your request.
                  </p>
                  <button
                    className="mt-4 min-h-12 w-full rounded-lg bg-access-700 px-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                    onClick={() => setActiveScreen("support")}
                    type="button"
                  >
                    Request support
                  </button>
                </div>
              </div>
            </article>
          ) : null}

          {activeScreen === "find" ? (
            <article className="grid gap-5 xl:grid-cols-[1fr_360px]">
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-access-700">
                      Search
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                      Access near {query || "you"}
                    </h2>
                  </div>
                  <p className="text-sm font-bold text-foundation-700">
                    {isSearching
                      ? "Searching..."
                      : results.length > 0
                        ? `${results.length} found`
                        : "No match yet"}
                  </p>
                </div>
                <div className="mt-5 grid gap-3">
                  {results.length > 0 ? (
                    results.map((result) => (
                      <button
                        className="rounded-lg border border-line bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                        key={result.id}
                        onClick={() => {
                          setSelectedNeed("local-support");
                          setGuidance(result.message);
                        }}
                        type="button"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-base font-bold text-foundation-950">
                              {result.label}
                            </p>
                            <p className="mt-1 text-sm text-foundation-700">
                              {result.city}, {result.county} {result.zip}
                            </p>
                          </div>
                          <span
                            className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusClass[result.status]}`}
                          >
                            {statusLabel[result.status]}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-foundation-700">
                          {result.message}
                        </p>
                        <p className="mt-3 text-sm font-bold text-access-700">
                          {result.hours}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="rounded-lg border border-line bg-surface p-6">
                      <p className="text-base font-bold">
                        We could not find a nearby access point yet.
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foundation-700">
                        You can still search by ZIP code, city, or county, or
                        request support.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-access-600/20 bg-access-100 p-5 shadow-sm sm:p-6">
                <h2 className="text-2xl font-bold">Your next step</h2>
                <p className="mt-3 text-sm leading-6 text-foundation-800">
                  {results[0]
                    ? `Visit ${results[0].label}. ${results[0].support}`
                    : "Search first. If nothing appears, request support."}
                </p>
                <button
                  className="mt-5 min-h-12 w-full rounded-lg bg-teal-900 px-4 text-sm font-bold text-white"
                  onClick={saveNextStep}
                  type="button"
                >
                  Save my next step
                </button>
              </div>
            </article>
          ) : null}

          {activeScreen === "voice" ? (
            <article className="grid gap-5 xl:grid-cols-[1fr_360px]">
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-signal-600">
                      SozoRock® Health Voice Access
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                      Talk, or type instead.
                    </h2>
                  </div>
                  <span className="w-fit rounded-full border border-signal-600/25 bg-signal-100 px-3 py-1 text-xs font-bold text-signal-600">
                    Requires permission
                  </span>
                </div>
                <p className="mt-4 leading-7 text-foundation-700">
                  {voiceAccessSafetyCopy.boundary} Guided text stays available
                  if voice is not available in your area yet.
                </p>
                <div className="mt-5 grid gap-4">
                  <label className="flex min-h-12 items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900">
                    <input
                      checked={voiceConsent}
                      className="mt-1 size-4 accent-access-700"
                      onChange={(event) => setVoiceConsent(event.target.checked)}
                      type="checkbox"
                    />
                    This option needs your permission before it can be used.
                  </label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <button
                      className="min-h-12 rounded-lg bg-teal-900 px-4 text-sm font-bold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
                      onClick={startTalking}
                      type="button"
                    >
                      {isListening ? "Listening..." : "Start talking"}
                    </button>
                    {isListening ? (
                      <button
                        className="min-h-12 rounded-lg border border-foundation-800 px-4 text-sm font-bold text-foundation-950 hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
                        onClick={stopTalking}
                        type="button"
                      >
                        Stop
                      </button>
                    ) : null}
                    <button
                      className="min-h-12 rounded-lg border border-line px-4 text-sm font-bold text-foundation-950 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                      onClick={requestVoiceAccess}
                      type="button"
                    >
                      Check availability
                    </button>
                  </div>
                  <label className="grid gap-2 text-sm font-bold text-foundation-950">
                    Type instead
                    <textarea
                      className="min-h-36 rounded-lg border border-line bg-white px-4 py-3 text-base font-normal leading-7 outline-none focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
                      onChange={(event) => setTypedVoiceText(event.target.value)}
                      value={typedVoiceText}
                    />
                  </label>
                  {spokenText ? (
                    <p className="text-sm font-semibold text-access-700">
                      Speech captured: {spokenText}
                    </p>
                  ) : null}
                  <p
                    className="rounded-lg border border-line bg-surface p-3 text-sm font-semibold text-foundation-800"
                    role="status"
                  >
                    {voiceMessage} The app works without microphone or location
                    access.
                  </p>
                  {!hasSpeechRecognition ? (
                    <p className="text-sm font-semibold text-foundation-700">
                      You can continue with guided text.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-2xl font-bold">What voice can do</h2>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-foundation-700">
                  <li>Explain what you need in plain words.</li>
                  <li>Help you prepare for provider-led care.</li>
                  <li>Help you keep searching by ZIP code, city, or county.</li>
                </ul>
                <p className="mt-5 rounded-lg border border-line bg-surface p-4 text-sm font-bold leading-6 text-foundation-900">
                  SozoRock® Health does not give medical advice or replace
                  licensed care. {accessFallback}
                </p>
              </div>
            </article>
          ) : null}

          {activeScreen === "prepare" ? (
            <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-bold text-access-700">
                Prepare for your visit
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {brand.providerPathway}
              </h2>
              <div className="mt-6 grid gap-3">
                {readinessChecklist.map((item) => (
                  <label
                    className="flex min-h-12 items-start gap-3 rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-foundation-900 shadow-sm"
                    key={item}
                  >
                    <input
                      checked={completedItems.includes(item)}
                      className="mt-1 size-4 accent-access-700"
                      onChange={() => toggleChecklist(item)}
                      type="checkbox"
                    />
                    {item}
                  </label>
                ))}
              </div>
              <p className="mt-5 rounded-lg border border-access-600/30 bg-access-100 p-4 text-sm font-bold leading-6 text-access-700">
                {completedItems.length} of {readinessChecklist.length} steps
                selected.
              </p>
            </article>
          ) : null}

          {activeScreen === "hubs" ? (
            <article className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-2xl font-bold">
                  Health Access Day information
                </h2>
                <div className="mt-5 grid gap-3">
                  {healthAccessDayEvents.map((event) => (
                    <div
                      className="rounded-lg border border-line bg-white p-4 shadow-sm"
                      key={`${event.title}-${event.date}`}
                    >
                      <p className="font-bold">{event.title}</p>
                      <p className="mt-1 text-sm text-foundation-700">
                        {event.date}, {event.time}
                      </p>
                      <p className="mt-1 text-sm text-foundation-700">
                        {event.location}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foundation-700">
                        {event.support}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-2xl font-bold">Health Equity Hubs</h2>
                <div className="mt-5 grid gap-3">
                  {residentHubExamples.map((hub) => (
                    <div
                      className="rounded-lg border border-line bg-white p-4 shadow-sm"
                      key={hub.name}
                    >
                      <p className="font-bold">{hub.name}</p>
                      <p className="mt-1 text-sm font-bold text-access-700">
                        {hub.type}
                      </p>
                      <p className="mt-2 text-sm text-foundation-700">
                        {hub.distance} - {hub.hours}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foundation-700">
                        {hub.support}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ) : null}

          {activeScreen === "support" ? (
            <article className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-bold text-access-700">
                Request support
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Ask for help when the app cannot find the right path.
              </h2>
              <form className="mt-5 grid gap-4" onSubmit={submitSupport}>
                <label className="grid gap-2 text-sm font-bold text-foundation-950">
                  What should support understand?
                  <textarea
                    className="min-h-36 rounded-lg border border-line bg-white px-4 py-3 text-base font-normal leading-7 outline-none focus:border-access-600 focus:ring-2 focus:ring-access-600/25"
                    onChange={(event) => setSupportMessage(event.target.value)}
                    value={supportMessage}
                  />
                </label>
                <label className="flex min-h-12 items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-bold text-foundation-900">
                  <input
                    checked={supportConsent}
                    className="mt-1 size-4 accent-access-700"
                    onChange={(event) => setSupportConsent(event.target.checked)}
                    type="checkbox"
                  />
                  I give permission for SozoRock® Health support to respond to
                  this request.
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    className="min-h-12 rounded-lg bg-teal-900 px-4 text-sm font-bold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
                    type="submit"
                  >
                    Prepare support request
                  </button>
                  <a
                    className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line px-4 text-sm font-bold text-foundation-950 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                    href={`mailto:support@sozorockfoundation.org?subject=SozoRock%20Health%20support%20request&body=${encodeURIComponent(
                      supportMessage || "I need help with an access next step.",
                    )}`}
                  >
                    Email support
                  </a>
                </div>
                {supportStatus ? (
                  <p
                    className="text-sm font-semibold text-access-700"
                    role="status"
                  >
                    {supportStatus}
                  </p>
                ) : null}
              </form>
            </article>
          ) : null}

          {activeScreen === "saved" ? (
            <article className="grid gap-5 xl:grid-cols-[1fr_360px]">
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <p className="text-sm font-bold text-access-700">
                  Saved step
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Keep your next step easy to find.
                </h2>
                <div className="mt-6 rounded-lg border border-access-600/25 bg-access-100 p-5">
                  <p className="text-sm font-bold text-access-700">
                    Current saved step
                  </p>
                  <p className="mt-2 text-lg font-bold text-foundation-950">
                    {savedStep || `${selectedNeedConfig.label}: ${nextStep}`}
                  </p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    className="min-h-12 rounded-lg bg-teal-900 px-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
                    onClick={saveNextStep}
                    type="button"
                  >
                    Save my next step
                  </button>
                  <button
                    className="min-h-12 rounded-lg border border-line px-4 text-sm font-bold text-foundation-950 focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                    onClick={() => setActiveScreen("find")}
                    type="button"
                  >
                    Search again
                  </button>
                </div>
              </div>
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-2xl font-bold">What to do next</h2>
                <p className="mt-3 text-sm leading-6 text-foundation-700">
                  Bring this step with you, ask support to review it, or update
                  it after a new search.
                </p>
                <button
                  className="mt-5 min-h-12 w-full rounded-lg bg-access-700 px-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-access-600 focus:ring-offset-2"
                  onClick={() => setActiveScreen("support")}
                  type="button"
                >
                  Ask support
                </button>
              </div>
            </article>
          ) : null}

          {activeScreen === "settings" ? (
            <article className="grid gap-5 xl:grid-cols-[1fr_360px]">
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <p className="text-sm font-bold text-access-700">
                  Settings and privacy
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  You control how the app works.
                </h2>
                <div className="mt-6 grid gap-3">
                  {[
                    "The app works without microphone access.",
                    "The app works without location access.",
                    "Search by ZIP code, city, or county is always available.",
                    "We do not sell your data.",
                  ].map((item) => (
                    <div
                      className="rounded-lg border border-line bg-surface p-4 text-sm font-bold text-foundation-900"
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-line bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-2xl font-bold">Account</h2>
                <p className="mt-3 text-sm leading-6 text-foundation-700">
                  Signed in as {session.email}. Sign out when you are finished.
                </p>
                <button
                  className="mt-5 min-h-12 w-full rounded-lg bg-teal-900 px-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2"
                  onClick={signOut}
                  type="button"
                >
                  Sign out
                </button>
              </div>
            </article>
          ) : null}

          <footer className="flex flex-col gap-3 border-t border-line py-5 text-sm font-semibold text-foundation-700 sm:flex-row sm:items-center sm:justify-between">
            <span>Your information is private and secure.</span>
            <span>Search and guided text always stay available.</span>
            <span>We do not sell your data.</span>
          </footer>
        </section>
      </div>
      <Footer />
    </main>
  );
}

export const residentAppSearchTerms = needs
  .map((need) => escapeRegExp(need.label))
  .join("|");
