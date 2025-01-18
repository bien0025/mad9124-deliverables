const fs = require('fs');

const students = JSON.parse(fs.readFileSync('./students.json', 'utf-8'));

students.forEach(student => {
  console.log(`Hello ${student.firstName} ${student.lastName}!`);
});

console.log('\n');

const lastNamesStartingWithD = students.filter(student =>
  student.lastName.startsWith('D')
);
console.log(`Number of last names starting with 'D': ${lastNamesStartingWithD.length}`);

console.log('\n');

const emails = students.map(student =>
  `${student.firstName.toLowerCase()}@algonquincollege.com`
);

console.log('Generated Emails:');
emails.forEach(email => console.log(email));
