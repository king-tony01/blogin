import { signupUI } from "./signupUI.js";

export function loginUI(page) {
  page.innerHTML = `      <img src="/admin/images/login.png" alt="" />
      <form action="">
        <h2>Login</h2>
        <div class="input">
          <i class="fas fa-envelope"></i
          ><input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div class="input">
          <i class="fas fa-lock"></i
          ><input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <i class="fas fa-eye-slash"></i>
        </div>
        <button id="login">Login</button>
      </form>`;
  const btn = document.getElementById("toggle-ui");
  const password = document.getElementById("password");
  const toggle = document.querySelector(".fa-eye-slash");
  btn.addEventListener("click", () => {
    signupUI(page);
    document.querySelector("title").text = "BlogIn Admin | Sign Up";
  });
  btn.textContent = "Sign Up";
  const login = document.getElementById("login");
  login.addEventListener("click", (e) => {
    e.preventDefault();
  });
  login.addEventListener("click", async (e) => {
    e.preventDefault();
    login.textContent = "Authorizing...";
    const form = new FormData(document.querySelector("form"));
    for (const [key, value] of form) {
      if (value == "") {
        alertWindow("Please fill all fields!", false);
        login.textContent = "Login";
        return;
      }
    }

    const response = await fetch(`${location.origin}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const resData = await response.json();
    if (resData.stat) {
      alertWindow(resData.message, true);
      login.textContent = "Authorized";
      location.assign(`${location.origin}/editor?id=${resData.id}`);
    } else {
      alertWindow(resData.message, false);
      login.textContent = "Login";
    }
  });

  function alertWindow(message, condition) {
    const alertView = document.querySelector(".alert");
    if (condition) {
      alertView.classList.add("success");
      alertView.classList.add("active");
      alertView.innerHTML = `<i class="fas fa-info"></i>
      <p>
        ${message}
      </p>`;
    } else {
      alertView.classList.add("error");
      alertView.classList.add("active");
      alertView.innerHTML = `<i class="fas fa-triangle-exclamation"></i>
      <p>
        ${message}
      </p>`;
    }

    let timer = setInterval(() => {
      alertView.classList.remove("error");
      alertView.classList.remove("active");
      alertView.classList.remove("success");
      clearInterval(timer);
    }, 3000);
  }

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("fa-eye");
    if (toggle.classList.contains("fa-eye")) {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  });
}
