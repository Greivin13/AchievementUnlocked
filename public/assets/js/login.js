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
  const name = document.querySelector('#name-signup').value.trim();

  if (email && password && name) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  }
};

// document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
// document.querySelector(".signup form").addEventListener("submit", signupFormHandler);

$("#signupBtn").click(function (e) {
  e.preventDefault();
  signupFormHandler;
});

// $("#loginBtn").click(function (e) {
//   e.preventDefault();
//   loginFormHandler;
// });

// $("#homeBtn").click(function (e) {
//   e.preventDefault();
//   document.location.replace("/");
// });
