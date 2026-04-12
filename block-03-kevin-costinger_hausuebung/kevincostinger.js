"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Noreya Friesacher - 2026-04-10
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.

document.querySelector("form").addEventListener("submit", submitForm)

function submitForm(e){
    //TODO: Prevent the default behavior of the submit button.
    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.
    e.preventDefault();

    let date = document.getElementById("date").value;
    let amount = document.getElementById("amount").value*1;
    let text = document.getElementById("expense").value;

    //Validation
    if (isEmpty(date)) {
        alert("Please enter valid date");
        document.getElementById("date").focus();
        return;
    }

    if (amount < 0.01) {
        alert("Amount must be at least 0.01");
        document.getElementById("amount").focus();
        return;
    }

    if (text.length < 3) {
        alert("Please enter at least 3 characters.");
        document.getElementById("expense").focus();
        return;
    }

    //Add row
    addExpenseRow(date, amount, text);

    //Update sum
    sumExpenses += amount;
    document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);

    //Reset form
    e.target.reset();
}

function addExpenseRow(date, amount, text) {
    let table = document.querySelector("#expenses tbody");

    let tr = document.createElement("tr");

    let tdDate = document.createElement("td");
    tdDate.textContent = date;

    let tdAmount = document.createElement("td");
    tdAmount.textContent = formatEuro(amount);

    //Text
    let tdText = document.createElement("td");
    tdText.innerText = text;

    //Delete-button
    let tdDelete = document.createElement("td");
    let btn = document.createElement("button");
    btn.classList.add("delete");
    btn.textContent = "X";
    tdDelete.appendChild(btn);

    tr.appendChild(tdDate);
    tr.appendChild(tdAmount);
    tr.appendChild(tdText);
    tr.appendChild(tdDelete);

    let headerRow = table.querySelector("tr");
    table.insertBefore(tr, headerRow.nextSibling);
}

//for delete-button
document.querySelector("#expenses").addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {

        let row = e.target.closest("tr");
        let amountCell = row.children[1].textContent;

        let value = amountCell.replace(".", "").replace(",", ".");
        sumExpenses -= value;
        document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);

        row.remove();
    }
});

/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}