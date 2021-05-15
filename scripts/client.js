$( document ).ready(readyNow);

function readyNow(){
    // jQuery and JS is loaded, okay to manipulate the DOM
    console.log( 'in readyNow function' );
    // What happens when the submit button is clicked
    $( '#submitBtn' ).on( 'click', getUserInputs )
    // what happens when the delete button is clicked
    $( '#outputs' ).on( 'click', '.something', '#deleteBtn', clickedDelete );
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
        salary:  $( '#salaryInput' ).val(),
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

// clear the input fields
function clearInputFields(){
    $( '#firstNameInput').val( '' );
    $( '#lastNameInput').val( '' );
    $( '#idInput').val( '' );
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
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.role}</td>
                <td>$${employee.salary}</td>
                <td>
                    <button id="deleteBtn">DELETE</button>
                </td></tr>`)
        // setting .data() so we can retrieve it later
        $employee.data(employee);
        $( '.addARow' ).append($employee);
    }
}

function clickedDelete(){
    // Checking to see if function is being called
    console.log( 'in function clickedDelete' );
    // getting the .data()
    let deletedEmployee = $(this).data();
    for (let i = 0; i<employeeArray.length; i++){
        let employee = employeeArray[i]
        // comparing the .data() with what we have in the array
        if (employee.firstName == deletedEmployee.firstName &&
            employee.lastName == deletedEmployee.lastName &&
            employee.id == deletedEmployee.id &&
            employee.role == deletedEmployee.role &&
            employee.salary == deletedEmployee.salary){
                employeeArray.splice(i, 1);
            }
    }
    // console.log( 'new employeeArray:', employeeArray )
    displayThings()
    monthlyCalc();
}

// function to check monthly salary and if the total spend is over 20000
function monthlyCalc(){
    // Checking to see if function is being called
    console.log( 'in function monthlyCalc' )
    let totalSpend = 0;
    // for each employee, combine all salaries
    for (employeez of employeeArray){
        totalSpend += Math.round(Number(employeez.salary/12));
        // console.log(totalSpend);
    }
    console.log(totalSpend)
    // append the total to the DOM
    let el = $( '.payrollCalc' );
    el.empty();
    el.append(`<h3>Monthly Spend on Payroll: $${totalSpend}</h3>`);
    checkMonthlyPayrollBudget();
}

function checkMonthlyPayrollBudget(){
    let payRollBudget = $( '$' )
    if ( totalSpend >= 20000 ){
        $( '.payrollCalc' ).css( 'background-color', 'red' );
    }
}
function checkInputs(employee){
     if(employee.firstName === '' || employee.lastName === '' || employee.id === '' || employee.role === '' || employee.salary === ""){
        return true;
    } return false;
}