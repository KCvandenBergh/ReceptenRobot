import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import cors from "cors";

const app = express();
const port = 3000;


const model = new ChatOpenAI({
    temperature: 0.0,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
    maxRetries: 10
});

app.use(cors());
app.use(express.json());
app.post('/api/chat', async (req, res) => {
    try {
        // de ingrediënten van de gebruiker 
        const { ingredients } = req.body;

        // Voeg de ingrediënten samen in een bericht voor het model
        const messages = [
            ["system", "Je bent een wereld chef met kennis van gerechten uit Caribbische, Afrikaanse en Aziatische landen."],
            ["human", `Recept met ingrediënten: ${ingredients.join(', ')}`]
        ];

        // Roep het model aan met het samengestelde bericht
        const result = await model.invoke(messages);
        console.log()

        // Stuur de reactie terug naar de frontend
        res.json({ content: result.content });
    } catch (error) {
        console.error("Fout:", error);
        res.status(500).json({ error: "Interne serverfout" });
    }
});

app.listen(port, () => {
    console.log(`De server draait op http://localhost:${port}`);
});