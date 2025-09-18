'use client';

import { useState, useRef, type DragEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ImageUploaderProps = {
  onProcess: (imageDataUri: string) => void;
  isLoading: boolean;
  hasResults: boolean;
};

export function ImageUploader({ onProcess, isLoading, hasResults }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const placeholderImage = PlaceHolderImages.find(p => p.id === 'weblens-placeholder');

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload an image file (e.g., PNG, JPG, WEBP).',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleClearImage = () => {
    setImageUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcessClick = () => {
    if (imageUrl) {
      onProcess(imageUrl);
    }
  };

  return (
    <Card className="shadow-xl w-full">
      <CardContent className="space-y-4 pt-6">
        {imageUrl ? (
          <div className="relative group">
            <Image
              src={imageUrl}
              alt="Uploaded preview"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg object-contain max-h-[40vh] border"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleClearImage}
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              'relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
              isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="absolute inset-0">
               {placeholderImage && (
                 <Image 
                   src={placeholderImage.imageUrl} 
                   alt={placeholderImage.description}
                   fill
                   className="object-cover rounded-lg opacity-10"
                   data-ai-hint={placeholderImage.imageHint}
                  />
               )}
            </div>
            <div className="relative z-10 flex flex-col items-center gap-2 text-center text-muted-foreground">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <UploadCloud className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-semibold">
                <span className="text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs">PNG, JPG, GIF, WEBP</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => handleFileChange(e.target.files?.[0] || null)}
            />
          </div>
        )}
        <Button
          onClick={handleProcessClick}
          disabled={!imageUrl || isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <ImageIcon className="mr-2 h-5 w-5" />
          )}
          {isLoading ? 'Analyzing...' : 'Analyze with AI'}
        </Button>
      </CardContent>
    </Card>
  );
}
