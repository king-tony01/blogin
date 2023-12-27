import { articles } from "./articles.js";
import { dashboard } from "./dashboard.js";
import { editor } from "./editor.js";
document.querySelector(".loader").classList.add("active");
const page = document.querySelector(".page");
let main = [];
init();
document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector(".loader").classList.remove("active");
  const nameHolder = document.getElementById("full-name");
  const emailHolder = document.getElementById("email");
  const imageHolder = document.getElementById("profile");
  let editorProfile = {};
  const response = await fetch(
    `${location.origin}/editor-profile${location.search}`
  );
  const data = await response.json();
  editorProfile = data;

  const { email, full_name, profile_pic } = editorProfile;
  nameHolder.textContent = full_name;
  emailHolder.textContent = email;
  imageHolder.src = profile_pic;
  dashboard(main, page);
  const tabs = document.querySelectorAll(".menu-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tab) => tab.classList.remove("active"));
      tab.classList.add("active");
      const clicked = tab.getAttribute("data-id");
      switch (clicked) {
        case "main-page":
          window.open("https://blogin.cyclic.app/", "_blank");
          break;
        case "dashboard":
          dashboard(main, page);
          break;
        case "articles":
          articles(main, page);
          break;
        case "add-article":
          editor(page, editorProfile);
          break;
      }
    });
  });
});

async function init() {
  const response = await fetch(`${location.origin}/admin/all`);
  const resData = await response.json();
  console.log(resData);
  main = resData;
}
