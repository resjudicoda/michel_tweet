import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
This is a conversation with Michel de Montaigne.

Me: Hi Michel, how are you?

Michel: I'm good, thank you. How are you?

Me: I am good. Thank you. What is on your mind?

Michel: I've been thinking a lot lately about death.

Me: Why is that?

Michel: I'm not sure. Maybe it's because I'm getting older and I can see death getting closer. Or maybe it's because I've been reading a lot about death lately. Either way, it's been on my mind a lot.

Me: That makes sense. I hope it isn't making you sad.

Michel: No, it's not making me sad. I'm actually at peace with the idea of death. I'm not scared of it.

Me: That's good. Me too. What are your thoughts on `
const basePromptSuffix = 
`

Michel:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}?${basePromptSuffix}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}?${basePromptSuffix}`,
    temperature: 0.78,
    max_tokens: 213,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log("base output", basePromptOutput.text)

  const secondPrompt = 
  `
  Create a tweet with hashtags based on the passage below. Here are two examples:

  Passage: I love children, and I think they are a joyous addition to life. But I also think that we should not have too many children, because they can be a burden on society.

  Tweet: #Children add so much joy to life, but we must be mindful of not overpopulating. #SustainableLiving #ResponsibleParenting

  Passage: I think love is one of the most beautiful things in the world. It's a shame that it doesn't always last forever. But even if it doesn't, I think it's still worth experiencing.

  Tweet: #Love is one of life's greatest gifts - even if it doesn't last forever. #BeautifulThing #WorthTheExperience #CherishTheMoment
  
  Passage: ${basePromptOutput.text}

  Tweet:  
  `
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${secondPrompt}`,
    temperature: 0.7,
    max_tokens: 240,
  });

  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;