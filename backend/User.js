import { myDB } from "./database.js";
import * as bcrypt from "bcrypt";
export class User {
  constructor(email, password, fullName, profile) {
    this._email = email;
    this._password = password;
    this._fullName = fullName;
    this._profile = profile;
    this._id = this.generateID();
  }

  /**
   * @param {any} newPassword
   */
  set password(newPassword) {
    if (this._password === newPassword) {
      return {
        stat: false,
        message: `You have used this password recently, please choose a different password`,
      };
    } else {
      this._password = newPassword;
      return {
        stat: true,
        message: `Password changed successfully!`,
      };
    }
  }

  get password() {
    return this._password;
  }

  /**
   * @param {any} newEmail
   */
  set email(newEmail) {
    if (this._email === newEmail) {
      return {
        stat: false,
        message: `Email is the same with the old one, please use a different email.`,
      };
    } else {
      this._email = newEmail;
      return {
        stat: true,
        message: `Email changed successfully!`,
      };
    }
  }

  get email() {
    return this._email;
  }

  /**
   * @param {any} newUsername
   */
  set username(newUsername) {
    if (this._username === newUsername) {
      return {
        stat: false,
        message: `Username is the same with the old one, please change it, or cancel the operation.`,
      };
    } else {
      this._username = newUsername;
      return { stat: true, message: `Username changed successfully!` };
    }
  }

  get username() {
    return this._username;
  }

  async getID() {
    return new Promise((resolve, reject) => {
      try {
        let query = "SELECT id FROM editors WHERE email = ?";
        myDB.query(query, [this._email], function (err, result, field) {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  generateID() {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i <= 50; i++) {
      let index = Math.floor(Math.random() * chars.length);
      id += chars.charAt(index);
    }
    return id;
  }

  async registerEditor() {
    return new Promise(async (resolve, reject) => {
      try {
        const isExisting = await this.fetchEditor(this._email);
        const id = this._id;
        if (isExisting.stat) {
          resolve({
            stat: false,
            message: `An editor with the email ${this._email} already exist.`,
          });
        } else {
          let insert =
            "INSERT INTO editors(id, full_name, email, editor_password, profile_pic) VALUES(?, ?, ?, ?, ?)";
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(this._password, salt);
          myDB.query(
            insert,
            [
              this._id,
              this._fullName,
              this._email,
              hashedPassword,
              this._profile,
            ],
            function (err, result, field) {
              if (err) {
                reject({
                  stat: false,
                  message: "There was a problem registering your account!",
                  error: err,
                });
              } else {
                resolve({
                  stat: true,
                  message: "Registration Successful!",
                  id: id,
                });
              }
            }
          );
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async fetchEditor(email) {
    return new Promise((resolve, reject) => {
      try {
        let query = "SELECT * FROM editors WHERE email = ?";
        myDB.query(query, [email], function (err, result, field) {
          if (err) {
            reject(err);
          } else if (result.length > 0) {
            resolve({
              stat: true,
              message: `An editor with the email ${email} already exist.`,
            });
          } else {
            resolve({
              stat: false,
              message: `We couldn't find any editor associated with the email ${email}`,
            });
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async isExisting() {
    return new Promise((resolve, reject) => {
      try {
        let query = "SELECT email FROM editors WHERE email = ?";
        myDB.query(query, [email], function (err, result, field) {
          if (err) {
            reject(err);
          } else if (result.length > 0) {
            resolve({
              stat: true,
            });
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export async function fetchEditor(id) {
  return new Promise((resolve, reject) => {
    try {
      let query = "SELECT * FROM editors WHERE id = ?";
      myDB.query(query, [id], function (err, result, field) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
