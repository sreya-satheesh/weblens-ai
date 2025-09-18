'use server';

/**
 * @fileOverview Rewrites content to different tones.
 *
 * - rewriteText - A function that rewrites the content.
 * - RewriteTextInput - The input type for the rewriteText function.
 * - RewriteTextOutput - The return type for the rewriteText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteTextInputSchema = z.object({
  text: z.string().describe('The text to rewrite.'),
  tone: z.string().describe('The desired tone of the rewritten text. Examples: professional, casual, academic, simplified.'),
});
export type RewriteTextInput = z.infer<typeof RewriteTextInputSchema>;

const RewriteTextOutputSchema = z.object({
  rewrittenText: z.string().describe('The rewritten text with the specified tone.'),
});
export type RewriteTextOutput = z.infer<typeof RewriteTextOutputSchema>;

export async function rewriteText(input: RewriteTextInput): Promise<RewriteTextOutput> {
  return rewriteTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteTextPrompt',
  input: {schema: RewriteTextInputSchema},
  output: {schema: RewriteTextOutputSchema},
  prompt: `Rewrite the following text with a {{{tone}}} tone:

{{{text}}}`,
});

const rewriteTextFlow = ai.defineFlow(
  {
    name: 'rewriteTextFlow',
    inputSchema: RewriteTextInputSchema,
    outputSchema: RewriteTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
