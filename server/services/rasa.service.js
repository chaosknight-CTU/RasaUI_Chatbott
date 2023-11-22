const axios = require("axios");

class RasaService {
  /**
   *
   * @param {string} userQuestion
   * @param {string} rasaEndpoint
   * @returns
   */
  async send(userQuestion, rasaEndpoint = "http://localhost:5005") {
    try {
      const response = await axios.post(
        `${rasaEndpoint}/webhooks/rest/webhook`,
        {
          message: userQuestion,
        }
      );

      if (response.data && response.data.length > 0) {
        return response.data[0].text;
      } else {
        return "Sorry, I couldn't understand the question.";
      }
    } catch (error) {
      throw new Error("Error communicating with Rasa");
    }
  }
}

module.exports = new RasaService();
