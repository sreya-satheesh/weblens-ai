import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScanTextIcon, ArrowRight, Languages, PenSquare, CheckCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const features = [
  {
    icon: <ScanTextIcon className="h-8 w-8 text-primary" />,
    title: 'Extract Text Instantly',
    description: 'Just upload an image and our AI will quickly pull out all the text for you.',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: 'Translate with Ease',
    description: 'Translate the extracted text into multiple languages in a single click.',
  },
  {
    icon: <PenSquare className="h-8 w-8 text-primary" />,
    title: 'Rewrite & Refine',
    description: 'Change the tone of your text to be more professional, casual, or even poetic.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Enhance Readability',
    description: 'Improve grammar and clarity to make your text polished and easy to understand.',
  }
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ScanTextIcon className="h-5 w-5" />
            </div>
            <h1 className="font-headline text-xl font-bold tracking-tighter text-foreground">
              WebLens AI
            </h1>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex-1 flex flex-col">
          <section className="flex flex-1 flex-col items-center justify-center text-center py-20 sm:py-28 lg:py-32">
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Unlock Text From Any Image
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
              Instantly extract, summarize, translate, and refine text from any image with powerful AI.
            </p>
            <Button asChild size="lg" className="mt-10 h-14 px-8 text-lg">
              <Link href="/app">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </section>

          <section className="py-16 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-card border">
                   <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-headline text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="py-6 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center text-muted-foreground">
           <p>
            Created with ❤️ by <a href="https://github.com/sreya-satheesh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Sreya</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
