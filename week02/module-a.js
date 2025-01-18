const { sayHello, someOtherVar} = require('./module-b');

const someVar = 'A';

sayHello('John');

console.log(someVar);
console.log(moduleB.someOtherVar);

console.log('filename', __filename);
console.log('dirname', __dirname);  //directory name