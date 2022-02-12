// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

// 1 Constructor Pattern

let instance01 = {};
let instance02 = Object.create(Object.prototype);
let instance03 = new Object();

// console.log('instance01', instance01);
// console.log('instance02', instance02);
// console.log('instance03', instance03);

// 2 Module Pattern

//  +++++++++++++++++ closure

// We use a immediately invoked function to create
// a private variable counter
var counterIncrementer = (() => {
  let counter = 0;
  return function () {
    return ++counter;
  };
})(); // these () in the end make this a immediately invoked function

// // prints: 1
// console.log(counterIncrementer());
// // prints: 2
// console.log(counterIncrementer());
// // prints: 3
// console.log(counterIncrementer());

// Using a closure we will expose an object
// as part of a public API that manages its
// private parts
// let fruitsCollection = (() => {
//   // private
//   let objects = [];

//   //public
//   return {
//     addObject: (object) => {
//       objects.push(object);
//     },
//     removeObject: (object) => {
//       let index = objects.indexOf(object);
//       if (index >= 0) {
//         objects.splice(index);
//       }
//     },
//     getObjects: () => JSON.parse(JSON.stringify(objects)),
//   };
// })();

//  3 Revealing Module Pattern

let fruitsCollection = (() => {
  // private
  let objects = [];

  const addObject = (object) => {
    objects.push(object);
  };
  const removeObject = (object) => {
    let index = objects.indexOf(object);
    if (index >= 0) {
      objects.splice(index);
    }
  };
  const getObjects = () => JSON.parse(JSON.stringify(objects));

  //public
  return { addObject, removeObject, getObjects };
})();

fruitsCollection.addObject('apple');
fruitsCollection.addObject('mange');
fruitsCollection.addObject('pain');
fruitsCollection.addObject('lait');
console.log(fruitsCollection.getObjects());

// 4 Singleton Pattern

let configurationSingleton = (() => {
  // private value of the singleton initialized only once
  let config;

  const initializeConfiguration = (values = { number: 5, size: 10 }) => {
    this.randomNumber = Math.random();
    values = values;
    this.number = values.number;
    this.size = values.size;
  };

  // we export the centralized method to return
  // the singleton's value

  return {
    getConfig: (values) => {
      //initialize the singleton only once
      if (config) {
        config = new initializeConfiguration(values);
      }

      // and always return the same value
      return config;
    },
  };
})();

const configObject = configurationSingleton.getConfig({ size: 8 });
console.log(configObject);
