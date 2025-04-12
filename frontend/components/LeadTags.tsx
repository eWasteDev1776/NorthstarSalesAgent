import { useState } from 'react';

interface LeadTagsProps {
  tags: string[];
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
  editable?: boolean;
  maxVisible?: number;
}

/**
 * Lead Tags Component
 * Displays tags as rounded pills with color-coding
 * Supports adding and removing tags if editable
 */
export default function LeadTags({
  tags = [],
  onAddTag,
  onRemoveTag,
  editable = false,
  maxVisible = 3,
}: LeadTagsProps) {
  const [showAll, setShowAll] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Display tags - either all or limited number with a "+X more" indicator
  const displayTags = showAll ? tags : tags.slice(0, maxVisible);
  const hasMoreTags = !showAll && tags.length > maxVisible;

  // Get color class for tag based on content
  const getTagColorClass = (tag: string) => {
    // Common tag types with appropriate colors
    const tagTypes: Record<string, string> = {
      cold: 'tag-cold',
      warm: 'tag-warm',
      hot: 'tag-hot',
      important: 'bg-destructive/20 text-destructive',
      follow: 'bg-primary/20 text-primary',
      'follow-up': 'bg-primary/20 text-primary',
      prospect: 'bg-success/20 text-success',
      lead: 'bg-success/20 text-success',
      customer: 'bg-success/40 text-success',
      new: 'bg-muted text-muted-foreground',
    };

    // Check if the tag matches any of our predefined types
    for (const [key, value] of Object.entries(tagTypes)) {
      if (tag.toLowerCase().includes(key)) {
        return value;
      }
    }

    // Default tag style
    return 'bg-secondary text-secondary-foreground';
  };

  // Handle adding a new tag
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && onAddTag) {
      onAddTag(newTag.trim());
      setNewTag('');
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {/* Display tags */}
      {displayTags.map((tag) => (
        <div
          key={tag}
          className={`tag ${getTagColorClass(tag)} ${editable ? 'pr-1.5' : ''}`}
        >
          {tag}
          
          {/* Remove button if editable */}
          {editable && onRemoveTag && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveTag(tag);
              }}
              className="ml-1 rounded-full hover:bg-background/30 p-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      ))}

      {/* Show "+X more" button if there are more tags */}
      {hasMoreTags && (
        <button
          onClick={() => setShowAll(true)}
          className="tag bg-background text-muted-foreground hover:bg-background/80"
        >
          +{tags.length - maxVisible} more
        </button>
      )}

      {/* Show "Show less" button if expanded */}
      {showAll && tags.length > maxVisible && (
        <button
          onClick={() => setShowAll(false)}
          className="tag bg-background text-muted-foreground hover:bg-background/80"
        >
          Show less
        </button>
      )}

      {/* Add tag UI if editable */}
      {editable && onAddTag && (
        <>
          {isAdding ? (
            <form onSubmit={handleAddTag} className="inline-flex">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="New tag..."
                className="w-24 text-xs rounded-l-full px-2 py-1 bg-background border-y border-l border-border outline-none"
                autoFocus
                onBlur={() => {
                  if (!newTag.trim()) {
                    setIsAdding(false);
                  }
                }}
              />
              <button
                type="submit"
                className="text-xs rounded-r-full px-2 py-1 bg-primary text-primary-foreground border border-primary"
              >
                Add
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="tag bg-background text-muted-foreground hover:bg-background/80"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add
            </button>
          )}
        </>
      )}
    </div>
  );
}
