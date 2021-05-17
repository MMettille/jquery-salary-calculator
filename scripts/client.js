$( document ).ready(readyNow);

function readyNow(){
    // jQuery and JS is loaded, okay to manipulate the DOM
    console.log( 'in readyNow function' );
    // What happens when the submit button is clicked
    $( '#submitBtn' ).on( 'click', getUserInputs )
    // what happens when the delete button is clicked
    $( '#outputs' ).on( 'click', '.something', '#deleteBtn', clickedDelete );
    // what happens when the enter button is clicked
    $( '#enterBtn' ).on( 'click', getUserBudgetInput );
}

// If we want to calculate monthly spend, we will need to loop through an array. Create an empty array and a new variable
let employeeArray = [];
let totalSpend = 0;

function getUserInputs(){
    // Checking to see if function is being called
    console.log( 'in getUserInputs function' );
    // targeting user's inputs with the DOM and creating an object
    let employee = {
        firstName: $( '#firstNameInput').val(),
        lastName: $( '#lastNameInput' ).val(),
        id: $( '#idInput' ).val(),
        role: $( '#roleInput').val(),
        salary:  Number($( '#salaryInput' ).val()),
        biweekly: Math.round(Number($( '#salaryInput' ).val()/26))
    } // end employee
    // runs the function checkInputs to see if all inputs were filled out
    if(checkInputs(employee)){
        alert("Please enter all fields.");
        return;
    } // end checkInputs
    // push employee to an empty global array
    employeeArray.push(employee)
    displayThings();
    monthlyCalc();
    clearInputFields();
}

// setting the payroll budget to the user's input
function getUserBudgetInput(){
    // Checking to see if function is being called
    console.log( 'in getUserBudgetInput function' );
    // targeting user's inputs with the DOM and creating a variable
    let payrollBudget = $( '#payrollBudgetInput' ).val();
    // making the user's inputs a rounded number
    payrollBudget = Math.round(payrollBudget);
    console.log(payrollBudget);
    // clear the input fields
    $( '#payrollBudgetInput' ).val('');
    // // appending the DOM with the user's input
    // // empty what is there
    $( '.budgetOutput' ).empty();
    $( '.budgetOutput' ).append(`
        <h3>Monthly Payroll Budget: $${payrollBudget}</h3>
        `)
    if ( totalSpend >= payrollBudget ){
            $( '.payrollCalc' ).addClass('overbudget');
    } else {
        $( '.payrollCalc' ).addClass('underbudget');
    }
}

// clear the input fields
function clearInputFields(){
    $( '#idInput').val( '' );
    $( '#firstNameInput').val( '' );
    $( '#lastNameInput').val( '' );
    $( '#roleInput').val( '' );
    $( '#salaryInput').val( '' );
}

// Changing what happens on the DOM
function displayThings(){
    // empty what is there
    $( '.addARow' ).empty();
    // loop through the array, add a table row for each employee
    for (let employee of employeeArray) {
        let $employee = $(`
            <tr class='something'>
                <td>${employee.id}</td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.role}</td>
                <td>$${employee.salary}</td>
                <td>$${employee.biweekly}</td>
                <td>
                    <button id="deleteBtn" class="btn btn-danger btn-sm">DELETE</button>
                </td></tr>`)
        // setting .data() so we can retrieve it later
        $employee.data(employee);
        $( '.addARow' ).append($employee);
        hightlightRed();
    }
}

function clickedDelete(){
    // Checking to see if function is being called
    console.log( 'in function clickedDelete' );
    // getting the .data()
    confirm('Are you sure you want to delete this employee?')
    let deletedEmployee = $(this).data();
    for (let i = 0; i<employeeArray.length; i++){
        let employee = employeeArray[i]
        // comparing the .data() with what we have in the array
        if (employee.id == deletedEmployee.id &&
            employee.firstName == deletedEmployee.firstName &&
            employee.lastName == deletedEmployee.lastName &&
            employee.role == deletedEmployee.role &&
            employee.salary == deletedEmployee.salary &&
            employee.biweekly == deletedEmployee.biweekly){
                employeeArray.splice(i, 1);
            }
    }
    // console.log( 'new employeeArray:', employeeArray )
    
    monthlyCalc();
}

// function to check monthly salary
function monthlyCalc(){
    // Checking to see if function is being called
    console.log( 'in function monthlyCalc' )
    let totalSpend = 0;
    // for each employee, combine all salaries
    for (employeez of employeeArray){
        totalSpend += Math.round(employeez.salary/12);
        // console.log(totalSpend);
    }
    console.log(totalSpend)
    // append the total to the DOM
    let el = $( '.payrollCalc' );
    el.empty();
    el.append(`<h3>Monthly Spend on Payroll: $${totalSpend}</h3>`);
    displayThings();
}

// function to check if the monthly spend is over the payroll budget and highlighting it red if it is
function hightlightRed(){
    // Checking to see if function is being called
    console.log( 'in function hightlightRed' );
    let payrollBudget = $( '#payrollBudgetInput' ).val();
    if ( totalSpend >= payrollBudget ){
            $( '.payrollCalc' ).addClass('overbudget');
    }else {
        $( '.payrollCalc' ).addClass('underbudget');
    }
}
 
function checkInputs(employee){
     if(employee.firstName === '' || employee.lastName === '' || employee.id === '' || employee.role === '' || employee.salary === ""){
        return true;
    } return false;
}