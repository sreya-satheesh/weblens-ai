import { ScanTextIcon, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

type HeaderProps = {
  onReset: () => void;
};

export function Header({ onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ScanTextIcon className="h-5 w-5" />
            </div>
            <h1 className="font-headline text-xl font-bold tracking-tighter text-foreground">
              WebLens AI
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={onReset} aria-label="Start Over">
              <RotateCcw className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </header>
  );
}
