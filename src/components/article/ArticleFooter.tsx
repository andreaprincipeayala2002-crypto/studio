import { Topic, topics } from '@/lib/quiz-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, Lightbulb, ExternalLink } from 'lucide-react';

interface ArticleFooterProps {
  topic: Topic;
}

export default function ArticleFooter({ topic }: ArticleFooterProps) {
    const relatedTopicsDetails = topics.filter(t => topic.relatedTopics.includes(t.slug));

    return (
        <footer className="mt-16 border-t border-border pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Questions to Ponder */}
                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="text-primary" />
                            Preguntas para Reflexionar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {topic.reflectionQuestions.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Related Topics */}
                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="text-primary" />
                            Temas Relacionados
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {relatedTopicsDetails.map(related => (
                            <Link href={`/article/${related.slug}`} key={related.slug} className="block p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                <h4 className="font-semibold text-primary-foreground">{related.title}</h4>
                                <p className="text-sm text-muted-foreground">{related.description}</p>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>

             {/* Source Link */}
             <div className="mt-8 text-center">
                <Button variant="link" asChild>
                    <a href={topic.sourceUrl} target="_blank" rel="noopener noreferrer">
                        Leer publicación original de la NASA <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
        </footer>
    )
}
