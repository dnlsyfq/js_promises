const executorFunction = (resolve,reject) => {
    if(someCondition){
        resolve('I resolved');
    } else {
        reject('I rejected');
    }
};

const myFirstPromise = new Promise(executorFunction);



