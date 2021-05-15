$( document ).ready(readyNow);

function readyNow(){
    // jQuery and JS is loaded, okay to manipulate the DOM
    console.log( 'in readyNow function' );
    // What happens when the submit button is clicked
    $( '#submitBtn' ).on( 'click', getUserInputs )
    // what happens when the delete button is clicked
    $( '.body' ).on( 'click', '.deleteBtn', clickedDelete );
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
    // appending to table
    $( '.addARow' ).append(`
                <tr class="something">
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.id}</td>
                    <td>${employee.role}</td>
                    <td>$${employee.salary}</td>
                    <td>
                        <button class="deleteBtn">DELETE</button>
                    </td>
                </tr>
        `)
    // clear the input fields
    $( '#firstNameInput').val( '' );
    $( '#lastNameInput').val( '' );
    $( '#idInput').val( '' );
    $( '#roleInput').val( '' );
    $( '#salaryInput').val( '' );
    console.log(employeeArray);
    monthlyCalc();
}

function clickedDelete(){
    // Checking to see if function is being called
    console.log( 'in function clickedDelete' );
    // delete the closest thing
    let deletedSalary = $(this).parent().prev().text();
    console.log(deletedSalary)
    deletedSalary = deletedSalary.replace($, '');
    console.log(deletedSalary)
    totalSpend -= parseInt(totalSpend - deletedSalary / 12);
    console.log(totalSpend)
    // for (let i = 0; i<employeeArray.length; i++){
    //     let employeezz = employeeArray[i]
    //     console.log(employeezz);
    //     if (employeezz.firstName === deletedEmployee.firstName &&
    //         employeezz.lastName === deletedEmployee.lastName &&
    //         employeezz.id === deletedEmployee.id &&
    //         employeezz.role === deletedEmployee.role &&
    //         employeezz.salary === deletedEmployee.salary){
    //             console.log(employee.firstName)
    //             employeeArray.splice(i, 1)
    //         }
    // }
    // console.log( 'new employeeArray:', employeeArray )
    // $(this).closest('.something').remove();
    // monthlyCalc();
}

function monthlyCalc(){
    // Checking to see if function is being called
    console.log( 'in function monthlyCalc' )
    let totalSpend=0;
    // for each employee, combine all salaries
    for (employeez of employeeArray){
        totalSpend += Number(employeez.salary/12);
        console.log(totalSpend);
    }
    // append the total to the DOM
    let el = $( '.payrollCalc' );
    el.empty();
    el.append(`<h3>Monthly Spend on Payroll: $${totalSpend}</h3>`);
    if ( totalSpend >= 20000 ){
        $( 'h3' ).css( 'background-color', 'red' );
    }
}

function checkInputs(employee){
     if(employee.firstName === '' || employee.lastName === '' || employee.id === '' || employee.role === '' || employee.salary === ""){
        return true;
    } return false;
}