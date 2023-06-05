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

const signupFormHandler = async () => {
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
      // const response = await fetch("/api/users", {
      //   method: "POST",
      //   body: JSON.stringify({ email, password }),
      //   headers: { "Content-Type": "application/json" },
      // });

      // if (response.ok) {
      //   document.location.replace("/");
      // } else {
      //   alert(response.statusText);
      // }
      let url = "http://localhost:3001/api/user/";

      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"username":"Rin2","email":"thisisfake@gmail.com","password":"pass123"}',
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error("error:" + err));
    }
  }
};

// document.querySelector("#login-form").addEventListener("submit", loginFormHandler);

$("#signupBtn").click(function (e) {
  e.preventDefault();
  signupFormHandler();
  document.location.replace("/");
});

// $("#loginBtn").click(function (e) {
//   e.preventDefault();
//   document.location.replace("/login");
// });

$("#homeBtn").click(function (e) {
  e.preventDefault();
  document.location.replace("/");
});
