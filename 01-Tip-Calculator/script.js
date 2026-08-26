// ============================================================
// 1. Select HTML Elements
// ============================================================


// HTML                         JavaScript
// ------------------------------------------------
// id="bill"          →         billInput
// id="tip"           →         tipInput
// id="tip-form"      →         tipForm
// id="tip-result"    →         tipResult
// id="total-result"  →         totalResult


// document.querySelector("#bill");        // By id
// document.querySelector(".input-field"); // By class
// document.querySelector("input");        // By HTML tag


// Select the bill input element from the HTML.
// "querySelector()" allows JavaScript to find an HTML element
// using a CSS selector.
// "#bill" means we are looking for the element with id="bill".

const billInput = document.querySelector("#bill");   // By id


// Get the value entered by the user in the bill input.

// Learning example:
// This value is read when the page first loads.
// The actual calculation uses currentBillValue inside the submit event.

// const billValue = billInput.value;

// Display the entered bill value in the browser console.

// Learning example:
// console.log(billValue);


// Select the tip percentage input element.
// The "#tip" selector finds the element with id="tip".

const tipInput = document.querySelector("#tip");


// For example, if the user enters:
// Bill: 100
// Tip: 15
//
// We will have:
// billValue → "100"
// tipValue  → "15"


// Get the value entered by the user in the tip input.

// Learning example:
// This value is read when the page first loads.
// The actual calculation uses currentTipValue inside the submit event.

// const tipValue = tipInput.value;

// Display the entered tip value in the browser console.

// Learning example:
// console.log(tipValue);


// Select the form element.
// We will use the form later to handle the Calculate action.

const tipForm = document.querySelector("#tip-form");


// Select the element where we will display the tip result.

const tipResult = document.querySelector("#tip-result");


// Select the element where we will display the final total.

const totalResult = document.querySelector("#total-result");


// Select the HTML element where we will display error messages.

const errorMessage = document.querySelector("#error-message");


// Select the Calculate button.
// We will use this element to change its visual state
// depending on whether the user's input is valid or invalid.

const calculateButton = document.querySelector('input[type="submit"]');


// Listen for changes in the bill input.
// When the user starts editing the value,
// remove the previous error state.

billInput.addEventListener("input", function() {

    calculateButton.classList.remove("error");

});


// Listen for changes in the tip input.
// When the user starts editing the value,
// remove the previous error state.

tipInput.addEventListener("input", function() {

    calculateButton.classList.remove("error");

});


// Print the bill input element in the browser console.
// This helps us check that JavaScript successfully found the element.
// billInput contains the entire HTML <input> element.

// Learning / debugging example:
// console.log(billInput);


// ============================================================
// 2. Handle Form Submission
// ============================================================


// "addEventListener()" allows JavaScript to listen for an event.
// Here, we are listening for the "submit" event of the form.
// <form id="tip-form">
//
// The "submit" event happens when the user clicks
// the Calculate button.

tipForm.addEventListener("submit", function(event) {

    // Prevent the browser from refreshing the page
    // when the form is submitted.
    event.preventDefault();


    // Check if the submit event is working correctly.

    // Learning / debugging example:
    // console.log("Calculate button was clicked!");


    // Get the current value entered by the user
    // in the bill input when the form is submitted.

    const currentBillValue = billInput.value;


    // Get the current value entered by the user
    // in the tip input when the form is submitted.

    const currentTipValue = tipInput.value;


    // Convert the bill value from a string to a number.

    const currentBill = Number(currentBillValue);


    // Convert the tip value from a string to a number.

    const currentTip = Number(currentTipValue);


    // ========================================================
    // Validation 1 — Check for Empty Inputs
    // ========================================================


    // currentBillValue === ""  → Bill is empty
    //       OR
    // currentTipValue === ""   → Tip is empty

    // "||" means OR.
    // Check if the tip value is empty.
    // "" represents an empty string, which means the user did not enter a value.
    // Check if the bill amount or tip percentage is empty.

    if (currentBillValue === "" || currentTipValue === "") {

        // Display an error message inside the HTML element.

        errorMessage.textContent =
            "Please enter both the bill amount and tip percentage.";

            // Remove the success state if it exists.
            calculateButton.classList.remove("success");

            // Add the error state to the Calculate button.
            calculateButton.classList.add("error");


        // Stop the function here.
        // The calculation will not continue.

        return;
    }


    // ========================================================
    // Validation 2 — Check for Negative Values
    // ========================================================


    // currentBill < 0 || currentTip < 0
    // Is the bill less than 0? OR Is the tip less than 0?
    // If one of them is negative, the condition is true.
    //
    // Example:
    // currentBill < 0 → -100 < 0 = true
    //
    // Check if the bill amount or tip percentage is negative.
    // Negative values are not valid for this calculator.
    //
    // -100 < 0 → true
    // 15 < 0   → false
    // true "|| (OR)" false → true

    if (currentBill < 0 || currentTip < 0) {

        // Display an error message inside the HTML element.

        errorMessage.textContent =
            "Bill amount and tip percentage cannot be negative.";

         // Remove the success state.
        calculateButton.classList.remove("success");

         // Add the error state.
        calculateButton.classList.add("error");


        // Stop the function here.
        // The calculation will not continue.

        return;
    }


    // ========================================================
    // Validation 3 — Check Tip Percentage
    // ========================================================


    // Check if the tip percentage is greater than 100.
    // A tip percentage above 100 is not valid for our calculator.

    if (currentTip > 100) {

        // Display an error message inside the HTML element.
        // This message shows that the condition
        // "if (currentTip > 100)" is correct.
        //
        // Example:
        // 150 > 100 → true

        errorMessage.textContent =
            "Tip percentage cannot be greater than 100%.";


            // Remove the success state.
        calculateButton.classList.remove("success");

          // Add the error state.
        calculateButton.classList.add("error");


        // Stop the function here.
        // The calculation will not continue.

        return;
    }


    // ========================================================
    // Clear Previous Error
    // ========================================================


    // Clear any previous error message
    // before displaying a new calculation.

      errorMessage.textContent = "";

    // Remove the error state because the input is valid.
     calculateButton.classList.remove("error");

    // Add the success state to the Calculate button.
     calculateButton.classList.add("success");


       // User clicks Calculate
      //         ↓
      // JavaScript Validation
      //         ↓
       //    ┌───────────────┐
       //    │               │
       //  Valid          Invalid
       //    ↓               ↓
       // .success         .error
       //    ↓               ↓
       // Green/Teal      Burnt Orange

    // ========================================================
    // Calculate Tip
    // ========================================================


    // Calculate the tip amount.
    //
    // Example:
    // Bill = 100
    // Tip = 15%
    //
    // 100 × (15 / 100) = 15 = Tip

    const tipAmount = currentBill * (currentTip / 100);


    // ========================================================
    // Calculate Total
    // ========================================================


    // Calculate the final total.
    //
    // Example:
    // 100 + 15 = 115 = Total
    //
    // The total is the bill amount plus the tip amount.

    const total = currentBill + tipAmount;


    // Display the calculated tip amount in the browser console.

    // Learning / debugging example:
    // console.log(tipAmount);


    // Display the final total in the browser console.

    // Learning / debugging example:
    // console.log(total);


    // ========================================================
    // Display Results in HTML
    // ========================================================


    // "tipResult.textContent" changes the text inside the HTML element.
    // Update the text inside the tip result element
    // with the calculated tip amount.

     // Update the tip amount inside the Tip card.
     tipResult.textContent = `€${tipAmount}`;


    // Update the text inside the total result element
    // with the calculated final total.

    // Update the total amount inside the Total card.
     totalResult.textContent = `€${total}`;

});

// ============================================================
// 💎💎💎💎💎Learning Note — toFixed() 💎💎💎💎💎💎💎💎
// ============================================================

// JavaScript provides the "toFixed()" method to control
// the number of decimal places displayed for a number.
//
// Example:
//
// const number = 15.5678;
//
// number.toFixed(2)
// → "15.57"
//
//
// For a money calculator, using two decimal places
// can make the result look more like a real financial calculator.
//
// Example:
//
// tipResult.textContent = `€${tipAmount.toFixed(2)}`;
// totalResult.textContent = `€${total.toFixed(2)}`;
//
//
// However, we are NOT using toFixed() in the current version.
//
// We are keeping the original calculated number visible
// because this project is also being used to learn
// how JavaScript performs calculations.
//
// We can decide later whether the final UI should display
// exactly two decimal places, depending on the calculator design.


// ============================================================
// 3. Convert Values to Numbers — Learning Example
// ============================================================


// The following section was part of the learning process.
// The actual calculator already converts the values inside
// the submit event using currentBill and currentTip.
//
// We are NOT deleting this section.
// We are keeping it commented out because it is useful
// for learning how Number() and typeof work.


// Convert the bill value from a string to a number.

// const bill = Number(billValue);


// Display the bill value and its data type in the console.

// console.log(bill);
// console.log(typeof bill);


// Convert the tip value from a string to a number.

// const tip = Number(tipValue);


// Display the tip value and its data type in the console.

// console.log(tip);
// console.log(typeof tip);


// ============================================================
// Validation Examples — Learning Notes
// ============================================================


// Tip = 15
//    ↓
// 15 < 0 ?  NO
// 15 > 100 ? NO
//    ↓
// VALID ✅


// Tip = -10
//    ↓
// -10 < 0 ? YES
//    ↓
// INVALID ❌


// Tip = 150
//    ↓
// 150 > 100 ? YES
//    ↓
// INVALID ❌
// "Tip percentage cannot be greater than 100%."


// 15 > 100 → false → continues ✅
// 100 > 100 → false → continues ✅
// 150 > 100 → true  → Error ❌


// Tip = 15
// 15 > 100 → false → continues ✅


// Tip = 50
// 50 > 100 → false → continues ✅


// Tip = 100
// 100 > 100 → false → continues ✅


// Tip = 150
// 150 > 100 → true → Error ❌