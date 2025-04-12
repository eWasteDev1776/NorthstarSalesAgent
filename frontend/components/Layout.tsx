import { ReactNode } from 'react';
import Head from 'next/head';
import Navigation from './Navigation';
import AgentPanel from './AgentPanel';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  showAgentPanel?: boolean;
};

/**
 * Main layout component for all pages
 * Includes navigation sidebar, header, and optionally the agent panel
 */
export default function Layout({ 
  children, 
  title = 'Northstar AI Sales Agent',
  showAgentPanel = true
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Northstar AI-powered lead generation and sales agent" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="flex min-h-screen bg-background">
        {/* Sidebar navigation */}
        <div className="fixed h-screen p-4">
          <Navigation />
        </div>

        {/* Main content area */}
        <div className="flex flex-1 flex-col ml-72">
          <header className="flex justify-between items-center p-6 border-b border-border/10">
            <div>
              <h1 className="text-2xl font-semibold">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Placeholder for user menu */}
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-medium">JS</span>
              </div>
            </div>
          </header>

          <main className="flex flex-1 p-6">
            {/* Main content */}
            <div className={`flex flex-col flex-1 ${showAgentPanel ? 'mr-80' : ''}`}>
              {children}
            </div>

            {/* Agent panel - conditionally rendered */}
            {showAgentPanel && (
              <div className="fixed right-4 top-20 bottom-4 w-72">
                <AgentPanel />
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
