import { useState } from 'react';
import Layout from '../components/Layout';

/**
 * Profile Page
 * Allows users to view and manage their profile and company settings
 */
export default function ProfilePage() {
  // Mock profile data
  const [profile, setProfile] = useState({
    company: {
      name: 'Acme Software Solutions',
      website: 'www.acme-software.com',
      logo: '/placeholder-logo.svg',
      industry: 'Software Development',
      size: '20-50 employees',
      founded: '2015',
    },
    user: {
      name: 'Jane Smith',
      email: 'jane@acme-software.com',
      role: 'Sales Director',
      avatarUrl: '',
    },
    product: {
      name: 'Project Management Suite',
      description: 'Enterprise project management software with real-time collaboration features.',
      keyFeatures: [
        'Gantt chart visualization',
        'Resource allocation',
        'Time tracking',
        'Budget management',
        'Client portal',
      ],
      targetIndustries: ['Tech', 'Construction', 'Marketing Agencies', 'Consulting'],
      pricing: 'Starting at $49/month per user',
    },
    salesPreferences: {
      leadCriteria: 'Companies with 50+ employees in tech, marketing, or consulting industries.',
      outreachTone: 'Professional but friendly',
      followUpFrequency: 'Every 3-4 days',
      antiSpamCompliance: true,
      emailSignature: true,
    }
  });

  return (
    <Layout title="Profile - Northstar">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Company Profile</h1>
          <p className="text-muted-foreground">
            Manage your company details and sales preferences
          </p>
        </div>

        <div className="grid gap-8">
          {/* Company Info */}
          <div className="card-glow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Company Information</h2>
              <button className="text-primary hover:text-primary-accent text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Edit
              </button>
            </div>
            
            <div className="flex gap-6">
              <div className="w-24 h-24 rounded-md bg-background-soft flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h10M7 12h10M7 17h10" />
                </svg>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Company Name</p>
                  <p>{profile.company.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Website</p>
                  <p>{profile.company.website}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Industry</p>
                  <p>{profile.company.industry}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Company Size</p>
                  <p>{profile.company.size}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="card-glow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Product Information</h2>
              <button className="text-primary hover:text-primary-accent text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Edit
              </button>
            </div>
            
            <div className="grid gap-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Product Name</p>
                <p>{profile.product.name}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p>{profile.product.description}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Key Features</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.product.keyFeatures.map((feature, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary-foreground px-2 py-0.5 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Target Industries</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.product.targetIndustries.map((industry, i) => (
                    <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sales Preferences */}
          <div className="card-glow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Sales Preferences</h2>
              <button className="text-primary hover:text-primary-accent text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Edit
              </button>
            </div>
            
            <div className="grid gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Lead Criteria</p>
                <p>{profile.salesPreferences.leadCriteria}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Outreach Tone</p>
                <p>{profile.salesPreferences.outreachTone}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Follow-up Frequency</p>
                <p>{profile.salesPreferences.followUpFrequency}</p>
              </div>
              
              <div className="flex gap-8">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${profile.salesPreferences.antiSpamCompliance ? 'bg-success' : 'bg-background'}`}>
                    {profile.salesPreferences.antiSpamCompliance && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">Anti-spam compliance</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${profile.salesPreferences.emailSignature ? 'bg-success' : 'bg-background'}`}>
                    {profile.salesPreferences.emailSignature && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">Include email signature</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
