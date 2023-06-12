const sentimentRouter = require("express").Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

sentimentRouter.post("/", async function (req, res) {
  console.log("Inside sentimentRouter");
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  console.log("Request body inside sentimentRouter.post: ", req.body);
  const comment = req.body.content || "";
  console.log("Comment inside sentimentRouter: ", comment);
  if (comment.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "No comment",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(comment),
      temperature: 0.6,
    });
    console.log(completion.data.choices);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
});

function generatePrompt(comment) {
  return `Analyze the comment for sentiment analysis. Answer with one word only: POSITIVE, NEGATIVE or NEUTRAL.

Comment: a great blog!
Sentiment: POSITIVE
Comment: a terrible blog
Sentiment: NEGATIVE
Comment: ${comment}
Sentiment:`;
}

module.exports = sentimentRouter;
