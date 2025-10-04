'use server';

/**
 * @fileOverview Summarizes lengthy NASA space biology publications.
 *
 * - summarizeSpaceBiologyPublication - A function that summarizes a given text.
 * - SummarizeSpaceBiologyPublicationInput - The input type for the summarizeSpaceBiologyPublication function.
 * - SummarizeSpaceBiologyPublicationOutput - The return type for the summarizeSpaceBiologyPublication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSpaceBiologyPublicationInputSchema = z.object({
  text: z.string().describe('The text of the NASA space biology publication to summarize.'),
});
export type SummarizeSpaceBiologyPublicationInput = z.infer<typeof SummarizeSpaceBiologyPublicationInputSchema>;

const SummarizeSpaceBiologyPublicationOutputSchema = z.object({
  summary: z.string().describe('The summary of the NASA space biology publication.'),
});
export type SummarizeSpaceBiologyPublicationOutput = z.infer<typeof SummarizeSpaceBiologyPublicationOutputSchema>;

export async function summarizeSpaceBiologyPublication(
  input: SummarizeSpaceBiologyPublicationInput
): Promise<SummarizeSpaceBiologyPublicationOutput> {
  return summarizeSpaceBiologyPublicationFlow(input);
}

const summarizeSpaceBiologyPublicationPrompt = ai.definePrompt({
  name: 'summarizeSpaceBiologyPublicationPrompt',
  input: {schema: SummarizeSpaceBiologyPublicationInputSchema},
  output: {schema: SummarizeSpaceBiologyPublicationOutputSchema},
  prompt: `Summarize the following NASA space biology publication:\n\n{{text}}`,
});

const summarizeSpaceBiologyPublicationFlow = ai.defineFlow(
  {
    name: 'summarizeSpaceBiologyPublicationFlow',
    inputSchema: SummarizeSpaceBiologyPublicationInputSchema,
    outputSchema: SummarizeSpaceBiologyPublicationOutputSchema,
  },
  async input => {
    const {output} = await summarizeSpaceBiologyPublicationPrompt(input);
    return output!;
  }
);
