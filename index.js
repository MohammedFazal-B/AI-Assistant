import { GoogleGenerativeAI } from '@google/generative-ai';
import chalk from 'chalk';
import { config } from 'dotenv';
import readlineSync from 'readline-sync';

config();

const orange = chalk.hex('#ED944D');
const redMatte = chalk.hex('#FF1A1A');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Using Gemini Flash model
const exec = async () => {
  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash-latest' });
  const chat = model.startChat({
    history: [], 
  });

  console.log(chalk.gray('\n🔗 Gemini Assistant is ready. Type your messages below (type "exit" to quit):\n'));

  while (true) {
    const user_input = readlineSync.question(`${chalk.blueBright('You')}: `);

    if (user_input.trim().toLowerCase() === 'exit') {
      console.log(chalk.yellow('👋 Goodbye!'));
      break;
    }

    try {
      const result = await chat.sendMessage(user_input);
      const response = result.response;
      const text = response.text();

      console.log(` ${redMatte("MohammedFazal")}(${orange("Gemini Flash")}):\n${chalk.green(text)}\n`);
    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  }
};

exec();
