'use client';

import { ReactNode } from 'react';

interface FormattedAIResponseProps {
  content: string;
}

export default function FormattedAIResponse({ content }: FormattedAIResponseProps) {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let currentTableRows: string[] = [];
  let inTable = false;

  const renderInlineFormatting = (text: string) => {
    // Handle bold, italic, code
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-bold text-ivory">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="italic text-stone/90">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={idx} className="bg-charcoal/50 px-2 py-1 rounded text-amber-300 text-xs font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Handle heading levels
    if (trimmed.startsWith('###')) {
      if (inTable) {
        inTable = false;
        currentTableRows = [];
      }
      elements.push(
        <h3 key={`h3-${idx}`} className="text-h5 font-display font-bold text-ivory mt-6 mb-3">
          {trimmed.replace(/^#+\s*/, '')}
        </h3>
      );
    } else if (trimmed.startsWith('##')) {
      if (inTable) {
        inTable = false;
        currentTableRows = [];
      }
      elements.push(
        <h2 key={`h2-${idx}`} className="text-h4 font-display font-bold text-ivory mt-8 mb-4">
          {trimmed.replace(/^#+\s*/, '')}
        </h2>
      );
    } else if (trimmed.startsWith('#')) {
      if (inTable) {
        inTable = false;
        currentTableRows = [];
      }
      elements.push(
        <h1 key={`h1-${idx}`} className="text-h3 font-display font-bold text-ivory mt-10 mb-5">
          {trimmed.replace(/^#+\s*/, '')}
        </h1>
      );
    }
    // Handle horizontal rule
    else if (trimmed === '---') {
      if (inTable) {
        inTable = false;
        currentTableRows = [];
      }
      elements.push(<div key={`hr-${idx}`} className="border-t border-stone/30 my-6" />);
    }
    // Handle tables
    else if (trimmed.includes('|')) {
      if (!inTable) {
        inTable = true;
        currentTableRows = [];
      }
      currentTableRows.push(trimmed);
      
      // If this is the separator row, process the table
      if (trimmed.match(/^\|[\s\-:|]+\|$/)) {
        if (currentTableRows.length > 1) {
          const headerRow = currentTableRows[0];
          const dataRows = currentTableRows.slice(2);
          
          const headers = headerRow
            .split('|')
            .map(h => h.trim())
            .filter(h => h);
          
          elements.push(
            <div key={`table-${idx}`} className="overflow-x-auto my-4 rounded-lg border border-stone/20">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-charcoal/50 border-b border-stone/20">
                    {headers.map((header, i) => (
                      <th key={i} className="px-4 py-3 text-left font-semibold text-ivory whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rowIdx) => {
                    const cells = row
                      .split('|')
                      .map(c => c.trim())
                      .filter(c => c);
                    return (
                      <tr key={rowIdx} className="border-b border-stone/10 hover:bg-charcoal/30 transition-colors">
                        {cells.map((cell, cellIdx) => (
                          <td key={cellIdx} className="px-4 py-3 text-stone">
                            {renderInlineFormatting(cell)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
          currentTableRows = [];
          inTable = false;
        }
      }
    }
    // Handle bullet points
    else if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
      if (inTable) {
        inTable = false;
        currentTableRows = [];
      }
      const bulletText = trimmed.replace(/^[\*\-]\s*/, '');
      elements.push(
        <div key={`li-${idx}`} className="flex gap-3 text-stone mb-2">
          <span className="text-amber-400/60 flex-shrink-0 mt-1">•</span>
          <div className="flex-1">{renderInlineFormatting(bulletText)}</div>
        </div>
      );
    }
    // Handle numbered lists
    else if (/^\d+\.\s/.test(trimmed)) {
      if (inTable) {
        inTable = false;
        currentTableRows = [];
      }
      const numberMatch = trimmed.match(/^(\d+)\.\s(.+)$/);
      if (numberMatch) {
        elements.push(
          <div key={`ol-${idx}`} className="flex gap-3 text-stone mb-2">
            <span className="text-amber-400/60 flex-shrink-0 font-semibold min-w-fit">{numberMatch[1]}.</span>
            <div className="flex-1">{renderInlineFormatting(numberMatch[2])}</div>
          </div>
        );
      }
    }
    // Handle regular paragraphs
    else if (trimmed) {
      if (inTable) {
        inTable = false;
        currentTableRows = [];
      }
      elements.push(
        <p key={`p-${idx}`} className="text-stone leading-relaxed mb-3">
          {renderInlineFormatting(trimmed)}
        </p>
      );
    }
  });

  return (
    <div className="prose prose-invert max-w-none text-sm">
      {elements}
    </div>
  );
}
