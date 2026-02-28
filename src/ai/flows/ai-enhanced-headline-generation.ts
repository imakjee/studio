'use server';
/**
 * @fileOverview An AI agent that generates catchy and conversion-optimized headlines for travel deals or hero sections.
 *
 * - generateHeadline - A function that handles the headline generation process.
 * - GenerateHeadlineInput - The input type for the generateHeadline function.
 * - GenerateHeadlineOutput - The return type for the generateHeadline function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateHeadlineInputSchema = z.object({
  purpose: z
    .string()
    .describe(
      'The specific purpose or placement of the headline (e.g., "hero section", "last minute deal", "featured holiday").'
    ),
  details: z
    .string()
    .describe(
      'Key details about the holiday, deal, or content to be highlighted (e.g., "Maldives luxury beach holiday, 7 days all-inclusive", "Save £200 on Spain family holidays", "Explore our best cruise deals").'
    ),
  keywords: z
    .array(z.string())
    .optional()
    .describe('Optional keywords to include in the headline.'),
});
export type GenerateHeadlineInput = z.infer<typeof GenerateHeadlineInputSchema>;

const GenerateHeadlineOutputSchema = z.object({
  headline: z
    .string()
    .describe('A catchy, conversion-optimized headline for the given purpose and details.'),
});
export type GenerateHeadlineOutput = z.infer<typeof GenerateHeadlineOutputSchema>;

export async function generateHeadline(
  input: GenerateHeadlineInput
): Promise<GenerateHeadlineOutput> {
  return aiEnhancedHeadlineGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeadlinePrompt',
  input: { schema: GenerateHeadlineInputSchema },
  output: { schema: GenerateHeadlineOutputSchema },
  prompt: `You are an expert copywriter for a premium bespoke travel agency named "Tailor Travels".
Your task is to create a catchy, conversion-optimized headline for a travel promotion or section of a website.

Consider the following:
- **Purpose**: {{{purpose}}}
- **Details**: {{{details}}}
{{#if keywords}}
- **Keywords**: {{#each keywords}}- {{{this}}}
{{/each}}{{/if}}

Generate a single headline that is enticing, highlights the bespoke nature of the trip, and encourages users to click or learn more. Keep it concise and impactful.
`,
});

const aiEnhancedHeadlineGenerationFlow = ai.defineFlow(
  {
    name: 'aiEnhancedHeadlineGenerationFlow',
    inputSchema: GenerateHeadlineInputSchema,
    outputSchema: GenerateHeadlineOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output || !output.headline) {
        throw new Error('No headline generated');
      }
      return output;
    } catch (error) {
      // Log error internally, but do not throw to prevent UI crashes on rate limits
      console.warn('AI Headline Generation failed (Rate limited or service error). Returning fallback.', error);
      
      // High-quality fallback headlines
      let fallbackHeadline = "Bespoke travel deals hand-picked for your next perfect escape.";
      
      if (input.purpose.toLowerCase().includes('hero')) {
        fallbackHeadline = "Discover tailored luxury destinations and unforgettable experiences worldwide.";
      } else if (input.purpose.toLowerCase().includes('last minute')) {
        fallbackHeadline = "Hurry! These exclusive tailored deals won't last long.";
      }
        
      return { 
        headline: fallbackHeadline 
      };
    }
  }
);
