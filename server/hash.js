// const bcrypt = require('bcryptjs'); // Add bcryptjs


// const saltRounds = 10; // Number of salt rounds (adjust as needed)

// // User registration or password update
// const plaintextPassword = 'user_password'; // Replace with the user's provided password

// bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
//     if (err) {
//         console.error('Error hashing password:', err);
//         // Handle the error
//     } else {
//         // Store the 'hash' in your database along with the user's information
//         // The 'hash' is the securely hashed password
//         console.log('Hashed Password:', hash);
//     }
// });

// // User login
// const providedPassword = 'user_input_password'; // Replace with the user's input

// // Retrieve the hashed password from your database for the user attempting to log in
// const hashedPasswordFromDatabase = 'hashed_password_from_db'; // Replace with the stored hash

// bcrypt.compare(providedPassword, hashedPasswordFromDatabase, (err, result) => {
//     if (err) {
//         console.error('Error comparing passwords:', err);
//         // Handle the error
//     } else if (result) {
//         // Passwords match, authentication successful
//         console.log('Authentication successful');
//     } else {
//         // Passwords don't match, authentication failed
//         console.log('Authentication failed');
//     }
// });


