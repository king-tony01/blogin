import { myDB } from "./database.js";

export class Article {
  constructor(
    title,
    intro,
    body,
    category,
    keywords,
    date,
    editor,
    editorID,
    editorPic
  ) {
    this._id = this._generateID();
    this._title = title;
    this._intro = intro;
    this._body = body;
    this._category = category;
    this._keywords = JSON.stringify(keywords);
    this._date = date;
    this._editor = editor;
    this._editorId = editorID;
    this._editorPic = editorPic;
  }

  _generateID() {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i <= 50; i++) {
      let index = Math.floor(Math.random() * chars.length);
      id += chars.charAt(index);
    }
    return id;
  }

  async saveArticle() {
    return new Promise(async (resolve, reject) => {
      try {
        let insert =
          "INSERT INTO articles(id, title, intro, category, content, author, author_id, author_profile, keywords, date_created) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        myDB.query(
          insert,
          [
            this._id,
            this._title,
            this._intro,
            this._category,
            this._body,
            this._editor,
            this._editorId,
            this._editorPic,
            this._keywords,
            this._date,
          ],
          function (err, result, field) {
            if (err) {
              reject({
                stat: false,
                message: "There was a problem creating your article!",
                error: err,
              });
            } else {
              resolve({
                stat: true,
                message: "Article created uccessfully!",
              });
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}
