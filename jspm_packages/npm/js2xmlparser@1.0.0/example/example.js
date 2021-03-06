/* */ 
(function() {
  "use strict";
  var js2xmlparser = require('../lib/js2xmlparser');
  console.log("EXAMPLE 1");
  console.log("=========");
  var example1 = {
    "firstName": "John",
    "lastName": "Smith"
  };
  console.log(js2xmlparser("person", example1));
  console.log();
  console.log("EXAMPLE 2");
  console.log("=========");
  var example2 = {
    "@": {"type": "individual"},
    "firstName": "John",
    "lastName": "Smith",
    "dateOfBirth": new Date(1964, 7, 26),
    "address": {
      "@": {"type": "home"},
      "streetAddress": "3212 22nd St",
      "city": "Chicago",
      "state": "Illinois",
      "zip": 10000
    },
    "phone": [{
      "@": {"type": "home"},
      "#": "123-555-4567"
    }, {
      "@": {"type": "work"},
      "#": "789-555-4567"
    }, {
      "@": {"type": "cell"},
      "#": "456-555-7890"
    }],
    "email": function() {
      return "john@smith.com";
    },
    "comment": "John's profile is not complete."
  };
  console.log(js2xmlparser("person", example2));
  console.log();
  console.log("EXAMPLE 3");
  console.log("=========");
  var example3 = {"telephone": ["123-555-4567", {
      "#": "789-555-4567",
      "=": "fax"
    }, "456-555-7890"]};
  console.log(js2xmlparser("person", example3));
  console.log();
  console.log("EXAMPLE 4");
  console.log("=========");
  var example4 = {
    "email": function() {
      return "john@smith.com";
    },
    "dateOfBirth": new Date(1964, 7, 26)
  };
  var example4Options = {convertMap: {
      "[object Date]": function(date) {
        return date.toISOString();
      },
      "[object Function]": function(func) {
        return func.toString();
      }
    }};
  console.log(js2xmlparser("person", example4, example4Options));
  console.log();
  console.log("EXAMPLE 5");
  console.log("=========");
  var example5 = {
    "firstName": "John",
    "lastName": "Smith",
    "nicknames": ["Johnny", "Jon", "Jack"]
  };
  var example5Options = {arrayMap: {nicknames: "name"}};
  console.log(js2xmlparser("person", example5, example5Options));
  console.log();
  console.log("EXAMPLE 6");
  console.log("=========");
  var example6 = {"comment": {
      "@": {"type": "status"},
      "#": "John's profile is not complete."
    }};
  var example6Options = {useCDATA: true};
  console.log(js2xmlparser("person", example6, example6Options));
})();
