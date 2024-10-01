document.addEventListener("DOMContentLoaded", () => {
  
    // Getting DOM elements
  const hamburger = document.querySelector(".hamburger");
  const navBar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const signupForm = document.querySelector(".signup-form");
  const signupBtn = document.querySelector(".signup-btn");
  const form = document.querySelector(".form");

  // Toggle the visibility of the navbar when the hamburger icon is clicked
  hamburger.addEventListener("click", () => {
    navBar.classList.toggle("active");
  });

  // Close the navbar when a navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navBar.classList.toggle("active");
    });
  });

  // Display the signup form when the signup button is clicked
  signupBtn.addEventListener("click", () => {
    signupForm.classList.add("active");
  });

  // Handle form submission with validation
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form's default submission behavior

    // Validate the form fields
    const isValid = validateForm();
    if (isValid) {
      // If form is valid, show a success message
      alert("Registration Successful");
      signupForm.classList.remove("active");
      form.reset();
    }
  });

  function validateForm() {
    let isValid = true; // Assume form is valid initially

    // Define the fields and their respective validation functions and error messages
    const fields = [
      {
        id: "username",
        validation: validateUsername,
        errorMsg: "*Name must be at least 3 characters.",
      },
      {
        id: "email",
        validation: validateEmail,
        errorMsg: "*Enter a valid email.",
      },
      {
        id: "password",
        validation: validatePassword,
        errorMsg: "*Password must be at least 6 characters.",
      },
      {
        id: "confirm-password",
        validation: validateConfirmPassword,
        errorMsg: "*Passwords do not match.",
      },
    ];

    // Iterate through each field to check if it's valid
    fields.forEach((field) => {
      // Get the trimmed input value
      const value = document.getElementById(field.id).value.trim();

      // Check if the field is empty
      if (value === "") {
        showError(field.id, "*This field is required.");
        // Mark the form as invalid if any field is empty
        isValid = false;
      } else if (!field.validation(value)) {
        // If field is invalid based on custom validation, display an error message
        showError(field.id, field.errorMsg);
        isValid = false;
      } else {
        // If field is valid, clear the error message
        clearError(field.id);
      }
    });

    // Return the overall form validation status
    return isValid;
  }

  // Function to validate the username (must be at least 3 characters)
  function validateUsername(username) {
    return username.length >= 3;
  }

  // Function to validate the password (must be at least 6 characters)
  function validatePassword(password) {
    return password.length >= 6;
  }

  // Function to confirm that the password and confirmation password match
  function validateConfirmPassword(confirmPassword) {
    const password = document.getElementById("password").value.trim();
    return confirmPassword === password;
  }

  // Display an error message for the specified form field
  function showError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    const errorMsg = field.nextElementSibling;
    errorMsg.textContent = msg;
    errorMsg.style.display = "block";
  }

  // Clear the error message for the specified form field
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorMsg = field.nextElementSibling;
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
  }

  // Function to validate email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
