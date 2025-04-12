// jest.config.ts
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
    // "^~/(.*)$": "<rootDir>/$1", // so you can use @/components/Component
  },
};

module.exports = createJestConfig(customJestConfig);
