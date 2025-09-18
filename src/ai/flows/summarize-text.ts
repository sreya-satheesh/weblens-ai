'use server';

/**
 * @fileOverview Summarizes text.
 *
 * - summarizeText - A function that takes text and returns a summary.
 * - SummarizeTextInput - The input type for the summarizeText function.
 * - SummarizeTextOutput - The return type for the summarizeText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextInputSchema = z.object({
  text: z
    .string()
    .describe(
      'The text to be summarized.'
    ),
});
export type SummarizeTextInput = z.infer<
  typeof SummarizeTextInputSchema
>;

const SummarizeTextOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the text.'),
});
export type SummarizeTextOutput = z.infer<
  typeof SummarizeTextOutputSchema
>;

export async function summarizeText(
  input: SummarizeTextInput
): Promise<SummarizeTextOutput> {
  return summarizeTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextPrompt',
  input: {schema: SummarizeTextInputSchema},
  output: {schema: SummarizeTextOutputSchema},
  prompt: `Summarize the following text. Be concise and focus on the key information.

Text: {{{text}}}`,
});

const summarizeTextFlow = ai.defineFlow(
  {
    name: 'summarizeTextFlow',
    inputSchema: SummarizeTextInputSchema,
    outputSchema: SummarizeTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
