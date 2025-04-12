import { useState, useRef, useEffect } from 'react';

interface Campaign {
  id: string;
  name: string;
}

interface CampaignDropdownProps {
  campaigns: Campaign[];
  selectedCampaign: string | null;
  onSelectCampaign: (campaignId: string | null) => void;
  onCreateCampaign?: (name: string) => void;
}

/**
 * Campaign Dropdown Component
 * Displays a dropdown for selecting or creating campaigns
 */
export default function CampaignDropdown({
  campaigns,
  selectedCampaign,
  onSelectCampaign,
  onCreateCampaign,
}: CampaignDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get the selected campaign name
  const selectedCampaignName = selectedCampaign
    ? campaigns.find(c => c.id === selectedCampaign)?.name || 'Select Campaign'
    : 'All Campaigns';

  // Focus input when creating new campaign
  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreating(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle creation of new campaign
  const handleCreateCampaign = () => {
    if (newCampaignName.trim() && onCreateCampaign) {
      onCreateCampaign(newCampaignName.trim());
      setNewCampaignName('');
      setIsCreating(false);
    }
  };

  // Handle pressing Enter when creating campaign
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateCampaign();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-background hover:bg-background-soft transition-colors border border-border"
      >
        <span className="text-sm">{selectedCampaignName}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 rounded-lg bg-background-soft border border-border shadow-glow overflow-hidden z-10">
          <div className="max-h-64 overflow-y-auto">
            {/* All campaigns option */}
            <button
              className={`w-full px-4 py-2 text-left text-sm hover:bg-background transition-colors ${
                selectedCampaign === null ? 'bg-primary/10 text-primary' : ''
              }`}
              onClick={() => {
                onSelectCampaign(null);
                setIsOpen(false);
              }}
            >
              All Campaigns
            </button>

            {/* Divider */}
            <div className="border-t border-border/10 my-1"></div>

            {/* Campaign list */}
            {campaigns.map((campaign) => (
              <button
                key={campaign.id}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-background transition-colors ${
                  selectedCampaign === campaign.id ? 'bg-primary/10 text-primary' : ''
                }`}
                onClick={() => {
                  onSelectCampaign(campaign.id);
                  setIsOpen(false);
                }}
              >
                {campaign.name}
              </button>
            ))}

            {/* Create new campaign */}
            {isCreating ? (
              <div className="px-4 py-2">
                <div className="flex">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Campaign name..."
                    className="flex-1 px-2 py-1 text-sm rounded-l-md bg-background border-y border-l border-border outline-none"
                  />
                  <button
                    onClick={handleCreateCampaign}
                    className="px-2 py-1 text-xs rounded-r-md bg-primary text-primary-foreground border border-primary"
                  >
                    Create
                  </button>
                </div>
                <button
                  onClick={() => setIsCreating(false)}
                  className="w-full text-xs text-muted-foreground mt-1 hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-background transition-colors flex items-center"
                onClick={() => setIsCreating(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Create New Campaign
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
