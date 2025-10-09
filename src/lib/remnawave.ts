import { RemnawaveSDK } from "@mishkat/remnawave-sdk";

import { config } from "@/config";

export const remnawaveClient = new RemnawaveSDK({
  panelUrl: config.REMNAWAVE_PANEL_URL,
  apiKey: config.REMNAWAVE_PANEL_API_KEY,
});
