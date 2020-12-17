/*
const executorFunction = (resolve,reject) => {
    if(someCondition){
        resolve('I resolved');
    } else {
        reject('I rejected');
    }
};

const myFirstPromise = new Promise(executorFunction);


 */

/*
const returnPromiseFunction = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('I resolved!')
        },1000);
    });
};

const prom = returnPromiseFunction();


 */

/*
const prom = new Promise((resolve,reject) => {
    resolve('Yay!');
});

const handleSuccess = (resolvedValue) => {
    console.log(resolvedValue);
};

prom.then(handleSuccess);
 */

/*
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


 */

/*
prom.then(
    (resolvedValue) => {
        console.log(resolvedValue);
    }
).then(
    null, (rejectionReason) => {
        console.log(rejectionReason);
    }
);

 */

/*
prom.then(
    (resolvedValue) => {
        console.log(resolvedValue);
    }
).catch(
    (rejectionReason) => {
        console.log(rejectionReason);
    }
);


 */

