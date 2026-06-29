// Polyfill TextEncoder/TextDecoder for jest-jsdom + react-router v7 compatibility
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
