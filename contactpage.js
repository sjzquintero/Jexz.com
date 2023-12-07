/********f************
    
	Project 4 
	Name: Santiago Jimenez Quintero
	Date: 5-12-2023
	
*********************/
function load() {

document.getElementById("contactform").addEventListener("submit", validate);
document.getElementById("contactform").addEventListener("reset", resetForm);

// hide all errors when loading the web 
	hideErrors();
}

function focusOnFirstError() {
    // Get all elements with the class "error"
    let errorElements = document.getElementsByClassName("error");

    // Variable para el primer campo de error
    let firstErrorField = null;

    // Find the first visible error element and set focus to its associated input field
    for (let i = 0; i < errorElements.length; i++) {
        if (errorElements[i].style.display !== "none") {
            let inputFieldId = errorElements[i].id.replace("_error", "");
            firstErrorField = document.getElementById(inputFieldId);
            break; // Stop after finding the first visible error
        }
    }

    
    return firstErrorField;
}


function validate(e) {
    // Hides all error elements on the page
    hideErrors();

    // Determine if the form has errors
    if (formHasErrors()) {
        // Prevents the form from submitting
        e.preventDefault();

       
        let firstErrorField = focusOnFirstError();

        // Set focus on the first error field
        if (firstErrorField) {
            firstErrorField.focus();
        }

        // When using onSubmit="validate()" in markup, returning false would prevent
        // the form from submitting
        return false;
    }

    alert("Thank you for filling out the contact information!");

    // When using onSubmit="validate()" in markup, returning true would allow
    // the form to submit
    return true;
    
}


function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Are you sure you want to reset?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

function hideErrors() {
   
    let errors = document.getElementsByClassName("error");

   
    for (let i = 0; i < errors.length; i++) {
        
        errors[i].style.display = "none";
    }
}




function formHasErrors() {
    let hasErrors = false;

    // Check required fields
    let requiredFields = ["fullname", "email", "phoneNumber"];
    for (let i = 0; i < requiredFields.length; i++) {
        let textField = document.getElementById(requiredFields[i]);
        if (!formFieldHasInput(textField)) {
            const errorElement = document.getElementById(requiredFields[i] + "_error");
            errorElement.style.display = "block";
            hasErrors = true;
        }
    }

    let checkcomments = ["comments"];
for (let i = 0; i < checkcomments.length; i++) {
    let commentsField = document.getElementById(checkcomments[i]);
    if (!formFieldHasInput(commentsField)) {
        const errorElement = document.getElementById(checkcomments[i] + "_error");
        errorElement.style.display = "block";
        hasErrors = true;
    }
}

    // Check email format if there is an input
    let emailField = document.getElementById("email");
    let emailValue = emailField.value.trim();
    if (emailValue && !isValidEmail(emailValue)) {
        const emailError = document.getElementById("emailformat_error");
        emailError.style.display = "block";
        hasErrors = true;
    }

    // Check phone number format if there is an input
    let phoneNumberField = document.getElementById("phoneNumber");
    let phoneNumberValue = phoneNumberField.value.trim();
    if (phoneNumberValue && !isValidPhoneNumber(phoneNumberValue)) {
        const phoneError = document.getElementById("Phoneformat_error");
        phoneError.style.display = "block";
        hasErrors = true;
    }

    return hasErrors;
}


function validateComments() {
    let commentsField = document.getElementById("comments");
    const commentsError = document.getElementById("commments_error");

    if (!formFieldHasInput(commentsField)) {
        commentsError.style.display = "block";
        return false;
    }

    return true;
}

function isValidPhoneNumber(phoneNumber) {
    // Expresión regular para verificar el formato de número de teléfono canadiense sin paréntesis ni guiones.
    let phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}


function formFieldHasInput(fieldElement) {
    return fieldElement.value != null && fieldElement.value.trim() !== "";
}

function isValidEmail(email) {
    let emailCodeRegex = /^[^@\s]+@[^\s@]+$/;
    return emailCodeRegex.test(email);
}




document.addEventListener("DOMContentLoaded", load);