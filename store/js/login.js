const loginApi = () => {
  let username = document.getElementById("username").value;
  console.log(username);

  let password = document.getElementById("password").value;
  console.log(password);

  if (username === null || username === "") {
    alert("please enter username");
  } else if (password === null || password === "") {
    alert("please enter a password");
  } else {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        // expiresInMins: 60, // optional
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.message === "Invalid credentials") {
          alert(res.message);
        } else {
          localStorage.setItem("token", res.token);
          localStorage.setItem("firstName", res.firstName);
          localStorage.setItem("lastName", res.lastName);
          localStorage.setItem("gender", res.gender);
          window.location.href = "./mainpage.html";
        }

        
      });
  }
};


