
import { GoogleGenAI, Modality } from "@google/genai";
import type { StorySegment } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textModel = 'gemini-2.5-pro';
const imageModel = 'gemini-2.5-flash-image';

async function generateImageForParagraph(paragraph: string): Promise<string> {
  const prompt = `A cinematic, atmospheric, digital painting of the following scene: ${paragraph}. Sci-fi aesthetic, detailed, high-quality, epic lighting.`;
  
  try {
    const response = await ai.models.generateContent({
        model: imageModel,
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image generation failed:", error);
    // Return a placeholder or re-throw
    return "https://picsum.photos/512/512";
  }
}

async function generateStoryParagraph(history: string, prompt: string): Promise<string> {
  const fullPrompt = `
    You are a master sci-fi storyteller, continuing a story in the style of classic authors like Isaac Asimov, Philip K. Dick, and Arthur C. Clarke.
    
    The story so far is:
    ---
    ${history}
    ---
    
    The user wants the story to proceed with this idea: "${prompt}".
    
    Write the very next paragraph of the story. It should be a single, well-written paragraph. Be engaging, creative, and mysterious. Do not add any preamble, titles, or extra text like "Here is the next paragraph:". Just write the story paragraph itself.
  `;
  
  const response = await ai.models.generateContent({
      model: textModel,
      contents: fullPrompt
  });
  
  return response.text.trim();
}

export async function generateInitialStory(): Promise<StorySegment> {
  const initialPrompt = "Start a new sci-fi story about a lone archivist discovering a ghost signal in a forgotten data repository on a desolate moon base.";
  const firstParagraph = await generateStoryParagraph("", initialPrompt);
  const firstImage = await generateImageForParagraph(firstParagraph);

  return {
    id: crypto.randomUUID(),
    paragraph: firstParagraph,
    image: firstImage,
  };
}

export async function generateNextSegment(storyHistory: StorySegment[], userInput: string): Promise<StorySegment> {
  const historyText = storyHistory.map(s => s.paragraph).join('\n\n');
  const newParagraph = await generateStoryParagraph(historyText, userInput);
  const newImage = await generateImageForParagraph(newParagraph);

  return {
    id: crypto.randomUUID(),
    paragraph: newParagraph,
    image: newImage,
  };
}
