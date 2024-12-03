import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory
  } from '@google/generative-ai';
  
  // IMPORTANT: Replace this with secure handling of your API key.
  // See notes below about securing the API key.
  const apiKey = 'AIzaSyA_0YenPT7Yja6EHeUyjkBGzRqvdLSysck';
  
  let genAI = null;
  let model = null;
  
  const generationConfig = {
    temperature: 1,
  };
  
  export function initModel(config = generationConfig) {
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      safetySettings,
      generationConfig: config,
    });
    return model;
  }
  
  export async function runPrompt(prompt) {
    if (!model) {
      initModel();
    }
  
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (e) {
      console.error('Error running prompt:', e);
      throw e;
    }
  }  