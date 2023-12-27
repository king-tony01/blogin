import { getArticles } from "./helper.js";
init();
const tabs = document.querySelectorAll(".tab");
const scrolls = document.querySelectorAll(".scroll");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    const clicked = tab.getAttribute("data-id");
    switch (clicked) {
      case "home":
        location.assign(`${location.origin}/`);
        break;
      case "about":
        document.querySelector(".about").scrollIntoView({ behavior: "smooth" });
        break;
      case "categories":
        document
          .querySelector(".categories")
          .scrollIntoView({ behavior: "smooth" });
        break;
    }
  });
});

scrolls.forEach((scroll) => {
  scroll.addEventListener("click", () => {
    document
      .querySelector(".categories")
      .scrollIntoView({ behavior: "smooth" });
  });
});

async function init() {
  const latestCon = document.querySelector(".latest");
  const data = await getArticles();
  latestCon.innerHTML =
    data.length > 0
      ? data
          .map((article) => {
            return `<div class="latest-card">
          <span class="category">${article.category}</span>
          <h2>
           ${article.title}
          </h2>
          <span class="date">${article.date_created}</span>
          <div class="author-con">
            <img src="${article.author_profile}" alt="" />
            <div>
              <p>${article.author}</p>
              <small>Author</small>
            </div>
          </div>
        </div>`;
          })
          .join(" ")
      : "";
}

document.querySelector(".fa-bars").addEventListener("click", () => {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
});
