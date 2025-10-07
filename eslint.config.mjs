import antfu from "@antfu/eslint-config";
import perfectionist from "eslint-plugin-perfectionist";

export default antfu(
  {
    stylistic: false,
    ignores: ["dist/", "node_modules/"],
  },
  {
    rules: {
      "node/prefer-global/process": "off",
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            ["internal"],
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "style",
            "side-effect-style",
            "unknown",
          ],
          internalPattern: ["^~/.*", "^@/.*"],
          newlinesBetween: "always",
          order: "asc",
          type: "natural",
        },
      ],
    },
  },
);
