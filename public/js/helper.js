/**
 * Only accepts form, and has to be sign up form
 * @param {SignupForm} form
 */
export async function signUp(form) {
  try {
    const details = {
      usernanme: form.get("username"),
      password: form.get("password"),
      email: form.get("email"),
    };
    console.log(details);
    const response = await fetch("http://localhost:1220/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const data = await response.json();
    console.log(data);
    if (data.stat) {
      location.assign(`/?id=${data.id}`);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Only accepts form, and has to be login form
 * @param {loginForm} form
 *
 */
export async function login(form) {
  try {
    const details = {
      password: form.get("password"),
      email: form.get("email"),
    };
    console.log(details);
    const response = await fetch("http://localhost:1220/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const data = await response.json();
    alert(data.stat);
    if (data.stat) {
      location.assign(`/?id=${data.id}`);
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Binds an event listener to the element passed as argument
 * @param {HTMLElement} el
 */
export function getCategory(el) {
  el.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

/**
 * This method fetches all the articles from backend
 *
 */
export async function getArticles() {
  const response = await fetch(`${location.origin}/trending`);
  const data = await response.json();
  return data;
}
/**
 * This method fetches next articles from backend
 *
 */
export async function getNextArticles() {
  const response = await fetch(`${location.origin}/next`);
  const data = await response.json();
  return data;
}
/**
 * This method fetches all the specific articles from backend
 *
 */
export async function getAllBasedOnCategory(category) {
  const response = await fetch(
    `${location.origin}/articles?category=${category}`
  );
  const data = await response.json();
  return data;
}
/**
 * This method fetches a specific article from backend
 *
 */
export async function getArticle(id) {
  const response = await fetch(`${location.origin}/post?id=${id}`);
  const data = await response.json();
  return data;
}
/**
 * This method fetches all the categories from backend
 *
 */
export async function getCategories() {
  const response = await fetch(`${location.origin}/categories`);
  const data = await response.json();
  return data;
}

const articleTitle = encodeURIComponent("Your Article Title");
const articleUrl = encodeURIComponent("https://your-article-url.com");

function shareOnFacebook() {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}&quote=${articleTitle}`
  );
}

function shareOnLinkedIn() {
  window.open(
    `https://www.linkedin.com/shareArticle?url=${articleUrl}&title=${articleTitle}`
  );
}

function shareOnTwitter() {
  window.open(
    `https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`
  );
}

function shareOnInstagram() {
  // Instagram sharing links work best on mobile devices
  alert("Please open Instagram sharing on a mobile device.");
}

function shareOnMedium() {
  // Customize the Medium sharing link based on their API or sharing mechanism
  alert("Customize Medium sharing based on their API or mechanism.");
}
