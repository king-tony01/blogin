import "dotenv/config";
import { createServer } from "http";
import { parse, fileURLToPath } from "url";
import { dirname, join } from "path";
import { User, fetchEditor } from "./backend/User.js";
import fs from "fs";
import cloudinary from "cloudinary";
import formidable from "formidable";
import { serveType } from "./contentType.js";
import { IncomingForm } from "formidable";
import { Article } from "./backend/Article.js";
import {
  all,
  authorizeEditor,
  getArticle,
  getArticlesBasedOnCategory,
  getLatest,
  getNext,
  updateLike,
  updateVisit,
} from "./backend/database.js";
// Get the current module's filename
const __filename = fileURLToPath(import.meta.url);
// Get the current module's directory name
const __dirname = dirname(__filename);
const PORT = process.env.PORT;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const categories = ["/life", "/inspiration", "/education", "/technology"];
const server = createServer(async (req, res) => {
  const { pathname, query } = parse(req.url, true);
  console.log(pathname);
  if (pathname.includes(".")) {
    serveType(pathname, res);
  }
  if (pathname == "/" && req.method == "GET") {
    const filePath = join(__dirname, "public/html", "index.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  if (pathname == "/editor" && req.method == "GET") {
    const filePath = join(__dirname, "admin/auth", "signup.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  if (pathname == "/new-editor" && req.method == "POST") {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
      } else {
        try {
          const imagePath = files.profile[0].filepath;
          const result = await cloudinary.uploader.upload(imagePath);
          console.log(result);
          console.log(fields.fullName[0]);
          const user = new User(
            fields.email[0],
            fields.password[0],
            fields.fullName[0],
            result.secure_url
          );
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(await user.registerEditor()));
        } catch (err) {
          console.log(err);
        }
      }
    });
  }

  if (pathname == "/auth") {
    let emptyBody;
    req.on("data", (chunk) => {
      emptyBody = chunk;
    });
    req.on("end", async () => {
      try {
        let userData = JSON.parse(emptyBody);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await authorizeEditor(userData)));
      } catch (err) {
        console.log(err);
      }
    });
  }

  if (pathname == "/home") {
    const filePath = join(__dirname, "admin/html", "page.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  if (pathname == "/editor-profile") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await fetchEditor(query.id)));
  }

  if (pathname == "/login") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Form recieved is being processed!" }));
  }

  if (pathname == "/new-article") {
    let emptyBody;
    req.on("data", (chunk) => {
      emptyBody = chunk;
    });
    req.on("end", async () => {
      try {
        let articleData = JSON.parse(emptyBody);
        console.log(articleData);
        const {
          title,
          intro,
          category,
          body,
          keywords,
          editor,
          editor_id,
          profile,
          date,
        } = articleData;
        const article = new Article(
          title,
          intro,
          body,
          category,
          keywords,
          date,
          editor,
          editor_id,
          profile
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await article.saveArticle()));
      } catch (err) {
        console.log(err);
      }
    });
  }

  if (pathname == "/trending") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await getLatest()));
  }
  if (pathname == "/admin/all") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await all()));
  }

  if (categories.includes(pathname)) {
    const filePath = join(__dirname, "public/html", "category.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  if (pathname == "/articles") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await getArticlesBasedOnCategory(query.category)));
  }
  if (pathname == "/post") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await getArticle(query.id)));
  }
  if (pathname == "/next") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await getNext()));
  }
  if (pathname == "/new-visit") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await updateVisit(query.id)));
  }
  if (pathname == "/new-like") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await updateLike(query.id)));
  }
  if (pathname == "/article") {
    const filePath = join(__dirname, "public/html", "preview.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal server error!" }));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
