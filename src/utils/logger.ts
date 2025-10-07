import { configure, getConsoleSink } from "@logtape/logtape";
import { getPrettyFormatter } from "@logtape/pretty";
import { AsyncLocalStorage } from "node:async_hooks";

const formatter = getPrettyFormatter({
  timestamp: "date-time",
  icons: {
    info: "✨",
    error: "🔥",
    warning: "⚡",
    fatal: "💀",
    debug: "🐛",
    trace: "🔍",
  },
  colors: true,
  categoryWidth: 0,
  categoryTruncate: "middle",
  wordWrap: true,
  properties: true,
});

export const loggerInitializer = async () => {
  await configure({
    sinks: { console: getConsoleSink({ formatter }) },
    loggers: [
      { category: ["logtape", "meta"], sinks: [] },
      { category: ["hono"], sinks: ["console"], lowestLevel: "info" },
      { category: ["db"], sinks: ["console"], lowestLevel: "info" },
    ],
    contextLocalStorage: new AsyncLocalStorage(),
  });
};
