import { useState } from 'react';
import Layout from '../components/Layout';

/**
 * Settings Page
 * Allows users to configure application settings and preferences
 */
export default function SettingsPage() {
  // Mock settings data
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      leadNotifications: true,
      weeklyDigest: true,
      desktopNotifications: false,
    },
    appearance: {
      theme: 'dark',
      compactMode: false,
      showAgentPanel: true,
    },
    apiSettings: {
      openaiApiKey: '••••••••••••••••••••••••••••••',
      phantombusterApiKey: '••••••••••••••••••••••••',
      scraperApiKey: '•••••••••••••••••••',
    },
    automation: {
      autoFollowUp: true,
      followUpDays: 3,
      maxFollowUps: 2,
      autoEnrichLeads: true,
    },
    dataManagement: {
      retentionPeriod: '1 year',
      allowAnonymousAnalytics: true,
      exportFormat: 'CSV',
    }
  });

  // Toggle switch handler
  const toggleSetting = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  return (
    <Layout title="Settings - Northstar">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your application preferences and account settings
          </p>
        </div>

        <div className="grid gap-8">
          {/* Notifications */}
          <div className="card-glow">
            <h2 className="text-xl font-semibold mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive important notifications via email</p>
                </div>
                <button 
                  onClick={() => toggleSetting('notifications', 'emailAlerts')}
                  className={`w-12 h-6 rounded-full relative ${settings.notifications.emailAlerts ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`absolute w-5 h-5 rounded-full bg-foreground top-0.5 transition-all ${settings.notifications.emailAlerts ? 'left-6.5' : 'left-0.5'}`}></span>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Lead Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified when new leads are found</p>
                </div>
                <button 
                  onClick={() => toggleSetting('notifications', 'leadNotifications')}
                  className={`w-12 h-6 rounded-full relative ${settings.notifications.leadNotifications ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`absolute w-5 h-5 rounded-full bg-foreground top-0.5 transition-all ${settings.notifications.leadNotifications ? 'left-6.5' : 'left-0.5'}`}></span>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Weekly Digest</p>
                  <p className="text-sm text-muted-foreground">Receive a weekly summary of activities and results</p>
                </div>
                <button 
                  onClick={() => toggleSetting('notifications', 'weeklyDigest')}
                  className={`w-12 h-6 rounded-full relative ${settings.notifications.weeklyDigest ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`absolute w-5 h-5 rounded-full bg-foreground top-0.5 transition-all ${settings.notifications.weeklyDigest ? 'left-6.5' : 'left-0.5'}`}></span>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Desktop Notifications</p>
                  <p className="text-sm text-muted-foreground">Show desktop notifications</p>
                </div>
                <button 
                  onClick={() => toggleSetting('notifications', 'desktopNotifications')}
                  className={`w-12 h-6 rounded-full relative ${settings.notifications.desktopNotifications ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`absolute w-5 h-5 rounded-full bg-foreground top-0.5 transition-all ${settings.notifications.desktopNotifications ? 'left-6.5' : 'left-0.5'}`}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="card-glow">
            <h2 className="text-xl font-semibold mb-6">Appearance</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Theme</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSettings(prev => ({ ...prev, appearance: { ...prev.appearance, theme: 'dark' } }))}
                    className={`p-4 rounded-md flex flex-col items-center gap-2 ${settings.appearance.theme === 'dark' ? 'bg-background-soft ring-2 ring-primary' : 'bg-background hover:bg-background-soft'}`}
                  >
                    <div className="w-12 h-12 rounded-md bg-background-soft border border-border flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                    </div>
                    <span className="text-sm">Dark</span>
                  </button>

                  <button
                    onClick={() => setSettings(prev => ({ ...prev, appearance: { ...prev.appearance, theme: 'light' } }))}
                    className={`p-4 rounded-md flex flex-col items-center gap-2 ${settings.appearance.theme === 'light' ? 'bg-background-soft ring-2 ring-primary' : 'bg-background hover:bg-background-soft'}`}
                  >
                    <div className="w-12 h-12 rounded-md bg-muted border border-border flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                    </div>
                    <span className="text-sm">Light</span>
                  </button>

                  <button
                    onClick={() => setSettings(prev => ({ ...prev, appearance: { ...prev.appearance, theme: 'system' } }))}
                    className={`p-4 rounded-md flex flex-col items-center gap-2 ${settings.appearance.theme === 'system' ? 'bg-background-soft ring-2 ring-primary' : 'bg-background hover:bg-background-soft'}`}
                  >
                    <div className="w-12 h-12 rounded-md bg-background-soft border border-border flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <span className="text-sm">System</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Compact Mode</p>
                  <p className="text-sm text-muted-foreground">Use a more condensed layout</p>
                </div>
                <button 
                  onClick={() => toggleSetting('appearance', 'compactMode')}
                  className={`w-12 h-6 rounded-full relative ${settings.appearance.compactMode ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`absolute w-5 h-5 rounded-full bg-foreground top-0.5 transition-all ${settings.appearance.compactMode ? 'left-6.5' : 'left-0.5'}`}></span>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Show Agent Panel</p>
                  <p className="text-sm text-muted-foreground">Display the agent info panel on pages</p>
                </div>
                <button 
                  onClick={() => toggleSetting('appearance', 'showAgentPanel')}
                  className={`w-12 h-6 rounded-full relative ${settings.appearance.showAgentPanel ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`absolute w-5 h-5 rounded-full bg-foreground top-0.5 transition-all ${settings.appearance.showAgentPanel ? 'left-6.5' : 'left-0.5'}`}></span>
                </button>
              </div>
            </div>
          </div>

          {/* API Settings */}
          <div className="card-glow">
            <h2 className="text-xl font-semibold mb-6">API Integration</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">OpenAI API Key</p>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    value={settings.apiSettings.openaiApiKey}
                    onChange={(e) => setSettings(prev => ({ ...prev, apiSettings: { ...prev.apiSettings, openaiApiKey: e.target.value } }))}
                    className="bg-background rounded-md py-2 px-3 w-full"
                  />
                  <button className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md">Update</button>
                </div>
              </div>

              <div>
                <p className="font-medium mb-1">PhantomBuster API Key</p>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    value={settings.apiSettings.phantombusterApiKey}
                    onChange={(e) => setSettings(prev => ({ ...prev, apiSettings: { ...prev.apiSettings, phantombusterApiKey: e.target.value } }))}
                    className="bg-background rounded-md py-2 px-3 w-full"
                  />
                  <button className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md">Update</button>
                </div>
              </div>

              <div>
                <p className="font-medium mb-1">Scraper API Key</p>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    value={settings.apiSettings.scraperApiKey}
                    onChange={(e) => setSettings(prev => ({ ...prev, apiSettings: { ...prev.apiSettings, scraperApiKey: e.target.value } }))}
                    className="bg-background rounded-md py-2 px-3 w-full"
                  />
                  <button className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md">Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 