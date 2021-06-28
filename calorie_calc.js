// JavaScript Document

/* live form validation
 * Using jQuery
 * Plugin Validate.js in assets folder
 */
$(document).ready(function () {
	$('#calorie_calculator').validate();
});

/* Calorie Calculator Variables */
var person = {
	fname: 'John',
	lname: 'Doe',
	fullname: function () {
		return this.fname + ' ' + this.lname;
	},
};

var gender = 'Male';
var age = 0;
var weight = 0;
var height = 0;
var activityLevel = 0;
var bmr = 0;
var tdee = 0;
const submitBttn = document.getElementById('submitBttn');

submitBttn.addEventListener('click', formValidate);

/* Validates the Form
 * Using jQuery
 * Pluging called jQuery validate
 * Website for documentation (https://jqueryvalidation.org/)
 */
function formValidate() {
	let form = $('#calorie_calculator');
	form.validate();
	let valid = form.valid();

	if (valid == true) {
		genereatesAndWriteCalorieResults();
	} else {
		alert('Please fill out all required fields');
	}
}

/* Main calorie calculator function
 * Actioned via the formValidate()
 */
function genereatesAndWriteCalorieResults() {
	let confirmInput = confirmInputInformation();
	if (confirmInput == false) return;

	const showResults = collapseForm();
	document.getElementById('pname').innerHTML = userName();
	document.getElementById('bmrCalc').innerHTML = bmrCalculationUsed();
	document.getElementById('resultBmr').value = calculateBMR();
	document.getElementById('actlvl').innerHTML =
		document.forms['calorieCalc']['actLvl'].value;
	document.getElementById('tdeeCalc').innerHTML = tdeeCalculationUsed();
	document.getElementById('resultTdee').value = calculateTDEE();
	document.getElementById('defTarget').value =
		document.forms['calorieCalc']['Defic'].value;
	document.getElementById('dailyTarget').value = dailyCalorieTarget();
	document.getElementById('weeklyTarget').value = weeklyCalorieTarget();
}

/* Asks the user to confirm the info they have entered is correct
 * If the are happy the function will continue
 * If the aren't happy they will exit the function
 */
function confirmInputInformation() {
	consent = confirm(
		'are you happy the data you have entered is correct? \n \n Click cancl to edit your data.'
	);
	return consent;
}

/* Replaces the form with the results
 * Using Css Classes
 * The calorie form will disappear
 * The results information will takes its place
 */
function collapseForm() {
	document
		.getElementById('calorie_calculator')
		.setAttribute('class', 'collapse');
	document.getElementById('results').setAttribute('class', 'expand');
}

/* Updates the person object
 * By collecting the users input on the form
 */
function userName() {
	person.fname = document.forms['calorieCalc']['firstname'].value;
	person.lname = document.forms['calorieCalc']['lastname'].value;
	return person.fullname();
}

// Displays the calculation used for working out the users basil metabolic rate
function bmrCalculationUsed() {
	var calcUsed;
	const maleCalc =
		'66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age)';
	const femaleCalc =
		'655 + (9.563 * weight) + (1.850 * height) - (4.676 * age)';

	if (gender == 'Male') {
		calcUsed = maleCalc;
	} else {
		calcUsed = femaleCalc;
	}
	return calcUsed;
}

// Calculates the users basil metabolic rate daily calories
function calculateBMR() {
	gender = document.forms['calorieCalc']['gender'].value;
	weight = document.forms['calorieCalc']['weight'].value;
	height = document.forms['calorieCalc']['height'].value;
	age = document.forms['calorieCalc']['age'].value;

	if (gender == 'Male') {
		bmr = 66.5 + 13.75 * weight + 5.003 * height - 6.755 * age;
	} else {
		bmr = 655 + 9.563 * weight + 1.85 * height - 4.676 * age;
	}
	return parseInt(bmr);
}

// Displays the calculation used to for working out the users total daily energy expenditure
function tdeeCalculationUsed() {
	activityLevel = document.forms['calorieCalc']['actLvl'].value;
	const calcUsedtdee = `${parseInt(bmr).toString()} * ${activityLevel}`;
	return calcUsedtdee;
}

// Calculates the users total daily energy expenditure daily calories
function calculateTDEE() {
	activityLevel;
	if (activityLevel == 'Sedentary') {
		activityLevel = 1.2;
	} else if (activityLevel == 'Light Activity') {
		activityLevel = 1.375;
	} else if (activityLevel == 'Moderately Active') {
		activityLevel = 1.55;
	} else {
		activityLevel = 1.725;
	}

	tdee = bmr * activityLevel;
	return parseInt(tdee);
}

// Calculates the users daily calorie target
function dailyCalorieTarget() {
	const deficit = document.forms['calorieCalc']['Defic'].value;
	let deficitValue = 0;

	if (deficit == '2 lb') {
		deficitValue = 500;
	} else if (deficit == '3 lb') {
		deficitValue = 750;
	} else {
		deficitValue = 1000;
	}

	let deficitTarget = parseInt(tdee) - deficitValue;
	return deficitTarget;
}

// Calculates the total amount of calories the user can eat in a week
function weeklyCalorieTarget() {
	const dailyCalories = dailyCalorieTarget();
	const weeklycalories = dailyCalories * 7;
	return weeklycalories;
}

/* Form Validation using Jquery and plugin
 * Pluging called jQuery validate
 * Website for documentation (https://jqueryvalidation.org/)
 */
function formValidate() {
	let form = $('#calorie_calculator');
	form.validate();
	let valid = form.valid();

	if (valid == true) {
		genereatesAndWriteCalorieResults();
	} else {
		alert('Please fill out all required fields');
	}
}
