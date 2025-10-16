/* ****************************************
 * Feedback Controller
 *****************************************/
const feedbackModel = require("../models/feedbackModel.js");
const utilities = require("../utilities/");

async function buildFeedbackForm(req, res) {
  const nav = await utilities.getNav();
  res.render("feedback-form", {
    title: "Submit Feedback",
    nav,
    errors: null,
    data: {},
  });
}

async function submitFeedback(req, res) {
  const { name, email, message } = req.body;
  try {
    await feedbackModel.insertFeedback(name, email, message);
    const nav = await utilities.getNav();
    res.render("feedback-thank-you", {
      title: "Thank You",
      nav,
    });
  } catch (error) {
    console.error("Controller error:", error);
    let nav = await utilities.getNav();
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Something went wrong while submitting your feedback.",
      nav,
    });
  }
}

async function showFeedbackList(req, res) {
  const nav = await utilities.getNav();
  try {
    const feedbackList = await feedbackModel.getAllFeedback();
    res.render("feedback-list", {
      title: "Customer Feedback",
      nav,
      feedbackList,
    });
  } catch (error) {
    console.error("List feedback error:", error);
    let nav = await utilities.getNav();
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Unable to load feedback.",
      nav,
    });
  }
}

module.exports = { buildFeedbackForm, submitFeedback, showFeedbackList };
