/* ****************************************
 * Feedback Routes
 *****************************************/
const express = require('express');
const router = express.Router();
const utilities = require('../utilities'); // utilities include validation and handleErrors
const feedbackController = require('../controllers/feedbackController.js');

/* ****************************************
 * Display Feedback Form
 *****************************************/
router.get('/', utilities.handleErrors(feedbackController.buildFeedbackForm));

/* ****************************************
 * Handle Feedback Submission
 *****************************************/
router.post(
  '/submit',
  utilities.feedbackValidation.validateFeedback,
  utilities.handleErrors(feedbackController.submitFeedback)
);

/* ****************************************
 * Display Feedback List  <-- NEW
 *****************************************/
router.get('/list', utilities.handleErrors(feedbackController.showFeedbackList));

module.exports = router;
