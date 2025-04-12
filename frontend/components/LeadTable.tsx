import { useState, useMemo } from 'react';
import LeadTags from './LeadTags';
import { api } from '../utils/api';

// Type definitions for leads
interface Lead {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  tags: string[];
  confidenceScore: number;
  description?: string;
  lastTouched?: string;
  status: 'new' | 'contacted' | 'responded' | 'qualified' | 'disqualified';
  source: string;
}

interface LeadTableProps {
  leads: Lead[];
  onSelectLead?: (lead: Lead) => void;
  selectedLeadId?: string;
}

/**
 * Lead Table Component
 * Displays leads with sorting, filtering, and tagging capabilities
 */
export default function LeadTable({ 
  leads = [], 
  onSelectLead,
  selectedLeadId
}: LeadTableProps) {
  // Sorting state
  const [sortField, setSortField] = useState<keyof Lead>('confidenceScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState<Lead['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle sort header click
  const handleSort = (field: keyof Lead) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filtered and sorted leads
  const filteredAndSortedLeads = useMemo(() => {
    // Apply filters
    let filtered = leads;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead => {
        return (
          lead.name?.toLowerCase().includes(query) ||
          lead.company?.toLowerCase().includes(query) ||
          lead.email?.toLowerCase().includes(query) ||
          lead.tags.some(tag => tag.toLowerCase().includes(query))
        );
      });
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle undefined values
      if (aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
      if (bValue === undefined) return sortDirection === 'asc' ? 1 : -1;
      
      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Handle numeric comparison
      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [leads, sortField, sortDirection, statusFilter, searchQuery]);

  // Render sort indicator
  const renderSortIndicator = (field: keyof Lead) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    );
  };

  // Confidence score color based on value
  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'bg-success text-success-foreground';
    if (score >= 60) return 'bg-primary text-primary-foreground';
    if (score >= 40) return 'bg-warning text-warning-foreground';
    return 'bg-muted text-muted-foreground';
  };

  if (leads.length === 0) {
    return (
      <div className="bg-background-soft rounded-2xl p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto mb-4 text-muted-foreground">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <h3 className="text-xl font-medium mb-2">No leads found</h3>
        <p className="text-muted-foreground mb-4">Start a new search to find potential leads.</p>
        <button className="btn btn-primary">Start Lead Search</button>
      </div>
    );
  }

  return (
    <div className="bg-background-soft rounded-2xl overflow-hidden">
      {/* Table header with filters */}
      <div className="p-4 border-b border-border/20 flex items-center justify-between">
        <h2 className="text-lg font-medium">Leads ({filteredAndSortedLeads.length})</h2>
        
        <div className="flex space-x-3">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-background text-foreground placeholder:text-muted-foreground border border-border text-sm"
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-2.5 top-2 text-muted-foreground">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Lead['status'] | 'all')}
            className="px-3 py-1.5 rounded-lg bg-background text-foreground border border-border text-sm"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="responded">Responded</option>
            <option value="qualified">Qualified</option>
            <option value="disqualified">Disqualified</option>
          </select>
        </div>
      </div>
      
      {/* Table content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background/30">
            <tr>
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name {renderSortIndicator('name')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer"
                onClick={() => handleSort('company')}
              >
                <div className="flex items-center">
                  Company {renderSortIndicator('company')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                Tags
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer"
                onClick={() => handleSort('confidenceScore')}
              >
                <div className="flex items-center">
                  Confidence {renderSortIndicator('confidenceScore')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status {renderSortIndicator('status')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedLeads.map((lead) => (
              <tr 
                key={lead.id}
                onClick={() => onSelectLead && onSelectLead(lead)}
                className={`
                  border-t border-border/10 hover:bg-background/30 transition-colors cursor-pointer
                  ${selectedLeadId === lead.id ? 'bg-primary/5' : ''}
                `}
              >
                <td className="px-4 py-3 text-sm">
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-xs text-muted-foreground">ID: {lead.id.substring(0, 8)}</div>
                </td>
                <td className="px-4 py-3 text-sm">
                  {lead.company || '-'}
                  {lead.website && (
                    <div className="text-xs text-primary hover:underline">
                      <a href={lead.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        Visit website
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  {lead.email && <div>{lead.email}</div>}
                  {lead.phone && <div className="text-xs text-muted-foreground">{lead.phone}</div>}
                  {!lead.email && !lead.phone && '-'}
                </td>
                <td className="px-4 py-3">
                  <LeadTags tags={lead.tags} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getConfidenceColor(lead.confidenceScore)}`}>
                      {lead.confidenceScore}
                    </div>
                    <div className="ml-2 w-12 h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${lead.confidenceScore >= 80 ? 'bg-success' : lead.confidenceScore >= 60 ? 'bg-primary' : lead.confidenceScore >= 40 ? 'bg-warning' : 'bg-muted'}`}
                        style={{ width: `${lead.confidenceScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${lead.status === 'new' ? 'bg-muted text-muted-foreground' : ''}
                    ${lead.status === 'contacted' ? 'bg-primary/20 text-primary' : ''}
                    ${lead.status === 'responded' ? 'bg-success/20 text-success' : ''}
                    ${lead.status === 'qualified' ? 'bg-success text-success-foreground' : ''}
                    ${lead.status === 'disqualified' ? 'bg-destructive/20 text-destructive' : ''}
                  `}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
