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

using setTimeout() to construct asynchronous promises

### Promise .then() method 

.then() is a higher-order function— it takes two callback functions as arguments.

We refer to these callbacks as handlers. 

When the promise settles, the appropriate handler will be invoked with that settled value.

* The first handler, sometimes called onFulfilled, is a success handler, and it should contain the logic for the promise resolving.

* The second handler, sometimes called onRejected, is a failure handler, and it should contain the logic for the promise rejecting.

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
