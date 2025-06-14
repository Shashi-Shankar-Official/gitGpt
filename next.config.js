import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    pageExtensions: ["ts", "tsx", "js", "jsx"],
};

export default config;
