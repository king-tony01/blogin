import * as articleView from "./articles.js";
export function dashboard(articles, page) {
  const likes = articles.map((article) => {
    return article.likes;
  });
  const totalLikes = likes.reduce((current, next) => {
    return current + next;
  }, 0);
  const views = articles.map((article) => {
    return article.visits;
  });
  const totalViews = views.reduce((current, next) => {
    return current + next;
  }, 0);
  page.innerHTML = `        <section class="dashboard">
          <h2>Dashboard</h2>
          <div class="overview">
            <div class="overview-card">
              <i class="fas fa-newspaper"></i>
              <div>
                <b>${articles.length}</b>
                <p>Total Articles</p>
              </div>
            </div>
            <div class="overview-card">
              <i class="fas fa-heart"></i>
              <div>
                <b>${totalLikes}</b>
                <p>Total Likes</p>
              </div>
            </div>
            <div class="overview-card">
              <i class="fas fa-eye"></i>
              <div>
                <b>${totalViews}</b>
                <p>Total Visits</p>
              </div>
            </div>
          </div>
          <div class="history">
            <div class="history-head">
              <h3>History</h3>
              <button id="see-all">See All</button>
            </div>
            <ul class="history-list">
              <li>
                <i class="fas fa-newspaper"></i>
                <div>
                  <p>
                    ${articles[0].title}
                  </p>
                  <div class="bottom-wrap">
                    <div class="counters">
                      <div class="counter">
                        <i class="fas fa-heart"></i>
                        ${articles[0].likes}
                      </div>
                      <div class="counter">
                        <i class="fas fa-eye"></i>
                        ${articles[0].visits}
                      </div>
                    </div>
                    <div class="date">${articles[0].date_created}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>`;
  document.getElementById("see-all").addEventListener("click", () => {
    articleView.articles(articles, page);
    const tabs = document.querySelectorAll(".menu-tab");
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    document.getElementById("articles").classList.add("active");
  });
}
