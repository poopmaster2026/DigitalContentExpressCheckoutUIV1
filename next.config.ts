import type { NextConfig } from "next";
import macros from "unplugin-parcel-macros";

// @react-spectrum/s2 styles its components via build-time macros
// (`@react-spectrum/s2/style` imported `with { type: "macro" }`).
// These macros are powered by unplugin-parcel-macros, which currently
// only works with webpack — NOT Turbopack. That is why `dev`/`build`
// run with the `--webpack` flag in package.json.
const macrosPlugin = macros.webpack();

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(macrosPlugin);

    // Consolidate the CSS that the S2 macros emit into a single chunk so
    // styles aren't duplicated/split across the app.
    config.optimization.splitChunks ||= {};
    config.optimization.splitChunks.cacheGroups ||= {};
    config.optimization.splitChunks.cacheGroups.s2 = {
      name: "s2-styles",
      test(module: { type?: string; identifier(): string }) {
        return (
          (module.type === "css/mini-extract" &&
            module.identifier().includes("@react-spectrum/s2")) ||
          /macro-(.*?)\.css/.test(module.identifier())
        );
      },
      chunks: "all",
      enforce: true,
    };

    return config;
  },
};

export default nextConfig;
