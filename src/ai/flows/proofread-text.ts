'use server';
/**
 * @fileOverview A proofreading AI agent to refine grammar and clarity.
 *
 * - proofreadText - A function that handles the proofreading process.
 * - ProofreadTextInput - The input type for the proofreadText function.
 * - ProofreadTextOutput - The return type for the proofreadText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProofreadTextInputSchema = z.object({
  text: z.string().describe('The text to be proofread for grammar and readability.'),
});
export type ProofreadTextInput = z.infer<typeof ProofreadTextInputSchema>;

const ProofreadTextOutputSchema = z.object({
  proofreadText: z.string().describe('The grammar and readability enhanced text.'),
});
export type ProofreadTextOutput = z.infer<typeof ProofreadTextOutputSchema>;

export async function proofreadText(
  input: ProofreadTextInput
): Promise<ProofreadTextOutput> {
  return proofreadTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proofreadTextPrompt',
  input: {schema: ProofreadTextInputSchema},
  output: {schema: ProofreadTextOutputSchema},
  prompt: `You are a highly skilled proofreader and editor. Your task is to enhance the grammar and readability of the given text.

Text: {{{text}}}

Please provide a version of the text with improved grammar, clarity, and overall readability. Respond with the proofread text in the 'proofreadText' field.`,
});

const proofreadTextFlow = ai.defineFlow(
  {
    name: 'proofreadTextFlow',
    inputSchema: ProofreadTextInputSchema,
    outputSchema: ProofreadTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
