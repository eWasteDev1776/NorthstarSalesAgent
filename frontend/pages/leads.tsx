import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LeadTable from '../components/LeadTable';
import MessagePreview from '../components/MessagePreview';
import CampaignDropdown from '../components/CampaignDropdown';
import { api } from '../utils/api';

/**
 * Lead Queue Page
 * Displays all leads with filtering, sorting, and messaging capabilities
 */
export default function LeadsPage() {
  // Mock lead data for demo purposes
  const [leads, setLeads] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'TechFlow Solutions',
      email: 'sarah@techflow.io',
      phone: '(555) 123-4567',
      website: 'https://techflow.io',
      tags: ['tech', 'saas', 'warm'],
      confidenceScore: 92,
      description: 'Software development agency specializing in B2B solutions',
      lastTouched: '2023-06-15T10:30:00Z',
      status: 'new',
      source: 'linkedin',
    },
    {
      id: '2',
      name: 'Miguel Hernandez',
      company: 'Bright Fitness',
      email: 'miguel@brightfitness.com',
      phone: '(555) 234-5678',
      website: 'https://brightfitness.com',
      tags: ['fitness', 'boutique', 'hot'],
      confidenceScore: 87,
      description: 'Boutique fitness studio with small classes and personalized training',
      lastTouched: '2023-06-14T14:15:00Z',
      status: 'contacted',
      source: 'scraperapi',
    },
    {
      id: '3',
      name: 'Emily Chen',
      company: 'GrowthMarket',
      email: 'emily@growthmarket.co',
      phone: null,
      website: 'https://growthmarket.co',
      tags: ['marketing', 'agency', 'cold'],
      confidenceScore: 72,
      description: 'Marketing agency focusing on startup growth',
      lastTouched: null,
      status: 'new',
      source: 'linkedin',
    },
    {
      id: '4',
      name: 'David Williams',
      company: 'Craft Coffee Co.',
      email: null,
      phone: '(555) 345-6789',
      website: 'https://craftcoffeeco.com',
      tags: ['coffee', 'retail', 'cold'],
      confidenceScore: 63,
      description: 'Independent coffee shop with three locations',
      lastTouched: null,
      status: 'new',
      source: 'scraperapi',
    },
    {
      id: '5',
      name: 'Alex Rivera',
      company: 'DataViz Pro',
      email: 'alex@datavizpro.com',
      phone: '(555) 456-7890',
      website: 'https://datavizpro.com',
      tags: ['data', 'analytics', 'warm'],
      confidenceScore: 81,
      description: 'Data visualization and analytics consultancy',
      lastTouched: '2023-06-12T09:45:00Z',
      status: 'responded',
      source: 'linkedin',
    },
  ]);
  
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState([
    { id: '1', name: 'Tech Companies Q2' },
    { id: '2', name: 'Local Businesses' },
    { id: '3', name: 'New Campaign' },
  ]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  
  // Select first lead by default
  useEffect(() => {
    if (leads.length > 0 && !selectedLeadId) {
      setSelectedLeadId(leads[0].id);
    }
  }, [leads, selectedLeadId]);
  
  // Get the selected lead
  const selectedLead = leads.find(lead => lead.id === selectedLeadId);
  
  return (
    <Layout title="Lead Queue - Northstar">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lead Queue</h1>
            <p className="text-muted-foreground">
              Manage and message your discovered leads
            </p>
          </div>
          
          {/* Campaign selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Campaign:</span>
            <CampaignDropdown
              campaigns={campaigns}
              selectedCampaign={selectedCampaign}
              onSelectCampaign={setSelectedCampaign}
            />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 flex-1">
          {/* Lead table */}
          <div className="lg:w-3/5">
            <LeadTable
              leads={leads}
              selectedLeadId={selectedLeadId}
              onSelectLead={(lead) => setSelectedLeadId(lead.id)}
            />
          </div>
          
          {/* Message preview */}
          <div className="lg:w-2/5 h-full">
            {selectedLead ? (
              <MessagePreview
                leadId={selectedLead.id}
                leadName={selectedLead.name}
                onSave={(message) => {
                  console.log('Message saved:', message);
                }}
              />
            ) : (
              <div className="rounded-2xl bg-background-soft p-6 h-full flex items-center justify-center">
                <p className="text-muted-foreground">Select a lead to view or generate a message</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
