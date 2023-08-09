const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('affiliate_links.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productName TEXT,
      imageUrl TEXT,
      linkUrl TEXT
    )
  `);
});

const addLink = (productName, imageUrl, linkUrl) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO links (productName, imageUrl, linkUrl) VALUES (?, ?, ?)',
      [productName, imageUrl, linkUrl],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

const getAllLinks = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM links', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  addLink,
  getAllLinks
};
