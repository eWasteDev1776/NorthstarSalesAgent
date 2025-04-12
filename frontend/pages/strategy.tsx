import { useState } from 'react';
import Layout from '../components/Layout';
import StrategyChat from '../components/StrategyChat';

/**
 * Strategy Center Page
 * Provides insights, memory timeline, and agent chat for strategic planning
 */
export default function StrategyPage() {
  const [activeTab, setActiveTab] = useState<'insights' | 'memory' | 'chat'>('insights');
  
  // Mock insights data
  const insights = [
    {
      id: '1',
      title: 'Message Length Impact',
      description: 'Messages with 150-200 words have a 24% higher response rate than longer ones.',
      date: '2023-06-10',
      source: 'Message Analysis',
      confidence: 'high',
    },
    {
      id: '2',
      title: 'Industry Targeting',
      description: 'Tech leads are 3x more responsive than marketing leads in current campaigns.',
      date: '2023-06-08',
      source: 'Campaign Results',
      confidence: 'medium',
    },
    {
      id: '3',
      title: 'Subject Line Analysis',
      description: 'Subject lines with questions see 18% higher open rates.',
      date: '2023-06-05',
      source: 'Email Analytics',
      confidence: 'high',
    },
    {
      id: '4',
      title: 'Follow-up Timing',
      description: 'Following up 3-4 days after initial contact yields 2x better responses than same-day or 7+ day follow-ups.',
      date: '2023-06-01',
      source: 'Campaign Results',
      confidence: 'medium',
    },
  ];
  
  // Mock memory timeline data
  const memoryTimeline = [
    {
      id: '1',
      type: 'search',
      title: 'Lead Search - Fitness Studios',
      description: 'Searched for "boutique fitness studios in Nashville"',
      date: '2023-06-15T14:30:00Z',
      relatedItems: ['lead:2', 'lead:7', 'lead:12'],
    },
    {
      id: '2',
      type: 'campaign',
      title: 'Tech Companies Q2 Campaign Started',
      description: 'Launched campaign targeting tech companies with 20-100 employees',
      date: '2023-06-12T10:00:00Z',
      relatedItems: ['campaign:1'],
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message Template Created',
      description: 'Created "Software Dev Agency Intro" template focusing on efficiency gains',
      date: '2023-06-10T09:15:00Z',
      relatedItems: ['template:3'],
    },
    {
      id: '4',
      type: 'insight',
      title: 'Detected Response Pattern',
      description: 'Morning messages (8-10am) receive 30% higher engagement',
      date: '2023-06-07T16:45:00Z',
      relatedItems: [],
    },
  ];
  
  return (
    <Layout title="Strategy Center - Northstar">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Strategy Center</h1>
          <p className="text-muted-foreground">
            Get insights, review memory, and strategize with your AI agent
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('insights')}
              className={`pb-2 px-1 font-medium text-sm transition-colors relative ${
                activeTab === 'insights'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Insights
              {activeTab === 'insights' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('memory')}
              className={`pb-2 px-1 font-medium text-sm transition-colors relative ${
                activeTab === 'memory'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Memory Timeline
              {activeTab === 'memory' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('chat')}
              className={`pb-2 px-1 font-medium text-sm transition-colors relative ${
                activeTab === 'chat'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Strategy Chat
              {activeTab === 'chat' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="flex-1">
          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {insights.map((insight) => (
                <div key={insight.id} className="card-glow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{insight.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      insight.confidence === 'high' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {insight.confidence} confidence
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{insight.description}</p>
                  <div className="text-xs text-muted-foreground flex justify-between items-center border-t border-border/20 pt-3">
                    <span>Source: {insight.source}</span>
                    <span>{new Date(insight.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'memory' && (
            <div className="relative border-l border-border/30 pl-6 ml-4">
              {memoryTimeline.map((item, index) => (
                <div key={item.id} className="mb-8 relative">
                  {/* Timeline node */}
                  <div className="absolute w-4 h-4 bg-background-soft border-2 border-primary rounded-full -left-8 top-1"></div>
                  
                  {/* Timeline content */}
                  <div className="card-glow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        item.type === 'search' ? 'bg-primary/20 text-primary' :
                        item.type === 'campaign' ? 'bg-success/20 text-success' :
                        item.type === 'message' ? 'bg-warning/20 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{item.description}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(item.date).toLocaleString()}
                    </div>
                    
                    {item.relatedItems.length > 0 && (
                      <div className="border-t border-border/20 pt-3 mt-3">
                        <p className="text-xs text-muted-foreground mb-1">Related items:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedItems.map((relatedItem, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-background text-muted-foreground">
                              {relatedItem}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'chat' && (
            <div className="h-full">
              <StrategyChat />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
