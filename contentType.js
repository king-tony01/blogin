import { parse, fileURLToPath } from "url";
import { dirname, extname, join } from "path";
import fs from "fs";
// Get the current module's filename
const __filename = fileURLToPath(import.meta.url);
// Get the current module's directory name
const __dirname = dirname(__filename);

export function serveType(path, res) {
  let extension = extname(path);
  let contentType;
  switch (extension) {
    case ".css":
      const cssPath = join(__dirname, path);
      contentType = "text/css";
      fs.readFile(cssPath, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      break;
    case ".js":
      const jsPath = join(__dirname, path);
      contentType = "application/javascript";
      fs.readFile(jsPath, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      break;
    case ".jpeg":
      const jpegPath = join(__dirname, path);
      contentType = "image/jpeg";
      fs.readFile(jpegPath, "", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      break;
    case ".jpg":
      const jpgPath = join(__dirname, path);
      contentType = "image/jpg";
      fs.readFile(jpgPath, "", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      break;
    case ".png":
      const pngPath = join(__dirname, path);
      contentType = "image/png";
      fs.readFile(pngPath, "", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      break;
    case ".ico":
      const icoPath = join(__dirname, path);
      contentType = "image/vnd.microsoft.icon";
      fs.readFile(icoPath, "", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      break;
  }
}
