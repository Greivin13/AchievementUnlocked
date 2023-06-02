const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  //   const username = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const passwordConfirmation = document
    .querySelector("#passwordConfirmation-signup")
    .value.trim();

  if (email && password && passwordConfirmation) {
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
    } else {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  }
};

// document
//   .querySelector("#login-form")
//   .addEventListener("submit", loginFormHandler);

$("#signupBtn").click(function (e) {
  e.preventDefault();
  document.location.replace("/sign-up");
});
