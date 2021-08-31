Automation tests for "https://the-internet.herokuapp.com/".
Used: JS, Selenium-webdriver (chrome) & Jest.

Main file with "https://the-internet.herokuapp.com/": internet.test.js (Located in root dir.)
File with snapshot tests (snapshots from "http://webdriver.io"): ./test/spec/snapshot.spec.js

Scripts for running various tests:

Run tests for "theInternetApp" ("test": "jest internet.test.js"): npm run test;

Debug mode for "theInternetApp" ("test:debug": "node --inspect node_modules/.bin/jest --watch --runInBand internet.test.js"): npm run test:debug;

Run tests for "theInternetApp" in --watch mode ("test:watch": "jest --watch --runInBand"): npm run test:debug;

Run tests with '#auth' tag in thier names: ("test:auth": "npm run test -- -t '#auth'"): npm run test:auth

Run tests with '#download' tag in their names: ("test:auth": "npm run test -- -t '#download'"): npm run test:download
