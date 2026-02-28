'use server';
/**
 * @fileOverview An AI agent that generates professional and enticing holiday descriptions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateDescriptionInputSchema = z.object({
  hotelName: z.string(),
  location: z.string(),
  features: z.array(z.string()).optional(),
});
export type GenerateDescriptionInput = z.infer<typeof GenerateDescriptionInputSchema>;

const GenerateDescriptionOutputSchema = z.object({
  description: z.string().describe('A professional, enticing 2-3 paragraph description of the holiday.'),
});
export type GenerateDescriptionOutput = z.infer<typeof GenerateDescriptionOutputSchema>;

export async function generateHolidayDescription(
  input: GenerateDescriptionInput
): Promise<GenerateDescriptionOutput> {
  return generateHolidayDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHolidayDescriptionPrompt',
  input: { schema: GenerateDescriptionInputSchema },
  output: { schema: GenerateDescriptionOutputSchema },
  prompt: `You are a luxury travel copywriter for "Elite Escapes".
Generate an enticing 2-paragraph description for a holiday at "{{{hotelName}}}" located in "{{{location}}}".

{{#if features}}
Key features to highlight:
{{#each features}}- {{{this}}}
{{/each}}
{{/if}}

The tone should be sophisticated, inviting, and focus on the unique experiences the guest will have.`,
});

const generateHolidayDescriptionFlow = ai.defineFlow(
  {
    name: 'generateHolidayDescriptionFlow',
    inputSchema: GenerateDescriptionInputSchema,
    outputSchema: GenerateDescriptionOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      console.warn('AI Description Generation failed. Returning fallback.', error);
      return {
        description: `Discover the breathtaking beauty of ${input.hotelName} in ${input.location}. This hand-picked luxury escape offers a perfect blend of relaxation and adventure, curated meticulously for our elite guests. Experience world-class service and unforgettable memories at this stunning destination.`
      };
    }
  }
);
