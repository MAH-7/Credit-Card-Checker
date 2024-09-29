// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];
const invalid6 = [4, 5, 3, 2, 6, 9, 7, 7, 2, 6, 2, 2, 1, 3, 6, 8, 0, 9, 2];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:
const validateCred = (cardDigits) => {
  let sum = 0;
  //Reverse loop
  for (let i = cardDigits.length - 1; i >= 0; i--) {
    let currentValue = cardDigits[i];
    //Check odd index & multiply by 2
    if ((cardDigits.length - 1 - i) % 2 === 1) {
      currentValue *= 2;
    }
    //Subtract num if greater than 9
    if (currentValue > 9) {
      currentValue -= 9;
    }
    //Add all num
    sum += currentValue;
  }
  //Module 10 num and return
  return sum % 10 === 0 ? true : false;
};

// Test functions:
// console.log(validateCred(valid1)); // Should print true
// console.log(validateCred(invalid6)); // Should print false

const findInvalidCards = (creditCardsArr) => {
  let invalidCards = [];
  //Check each cards arr, use validateCred func to find invalid cards then store it
  for (let i = 0; i < creditCardsArr.length; i++) {
    if (validateCred(creditCardsArr[i]) === false) {
      invalidCards.push(creditCardsArr[i]);
    }
  }
  return invalidCards;
};

// Test function
// console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5])); // Shouldn't print anything
// console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers

// console.log(findInvalidCards(batch)); // Test what the mystery numbers are

const idInvalidCardCompanies = (creditCardsArr) => {
  const invalidCards = findInvalidCards(creditCardsArr);
  let invalidCardsCompanies = [];

  for (let i = 0; i < invalidCards.length; i++) {
    switch (invalidCards[i][0]) {
      case 3:
        if (invalidCardsCompanies.indexOf("Amex") === -1) {
          invalidCardsCompanies.push("Amex");
        }
        break;
      case 4:
        if (invalidCardsCompanies.indexOf("Visa") === -1) {
          invalidCardsCompanies.push("Visa");
        }
        break;
      case 5:
        if (invalidCardsCompanies.indexOf("MasterCard") === -1) {
          invalidCardsCompanies.push("MasterCard");
        }
        break;
      case 6:
        if (invalidCardsCompanies.indexOf("Discover") === -1) {
          invalidCardsCompanies.push("Discover");
        }
        break;
      default:
        console.log("Company not found");
    }
  }
  return invalidCardsCompanies;
};

// console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
// console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
// console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards

const stringToArr = (creditCard) => {
  return creditCard.split("").map(Number);
};

// console.log(stringToArr("4532697726221368092"));

const convertToValid = (cardDigits) => {
  const calculateSum = (cardDigits) => {
    let sum = 0;
    for (let i = cardDigits.length - 1; i >= 0; i--) {
      let currentValue = cardDigits[i];
      if ((cardDigits.length - 1 - i) % 2 === 1) {
        currentValue *= 2;
        if (currentValue > 9) {
          currentValue -= 9;
        }
      }
      sum += currentValue;
    }
    return sum;
  };

  const sum = calculateSum(cardDigits);
  const remainder = sum % 10;
  const adjustment = (10 - remainder) % 10;
  cardDigits[cardDigits.length - 1] =
    (cardDigits[cardDigits.length - 1] + adjustment) % 10;
  return cardDigits;
};
console.log(convertToValid(invalid6));
