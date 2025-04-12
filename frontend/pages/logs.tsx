import { useState } from 'react';
import Layout from '../components/Layout';
import AgentLogFeed from '../components/AgentLogFeed';

/**
 * Agent Log Page
 * Full-page view of agent activity logs
 */
export default function LogsPage() {
  return (
    <Layout title="Agent Log - Northstar" showAgentPanel={false}>
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Agent Log</h1>
          <p className="text-muted-foreground">
            View real-time activity from your Northstar AI agent
          </p>
        </div>
        
        <div className="h-[calc(100%-6rem)]">
          <AgentLogFeed />
        </div>
      </div>
    </Layout>
  );
} 