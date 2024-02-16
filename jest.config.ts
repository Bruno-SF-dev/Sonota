module.exports = {
  testEnvironment: "jsdom",
  modulePaths: ["./src/*"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
  },
  setupFilesAfterEnv: ["./src/tests/setup-test.ts"],
};
