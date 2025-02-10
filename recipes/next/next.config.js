/** @type {import("next").NextConfig} */
const nextConfig = {
  // transpilePackages: ["@brizy/builder"],
  webpack: (config) => {
    // Add support for custom fonts and assets
    config.module.rules.push(
      {
        test: /\.(woff2?|eot|ttf|otf)$/, // Font files
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp|svg)$/, // Image files
        type: "asset/resource",
        generator: {
          filename: "static/images/[name][ext]",
        },
      },
    );

    return config;
  },
};

module.exports = nextConfig;
