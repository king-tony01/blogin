export function editor(page, editor) {
  page.innerHTML = `<section class="add-article">
          <h2>Add Article</h2>
          <div class="editor-con">
            <div class="tab">
              <i class="fas fa-pen"></i>
              Editor
            </div>
            <div class="tab">
              <i class="fas fa-info"></i>
              Meta Data
            </div>
          </div>
          <section class="main-input-con">
            <form action="">
              <div class="edit-con">
                <label for="title">Title</label>
                <textarea
                  name="title"
                  id="title"
                  placeholder="Type title here..."
                ></textarea>
                <label for="intro">Intro</label>
                <textarea
                  name="intro"
                  id="intro"
                  placeholder="Type intro here..."
                ></textarea>
                <label for="body">Body</label>
                <textarea
                  name="body"
                  id="body"
                  placeholder="Start writing..."
                ></textarea>
              </div>
              <div class="meta-con">
                <h3>Article Metadata</h3>
                <div class="meta-wrap">
                  <label for="category">Category</label>
                  <select name="category" id="category">
                    <option value="life">Life</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="education">Education</option>
                    <option value="technology">Technology</option>
                  </select>
                  <label for="keywords">Keywords</label>
                  <p>Enter keywords. Separate the words with comma (,).</p>
                  <input type="text" name="keywords" id="keywords" />
                </div>
                <div class="action-buttons">
                  <button id="publish">Publish</button>
                  <button id="discard">Discard</button>
                </div>
                <br/>
          <br/>
          <br/>
              </div>
            </form>
          </section>
        </section>`;
  const publishBtn = document.getElementById("publish");
  const discardBtn = document.getElementById("discard");
  publishBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    document.querySelector(".loader").classList.add("active");
    const form = new FormData(document.querySelector("form"));
    for (const [key, value] of form) {
      if (value == "") {
        document.querySelector(".loader").classList.remove("active");
        alertWindow("Please provide all fields", false);
        return;
      }
    }
    const now = new Date();
    const article = {
      title: form.get("title"),
      intro: form.get("intro"),
      body: form.get("body"),
      category: form.get("category"),
      keywords: form.get("keywords").split(","),
      editor: editor.full_name,
      editor_id: editor.id,
      profile: editor.profile_pic,
      date: getCurrentMonth(),
    };
    console.log(article);
    const response = await fetch(`${location.origin}/new-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const resData = await response.json();
    if (resData.stat) {
      document.querySelector(".loader").classList.remove("active");
      alertWindow(resData.message, true);
      const inputs = document.querySelector("form").elements;
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    } else {
      document.querySelector(".loader").classList.remove("active");
      alertWindow(resData.message, false);
    }
  });
  discardBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputs = document.querySelector("form").elements;
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  });
}

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

function getCurrentMonth() {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDay = getFormattedDay(day);

  return `${month} ${formattedDay}, ${year}`;
}

function getFormattedDay(day) {
  // Add 'st', 'nd', 'rd', or 'th' to the day
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}
