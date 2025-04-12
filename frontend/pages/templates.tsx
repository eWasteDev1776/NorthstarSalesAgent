import { useState } from 'react';
import Layout from '../components/Layout';

/**
 * Message Templates Page
 * Allows users to view, create, and manage message templates
 */
export default function TemplatesPage() {
  // Mock template data
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'Pain Point Solution',
      description: 'Addresses specific pain points with concrete solutions',
      content: "Hi {{name}},\n\nI noticed that {{company}} might be experiencing {{pain_point}} based on {{observation}}.\n\nWe've helped similar {{industry}} companies solve this by {{solution}}.\n\nWould you be open to a brief conversation about how we might help {{company}} achieve {{benefit}}?\n\nBest,\n{{sender_name}}",
      tags: ['high-performing', 'tech'],
      stats: {
        useCount: 47,
        responseRate: '12.8%',
        avgResponseTime: '8h',
      },
    },
    {
      id: '2',
      name: 'Quick Question',
      description: 'Short and direct question approach',
      content: "Hi {{name}},\n\nQuick question - is {{company}} currently looking to improve {{focus_area}}?\n\nWe've recently helped {{reference_company}} achieve {{specific_result}}.\n\nHappy to share some insights if this is relevant to your current priorities.\n\nBest,\n{{sender_name}}",
      tags: ['brief', 'question-based'],
      stats: {
        useCount: 32,
        responseRate: '9.5%',
        avgResponseTime: '12h',
      },
    },
    {
      id: '3',
      name: 'Thought Leadership',
      description: 'Shares valuable insights with no hard sell',
      content: "Hi {{name}},\n\nI've been researching trends in {{industry}} and put together some findings on {{topic}} that might interest you.\n\nOne thing that stood out was {{insight}}, which seems particularly relevant to {{company}} given {{reason}}.\n\nI'd be happy to share the full report if you're interested.\n\nBest,\n{{sender_name}}",
      tags: ['value-first', 'research'],
      stats: {
        useCount: 18,
        responseRate: '10.2%',
        avgResponseTime: '24h',
      },
    },
  ]);

  return (
    <Layout title="Message Templates - Northstar">
      <div className="flex flex-col h-full">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Message Templates</h1>
            <p className="text-muted-foreground">
              Create and manage reusable message templates for your outreach
            </p>
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Template
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div key={template.id} className="card-glow flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{template.name}</h3>
                <div className="flex gap-2">
                  <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-muted-foreground hover:text-destructive rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>

              <div className="bg-background-soft rounded-lg p-3 mb-4 h-32 overflow-hidden relative">
                <div className="text-xs font-mono whitespace-pre-line overflow-hidden text-muted-foreground">
                  {template.content}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background-soft to-transparent"></div>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-1.5">
                  {template.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary-foreground px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Response rate: <span className="text-foreground font-medium">{template.stats.responseRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
