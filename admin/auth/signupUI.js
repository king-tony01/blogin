import { loginUI } from "./loginUI.js";

export function signupUI(page) {
  page.innerHTML = ` <img src="/admin/images/signup.png" alt="" />
      <form action="" enctype="multipart/form-data">
        <h2>Sign Up</h2>
        <div class="input">
          <i class="fas fa-user-tie"></i
          ><input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full name"
          />
        </div>
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
        <div class="image-input">
          <i class="fas fa-image"></i>
          <small>Click to upload image here</small>
          <input type="file" name="profile" id="profile" />
          <img src="/admin/images/logo.png" alt="" />
        </div>
        <button id="proceed">Sign Up</button>
      </form>`;
  const btn = document.getElementById("toggle-ui");
  btn.addEventListener("click", () => {
    loginUI(page);
    document.querySelector("title").text = "BlogIn Admin | Login";
  });
  btn.textContent = "Login";
  const toggle = document.querySelector(".fa-eye-slash");
  const password = document.getElementById("password");
  const imageInputCon = document.querySelector(".image-input");
  const imageInput = document.getElementById("profile");
  const proceed = document.getElementById("proceed");
  proceed.addEventListener("click", async (e) => {
    e.preventDefault();
    proceed.textContent = "Authenticating...";
    const form = new FormData(document.querySelector("form"));
    for (const [key, value] of form) {
      if (value == "" || imageInput.files.length < 1) {
        alertWindow("Please fill all fields!", false);
        imageInputCon.style.borderColor = "red";
        proceed.textContent = "Sign Up";
        return;
      }
    }
    for (const [key, value] of form) {
      console.log(key, ":", value);
    }
    const response = await fetch(`${location.origin}/new-editor`, {
      method: "POST",
      body: form,
    });
    const resData = await response.json();
    if (resData.stat) {
      alertWindow(resData.message, true);
      proceed.textContent = "Authenticated";
      location.assign(`${location.origin}/home?id=${resData.id}`);
    } else {
      alertWindow(resData.message, false);
      proceed.textContent = "Sign Up";
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

  imageInputCon.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", () => {
    const image = document.createElement("img");
    const imageData = URL.createObjectURL(imageInput.files[0]);
    image.src = imageData;
    image.style.display = "Block";
    imageInputCon.appendChild(image);
  });
}
