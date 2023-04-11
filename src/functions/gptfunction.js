const { app } = require('@azure/functions');
const { Configuration, OpenAIApi } =require("openai");
const configuration = new Configuration({
	organization: "org-",
	apiKey: "sk-",
});
const openai = new OpenAIApi(configuration);

app.http('gptfunction', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        
        const { messages } = await request.json();

        context.log(messages)
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are DesignGPT helpful assistant graphics design chatbot"},
                ...messages
            ]
        })
    
        return { jsonBody: {
            completion: completion.data.choices[0].message
        }};
    }
});
