import { getAllBasedOnCategory } from "./helper.js";
const container = document.querySelector(".articles-con");
const category = location.pathname.slice(1);
const firstLetter = category.slice(0, 1).toUpperCase();
const capitalizedName = firstLetter.concat(category.slice(1));
document.querySelector("title").text = `BlogIn | ${capitalizedName}`;
const categoryInfo = [
  {
    id: "life",
    title: "Life",
    intro:
      "Discover articles that enrich your everyday life, covering topics from personal development to wellness and relationships.",
  },
  {
    id: "inspiration",
    title: "Inspiration",
    intro:
      "Fuel your passion and motivation with stories, interviews, and content that uplift and empower.",
  },
  {
    id: "education",
    title: "Education",
    intro:
      "Unlock the doors to knowledge with our educational content, featuring insights, tips, and resources for learners of all ages.",
  },
  {
    id: "technology",
    title: "Technology",
    intro:
      "Stay ahead in the digital age with the latest in tech trends, reviews, and guides.",
  },
];
const hero = document.querySelector(".hero");
hero.querySelector("h1").textContent = categoryInfo.find((cat) => {
  return cat.id == category;
}).title;
hero.querySelector("p").textContent = categoryInfo.find((cat) => {
  return cat.id == category;
}).intro;
const data = await getAllBasedOnCategory(category);
console.log(data);
container.innerHTML = data
  .map((article) => {
    return `<div class="article-card">
          <h3>
           ${article.title}
          </h3>
          <p>
           ${article.intro.slice(0, 150)}...
          </p>
          <div class="date">${article.date_created}</div>
          <div class="action-wrapper">
            <div class="counters">
              <div class="views">
                <i class="fas fa-eye"></i>
                <p>${article.visits}</p>
              </div>
              <div class="likes">
                <i class="fas fa-heart"></i>
                <p>${article.likes}</p>
              </div>
            </div>
            <button class="read-btn" data-id="id-first" id="${
              article.id
            }">Read</button>
          </div>
          <div class="author-wrapper">
            <img src="${article.author_profile}" alt="" />
            <div>
              <b class="author-name">${article.author}</b
              ><small class="author-title">Author</small>
            </div>
          </div>
        </div>`;
  })
  .join(" ");

const readBtn = document.querySelectorAll(".read-btn");
readBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    location.assign(`${location.origin}/article?id=${btn.id}`);
  });
});
