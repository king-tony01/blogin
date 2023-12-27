import "dotenv/config";
import mysql2 from "mysql2";
import fs from "fs";
import * as bcrypt from "bcrypt";
export const myDB = mysql2.createConnection({
  connectionLimit: 10,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: 19655,
  ssl: {
    ca: fs.readFileSync("./ca.pem"), // Specify the path to your CA certificate
  },
  connectTimeout: 60000,
});
/*export const myDB = createConnection({
  user: "root",
  host: "localhost",
  database: "blogin",
  password: "password",
});*/
myDB.connect((err) => {
  if (err) {
    console.log("Connection unsuccessful\nReason: " + err);
  } else {
    console.log("Connection to blogin successful");
  }
});

export function getLatest() {
  return new Promise((resolve, reject) => {
    myDB.query("SELECT * FROM articles", function (err, results, fieldData) {
      if (err) {
        reject(err);
      } else {
        resolve(results.slice(0, 3));
      }
    });
  });
}
export function getArticlesBasedOnCategory(category) {
  return new Promise((resolve, reject) => {
    myDB.query(
      "SELECT * FROM articles WHERE category = ?",
      [category],
      function (err, results, fieldData) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}
export function getArticle(id) {
  return new Promise((resolve, reject) => {
    try {
      myDB.query(
        "SELECT * FROM articles WHERE id = ?",
        [id],
        function (err, results, fieldData) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
}

export async function updateVisit(id) {
  return new Promise((resolve, reject) => {
    myDB.query(
      `UPDATE articles SET visits = visits + 1 WHERE id = ?`,
      [id],
      function (err, results, fieldData) {
        if (err) {
          reject(err);
        } else {
          resolve({ stat: true, message: "Updated" });
        }
      }
    );
  });
}

export async function updateLike(id) {
  return new Promise((resolve, reject) => {
    myDB.query(
      `UPDATE articles SET likes = likes + 1 WHERE id = ?`,
      [id],
      function (err, results, fieldData) {
        if (err) {
          reject(err);
        } else {
          resolve({ stat: true, message: "Updated" });
        }
      }
    );
  });
}

export async function all() {
  return new Promise((resolve, reject) => {
    try {
      const query = "SELECT * FROM articles";
      myDB.query(query, function (err, result, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
export async function getNext() {
  return new Promise((resolve, reject) => {
    try {
      const query = "SELECT * FROM articles";
      myDB.query(query, function (err, result, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(result.slice(0, 5));
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function authorizeEditor(editor) {
  return new Promise((resolve, reject) => {
    try {
      let query = "SELECT * FROM editors WHERE email = ?";
      myDB.query(query, [editor.email], async function (err, result, field) {
        if (err) {
          reject(err);
        } else if (result.length > 0) {
          const isValidPassword = await bcrypt.compare(
            editor.password,
            result[0].editor_password
          );
          if (isValidPassword) {
            resolve({
              stat: true,
              message: `Login successful!`,
              id: result[0].id,
            });
          } else {
            resolve({
              stat: false,
              message: `Incorrect password!\nPlease calm down and remember your password.`,
            });
          }
        } else {
          resolve({
            stat: false,
            message: `We couldn't find any editor associated with the email ${editor.email}`,
          });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
