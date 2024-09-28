document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navBar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const signupForm = document.querySelector(".signup-form");
  const signupBtn = document.querySelector(".signup-btn");
  const form = document.querySelector(".form");

  // Toggle Navbar visibility on hamburger click
  hamburger.addEventListener("click", () => {
    navBar.classList.toggle("active");
  });

  // Close navbar when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navBar.classList.toggle("active");
    });
  });

  // Show signup form when signup button is clicked
  signupBtn.addEventListener("click", () => {
    signupForm.classList.add("active");
  });

  // Form validation and submission
  form.addEventListener("submit", event => {
    event.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      alert("Registration Successful");
      signupForm.classList.remove("active");
      form.reset();
    }
  });

  function validateForm() {
    let isValid = true;

    const fields = [
      { id: "username", validation: validateUsername, errorMsg: "*Name must be at least 3 characters." },
      { id: "email", validation: validateEmail, errorMsg: "*Enter a valid email." },
      { id: "password", validation: validatePassword, errorMsg: "*Password must be at least 6 characters." },
      { id: "confirm-password", validation: validateConfirmPassword, errorMsg: "*Passwords do not match." }
    ];

    fields.forEach(field => {
      const value = document.getElementById(field.id).value.trim();
      if (!field.validation(value)) {
        showError(field.id, field.errorMsg);
        isValid = false;
      } else {
        clearError(field.id);
      }
    });

    return isValid;
  }

  function validateUsername(username) {
    return username.length >= 3;
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  function validateConfirmPassword(confirmPassword) {
    const password = document.getElementById("password").value.trim();
    return confirmPassword === password;
  }

  function showError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    const errorMsg = field.nextElementSibling;
    errorMsg.textContent = msg;
    errorMsg.style.display = "block";
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorMsg = field.nextElementSibling;
    errorMsg.textContent = "";
    errorMsg.style.display = "none";
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
