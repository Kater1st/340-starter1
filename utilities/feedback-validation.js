/* ****************************************
 * Feedback Validation
 *****************************************/
const { body, validationResult } = require("express-validator");
const utilities = require("./index"); // for nav or other helpers

/* Validation chain for Feedback form */
const validateFeedback = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Please enter your name (at least 2 characters)."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long."),

  // middleware to handle validation result
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let nav;
      if (utilities.getNav) {
        try { nav = await utilities.getNav(); } catch (e) { nav = null; }
      }

      return res.status(400).render("feedback-form", {
        title: "Submit Feedback",
        nav,
        errors: errors.array(),
        data: {
          name: req.body.name || "",
          email: req.body.email || "",
          message: req.body.message || "",
        },
      });
    }
    next();
  }
];

module.exports = { validateFeedback };
