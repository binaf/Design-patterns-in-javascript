// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

// +++++++++++++++++++ 1 Constructor Pattern

let instance01 = {};
let instance02 = Object.create(Object.prototype);
let instance03 = new Object();

// console.log('instance01', instance01);
// console.log('instance02', instance02);
// console.log('instance03', instance03);

// ++++++++++++++++++++++++ 2 Module Pattern

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

//  +++++++++++++++ 3 Revealing Module Pattern

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
// console.log(fruitsCollection.getObjects());

// +++++++++++++++++ 4 Singleton Pattern

let configurationSingleton = (() => {
  // private value of the singleton initialized only once
  let config;

  const initializeConfiguration = (values = { number: 5, size: 10 }) => ({
    randomNumber: Math.random(),
    values: values,
    number: values.number,
    size: values.size,
  });

  // we export the centralized method to return
  // the singleton's value

  return {
    getConfig: (values) => {
      //initialize the singleton only once
      if (config === undefined) {
        config = initializeConfiguration(values);
      }

      // and always return the same value
      return config;
    },
  };
})();

const configObject = configurationSingleton.getConfig({ size: 8 });
// console.log(configObject);

const configObject1 = configurationSingleton.getConfig({ number: 8 });
// console.log(configObject1);

// ++++++++++++++++++++++ 5 Observer Pattern
// Here is a small example of the publisher/subscriber pattern.

let publisherSubscriber = {};

//we pass an object to the container to manage subscriptions
((container) => {
  // the id represents a subscription to the topic
  let id = 0;

  //the objects will subscribe to the topic by sending a callback to be executed when the event is fired
  container.subscribe = (topic, f) => {
    // console.log(topic)
    if (!(topic in container)) {
      container[topic] = [];
    }

    container[topic].push({ id: ++id, callback: f });
    // console.log(container)
    return id;
  };

  //Every subscription has it's own id , we will use it to remove the subscription
  container.unsubscribe = (topic, id) => {
    let subscribers = [];

    for (const subscriber of container[topic]) {
      if (subscriber.id !== id) {
        subscribers.push(subscriber);
      }
    }
    container[topic] = subscribers;
  };

  container.publish = (topic, data) => {
    for (var subscriber of container[topic]) {
      // when we execute a callback it is always
      // good to read the documentation to know which
      // arguments are passed by the object firing
      // the event
      subscriber.callback(data);
    }
  };
})(publisherSubscriber);

let subscriptionID1 = publisherSubscriber.subscribe('mouseClicked', (data) => {
  // console.log('mouseClicked, data: ' + JSON.stringify(data));
});

let subscriptionID2 = publisherSubscriber.subscribe('mouseHoreved', (data) => {
  // console.log('mouseHoreved, data: ' + JSON.stringify(data));
});

let subscriptionID3 = publisherSubscriber.subscribe('mouseClicked', (data) => {
  // console.log('second mouseClicked, data: ' + JSON.stringify(data));
});

//when we publish an event , all callbacks should be called and you will see three logs
publisherSubscriber.publish('mouseClicked', { data: 'data1' });
publisherSubscriber.publish('mouseHoreved', { data: 'data2' });

//we unsubscribe an event
publisherSubscriber.unsubscribe('mouseClicked', subscriptionID3);
publisherSubscriber.publish('mouseClicked', { data: 'data1' });
publisherSubscriber.publish('mouseHoreved', { data: 'data2' });

// +++++++++++++++++ 6 Mediator Pattern

// //+++++++++++++++++++++ 7 Prototype Pattern

// let personPrototype = {
//   sayHi: () => {
//     console.log('Hi, I am ' + this.name + ', and I have ' + this.age);
//   },
//   sayBye: () => {
//     console.log('Bye!');
//   },
// };
// const Person = (name = 'Ousmane HAIDARA', age = 23) => {
//   const constructorFunction = (name, age) => {
//     this.name = name;
//     this.age = age;
//   };

//   constructorFunction.prototype = personPrototype;
//   let instance = new constructorFunction(name, age);
//   return instance;
// };

// const person1 = Person()

//+++++++++++++++++++++ 8 Command Pattern

// The object that knows how to execute the command
const invoker = {
  add: (x, y) => {
    return x + y;
  },
  subtract: (x, y) => {
    return x - y;
  },
};

// the object to be used as abstraction layer when
// we execute commands; it represents a interface
// to the caller object
let manager = {
  execute: (name, args) => {
    if (name in invoker) {
      return invoker[name].apply(invoker, [].slice.call(arguments, 1));
    }
    return false;
  },
};
// prints 8
// console.log(manager.execute('add', 3, 5));
// prints 2
// console.log(manager.execute('subtract', 5, 3));

// +++++++++++++++++++++++++ 9 Facade Pattern

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////  7 Killer One-Liners in JavaScript ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Shuffle Array
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
// Testing
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(shuffleArray(arr));

// Generate Random Color
const generateRandomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
// console.log('generateRandomHexColor', generateRandomHexColor());

function fizzBuzz(n) {
  let fizzBuzz = [];
  for (var i = 1; i <= n; i++) {
    if (5 % i == 0 && 3 % i == 0) fizzBuzz.push('fizzbuzz');
    else if (3 % i == 0) fizzBuzz.push('fizz');
    else if (5 % i == 0) fizzBuzz.push('buzz');
    else fizzBuzz.push('');
  }
  return fizzBuzz;
}

console.log('fizzBuzz', fizzBuzz(6));
