import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

const geminiAPIKey: string = '';

const genAI = new GoogleGenerativeAI(geminiAPIKey);

const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

@Injectable()
export class GeminiService {
  async geminiChat(query: { question: string }) {
    const prompt: string = query.question;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return { ans: text };
  }
}
