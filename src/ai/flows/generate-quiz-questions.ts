'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating quiz questions based on NASA space biology resources.
 *
 * It includes:
 * - generateQuizQuestions: An exported function to trigger the quiz question generation flow.
 * - GenerateQuizQuestionsInput: The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput: The output type for the generateQuizQuestions function, specifying the format of the quiz questions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate quiz questions.'),
  nasaPublicationText: z.string().describe('The text content from a NASA space biology publication to use as a basis for generating questions.'),
  numberOfQuestions: z.number().int().min(1).max(10).default(5).describe('The number of quiz questions to generate.'),
});
export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).length(4).describe('Four possible answer options for the question.'),
  correctAnswerIndex: z.number().int().min(0).max(3).describe('The index of the correct answer in the options array.'),
});

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array of quiz questions.'),
});
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;


export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const generateQuizQuestionsPrompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an expert quiz question generator, specializing in space biology based on NASA resources. Generate {{numberOfQuestions}} quiz questions based on the provided NASA publication text. Each question should have four answer options, with one correct answer.

NASA Publication Text:
{{{nasaPublicationText}}}

Topic: {{{topic}}}

Output the questions in the following JSON format:
{{$instructions}}`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateQuizQuestionsPrompt(input);
    return output!;
  }
);
