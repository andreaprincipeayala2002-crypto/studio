import { topics } from '@/lib/quiz-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Lightbulb, Tag } from 'lucide-react';
import ArticleFooter from '@/components/article/ArticleFooter';

export async function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const topic = topics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article>
        <header className="mb-8">
          <p className="text-primary font-semibold text-lg mb-2">Artículo de Biología Espacial</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter glow mb-4">{topic.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> <span>{topic.publicationDate}</span>
              </div>
          </div>
        </header>
        
        {topic.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8 border border-primary/20">
            <Image
              src={topic.image.imageUrl}
              alt={topic.image.description}
              data-ai-hint={topic.image.imageHint}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none mx-auto text-foreground/90 whitespace-pre-wrap">
            <p className="lead text-xl text-muted-foreground">{topic.longDescription}</p>
        </div>
        
        <div className="my-12 text-center">
            <Button asChild size="lg" className="bg-accent/90 hover:bg-accent text-accent-foreground font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300">
                <Link href={`/quiz?topic=${topic.slug}`}>
                    Prueba tu conocimiento <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>

        <ArticleFooter topic={topic} />
      </article>
    </div>
  );
}
