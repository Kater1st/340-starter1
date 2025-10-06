const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  // Provide a messages helper for the views. If connect-flash is used,
  // req.flash will be available and messages() will render flash messages.
  const messages = () => {
    try {
      if (req && typeof req.flash === 'function') {
        const flash = req.flash()
        // flash returns an object of arrays; convert to simple HTML if any messages exist
        let out = ''
        Object.keys(flash).forEach((key) => {
          flash[key].forEach((msg) => {
            out += `<div class="message ${key}">${msg}</div>`
          })
        })
        return out
      }
    } catch (e) {
      // ignore and fall through to empty string
    }
    return ''
  }

  res.render("index", {title: "Home", nav, messages})
}

module.exports = baseController