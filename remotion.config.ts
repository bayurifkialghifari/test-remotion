import { Config } from "@remotion/cli/config";
import fs from "node:fs";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

const pwChrome = "/home/bayur/.cache/ms-playwright/chromium-1234/chrome-linux/chrome";
if (fs.existsSync(pwChrome)) {
  Config.setBrowserExecutable(pwChrome);
}
