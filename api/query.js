const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a connection to the database
const db = new sqlite3.Database(path.join(__dirname, 'chat.db'));

// Function to insert a new message
function insertMessage(message, callback) {
  const timestamp = new Date().toISOString(); // Get current timestamp

  db.run('INSERT INTO messages (timestamp, message) VALUES (?, ?)', [timestamp, message], function(err) {
    if (err) {
      console.error('Error inserting message:', err);
      return callback(err);
    } else {
      console.log('Message inserted with ID:', this.lastID); // Log the inserted message's ID
      callback(null, { id: this.lastID, message, timestamp });
    }
  });
}

// Function to fetch all messages
function getMessages(callback) {
  db.all('SELECT * FROM messages ORDER BY id ASC', [], (err, rows) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return callback(err);
    }
    callback(null, rows);
  });
}

// Export the database connection and functions
module.exports = {
  insertMessage,
  getMessages
};
