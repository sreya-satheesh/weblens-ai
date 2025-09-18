'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Languages, PenSquare, CheckCircle, Copy, Loader2, Wand2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { summarize, translate, rewrite, proofread } from '@/app/actions';

type ResultsDisplayProps = {
  extractedText: string;
  imageUrl: string;
  isLoading: boolean;
};

const LANGUAGES = [
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Mandarin Chinese', label: 'Chinese' },
  { value: 'Russian', label: 'Russian' },
];

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'academic', label: 'Academic' },
  { value: 'simplified', label: 'Simplified' },
  { value: 'poetic', label: 'Poetic' },
];

function ActionPanelSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 flex-1" />
            </div>
            <Skeleton className="h-24 w-full" />
        </div>
    );
}

function ResultBox({ text, isLoading, title }: { text: string; isLoading: boolean, title?: string }) {
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  return (
    <div className="relative">
      {title && <h3 className="text-sm font-semibold mb-2 text-muted-foreground">{title}</h3>}
      <Textarea
        value={text}
        readOnly
        className="h-36 w-full bg-secondary/50 text-base"
        placeholder={isLoading ? "Generating..." : "Result will appear here."}
      />
      {text && !isLoading && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
      {isLoading && (
         <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-md">
            <Loader2 className="h-6 w-6 animate-spin text-primary"/>
         </div>
      )}
    </div>
  );
}

export function ResultsDisplay({ extractedText, imageUrl, isLoading }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState('extracted');
  
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLang, setTargetLang] = useState(LANGUAGES[0].value);

  const [rewrittenText, setRewrittenText] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [targetTone, setTargetTone] = useState(TONES[0].value);

  const [enhancedText, setEnhancedText] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary('');
    const result = await summarize(extractedText);
    if(result.error || !result.data) {
        toast({ variant: 'destructive', title: 'Summarization failed', description: result.error });
    } else {
        setSummary(result.data);
    }
    setIsSummarizing(false);
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    setTranslatedText('');
    const result = await translate(extractedText, targetLang);
    if(result.error || !result.data) {
        toast({ variant: 'destructive', title: 'Translation failed', description: result.error });
    } else {
        setTranslatedText(result.data);
    }
    setIsTranslating(false);
  };
  
  const handleRewrite = async () => {
    setIsRewriting(true);
    setRewrittenText('');
    const result = await rewrite(extractedText, targetTone);
     if(result.error || !result.data) {
        toast({ variant: 'destructive', title: 'Rewrite failed', description: result.error });
    } else {
        setRewrittenText(result.data);
    }
    setIsRewriting(false);
  };

  const handleEnhance = async () => {
    setIsEnhancing(true);
    setEnhancedText('');
    const result = await proofread(extractedText);
     if(result.error || !result.data) {
        toast({ variant: 'destructive', title: 'Enhancement failed', description: result.error });
    } else {
        setEnhancedText(result.data);
    }
    setIsEnhancing(false);
  };

  if (isLoading) {
    return (
      <Card className="shadow-xl">
        <CardHeader>
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <ActionPanelSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (!extractedText) {
    return (
      <Card className="flex flex-col items-center justify-center text-center p-8 shadow-xl min-h-[250px]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary mb-4">
            <Wand2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-headline text-2xl font-semibold">Ready for Magic</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">Upload an image to get started. Your AI-powered analysis will appear here.</p>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl font-extrabold tracking-tight">AI Analysis</CardTitle>
        <CardDescription>View, summarize, translate, and refine the text extracted from your image.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="extracted"><FileText className="mr-2"/>Extracted</TabsTrigger>
            <TabsTrigger value="summary"><Sparkles className="mr-2"/>Summarize</TabsTrigger>
            <TabsTrigger value="translate"><Languages className="mr-2"/>Translate</TabsTrigger>
            <TabsTrigger value="rewrite"><PenSquare className="mr-2"/>Rewrite</TabsTrigger>
            <TabsTrigger value="enhance"><CheckCircle className="mr-2"/>Enhance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="extracted" className="mt-4">
            <ResultBox text={extractedText} isLoading={false} title="Extracted Text" />
          </TabsContent>

          <TabsContent value="summary" className="mt-4 space-y-4">
            <Button onClick={handleSummarize} disabled={isSummarizing} className="w-full bg-primary text-primary-foreground">
                {isSummarizing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Summary
            </Button>
            <ResultBox text={summary} isLoading={isSummarizing} />
          </TabsContent>

          <TabsContent value="translate" className="mt-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleTranslate} disabled={isTranslating} className="w-full sm:w-auto flex-1 bg-primary text-primary-foreground">
                {isTranslating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Translate
              </Button>
            </div>
            <ResultBox text={translatedText} isLoading={isTranslating} />
          </TabsContent>

          <TabsContent value="rewrite" className="mt-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <Select value={targetTone} onValueChange={setTargetTone}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select Tone" />
                    </SelectTrigger>
                    <SelectContent>
                        {TONES.map(tone => (
                            <SelectItem key={tone.value} value={tone.value}>{tone.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleRewrite} disabled={isRewriting} className="w-full sm:w-auto flex-1 bg-primary text-primary-foreground">
                    {isRewriting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Rewrite
                </Button>
            </div>
            <ResultBox text={rewrittenText} isLoading={isRewriting} />
          </TabsContent>

          <TabsContent value="enhance" className="mt-4 space-y-4">
            <Button onClick={handleEnhance} disabled={isEnhancing} className="w-full bg-primary text-primary-foreground">
                {isEnhancing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enhance Grammar & Readability
            </Button>
            <ResultBox text={enhancedText} isLoading={isEnhancing} />
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
