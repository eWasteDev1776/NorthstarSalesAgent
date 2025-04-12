import { useState } from 'react';
import Layout from '../components/Layout';
import LeadForm from '../components/LeadForm';
import AgentLogFeed from '../components/AgentLogFeed';

/**
 * Home / Lead Search Page
 * This is the main entry point for users to search for leads
 */
export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  
  return (
    <Layout title="Find Leads - Northstar">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Find Leads</h1>
          <p className="text-muted-foreground">
            Tell Northstar what leads you're looking for in plain English
          </p>
        </div>
        
        <div className="flex flex-col flex-1 space-y-8">
          {/* Lead search form */}
          <div className="mb-6">
            <LeadForm />
          </div>
          
          {/* Agent log feed */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Agent Activity</h2>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View Full Log
              </button>
            </div>
            <div className="h-[calc(100%-3rem)]">
              <AgentLogFeed />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
