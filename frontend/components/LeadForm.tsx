import { useState, useRef, useEffect } from 'react';
import { api } from '../utils/api';

/**
 * Natural Language Input Form for Lead Search
 * Features glowing border, AI icon hint, and animated input
 */
export default function LeadForm() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Example queries to show as placeholders
  const exampleQueries = [
    'Find boutique gyms in Nashville that offer small classes',
    'Find SaaS companies in Toronto with 50-200 employees',
    'Find marketing agencies in London specializing in social media',
    'Find independent coffee shops in Austin that roast their own beans',
  ];

  // Auto-rotate example queries
  useEffect(() => {
    const interval = setInterval(() => {
      setExampleIndex((current) => (current + 1) % exampleQueries.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-adjust textarea height
  const adjustHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call the API and handle the response
      // const response = await api.leads.search(query);
      
      // For demo, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Search query:', query);
      
      // After success, you'd typically:
      // 1. Show results
      // 2. Navigate to results page
      // 3. Or trigger a callback passed as prop
      
    } catch (error) {
      console.error('Error searching for leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div
          className={`
            relative rounded-2xl transition-all duration-300 bg-background-soft
            ${isActive ? 'shadow-glow ring-2 ring-primary/50' : 'ring-1 ring-border/30 hover:ring-border/70'}
          `}
        >
          {/* AI Assistant Icon */}
          <div className="absolute left-5 top-5">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}
              transition-all duration-300
            `}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
            </div>
          </div>

          {/* Input Field */}
          <textarea
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            placeholder={`${exampleQueries[exampleIndex]}...`}
            className="w-full min-h-[60px] pr-5 pt-5 pl-16 pb-5 bg-transparent text-foreground placeholder:text-muted-foreground/60 rounded-2xl resize-none outline-none"
            rows={1}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`
              absolute right-4 bottom-4 rounded-xl px-4 py-2 font-medium
              transition-all duration-200 hover:scale-105 active:scale-95
              ${isLoading ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'}
              ${!query.trim() ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}
            `}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching
              </span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {/* Help text */}
      <p className="text-sm text-muted-foreground mt-3 text-center">
        Describe what leads you're looking for in plain English
      </p>

      {/* Examples */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Try asking for:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleQueries.map((example, i) => (
            <button
              key={i}
              className="text-left p-3 rounded-xl bg-background-soft border border-border/30 hover:border-primary/30 hover:bg-background transition-all duration-200 text-sm"
              onClick={() => {
                setQuery(example);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
