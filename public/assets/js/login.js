const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    console.log(email, password);
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Successfully logged in, " + username);
      document.location.replace("/");
    } else {
      console.log("Login failed.");
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
        console.log("Successfully signed up, " + username);
        document.location.replace("/");
      } else {
        console.log("Signup failed.");
        alert(response.statusText);
      }
    }
  }
};

document.querySelector("#login-form").addEventListener("submit", loginFormHandler);

$("#signupBtn").click(function (e) {
  e.preventDefault();
  document.location.replace("/sign-up");
});

// $("#loginBtn").click(function (e) {
//   e.preventDefault();
//   document.location.replace("/login");
// });

$("#homeBtn").click(function (e) {
  e.preventDefault();
  document.location.replace("/");
});
