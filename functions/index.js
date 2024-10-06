/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });
const functions = require('firebase-functions');

exports.myCustomFunction = functions.https.onRequest((req, res) => {
  // Обробляємо вхідні дані (наприклад, POST-запит)
  if (req.method === 'POST') {
    const data = req.body;
    // Виконуємо необхідну логіку, наприклад, зберігаємо дані у Firestore
    res.status(200).send(`Data received: ${JSON.stringify(data)}`);
  } else {
    res.status(405).send('Method Not Allowed');
  }
});
