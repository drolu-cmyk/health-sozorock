import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  accessibilitySupportText,
  aiGuidanceConsent,
  aiGuidanceMustNotDo,
  aiResponseStyle,
  dataClassification,
  emergencyAndCrisisMessages,
  healthAccessDayDefinition,
  healthAccessDayEvents,
  healthAccessDayFallbacks,
  howItWorksSteps,
  hubSearchOptions,
  locationConsent,
  microphoneConsent,
  preparationChecklist,
  privacyBoundaryText,
  privacyExplanations,
  providerBoundaryItems,
  providerPathwayOptions,
  providerPathwayRequiredCopy,
  providerQuestions,
  residentBottomTabs,
  residentMenuItems,
  residentNeeds,
  residentPromise,
  residentRequiredCopy,
  residentScreenStates,
  residentTopBar,
  residentTrustLine,
  type ResidentNeed,
  type ResidentScreenId,
} from "@sozorock-health/shared";
import { guidanceProvider } from "./src/services/aiGuidanceProvider";
import { eventDiscoveryProvider } from "./src/services/eventDiscoveryProvider";
import { hubDiscoveryProvider } from "./src/services/hubDiscoveryProvider";
import { locationProvider } from "./src/services/locationProvider";
import { mapProvider } from "./src/services/mapProvider";
import { voiceInputProvider } from "./src/services/voiceInputProvider";

type PermissionState = "notAsked" | "granted" | "denied";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ResidentScreenId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<ResidentNeed | null>(null);
  const [microphonePermission, setMicrophonePermission] = useState<PermissionState>("notAsked");
  const [locationPermission, setLocationPermission] = useState<PermissionState>("notAsked");
  const [query, setQuery] = useState("");

  const navigate = (screen: ResidentScreenId) => {
    setActiveScreen(screen);
    setMenuOpen(false);
  };

  const content = useMemo(() => {
    const screenProps = {
      locationPermission,
      microphonePermission,
      navigate,
      query,
      selectedNeed,
      setLocationPermission,
      setMicrophonePermission,
      setQuery,
      setSelectedNeed,
    };

    switch (activeScreen) {
      case "start":
        return <StartScreen {...screenProps} />;
      case "voice":
        return <VoiceScreen {...screenProps} />;
      case "day":
        return <HealthAccessDayScreen />;
      case "hubs":
        return <HubsScreen {...screenProps} />;
      case "providerPathway":
        return <ProviderPathwayScreen navigate={navigate} />;
      case "privacy":
        return <PrivacyBoundaryScreen />;
      case "howItWorks":
        return <HowItWorksScreen navigate={navigate} />;
      case "accessibility":
        return <AccessibilityScreen />;
      case "about":
        return <AboutScreen navigate={navigate} />;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  }, [activeScreen, locationPermission, microphonePermission, query, selectedNeed]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.topBarTitle}>{residentTopBar.title}</Text>
            <Text style={styles.topBarPromise}>{residentPromise}</Text>
          </View>
          <Pressable
            accessibilityLabel="Open resident menu"
            onPress={() => setMenuOpen((value) => !value)}
            style={styles.menuButton}
          >
            <Text style={styles.menuButtonText}>{residentTopBar.menuLabel}</Text>
          </Pressable>
        </View>

        {menuOpen ? <MenuDrawer navigate={navigate} /> : null}

        <ScrollView contentContainerStyle={styles.screenContent}>{content}</ScrollView>

        <View style={styles.bottomTabs}>
          {residentBottomTabs.map((tab) => (
            <Pressable
              accessibilityLabel={tab.accessibilityLabel}
              key={tab.id}
              onPress={() => navigate(tab.id)}
              style={[styles.tabButton, activeScreen === tab.id ? styles.tabButtonActive : null]}
            >
              <Text style={[styles.tabLabel, activeScreen === tab.id ? styles.tabLabelActive : null]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function MenuDrawer({ navigate }: { navigate: (screen: ResidentScreenId) => void }) {
  return (
    <View accessibilityLabel="Resident menu drawer" style={styles.drawer}>
      {residentMenuItems.map((item) => (
        <Pressable key={item.id} onPress={() => navigate(item.id)} style={styles.drawerItem}>
          <Text style={styles.drawerTitle}>{item.label}</Text>
          <Text style={styles.drawerDescription}>{item.description}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function HomeScreen({ navigate }: { navigate: (screen: ResidentScreenId) => void }) {
  const actions: Array<{ label: string; description: string; screen: ResidentScreenId }> = [
    { label: "Start Resident Access", description: "Choose what you need today.", screen: "start" },
    { label: "Use Voice Access", description: "Speak or type for non-clinical guidance.", screen: "voice" },
    { label: "Find Health Access Day", description: "See event guidance and what to bring.", screen: "day" },
    { label: "Find Hubs", description: "Browse trusted access points near you.", screen: "hubs" },
  ];

  return (
    <ScreenFrame eyebrow="Home" title={residentPromise} description="Choose one clear next step.">
      <TrustCard />
      <View style={styles.cardStack}>
        {actions.map((action) => (
          <Pressable
            accessibilityLabel={action.label}
            key={action.label}
            onPress={() => navigate(action.screen)}
            style={styles.tapCard}
          >
            <Text style={styles.tapCardTitle}>{action.label}</Text>
            <Text style={styles.tapCardText}>{action.description}</Text>
          </Pressable>
        ))}
      </View>
      <SafetyStrip />
    </ScreenFrame>
  );
}

function StartScreen({
  navigate,
  selectedNeed,
  setSelectedNeed,
}: {
  navigate: (screen: ResidentScreenId) => void;
  selectedNeed: ResidentNeed | null;
  setSelectedNeed: (need: ResidentNeed) => void;
}) {
  return (
    <ScreenFrame
      eyebrow="Access Start"
      title="What do you need today?"
      description={residentRequiredCopy.noStorage}
    >
      <View style={styles.cardStack}>
        {residentNeeds.map((need) => (
          <Pressable
            accessibilityLabel={`Choose ${need.title}`}
            accessibilityState={{ selected: selectedNeed?.id === need.id }}
            key={need.id}
            onPress={() => setSelectedNeed(need)}
            style={[styles.tapCard, selectedNeed?.id === need.id ? styles.tapCardSelected : null]}
          >
            <Text style={styles.tapCardTitle}>{need.title}</Text>
            <Text style={styles.tapCardText}>{need.description}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.guidanceCard}>
        <Text style={styles.guidanceTitle}>Next-step guidance</Text>
        <Text style={styles.bodyText}>
          {selectedNeed?.guidance ?? "Choose a need to see simple, non-clinical next steps."}
        </Text>
        <View style={styles.rowWrap}>
          <ActionButton
            label="Continue"
            onPress={() => navigate(selectedNeed?.nextScreen ?? "voice")}
            variant="primary"
          />
          <ActionButton label="Use Voice Access" onPress={() => navigate("voice")} variant="secondary" />
        </View>
      </View>
      <SafetyStrip />
    </ScreenFrame>
  );
}

function VoiceScreen({
  microphonePermission,
  navigate,
  setMicrophonePermission,
}: {
  microphonePermission: PermissionState;
  navigate: (screen: ResidentScreenId) => void;
  setMicrophonePermission: (state: PermissionState) => void;
}) {
  const voiceTopics = guidanceProvider.getVoiceTopics();
  const unavailable = voiceInputProvider.status === "serviceUnavailable";

  return (
    <ScreenFrame
      eyebrow="Voice Access"
      title="Speak or tap to find local support."
      description={residentRequiredCopy.voiceBoundary}
    >
      <ConsentPanel
        title={microphoneConsent.title}
        bullets={microphoneConsent.bullets}
        primaryLabel={microphoneConsent.acceptLabel}
        secondaryLabel={microphoneConsent.declineLabel}
        onPrimary={() => setMicrophonePermission("granted")}
        onSecondary={() => setMicrophonePermission("denied")}
      />

      <View style={styles.voiceCircle}>
        <Text style={styles.voiceCircleText}>{microphonePermission === "granted" ? "Ready" : "Voice"}</Text>
      </View>

      <View style={styles.rowWrap}>
        <ActionButton
          label="Speak"
          onPress={() => setMicrophonePermission("granted")}
          variant="primary"
        />
        <ActionButton label="Type instead" onPress={() => setMicrophonePermission("denied")} variant="secondary" />
        <ActionButton label="Choose topic" onPress={() => undefined} variant="secondary" />
      </View>

      {microphonePermission === "denied" ? (
        <StateCard title="Permission denied fallback" body={residentScreenStates.permissionDenied} />
      ) : null}

      {unavailable ? (
        <StateCard title="Service unavailable fallback" body={residentScreenStates.serviceUnavailable} />
      ) : null}

      <InfoSection title={aiGuidanceConsent.title} items={aiGuidanceConsent.bullets} />
      <InfoSection title="AI guidance must not" items={aiGuidanceMustNotDo} />
      <InfoSection title="AI response style" items={aiResponseStyle} />

      <View style={styles.cardStack}>
        {voiceTopics.map((topic) => (
          <Pressable key={topic.id} onPress={() => navigate(topic.id.includes("hub") ? "hubs" : "day")} style={styles.tapCard}>
            <Text style={styles.tapCardTitle}>{topic.label}</Text>
            <Text style={styles.tapCardText}>{topic.response}</Text>
          </Pressable>
        ))}
      </View>
      <SafetyStrip />
    </ScreenFrame>
  );
}

function HealthAccessDayScreen() {
  return (
    <ScreenFrame
      eyebrow="Health Access Day"
      title="Find Health Access Day information."
      description={healthAccessDayDefinition}
    >
      <InfoSection title="What to expect" items={healthAccessDayEvents[0].whatToExpect} />
      <InfoSection title="What to bring" items={healthAccessDayEvents[0].whatToBring} />
      <InfoSection title="What we do not collect" items={healthAccessDayEvents[0].whatIsNotCollected} />
      <View style={styles.cardStack}>
        {eventDiscoveryProvider.listEvents().map((event) => (
          <View key={event.id} style={styles.tapCard}>
            <Text style={styles.tapCardTitle}>{event.eventName}</Text>
            <Text style={styles.tapCardText}>{event.date} at {event.time}</Text>
            <Text style={styles.tapCardText}>{event.venue}</Text>
            <Text style={styles.smallMuted}>{event.registrationStatus}</Text>
            <Text style={styles.smallMuted}>{event.accessibilityNotes}</Text>
          </View>
        ))}
      </View>
      <StateCard title="Empty state" body={healthAccessDayFallbacks.empty} />
      <StateCard title="Offline state" body={healthAccessDayFallbacks.offline} />
      <StateCard title="Service unavailable state" body={healthAccessDayFallbacks.serviceUnavailable} />
      <SafetyStrip />
    </ScreenFrame>
  );
}

function HubsScreen({
  locationPermission,
  query,
  setLocationPermission,
  setQuery,
}: {
  locationPermission: PermissionState;
  query: string;
  setLocationPermission: (state: PermissionState) => void;
  setQuery: (value: string) => void;
}) {
  const hubs = hubDiscoveryProvider.search(query);

  return (
    <ScreenFrame
      eyebrow="Hubs"
      title="Find trusted access points near you."
      description={residentRequiredCopy.locationBoundary}
    >
      <ConsentPanel
        title={locationConsent.title}
        bullets={locationConsent.bullets}
        primaryLabel={locationConsent.acceptLabel}
        secondaryLabel={locationConsent.declineLabel}
        onPrimary={() => setLocationPermission("granted")}
        onSecondary={() => setLocationPermission("denied")}
      />
      <TextInput
        accessibilityLabel="Search by ZIP code, city, or county"
        onChangeText={setQuery}
        placeholder="ZIP code, city, or county"
        placeholderTextColor="#5b7088"
        style={styles.input}
        value={query}
      />
      <View style={styles.rowWrap}>
        {hubSearchOptions.map((option) => (
          <View key={option} style={styles.pill}>
            <Text style={styles.pillText}>{option}</Text>
          </View>
        ))}
      </View>
      {locationPermission === "denied" ? (
        <StateCard title="Permission denied state" body={residentScreenStates.permissionDenied} />
      ) : null}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapTitle}>{mapProvider.label}</Text>
        <Text style={styles.mapText}>{mapProvider.boundary}</Text>
      </View>
      <StateCard title="Location fallback" body={locationProvider.fallbackOptions.join(" ")} />
      <View style={styles.cardStack}>
        {hubs.map((hub) => (
          <View key={hub.id} style={styles.tapCard}>
            <Text style={styles.tapCardTitle}>{hub.name}</Text>
            <Text style={styles.tapCardText}>{hub.hubType} - {hub.distanceLabel}</Text>
            <Text style={styles.tapCardText}>{hub.address}, {hub.city}</Text>
            <Text style={styles.smallMuted}>{hub.hours}</Text>
            <Text style={styles.smallMuted}>{hub.partnerStatus}</Text>
            <Text style={styles.smallMuted}>{hub.directionsLabel}</Text>
          </View>
        ))}
      </View>
      {hubs.length === 0 ? <StateCard title="Empty state" body={residentScreenStates.empty} /> : null}
      <StateCard title="Offline state" body={residentScreenStates.offline} />
      <StateCard title="Service unavailable state" body={residentScreenStates.serviceUnavailable} />
      <SafetyStrip />
    </ScreenFrame>
  );
}

function ProviderPathwayScreen({ navigate }: { navigate: (screen: ResidentScreenId) => void }) {
  return (
    <ScreenFrame
      eyebrow="Provider-Led Pathway"
      title={providerPathwayRequiredCopy}
      description="Prepare for provider-led care without SozoRock Health replacing licensed care."
    >
      <View style={styles.cardStack}>
        {providerPathwayOptions.map((option) => (
          <View key={option.id} style={styles.tapCard}>
            <Text style={styles.tapCardTitle}>{option.title}</Text>
            <Text style={styles.tapCardText}>{option.guidance}</Text>
          </View>
        ))}
      </View>
      <InfoSection title="Preparation checklist" items={preparationChecklist} />
      <InfoSection title="Questions to ask a provider" items={providerQuestions} />
      <InfoSection title="What SozoRock Health does not do" items={providerBoundaryItems} />
      <View style={styles.rowWrap}>
        <ActionButton label="Use Voice Access" onPress={() => navigate("voice")} variant="primary" />
        <ActionButton label="Find nearby hubs" onPress={() => navigate("hubs")} variant="secondary" />
        <ActionButton label="Review Health Access Day" onPress={() => navigate("day")} variant="secondary" />
      </View>
      <SafetyStrip />
    </ScreenFrame>
  );
}

function PrivacyBoundaryScreen() {
  return (
    <ScreenFrame eyebrow="Privacy Boundary" title={residentTrustLine} description="You control what you choose to share.">
      <InfoSection title="Plain-language boundary" items={privacyBoundaryText} />
      <View style={styles.cardStack}>
        {Object.entries(privacyExplanations).map(([key, value]) => (
          <StateCard key={key} title={key} body={value} />
        ))}
      </View>
      <View style={styles.cardStack}>
        {dataClassification.slice(0, 5).map((item) => (
          <View key={item.category} style={styles.dataRow}>
            <Text style={styles.tapCardTitle}>{item.category}</Text>
            <Text style={styles.tapCardText}>{item.residentExplanation}</Text>
            <Text style={styles.smallMuted}>Stored: {item.stored}. Consent: {item.consent}.</Text>
          </View>
        ))}
      </View>
    </ScreenFrame>
  );
}

function HowItWorksScreen({ navigate }: { navigate: (screen: ResidentScreenId) => void }) {
  return (
    <ScreenFrame eyebrow="How it works" title="Choose a need. Get next steps." description="The app stays simple and non-clinical.">
      <InfoSection title="Resident flow" items={howItWorksSteps} />
      <View style={styles.rowWrap}>
        <ActionButton label="Start" onPress={() => navigate("start")} variant="primary" />
        <ActionButton label="Voice" onPress={() => navigate("voice")} variant="secondary" />
        <ActionButton label="Day" onPress={() => navigate("day")} variant="secondary" />
        <ActionButton label="Hubs" onPress={() => navigate("hubs")} variant="secondary" />
        <ActionButton label="Provider Pathway" onPress={() => navigate("providerPathway")} variant="secondary" />
      </View>
    </ScreenFrame>
  );
}

function AccessibilityScreen() {
  return (
    <ScreenFrame eyebrow="Accessibility" title="Use the app in the way that works for you." description="Voice and tap are both supported by design.">
      <InfoSection title="Accessibility support" items={accessibilitySupportText} />
      <StateCard title="Low-bandwidth support" body="Static fallback guidance remains available when live services are unavailable." />
      <StateCard title="Location alternative" body="Use ZIP code, city, or county search instead of current location." />
    </ScreenFrame>
  );
}

function AboutScreen({ navigate }: { navigate: (screen: ResidentScreenId) => void }) {
  return (
    <ScreenFrame eyebrow="About SozoRock Health" title="A resident-facing health access companion." description={residentTrustLine}>
      <Text style={styles.bodyText}>
        SozoRock Health helps residents understand support options, prepare for access, find hubs,
        review Health Access Day information, and use provider-led pathways.
      </Text>
      <InfoSection title="Support channels" items={["Voice Access", "Health Access Day", "Hubs", "Provider-Led Pathways"]} />
      <View style={styles.rowWrap}>
        <ActionButton label="Privacy Boundary" onPress={() => navigate("privacy")} variant="primary" />
        <ActionButton label="How it works" onPress={() => navigate("howItWorks")} variant="secondary" />
      </View>
      <SafetyStrip />
    </ScreenFrame>
  );
}

function ScreenFrame({
  children,
  description,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <View>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text accessibilityRole="header" style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
    </View>
  );
}

function TrustCard() {
  return (
    <View style={styles.trustCard}>
      <Text style={styles.trustText}>{residentTrustLine}</Text>
    </View>
  );
}

function SafetyStrip() {
  return (
    <View style={styles.safetyStrip}>
      {emergencyAndCrisisMessages.slice(0, 2).map((message) => (
        <Text key={message} style={styles.safetyText}>{message}</Text>
      ))}
    </View>
  );
}

function ConsentPanel({
  bullets,
  onPrimary,
  onSecondary,
  primaryLabel,
  secondaryLabel,
  title,
}: {
  bullets: readonly string[];
  onPrimary: () => void;
  onSecondary: () => void;
  primaryLabel: string;
  secondaryLabel: string;
  title: string;
}) {
  return (
    <View style={styles.consentPanel}>
      <Text style={styles.guidanceTitle}>{title}</Text>
      {bullets.map((bullet) => (
        <Text key={bullet} style={styles.bulletText}>- {bullet}</Text>
      ))}
      <View style={styles.rowWrap}>
        <ActionButton label={primaryLabel} onPress={onPrimary} variant="primary" />
        <ActionButton label={secondaryLabel} onPress={onSecondary} variant="secondary" />
      </View>
    </View>
  );
}

function InfoSection({ items, title }: { items: readonly string[]; title: string }) {
  return (
    <View style={styles.infoSection}>
      <Text style={styles.guidanceTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.bulletText}>- {item}</Text>
      ))}
    </View>
  );
}

function StateCard({ body, title }: { body: string; title: string }) {
  return (
    <View style={styles.stateCard}>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateText}>{body}</Text>
    </View>
  );
}

function ActionButton({
  label,
  onPress,
  variant,
}: {
  label: string;
  onPress: () => void;
  variant: "primary" | "secondary";
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.actionButton, variant === "primary" ? styles.actionButtonPrimary : styles.actionButtonSecondary]}
    >
      <Text style={[styles.actionButtonText, variant === "secondary" ? styles.actionButtonTextSecondary : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const colors = {
  navy: "#071727",
  navySoft: "#12304a",
  green: "#047857",
  greenSoft: "#d1fae5",
  surface: "#f7fafc",
  line: "#d9e2ec",
  muted: "#5b7088",
  warning: "#fef3c7",
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#edf5f7",
  },
  appShell: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#ffffff",
  },
  topBar: {
    alignItems: "center",
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  topBarTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "800",
  },
  topBarPromise: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginTop: 3,
    textTransform: "uppercase",
  },
  menuButton: {
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  menuButtonText: {
    color: colors.navy,
    fontWeight: "800",
  },
  drawer: {
    backgroundColor: colors.navy,
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    padding: 16,
  },
  drawerItem: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    marginBottom: 10,
    minHeight: 58,
    padding: 14,
  },
  drawerTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  drawerDescription: {
    color: "#cfe3f2",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  screenContent: {
    padding: 20,
    paddingBottom: 110,
  },
  bottomTabs: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    left: 0,
    paddingHorizontal: 8,
    paddingVertical: 10,
    position: "absolute",
    right: 0,
    backgroundColor: "#ffffff",
  },
  tabButton: {
    alignItems: "center",
    borderRadius: 12,
    flex: 1,
    minHeight: 48,
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: colors.greenSoft,
  },
  tabLabel: {
    color: colors.navySoft,
    fontSize: 12,
    fontWeight: "800",
  },
  tabLabelActive: {
    color: colors.green,
  },
  eyebrow: {
    color: colors.green,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  title: {
    color: colors.navy,
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginTop: 14,
  },
  description: {
    color: colors.navySoft,
    fontSize: 17,
    lineHeight: 26,
    marginTop: 12,
  },
  cardStack: {
    gap: 12,
    marginTop: 18,
  },
  tapCard: {
    backgroundColor: "#ffffff",
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 82,
    padding: 16,
    shadowColor: "#071727",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tapCardSelected: {
    backgroundColor: colors.greenSoft,
    borderColor: colors.green,
  },
  tapCardTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900",
  },
  tapCardText: {
    color: colors.navySoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  trustCard: {
    backgroundColor: colors.greenSoft,
    borderColor: "#86efac",
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 20,
    padding: 14,
  },
  trustText: {
    color: colors.green,
    fontSize: 15,
    fontWeight: "900",
  },
  guidanceCard: {
    backgroundColor: colors.greenSoft,
    borderColor: "#86efac",
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 18,
    padding: 16,
  },
  guidanceTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8,
  },
  bodyText: {
    color: colors.navySoft,
    fontSize: 16,
    lineHeight: 24,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    minHeight: 48,
    minWidth: 130,
    paddingHorizontal: 16,
  },
  actionButtonPrimary: {
    backgroundColor: colors.green,
  },
  actionButtonSecondary: {
    backgroundColor: "#ffffff",
    borderColor: colors.green,
    borderWidth: 1,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "900",
  },
  actionButtonTextSecondary: {
    color: colors.green,
  },
  consentPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 18,
    padding: 16,
  },
  bulletText: {
    color: colors.navySoft,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 4,
  },
  voiceCircle: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.greenSoft,
    borderRadius: 80,
    height: 150,
    justifyContent: "center",
    marginTop: 22,
    width: 150,
  },
  voiceCircleText: {
    backgroundColor: colors.green,
    borderRadius: 55,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: 26,
    paddingVertical: 40,
  },
  stateCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 12,
    padding: 14,
  },
  stateTitle: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  stateText: {
    color: colors.navySoft,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 5,
  },
  safetyStrip: {
    backgroundColor: colors.warning,
    borderRadius: 14,
    marginTop: 20,
    padding: 14,
  },
  safetyText: {
    color: "#7c4a03",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 22,
  },
  infoSection: {
    backgroundColor: "#ffffff",
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 18,
    padding: 16,
  },
  input: {
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.navy,
    fontSize: 16,
    marginTop: 18,
    minHeight: 50,
    paddingHorizontal: 14,
  },
  pill: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillText: {
    color: colors.navySoft,
    fontSize: 13,
    fontWeight: "800",
  },
  mapPlaceholder: {
    backgroundColor: colors.navy,
    borderRadius: 16,
    marginTop: 18,
    minHeight: 160,
    padding: 16,
  },
  mapTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },
  mapText: {
    color: "#cfe3f2",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  smallMuted: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  dataRow: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
});
