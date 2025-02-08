import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { AlertCircle, CheckCircle2, Clock, Search, Triangle, Link } from 'lucide-react';
import type { SEOAnalysis } from '../utils/seo-analyzer';

interface SEOSidebarProps {
  analysis: SEOAnalysis;
  targetKeyword: string;
}

export function SEOSidebar({ analysis, targetKeyword }: SEOSidebarProps) {
  return (
    <Card className="w-80 flex flex-col h-[calc(100vh-2rem)] sticky top-4">
      <div className="p-4 border-b">
        <h2 className="font-semibold">SEO Analysis</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Score</span>
              <span className="font-medium">{analysis.score}/100</span>
            </div>
            <Progress value={analysis.score} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Readability Score</span>
              <span className="font-medium">{Math.round(analysis.readabilityScore)}/100</span>
            </div>
            <Progress value={analysis.readabilityScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Target Keyword</h3>
            <div className="flex items-center gap-2 text-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <span>{targetKeyword}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Density:{' '}
              {analysis.keywordDensity[targetKeyword] !== undefined
                ? `${analysis.keywordDensity[targetKeyword].toFixed(1)}%`
                : 'N/A'}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Estimated Reading Time</h3>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{analysis.readingTime} min read</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Recommendations</h3>
            <div className="space-y-2">
              {analysis.recommendations.map(
                (rec: { type: 'success' | 'warning' | 'error'; message: string }, i: number) => (
                  <div key={i} className="flex gap-2 text-sm">
                    {rec.type === 'success' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                    )}
                    {rec.type === 'warning' && (
                      <Triangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                    )}
                    {rec.type === 'error' && (
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <span className="text-muted-foreground">{rec.message}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {!analysis.headingStructure.isValid && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Heading Structure</h3>
              <div className="space-y-1">
                {analysis.headingStructure.messages.map((msg: string, i: number) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{msg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Internal Links</h3>
            <div className="flex items-center gap-2 text-sm">
              <Link className="w-4 h-4 text-muted-foreground" />
              <span>{analysis.internalLinks.count} internal links</span>
            </div>
            {analysis.internalLinks.suggestions.map((suggestion: string, i: number) => (
              <div key={i} className="flex gap-2 text-sm">
                <Triangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
