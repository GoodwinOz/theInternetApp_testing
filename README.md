Renamed 'blackbox' branch

Unit/inegration/e2e tests written using  *sync* / *async*.

Scripts:

Run All tests in dir /test ("test": "mocha -R nyan"): **npm run test**;

Run Unit tests with mocked data (req, res) ("test:unit": "mocha ./test/crud.unit.test.js -R nyan"): **npm run test:unit**

Run Integration tests ("test:int": "mocha ./test/crud.int.test.js -R nyan"): **npm run test:int**

Run Blackbox tests ("test:blackbox": "mocha ./test/crud.blackbox.test.js -R nyan"): **npm run test:blackbox**

Run Blackbox tests with jest ("test:blackbox:jest": "jest ./test/crud.blackbox.test.js"): **npm run test:blackbox:jest**

Run End-to-end tests ("test:e2e": "mocha ./test/crud.end-to-end.test.js -R nyan --timeout 5000"): **npm run test:e2e**

Run Unit tests (without mocked req/res). Location (dir): routes/unit.test.js ("test:unit.noMock": "mocha ./routes/unit.test.js -R nyan"): **npm run test:unit.noMock**
