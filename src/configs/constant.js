var config = {}
if (window.location.hostname === "localhost") {
  config = {
    API_URL: "http://localhost:3333/api/"
  }
} else {
  config = {
    API_URL: "https://staging.attender.com.au/api/"
  }
}
module.exports = config
