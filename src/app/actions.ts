'use server';

import { extractTextFromImage } from '@/ai/flows/extract-text-from-image';
import { summarizeText } from '@/ai/flows/summarize-text';
import { translateText } from '@/ai/flows/translate-text';
import { rewriteText } from '@/ai/flows/rewrite-text';
import { proofreadText } from '@/ai/flows/proofread-text';

export async function processImage(photoDataUri: string) {
  try {
    const result = await extractTextFromImage({ photoDataUri });
    return { data: result.extractedText };
  } catch (error) {
    console.error('Error processing image:', error);
    return { error: 'Failed to analyze the image. Please try again.' };
  }
}

export async function summarize(text: string) {
  try {
    const result = await summarizeText({ text });
    return { data: result.summary };
  } catch (error) {
    console.error('Error summarizing text:', error);
    return { error: 'Failed to summarize the text. Please try again.' };
  }
}

export async function translate(text: string, targetLanguage: string) {
  try {
    const result = await translateText({ text, targetLanguage });
    return { data: result.translatedText };
  } catch (error) {
    console.error('Error translating text:', error);
    return { error: 'Failed to translate the text. Please try again.' };
  }
}

export async function rewrite(text: string, tone: string) {
  try {
    const result = await rewriteText({ text, tone });
    return { data: result.rewrittenText };
  } catch (error) {
    console.error('Error rewriting text:', error);
    return { error: 'Failed to rewrite the text. Please try again.' };
  }
}

export async function proofread(text: string) {
  try {
    const result = await proofreadText({ text });
    return { data: result.proofreadText };
  } catch (error) {
    console.error('Error enhancing text:', error);
    return { error: 'Failed to enhance the text. Please try again.' };
  }
}
