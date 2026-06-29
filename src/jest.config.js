export default {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./src/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
