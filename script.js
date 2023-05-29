'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};


const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');




const displayMOvs = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const moves = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  moves.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);

  });

};


const createusernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(" ").map(value => value[0]).join("");
  });
}

createusernames(accounts);
//console.log(accounts);

const displaybalance = function (account) {
  account.balance = account.movements.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
  labelBalance.textContent = ` ${account.balance}€`;
}



const displaysummary = function (acc) {
  const incomes = acc.movements
    .filter(curr => curr > 0)
    .reduce((acc, curr) => acc += curr, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(curr => curr < 0)
    .reduce((acc, curr) => acc += curr, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(curr => curr > 0)
    .map(curr => (curr * acc.interestRate) / 100)
    .filter((curr, i, arr) => {
      //console.log(arr);
      return curr >= 1
    })
    .reduce((acc, curr) => acc += curr, 0);
  labelSumInterest.textContent = `${interest}€`;

};

const updateUI = function () {
  displayMOvs(currentAccount);
  displaybalance(currentAccount);
  displaysummary(currentAccount);
}
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(" ")[0]}`
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI();
  }
});


btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);

  if (amount > 0 &&
    receiver &&
    currentAccount.balance >= amount &&
    receiver !== currentAccount
  ) {
    receiver.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI();
    inputTransferAmount.value = inputTransferTo.value = "";
  };
});


btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    //const index = accounts.indexOf(currentAccount);
    accounts.splice(index, 1)
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = "";
})


btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanamnt = Number(inputLoanAmount.value);
  if (loanamnt > 0 && currentAccount.movements.some(mov => mov >= loanamnt * 0.1)) {
    currentAccount.movements.push(loanamnt);
    updateUI();
  }
  inputLoanAmount.value = "";
});

let sorted = true;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMOvs(currentAccount, sorted);
  sorted = !sorted
});




//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance = movements.reduce(function (acc, curr) {
//   return acc += curr;
// }, 0);
// labelBalance.textContent = balance;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


/////////////////////////////////////////////////


// const arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
// const arr2 = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];


// console.log(arr.slice(2, 1));
// console.log(arr.slice(-1));
// console.log(arr.slice(2, -1));
// console.log(arr.slice());
// console.log([...arr]);

// console.log(arr.splice());
// console.log(arr.splice(2, 6));
// console.log(arr);

// console.log(arr.reverse())
// console.log(arr);

// console.log([[arr, arr2].join("-")]);
// console.log([[...arr, ...arr2].join("-")]);
//console.log([...arr, ...arr2].join("-"));
// console.log(arr)
// console.log(arr2)

// console.log(arr2.concat(arr));
// console.log(arr2.concat("arr"));
// console.log([...arr, ...arr2]);


// const arr = [232, 34, 44, 535];
// console.log(arr)


// // console.log(arr[0]);
// // console.log(arr.at(0));
// console.log(arr[arr.length - 1])
// const t = arr.slice(-1)
// //console.log(arr)
// console.log(t[0])

// console.log(arr.at(-1))
// console.log(arr)


// console.log("jonas".at(2))
// console.log("jonase".at("jonas".length))

// console.log("jonas".length)



// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const move of movements) {
// //   console.log(movements)
// // }

// // for (const dd of movements) {
// //   console.log(dd);
// // }

// // for (const [i, j] of movements.entries()) {
// //   console.log(movements[i])
// // }


// movements.forEach(function (mov/*value*/, i /*index*/, arr/*array name*/) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1} : You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i + 1} : You withdrew ${Math.abs(mov)}`);

//   }
// })


// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). 
// For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less 
// than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array,
// and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀


// const julia = [4, 1, 15, 8, 3];
// const kate = [10, 5, 6, 1, 4];

// const juliac = julia.slice(1, 3);
// //const katec = kate.slice(1, 3);

// console.log(juliac, kate)

// juliac.forEach(function (age, i) {
//   age >= 3 ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`) : console.log(`Dog number ${i + 1} is still a puppy`);
// });

// kate.forEach(function (age, i) {
//   age >= 3 ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`) : console.log(`Dog number ${i + 1} is still a puppy`);
// });


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurotousd = movements.map(mov => mov * 1.1);
// console.log(eurotousd);

// const usd = [];
// for (const mov of movements) usd.push(mov * 1.1);
// console.log(usd)

// const desc = movements.map((mov, i) =>


//   `Movement ${i + 1} : You ${mov > 0 ? "deposited" : "withdrew"
//   } ${mov} `)
// console.log(desc)


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movfilter = movements.filter(function (cur) {
//   return cur > 0;
// });
// console.log(movfilter);

// console.log(movements.filter(mov => mov < 0));

// const filters = [];
// for (const mov of movements) if (mov > 0) filters.push(mov);
// console.log(filters)

// // const balance = movements.reduce(function (acc, curr) {
// //   return acc += curr;
// // }, 0)
// //console.log(balance)

// const minimum = movements.reduce(function (acc, curr) {
//   if (acc < curr) {
//     return acc;
//   } else {
//     return curr;
//   }
// }, movements[0]);
// console.log(minimum);

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
// If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

// const calcAverageHumanAge = function (ages) {
//   const dognewage = ages.map(function (curr) {
//     if (curr <= 2) {
//       return curr * 2;
//     } else if (curr > 2) {
//       return 16 + curr * 4;
//     }
//   });
//   console.log(dognewage);
//   const puppy = dognewage.filter(curr => curr < 18);
//   console.log(puppy);

//   const adult = dognewage.filter(curr => curr >= 18);
//   console.log(adult);
//   const average = adult.reduce((acc, curr) => acc += curr, 0)


//   console.log(average);
// };

// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurotousd = 1.1;
// const totalDepositsUSD = movements.filter(curr => curr > 0)
//   .map(curr => curr * eurotousd)
//   .reduce((acc, curr) => acc += curr, 0);

// console.log(totalDepositsUSD);

// Coding Challenge #3


// Rewrite the 'calcAverageHumanAge' function from the previous challenge, 
// but this time as an arrow function, and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => {
//       if (age <= 2) return 2 * age;
//       else if (age > 2) return 16 + 4 * age;
//     })
//     .filter((curr, i, arr) => {
//       console.log(arr)
//       return curr >= 18
//     })
//     .reduce((acc, curr, i, arr) => {
//       console.log(arr)
//       return (acc += curr / arr.length)
//     }, 0);


// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]), calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

//console.log(avg1, avg2);

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// // adults.length

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const wth = movements.find(curr => curr < 0);
// console.log(wth);

// const acc = accounts.find(acc => acc.owner === "Jessica Davis");
// console.log(acc);

// for (const acc2 of accounts.entries()) {

//   const [i, obj] = acc2;
//   console.log(i, obj)

//   for (const acc3 of obj.entries()) {
//     const [i2, obj2] = acc3;
//     console.log(i2, obj2);
//   }
//}

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements.includes(200))
// const any = movements.some(mov => mov > 56666);
// console.log(any);

// // const all = movements.every(mov => mov > 0);
// const all = movements.every(mov => mov = "number");

// console.log(all);

// const deposit = mov => mov > 0;
// console.log(movements);
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));


// const arr = [[1, [2, [3]],], 4, 5, [6, [7, 8], 9]];
// console.log(arr.flat(3));
// console.log(arr[0][1][1])

// const overalbal = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0)
// console.log(overalbal)


// const overalbal2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0)
// console.log(overalbal2)

// const owners = ["adadd", "dasd", "yykp", "zsf", "bsd"];
// console.log(owners.sort());
// console.log(owners)

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // const sort = movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (b > a) return -1;
// // });
// // console.log(movements);
// // console.log(sort)

// console.log(movements.sort((a, b) => a - b));//ascending
// console.log(movements.sort((a, b) => b - a));//descending


// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// const x = new Array(7);
// //x.fill(1, 3, 6);
// x.fill(1, 5)
// console.log(x)

// arr.fill(23, 3, 6)
// console.log(arr)


// const y = Array.from({ length: 7 }, () => 1);
// console.log(y)

// console.log(Array.from({ length: 7 }, (curr, i) => i + 1));
// console.log(Array.from({ length: 7 }, (_, i) => i + 1));

// labelBalance.addEventListener("click", function () {
//   const movesUI = Array.from(document.querySelectorAll(".movements__value"),
//     (el) => Number(el.textContent.replace("€", "")));
//   console.log(movesUI);

//   console.log([...document.querySelectorAll(".movements__value")]);
// });




// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
   Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and
   the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, 
   so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and 
   Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10).
        Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/


const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const recommendedFood = function (arr) {
  arr.map(dog => dog.foodPortion = dog.weight ** 0.75 * 28);
};

recommendedFood(dogs);
console.log(dogs);


const sarahdog = function (arr) {
  const ss = dogs.find(dog => dog.owners.includes("Sarah"))
  console.log(ss)
  console.log(`Sarah's dog eating ${ss.curFood > ss.foodPortion ? "too much" : "little"} food`)
}
sarahdog(dogs);

// const eattoomuch = dogs.filter(dog => {
//   if (dog.curFood > dog.foodPortion)
//     return dog.owners.flat()
// })

const eatlittle = dogs.filter(dog => dog.curFood < dog.foodPortion)
  .flatMap(dog => dog.owners);

const eattoomuch = dogs.filter(dog => dog.curFood > dog.foodPortion)
  .flatMap(dog => dog.owners);



console.log(eatlittle);
console.log(eattoomuch);






