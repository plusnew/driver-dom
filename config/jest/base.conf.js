const path = require('path');

module.exports = {
  verbose: true,
  rootDir: path.join(__dirname, '..', '..'),
  roots: [
    "<rootDir>/src"
  ],
  modulePaths: ["src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ['tsx', 'ts', 'js'],
}