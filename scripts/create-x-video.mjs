import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const screenshotNames = [
  "01-auth.png",
  "02-start.png",
  "03-find-access.png",
  "04-voice-access.png",
  "05-prepare.png",
  "06-hubs.png",
  "07-support.png",
  "08-saved.png",
  "09-settings.png",
  "10-mobile-390.png",
  "11-ios-mobile.png",
  "12-android-mobile.png",
];

const screenshotDir = resolve("artifacts/qa");
const outputPath = resolve("artifacts/video/sozorock-health-x-demo.mp4");
const ffmpegPath = process.env.FFMPEG_PATH ?? "ffmpeg";
const secondsPerSlide = 2.75;
const fps = 30;
const framesPerSlide = Math.round(secondsPerSlide * fps);

const screenshots = screenshotNames.map((name) => resolve(screenshotDir, name));
const totalDuration = screenshots.length * secondsPerSlide;
const missing = screenshots.filter((path) => !existsSync(path));

if (missing.length > 0) {
  throw new Error(
    `Missing QA screenshots. Run node scripts/qa-resident-app.mjs first.\n${missing.join("\n")}`,
  );
}

mkdirSync(dirname(outputPath), { recursive: true });

const inputs = screenshots.flatMap((path) => ["-loop", "1", "-t", String(secondsPerSlide), "-i", path]);
const preparedStreams = screenshots
  .map(
    (_, index) =>
      `[${index}:v]scale=1280:720:force_original_aspect_ratio=decrease,` +
      `pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0xf7fbff,` +
      `zoompan=z='min(zoom+0.00075,1.04)':d=${framesPerSlide}:s=1280x720:fps=${fps},` +
      `trim=duration=${secondsPerSlide},setpts=PTS-STARTPTS[v${index}]`,
  )
  .join(";");
const concatInputs = screenshots.map((_, index) => `[v${index}]`).join("");
const filter = `${preparedStreams};${concatInputs}concat=n=${screenshots.length}:v=1:a=0,format=yuv420p[v]`;

const result = spawnSync(
  ffmpegPath,
  [
    "-y",
    ...inputs,
    "-f",
    "lavfi",
    "-t",
    String(totalDuration),
    "-i",
    "aevalsrc=0.012*(sin(2*PI*196*t)+sin(2*PI*247*t)+sin(2*PI*294*t)):s=44100",
    "-filter_complex",
    filter,
    "-map",
    "[v]",
    "-map",
    `${screenshots.length}:a`,
    "-movflags",
    "+faststart",
    "-c:v",
    "libx264",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-shortest",
    "-preset",
    "medium",
    "-crf",
    "20",
    "-r",
    String(fps),
    outputPath,
  ],
  { encoding: "utf8" },
);

if (result.status !== 0) {
  throw new Error(result.stderr || result.stdout || "FFmpeg video render failed.");
}

console.log(`Created ${outputPath}`);
