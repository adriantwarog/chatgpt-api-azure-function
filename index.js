import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
	organization: "org-",
	apiKey: "sk-",
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

	const { messages } = req.body;

	console.log(messages)
	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{"role": "system", "content": "You are DesignGPT helpful assistant graphics design chatbot"},
			...messages
		]
	})

	res.json({
		completion: completion.data.choices[0].message
	})

});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});