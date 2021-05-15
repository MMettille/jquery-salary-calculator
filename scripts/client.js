$( document ).ready(readyNow);

function readyNow(){
    // jQuery and JS is loaded, okay to manipulate the DOM
    console.log( 'in readyNow function' );
    // What happens when the submit button is clicked
    $( '#submitBtn' ).on( 'click', getUserInputs )
    // what happens when the delete button is clicked
    $( '.body' ).on( 'click', '.deleteBtn', clickedDelete );
}

let employeeArray = [];

function getUserInputs(){
    // Checking to see if function is being called
    console.log( 'in getUserInputs function' );
    // targeting user's inputs with the DOM and creating an object
    let employee = {
        firstName: $( '#firstNameInput').val(),
        lastName: $( '#lastNameInput' ).val(),
        id: $( '#idInput' ).val(),
        role: $( '#roleInput').val(),
        salary:  $( '#salaryInput' ).val()
    } // end employee
    // runs the function checkInputs to see if all inputs were filled out
    if(checkInputs(employee)){
        alert("Please enter all fields.");
    } // end checkInputs
    // push employee to an empty global array
    employeeArray.push(employee)
    // appending to table
    $( '.table' ).append(`
            <div class="row">
                <tr>
                    <td>${employee.firstName}</td>
                    <td>${employee.lastName}</td>
                    <td>${employee.id}</td>
                    <td>${employee.role}</td>
                    <td>${employee.salary}</td>
                    <div>
                        <button class="deleteBtn">DELETE</button>
                    </div>
                </tr>
            </div>
        `)
    // clear the input fields
    $( '#firstNameInput').val( '' );
    $( '#lastNameInput').val( '' );
    $( '#idInput').val( '' );
    $( '#roleInput').val( '' );
    $( '#salaryInput').val( '' );
    // console.log(employeeArray); --> Testing to make sure that everything is working properly. It is!
}

function clickedDelete(){
    // Checking to see if function is being called
    console.log( 'in function clickedDelete' );
    // delete the closest thing

}
function checkInputs(employee){
     if(employee.firstName === '' || employee.lastName === '' || employee.id === '' || employee.role === '' || employee.salary === ""){
        return true;
    } return false;
}