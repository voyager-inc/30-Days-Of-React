//Question 1:
let age = prompt("Enter your age:")
switch (true){
    case age >= 18:
        console.log('You are old enough to drive')
        break
    case age < 18: 
        console.log(`You are left with ${18-age}years to drive`)
        break;
};

// Question 2:
let yourAge = prompt("Enter your age:");
let myAge = 26;
let gap = yourAge - myAge;
switch (true){
    case gap > 0:
        console.log(`You are ${gap} years older than me.`)
        break;
    case gap === 0:
        console.log(`You are the same age with me`);
        break;
    case gap < 0:
        console.log(`You are ${-gap} years younger than me.`);
        break;
};

// Question 3:
let a = 4;
let b = 3;
if (a>b){
    console.log(`${a} is greater than ${b}`)
} else{
    console.log(`${a} is less than ${b}`)
}

a>b ? console.log(`${a} is greater than ${b}`) : console.log(`${a} is less than ${b}`)