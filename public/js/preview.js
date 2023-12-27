import { getArticle, getNextArticles } from "./helper.js";
const id = location.search.slice(4);
updateVisit();
const hero = document.querySelector(".preview-hero");
const content = document.querySelector(".content");
const nextList = document.querySelector(".next-list");
const article = await getArticle(id);
document.querySelector("title").text = `BlogIn | ${article[0].title}`;
document.querySelector('meta[name="description"]').content = article[0].intro;
document.querySelector('meta[name="keywords"]').content = JSON.parse(
  article[0].keywords
).join(",");
hero.innerHTML = `<h1>
          ${article[0].title}
        </h1>
        <p>
         ${article[0].intro}
        </p>
        <div class="author-wrapper">
          <img src="${article[0].author_profile}" alt="" />
          <div>
            <b class="author-name">King Tony${article[0].author}</b>
            <small class="author">Author</small>
          </div>
        </div>
        <div class="date">${article[0].date_created}</div>
        <div class="sharing">
          <a href="" class="share-btn" data-id="twitter"><i class="fab fa-twitter"></i> Tweet</a>
          <a href="" class="share-btn" data-id="facebook"><i class="fab fa-facebook"></i> Share</a>
          <a href="" class="share-btn" data-id="linkedin"><i class="fab fa-linkedin"></i> Share</a>
          <a href="" class="share-btn" data-id="instagram"><i class="fab fa-twitter"></i> Share</a>
        </div>`;
content.innerHTML = `<p>
              ${article[0].content}
            </p>
            <div class="article-bottom-action">
              <strong
                >Enjoyed reading this? Please give it one like 🤗😊</strong
              >
              <button id="like-btn"><i class="fas fa-heart"></i> Like</button>
            </div>`;

const likeBtn = document.getElementById("like-btn");
likeBtn.addEventListener("click", async () => {
  likeBtn.style.background = "#ffb2a0";
  const response = await fetch(`${location.origin}/new-like?id=${id}`);
  const resData = await response.json();
});
async function updateVisit() {
  const response = await fetch(`${location.origin}/new-visit?id=${id}`);
  const resData = await response.json();
}

const next = await getNextArticles();
nextList.innerHTML = next
  .map((article) => {
    return `<li class="next-article" id="${article.id}">
            <strong>
                  ${article.title}
            </strong>
            <span class="cat-tag">${article.category}</span>
            <div class="date">${article.date_created}</div>
        </li>`;
  })
  .join(" ");

const nextBtn = document.querySelectorAll(".next-article");
nextBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    location.assign(`${location.origin}/article?id=${btn.id}`);
  });
});

const articleTitle = encodeURIComponent(article[0].title);
const articleUrl = encodeURIComponent(`${location.origin}/article?id=${id}`);

const shareButtons = document.querySelectorAll(".share-btn");
shareButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const clicked = btn.getAttribute("data-id");
    switch (clicked) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}&quote=${articleTitle}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?url=${articleUrl}&title=${articleTitle}`,
          "_blank"
        );
      default:
        break;
    }
  });
});

function shareOnInstagram() {
  // Instagram sharing links work best on mobile devices
  alert("Please open Instagram sharing on a mobile device.");
}

function shareOnMedium() {
  // Customize the Medium sharing link based on their API or sharing mechanism
  alert("Customize Medium sharing based on their API or mechanism.");
}
