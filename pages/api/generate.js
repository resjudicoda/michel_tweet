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

Me: That's good. Me too. Could you write me a tweet about `
const basePromptSuffix = 
`

Michel:
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}.${basePromptSuffix}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}.${basePromptSuffix}`,
    temperature: 0.78,
    max_tokens: 213,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;