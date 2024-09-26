document.addEventListener("DOMContentLoaded", function () {
  let hamburger = document.querySelector(".hamburger");
  let navBar = document.querySelector(".navbar");
  let navLinks = document.querySelectorAll(".nav-link");
  let signupForm = document.querySelector(".signup-form");
  let signupBtn = document.querySelector(".signup-btn");

  hamburger.addEventListener("click", function () {
    navBar.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navBar.classList.toggle("active");
    });
  });

  signupBtn.addEventListener("click", function () {
    signupForm.classList.add("active");
  });

  let form = document.querySelector(".form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    let username = this.querySelector("#username").value.trim();
    let email = this.querySelector("#email").value.trim();
    let password = this.querySelector("#password").value.trim();
    let confirmPassword = this.querySelector("#confirm-password").value.trim();

    if (username == "") {
      showError("username", "*Name is required.");
      isValid = false;
    } else if (username.length < 3) {
      showError("username", "*Name must be atleast 3 characters.");
      isValid = false;
    }

    if (email == "") {
      showError("email", "*Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("email", "*Enter a valid email.");
      isValid = false;
    }

    if (password == "") {
      showError("password", "*Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      showError("password", "*Password must be atleast 6 characters.");
      isValid = false;
    }

    if (confirmPassword == "") {
      showError("confirm-password", "*Confirm Password.");
      isValid = false;
    } else if (confirmPassword !== password) {
      showError("confirm-password", "*Password do not match.");
      isValid = false;
    }

    if (isValid) {
      alert("Registration Successful");
      signupForm.classList.remove("active");
      form.reset();
    }
  });
});

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  const errorMsg = field.nextElementSibling;
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
