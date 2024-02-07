### Promise
A Promise is a JavaScript object that represents the eventual outcome of an asynchronous operation. A Promise has three different outcomes: pending (the result is undefined and the expression is waiting for a result), fulfilled (the promise has been completed successfully and returned a value), and rejected (the promise did not successfully complete, the result is an error object).
```
// below a new Promise is being defined and is passed a function that takes two arguments, a fulfilled condition, and a rejected condition. 

// Creating a new Promise and saving it to the testLuck variable. Two arguments are being passed, one for when the promise resolves, and one for if the promise gets rejected.
const testLuck = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) { 
    resolve('Lucky winner!')
  } else {
    reject(new Error('Unlucky!'))
  }
});

// We then log the returned value of the Promise to the console and chain a .catch() method to handle errors.
testLuck.then(message => {
  console.log(message) // Log the resolved value of the Promise
}).catch(error => {
  console.error(error) // Log the rejected error of the Promise
});
```


### Create Promise Constructor
```
const executorFunction = (resolve,reject) => {
    if(someCondition){
        resolve('I resolved');
    } else {
        reject('I rejected');
    }
};

const myFirstPromise = new Promise(executorFunction);
```


### setTimeout

setTimeout() has two parameters: a callback function and a delay in milliseconds.

```
const delayedHello = () => {
  console.log('Hi! This is an asynchronous greeting!');
};
 
setTimeout(delayedHello, 2000);
```

```
const returnPromiseFunction = () => {
    return new Promise((resolve,reject) => {
        setTimeout(()=> {resolve('I resolved')},1000);
    });
};

const prom = returnPromiseFunction();
```

using setTimeout() to construct asynchronous promises
```
setTimeout(
  usingSTO,Math.floor(Math.random() * 3000)
)

```

### Promise .then() method 

.then() is a higher-order function— it takes two callback functions as arguments.

We refer to these callbacks as handlers. 

When the promise settles, the appropriate handler will be invoked with that settled value.

* The first handler, sometimes called onFulfilled, is a success handler, and it should contain the logic for the promise resolving.

* The second handler, sometimes called onRejected, is a failure handler, and it should contain the logic for the promise rejecting.

We can invoke .then() with one, both, or neither handler! This allows for flexibility, but it can also make for tricky debugging. If the appropriate handler is not provided, instead of throwing an error, .then() will just return a promise with the same settled value as the promise it was called on. One important feature of .then() is that it always returns a promise.
```
let prom = new Promise((resolve,reject) => {
    let num = Math.random();
    if(num < .5){
        resolve('Yay');
    } else {
        reject('Ohhh noooo!');
    }
});

const handleSuccess = (resolvedValue) => {
    console.log(resolvedValue);
};

const handleFailure = (rejectionReason) => {
    console.log(rejectionReason);
}

prom.then(handleSuccess,handleFailure);


```

---

* library.js
```
const inventory = {
  sunglasses: 1900,
  pants: 1088,
  bags: 1344
};

const checkInventory = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let inStock = order.every(item => inventory[item[0]] >= item[1]);
      if (inStock) {
        resolve(`Thank you. Your order was successful.`);
      } else {
        reject(`We're sorry. Your order could not be completed because some items are sold out.`);
      }
    }, 1000);
  })
};

module.exports = { checkInventory };
```

* app.js
```
const {checkInventory} = require('./library.js');

const order = [['sunglasses', 1], ['bags', 2]];

// Write your code below:


const handleSuccess = (resolved) => {
  console.log(resolved)
}

const handleFailure = (reject) => {
  console.log(reject)
}

checkInventory(order).then(handleSuccess,handleFailure);

```

---

### Promises .catch() method 

* Conservative method 

```
prom.then(
    (resolvedValue) => {
        console.log(resolvedValue);
    }
).then(
    null, (rejectionReason) => {
        console.log(rejectionReason);
    }
);
```

> To create even more readable code, we can use a different promise function: .catch()

.catch() function takes only one argument, onRejected. 
In the case of a rejected promise, this failure handler will be invoked with the reason for rejection. 
Using .catch() accomplishes the same thing as using a .then() with only a failure handler

```
prom.then(
    (resolvedValue) => {
        console.log(resolvedValue);
    }
).catch(
    (rejectionReason) => {
        console.log(rejectionReason);
    }
);

```

---
* library.js
```
const inventory = {
sunglasses: 0,
pants: 1088,
bags: 1344
};

const checkInventory = (order) => {
return new Promise((resolve, reject) => {
setTimeout(() => {
let inStock = order.every(item => inventory[item[0]] >= item[1]);
if (inStock) {
resolve(`Thank you. Your order was successful.`);
} else {
reject(`We're sorry. Your order could not be completed because some items are sold out.`);
}
}, 1000);
});
};

module.exports = {checkInventory};
```

* app.js

```
const {checkInventory} = require('./library.js');

const order = [['sunglasses', 0], ['bags', 2]];

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectReason) => {
  console.log(rejectReason);
};

// Write your code below:
checkInventory(order).then(handleSuccess).catch(handleFailure)

```

---

### Chaining Multiple Promises

process of chaining promises together is called composition

```
firstPromiseFunction()
.then((firstResolveVal) => {
  return secondPromiseFunction(firstResolveVal);
})
.then((secondResolveVal) => {
  console.log(secondResolveVal);
});
```

```
let link = state => {
  return new Promise(function(resolve, reject) {
    if (state) { 
      resolve('success'); 
    } else { 
      reject('error');
    }
  });
}
 
let promiseChain = link(true);
 
promiseChain
.then( data => {  
   console.log(data + " 1");
   return link(true);
})
.then( data => {
   console.log(data+ " 2");
   return link(true);
});
```

---

* library.js
```
const store = {
  sunglasses: {
    inventory: 817, 
    cost: 9.99
  },
  pants: {
    inventory: 236, 
    cost: 7.99
  },
  bags: {
    inventory: 17, 
    cost: 12.99
  }
};

const checkInventory = (order) => {
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
   const itemsArr = order.items;  
   let inStock = itemsArr.every(item => store[item[0]].inventory >= item[1]);
   
   if (inStock){
     let total = 0;   
     itemsArr.forEach(item => {
       total += item[1] * store[item[0]].cost
     });
     console.log(`All of the items are in stock. The total cost of the order is ${total}.`);
     resolve([order, total]);
   } else {
     reject(`The order could not be completed because some items are sold out.`);
   }     
}, generateRandomDelay());
 });
};

const processPayment = (responseArray) => {
  const order = responseArray[0];
  const total = responseArray[1];
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
   let hasEnoughMoney = order.giftcardBalance >= total;
   // For simplicity we've omited a lot of functionality
   // If we were making more realistic code, we would want to update the giftcardBalance and the inventory
   if (hasEnoughMoney) {
     console.log(`Payment processed with giftcard. Generating shipping label.`);
     let trackingNum = generateTrackingNumber();
     resolve([order, trackingNum]);
   } else {
     reject(`Cannot process order: giftcard balance was insufficient.`);
   }
   
}, generateRandomDelay());
 });
};


const shipOrder = (responseArray) => {
  const order = responseArray[0];
  const trackingNum = responseArray[1];
  return new Promise ((resolve, reject) => {
   setTimeout(()=> {  
     resolve(`The order has been shipped. The tracking number is: ${trackingNum}.`);
}, generateRandomDelay());
 });
};


// This function generates a random number to serve as a "tracking number" on the shipping label. In real life this wouldn't be a random number
function generateTrackingNumber() {
  return Math.floor(Math.random() * 1000000);
}

// This function generates a random number to serve as delay in a setTimeout() since real asynchrnous operations take variable amounts of time
function generateRandomDelay() {
  return Math.floor(Math.random() * 2000);
}

module.exports = {checkInventory, processPayment, shipOrder};
```

* app.js
```
const {checkInventory, processPayment, shipOrder} = require('./library.js');

const order = {
  items: [['sunglasses', 1], ['bags', 2]],
  giftcardBalance: 79.82
};

checkInventory(order)
.then((resolvedValueArray) => {
  // Write the correct return statement here:
  return processPayment(resolvedValueArray)
})
.then((resolvedValueArray) => {
  // Write the correct return statement here:
  return shipOrder(resolvedValueArray)
})
.then((successMessage) => {
  console.log(successMessage);
})
.catch((errorMessage) => {
  console.log(errorMessage);
});

```


---

### Promises with .all() method 

dealing with multiple promises, but we don’t care about the order

For us to consider our house clean, we need our clothes to dry, our trash bins emptied, and the dishwasher to run. We need all of these tasks to complete but not in any particular order

To maximize efficiency we should use concurrency, multiple asynchronous operations happening together. With promises, we can do this with the function Promise.all().


> Promise.all() accepts an array of promises as its argument and returns a single promise

Promise.all() accepts an array of promises as its argument and returns a single promise. That single promise will settle in one of two ways:

If every promise in the argument array resolves, the single promise returned from Promise.all() will resolve with an array containing the resolve value from each promise in the argument array.
If any promise from the argument array rejects, the single promise returned from Promise.all() will immediately reject with the reason that promise rejected. This behavior is sometimes referred to as failing fast.

```
let myPromises = Promise.all(
    [returnsPromOne(),returnsPromTwo(),returnsPromThree()] //an array of three promises— the returned values from functions.
);

myPromises.then(
    (arrayOfValues) => {
        console.log(arrayOfValues);
    }).catch(
    (rejectionReason) => {
        console.log(rejectionReason);
    }
);
```

---
* library.js
```
const checkAvailability = (itemName, distributorName) => {
    console.log(`Checking availability of ${itemName} at ${distributorName}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (restockSuccess()) {
                console.log(`${itemName} are in stock at ${distributorName}`)
                resolve(itemName);
            } else {
                reject(`Error: ${itemName} is unavailable from ${distributorName} at this time.`);
            }
        }, 1000);
    });
};

module.exports = { checkAvailability };


// This is a function that returns true 80% of the time
// We're using it to simulate a request to the distributor being successful this often
function restockSuccess() {
    return (Math.random() > .2);
}
```

* app.js
```
const {checkAvailability} = require('./library.js');

const onFulfill = (itemsArray) => {
  console.log(`Items checked: ${itemsArray}`);
  console.log(`Every item was available from the distributor. Placing order now.`);
};

const onReject = (rejectionReason) => {
	console.log(rejectionReason);
};

// Write your code below:

const checkSunglasses = checkAvailability('sunglasses','Favorite Supply Co.')

const checkPants = checkAvailability('pants','Favorite Supply Co.')

const checkBags = checkAvailability('bags','Favorite Supply Co.')

Promise.all([checkSunglasses,checkPants,checkBags]).then(onFulfill).catch(onReject)

```
---
