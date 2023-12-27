import { bold, link, p } from "./Editor.js";
import { Views } from "./Views.js";
import { getArticle, getImage } from "./router.js";
const page = document.querySelector(".main-page");
const navigation = document.querySelector(".navigation");
const navTabs = document.querySelectorAll(".nav-tabs");
const view = new Views(page);
init();
// Initialize
function init() {
  page.innerHTML = view.dashboard();
}

navTabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    navTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  })
);

navigation.addEventListener("click", function (e) {
  const tabClicked = e.target.closest("li").dataset.tab;
  if (!tabClicked) return;

  switch (tabClicked) {
    case "dashboard":
      page.innerHTML = view.dashboard();
      break;
    case "posts":
      page.innerHTML = view.posts();
      break;
    case "media":
      page.innerHTML = view.media();
      break;
    case "users":
      page.innerHTML = view.users();
      break;
    case "analytics":
      page.innerHTML = view.analytics();
      break;
  }
});

page.addEventListener("click", (e) => {
  console.log(e.target.id);
  const btn = e.target.id;
  if (!btn) return;
  switch (btn) {
    case "add-post":
      page.innerHTML = view.editor();
      break;
    case "create-link":
      link();
      logIcon();
      break;
    /*case "make-bold":
      bold();
      break;*/
    case "banner":
      getImage();
    case "italicize":
      page.innerHTML = view.editor();
      break;
    case "publish":
      getArticle();
      break;
    default:
      break;
  }
});

function logIcon() {
  const icons = page.querySelector(page.closest("i"));
  console.log(icons);
}
