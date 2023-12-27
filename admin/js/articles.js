export function articles(articles, page) {
  page.innerHTML = `<section class="articles">
          <h2>Articles</h2>
          <div class="articles-con">
          ${articles
            .map((article) => {
              return `<div class="article-card">
              <h3>
               ${article.title}
              </h3>
              <p>
               ${article.intro.slice(0, 200)}...
              </p>
              <div class="bottom-preview">
                <div class="counter"><i class="fas fa-heart"></i> ${
                  article.likes
                }</div>
                <div class="counter"><i class="fas fa-eye"></i> ${
                  article.visits
                }</div>
              </div>
              <div class="author">
                <img src="${article.author_profile}" alt="" />
                <div><b>${article.author}</b> <small>Author</small></div>
              </div>
            </div>`;
            })
            .join(" ")}
          </div>
        </section>`;
}
