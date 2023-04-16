import { Configuration, OpenAIApi } from "openai";
import dotenv from  "dotenv";
import Express  from "express";
import cors from "cors"
dotenv.config()
const app =Express()
app.use(cors())
app.use(Express.json())


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let answer;

app.get('/' , async(req , res)=>{
    res.status(200).send("test")
})
app.post('/' , async(req , res)=>{
    
    const prompt =req.body.input
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt? prompt:'say this is an error ', 
        temperature: 0,
        max_tokens: 1292,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\"\"\""],
    })
     answer = response.data.choices[0].text.trim()
    res.status(200).send({bot:answer})

} )

app.listen(5000 , ()=>{
    console.log('server is listening to http://localhost:5000');
})








