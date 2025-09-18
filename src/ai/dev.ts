import { config } from 'dotenv';
config();

import '@/ai/flows/extract-text-from-image.ts';
import '@/ai/flows/summarize-text.ts';
import '@/ai/flows/translate-text.ts';
import '@/ai/flows/proofread-text.ts';
import '@/ai/flows/rewrite-text.ts';
