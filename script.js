// --- Query Selector for each buttons ---//

// L1 //
const numberNine = document.getElementById("9");
const numberHeight = document.getElementById("8");
const numberSeven = document.getElementById("7");
// L2 //
const numberSix = document.getElementById("6");
const numberFive = document.getElementById("5");
const numberFour = document.getElementById("4");
// L3 //
const numberOne = document.getElementById("1");
const numberTwo = document.getElementById("2");
const numberThree = document.getElementById("3");
// L4 //
const negateButton = document.getElementById("negate");
const numberZero = document.getElementById("0");
const dot = document.getElementById("dot");
// Calculs Signs //
const calculAddition = document.getElementById("addition");
const calculSubtraction = document.getElementById("subtraction");
const calculMultiplication = document.getElementById("multiplication");
const calculDivision = document.getElementById("division");
const calculDenominatorOne = document.getElementById("denominatorOne");
const calculSquareOf = document.getElementById("squareOf");
const calculSquare = document.getElementById("square");

const calculPourcentage = document.getElementById("pourcentage");
const clear = document.getElementById("clear");
const clearCE = document.getElementById("clearLastEntry");
const del = document.getElementById("del");

const egal = document.getElementById("egal");

// --- Query Selector for display the code in the HTML ---//

const displayFirstEntry = document.querySelector(".firstEntry");
const displaySecondEntry = document.querySelector(".secondEntry");
const displayPourcent = document.querySelector(".pourcent");
const divCalculResult = document.getElementById("calculResult");

// ------------------------ //

const numbersButtons = [
	numberOne,
	numberTwo,
	numberThree,
	numberFour,
	numberFive,
	numberSix,
	numberSeven,
	numberHeight,
	numberNine,
	numberZero,
];

const operatorsButtons = [
	calculAddition,
	calculSubtraction,
	calculMultiplication,
	calculDivision,
	calculPourcentage,
	calculDenominatorOne,
	calculSquareOf,
	calculSquare,
];

// --- Calcul Variables --- //

let firstEntry = [];
let finalFirstEntry = 0;

let secondEntry = [];
let newSecondEntry = [];
let finalSecondEntry = 0;

let operator;
let result;

// --- Get entries --- //

function updateEntry(entry, display, e) {
	entry.push(e.target.value);
	const finalEntry = Number(entry.toString().replaceAll(",", ""));
	display.innerText = finalEntry;
	return finalEntry;
}

function getEntries(e) {
	if (!operator) {
		finalFirstEntry = updateEntry(firstEntry, displayFirstEntry, e);
	} else if (operator && !result) {
		finalSecondEntry = updateEntry(secondEntry, displaySecondEntry, e);
	} else if (operator && result) {
		finalSecondEntry = updateEntry(newSecondEntry, displaySecondEntry, e);
		secondEntry = [...newSecondEntry];
	}
}

// --- Get operator --- //

function getOperator(e) {
	const displayOperator = document.querySelector(".operator");
	const displayTypeOfOperator = document.querySelector(".typeof-operator");

	operator = e.target.value;

	displayOperator.innerText = operator;
	displayTypeOfOperator.innerText = typeof operator;
}

// --- Add dot (".") to the array --- //

function addDot() {
	if (firstEntry !== undefined && operator === undefined) {
		firstEntry.push(".");
	} else if (firstEntry !== undefined && operator !== undefined && newSecondEntry.length === 0) {
		secondEntry.push(".");
	} else if (newSecondEntry !== undefined) {
		newSecondEntry.push(".");
	} else return;
}

// Negate Function (change the sign of the number) but doesn't work properly in case of newSecondEntry //

function negate() {
	function updateDisplay(entry, display) {
		const value = Number(entry.toString().replaceAll(",", ""));
		display.innerText = value;
	}

	function toggleNegative() {
		if (entry[0] === "-") {
			entry.shift();
		} else {
			entry.unshift("-");
		}
	}

	if (firstEntry !== undefined && operator === undefined) {
		toggleNegative(firstEntry);
		updateDisplay(firstEntry, displayFirstEntry);
	} else if (firstEntry !== undefined && operator !== undefined && newSecondEntry.length === 0) {
		toggleNegative(secondEntry);
		updateDisplay(secondEntry, displaySecondEntry);
	}
}

// --- Class with method for calculate all entries --- //

class Calculation {
	constructor(a, b) {
		this.a = a;
		this.b = b;
	}
	addition() {
		console.log("Calculation Addition === " + this.a + " + " + this.b);
		return this.a + this.b;
	}
	subtraction() {
		console.log("Calculation Subtraction === " + this.a + " - " + this.b);
		return this.a - this.b;
	}
	multiplication() {
		console.log("Calculation Multiplication === " + this.a + " x " + this.b);
		return this.a * this.b;
	}
	division() {
		console.log("Calculation Division === " + this.a + " / " + this.b);
		return this.a / this.b;
	}
	pourcentage() {
		let pourcent = (this.b / 100) * this.a;
		console.log("Calculation Pourcentage === " + this.a + "  " + this.b + " " + pourcent);

		displayPourcent.innerText = pourcent;
		return this.a + pourcent;
	}
	denominatorOne() {
		let testEntrie = 1 / this.a;
		console.log("Calculation Denominator One" + testEntrie + this.a);

		return testEntrie + this.b;
	}
	squareOf() {
		console.log("Calculation SquareOf === " + this.a * this.a);
		return this.a * this.a;
	}
	square() {
		console.log("Calculation Square === " + Math.sqrt(this.a));
		return Math.sqrt(this.a);
	}
}

// --- GetResult function --- //

function getResult(finalFirstEntry, finalSecondEntry, operator) {
	const newCalcul = new Calculation(finalFirstEntry, finalSecondEntry);

	if (operator === "+") {
		result = newCalcul.addition();
	} else if (operator === "-") {
		result = newCalcul.subtraction();
	} else if (operator === "x") {
		result = newCalcul.multiplication();
	} else if (operator === "/") {
		result = newCalcul.division();
	} else if (operator === "%") {
		result = newCalcul.pourcentage();
	} else if (operator === "1/x") {
		result = newCalcul.denominatorOne();
	} else if (operator === "x²") {
		result = newCalcul.squareOf();
	} else if (operator === "²√x") {
		result = newCalcul.square();
	} else return;

	divCalculResult.innerText = result;

	firstEntry = [];
	finalFirstEntry = result;
	secondEntry = [];
	finalSecondEntry = 0;
	operator = "";
	newSecondEntry = [];
}

// --- Reset all the JS code display in the html --- //

function globalInnerTextClear() {
	displayFirstEntry.innerText = 0;
	displaySecondEntry.innerText = 0;
	divCalculResult.innerText = 0;
	displayPourcent.innerText = null;
}

// --- Reset all entrie and variable for a new calcul + trigger globalInnerTextClear --- //

function clearAll() {
	firstEntry = [];
	finalFirstEntry = 0;
	secondEntry = [];
	newSecondEntry = [];
	finalSecondEntry = 0;
	operator = null;
	result = null;

	globalInnerTextClear();
}

// --- Reset Entries or Entry --- //

function clearLastEntry() {
	if ((finalFirstEntry !== undefined && operator === undefined) || null) {
		resetEntry("first");
	} else if (finalSecondEntry !== undefined && finalFirstEntry !== undefined) {
		resetEntry("second");
	}
}

function resetEntry(entryType) {
	if (entryType === "first") {
		firstEntry = [];
		finalFirstEntry = 0;
		displayFirstEntry.innerText = 0;
	} else if (entryType === "second") {
		secondEntry = [];
		newSecondEntry = [];
		finalSecondEntry = 0;
		displaySecondEntry.innerText = 0;
	}
}

function delLastNumber() {
	if (firstEntry.length >= 1 && secondEntry.length === 0 && !operator) {
		firstEntry.pop();
		finalFirstEntry = Number(firstEntry.toString().replaceAll(",", ""));
		displayFirstEntry.innerText = finalFirstEntry;
	} else if (firstEntry.length > 1 && operator) {
		secondEntry.pop();
		finalSecondEntry = Number(secondEntry.toString().replaceAll(",", ""));
		displaySecondEntry.innerText = finalSecondEntry;
	} else return;
}

// --- Add event listener for the "C" button and trigger the clearAll function ---//

clear.addEventListener("click", () => clearAll());

// --- Add event listener for the "CE" button and trigger the clearLastEntry function ---//

clearCE.addEventListener("click", () => clearLastEntry());

// --- Add event listener for the "DL" button and trigger the delLastNumber function ---//

del.addEventListener("click", () => delLastNumber());

// --- Add event listener for the =/- button and trigger Negate Function --- //

negateButton.addEventListener("click", () => negate());

// ------------------------ //
dot.addEventListener("click", () => addDot());

// --- Add event listener for the equal button and trigger the result function ---//

egal.addEventListener("click", () => {
	if (result !== undefined) {
		finalFirstEntry = result;
		finalSecondEntry = Number(secondEntry.toString().replaceAll(",", ""));

		displayFirstEntry.innerText = finalFirstEntry;
		displaySecondEntry.innerText = finalSecondEntry;
	} else {
		finalFirstEntry = Number(firstEntry.toString().replaceAll(",", ""));
		finalSecondEntry = Number(secondEntry.toString().replaceAll(",", ""));
	}
	getResult(finalFirstEntry, finalSecondEntry, operator);
});

// --- Add event listener for each buttons for get the entries and the operator ---//

numbersButtons.forEach((element) => {
	element.addEventListener("click", (e) => {
		getEntries(e);
	});
});

operatorsButtons.forEach((element) => {
	element.addEventListener("click", (e) => {
		getOperator(e);
	});
});

// ------------------------ //
