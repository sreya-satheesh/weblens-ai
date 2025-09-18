'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { ImageUploader } from '@/components/image-uploader';
import { ResultsDisplay } from '@/components/results-display';
import { processImage } from '@/app/actions';

export default function AppPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const { toast } = useToast();

  const handleProcessImage = async (imageDataUri: string) => {
    setIsLoading(true);
    setExtractedText('');
    setProcessedImageUrl(imageDataUri);

    const result = await processImage(imageDataUri);

    if (result.error || !result.data) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.error || 'Failed to get a result from the AI.',
      });
      setProcessedImageUrl('');
    } else {
      setExtractedText(result.data);
    }
    setIsLoading(false);
  };
  
  const resetApp = () => {
    setExtractedText('');
    setProcessedImageUrl('');
    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header onReset={resetApp} />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8">
            <ImageUploader 
              onProcess={handleProcessImage} 
              isLoading={isLoading} 
              hasResults={!!extractedText}
            />
            <ResultsDisplay
              key={processedImageUrl} // Resets component state when a new image is processed
              extractedText={extractedText}
              imageUrl={processedImageUrl}
              isLoading={isLoading && !extractedText}
            />
          </div>
        </div>
      </main>
      <footer className="py-6 border-t border-border/40 mt-auto">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center text-muted-foreground">
           <p>
            Created with ❤️ by <a href="https://github.com/sreya-satheesh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Sreya</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
