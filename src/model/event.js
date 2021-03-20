const connection = require("../config/mysql");

module.exports = {
  getEventModel: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM event", (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
  getEventSearchModel: (title, limit, offset) => {
    const blank = "";
    const data =
      title !== "" ? ` title LIKE '%${title}%'` : ` title LIKE '%${blank}%'`;
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM event WHERE ${data} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getEventCountModel: (title) => {
    const blank = "";
    const data =
      title !== "" ? ` title LIKE '%${title}%'` : ` title LIKE '%${blank}%'`;
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM event WHERE ${data}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  postEventModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO event SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};
