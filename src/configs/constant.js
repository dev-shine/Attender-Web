var config = {}
if (window.location.hostname === "localhost") {
  config = {
    API_URL: "https://staging.attender.com.au/api/"
  }
} else {
  config = {
    API_URL: "https://staging.attender.com.au/api/"
  }
}
module.exports = config
