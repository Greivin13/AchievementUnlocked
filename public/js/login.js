const loginFormHandler = () => {
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  if (!email || !password) {
    return false;
  }
  return true;
};

function signupFormHandler() {
  let username = document.querySelector("#usernameInput").value.trim();
  let email = document.querySelector("#email-signup").value.trim();
  let password = document.querySelector("#password-signup").value.trim();
  let passwordConfirmation = document
    .querySelector("#passwordConfirmation-signup")
    .value.trim();

  // check to ensure all parameters are filled out
  if (!username || !email || !password || !passwordConfirmation) {
    return false;
  }
  // check to ensure passwords match
  if (password !== passwordConfirmation) {
    alert("Passwords do not match");
    return false;
  }
  // if passes validation then submit the form
  return true;
}

url = document.location.toString();
if (url.split("?")[1] === "invalid=true") {
  alert("Invalid Credentials");
}

function switchToHome() {
  document.location.replace("/");
}

$("#signupForm").submit(function () {
  return signupFormHandler();
});
$("#loginForm").submit(function () {
  return loginFormHandler();
});
$("#createReviewForm").submit(function () {
  return switchToHome();
});
$("#homeBtn").click(function (e) {
  e.preventDefault();
  document.location.replace("/");
});
