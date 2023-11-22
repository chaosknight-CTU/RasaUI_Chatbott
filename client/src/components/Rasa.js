const axios = require("axios");

class Rasa {
  static async send(userQuestion, rasaEndpoint) {
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
      console.error("Error communicating with Rasa:", error);
      throw new Error("Error communicating with Rasa");
    }
  }
}

module.exports = Rasa;
