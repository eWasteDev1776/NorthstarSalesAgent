import { useState, useRef, useEffect } from 'react';
import FeedbackButtons from './FeedbackButtons';
import { api } from '../utils/api';

interface MessagePreviewProps {
  leadId: string;
  leadName: string;
  initialMessage?: string;
  onSave?: (message: string) => void;
}

/**
 * Message Preview Component
 * Displays AI-generated cold outreach and allows for editing
 */
export default function MessagePreview({
  leadId,
  leadName,
  initialMessage,
  onSave,
}: MessagePreviewProps) {
  const [message, setMessage] = useState(initialMessage || '');
  const [isLoading, setIsLoading] = useState(!initialMessage);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [generatingStatus, setGeneratingStatus] = useState<'idle' | 'generating' | 'completed' | 'failed'>(!initialMessage ? 'generating' : 'completed');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simulate message generation when no initial message
  useEffect(() => {
    if (!initialMessage && generatingStatus === 'generating') {
      const generateFakeMessage = async () => {
        setIsLoading(true);
        
        try {
          // Fake message generation with delay to simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const template = `Hi ${leadName},

I hope this message finds you well. I'm reaching out because I noticed your company's impressive work in the industry.

Our AI-powered lead generation tool Northstar has been helping businesses like yours find high-quality leads with 40% better conversion rates. I'd love to show you how it could work for your specific use case.

Would you be open to a quick 15-minute call next week to discuss how we might be able to help scale your outreach efforts?

Best regards,
[Your Name]
[Your Company]`;

          setMessage(template);
          setGeneratingStatus('completed');
          
          // In a real app, this would be:
          // const response = await api.messages.generate(leadId);
          // if (response.data) {
          //   setMessage(response.data.message);
          //   setGeneratingStatus('completed');
          // }
        } catch (e) {
          console.error('Error generating message:', e);
          setError('Failed to generate message. Please try again.');
          setGeneratingStatus('failed');
        } finally {
          setIsLoading(false);
        }
      };
      
      generateFakeMessage();
    }
  }, [initialMessage, leadId, leadName, generatingStatus]);

  // Handle text area resize when editing
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, message]);

  // Handle edit save
  const handleSave = () => {
    if (onSave) {
      onSave(message);
    }
    setIsEditing(false);
  };

  // Regenerate message
  const handleRegenerate = async () => {
    setIsLoading(true);
    setGeneratingStatus('generating');
    
    try {
      // In a real app:
      // const response = await api.messages.generate(leadId);
      // if (response.data) {
      //   setMessage(response.data.message);
      // }
      
      // For demo, just add a slight variation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const variations = [
        `Hello ${leadName},

I came across your company recently and was impressed by what you're doing in your space.

At our company, we've built Northstar - an AI sales agent that's helping businesses increase their sales pipeline by 35% through automated lead discovery and personalized outreach.

I'd love to share a quick demo specifically relevant to your industry. Are you available for a brief call this week?

Best,
[Your Name]
[Your Company]`,
        `Dear ${leadName},

I hope your week is going well! I'm reaching out because I believe our AI sales tool Northstar could add significant value to your lead generation process.

We've recently helped companies in your industry increase qualified leads by 40% while reducing manual prospecting time by 70%.

Would you be interested in seeing how this might work for your specific needs? I'm happy to schedule a short demo at your convenience.

Warm regards,
[Your Name]
[Your Company]`,
      ];
      
      // Pick a random variation that's different from current
      let newMessage = message;
      while (newMessage === message) {
        newMessage = variations[Math.floor(Math.random() * variations.length)];
      }
      
      setMessage(newMessage);
      setGeneratingStatus('completed');
    } catch (e) {
      console.error('Error regenerating message:', e);
      setError('Failed to regenerate message. Please try again.');
      setGeneratingStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="rounded-2xl bg-background-soft p-6 h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Message Preview</h3>
        </div>
        <div className="bg-destructive/10 text-destructive p-4 rounded-xl">
          <p>{error}</p>
          <button
            onClick={() => {
              setError('');
              setGeneratingStatus('generating');
            }}
            className="mt-2 px-3 py-1 bg-background text-foreground rounded-lg text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-background-soft p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Message Preview</h3>
        
        <div className="flex space-x-2">
          {/* Edit/Save toggle */}
          {!isLoading && (
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="text-xs flex items-center px-2 py-1 rounded-lg bg-background hover:bg-background-soft transition-colors"
            >
              {isEditing ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  Edit
                </>
              )}
            </button>
          )}
          
          {/* Regenerate button */}
          {!isLoading && !isEditing && (
            <button
              onClick={handleRegenerate}
              className="text-xs flex items-center px-2 py-1 rounded-lg bg-background hover:bg-background-soft transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                <path d="M21 12a9 9 0 0 1-9 9" />
                <path d="M3 12a9 9 0 0 1 9-9" />
                <path d="m17 7 4 5-4 5" />
                <path d="m7 7-4 5 4 5" />
              </svg>
              Regenerate
            </button>
          )}
        </div>
      </div>
      
      {/* Message content */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <div className="flex space-x-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-sm">Generating message...</p>
          </div>
        ) : isEditing ? (
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-full min-h-[200px] p-4 bg-background rounded-xl outline-none resize-none text-foreground"
          />
        ) : (
          <div className="bg-background rounded-xl p-4 whitespace-pre-line text-foreground">
            {message}
          </div>
        )}
      </div>
      
      {/* Feedback section */}
      {!isLoading && !isEditing && (
        <div className="pt-4 mt-4 border-t border-border/20">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">How's this message?</span>
            <FeedbackButtons itemId={leadId} itemType="message" />
          </div>
        </div>
      )}
      
      {/* Action buttons */}
      {!isLoading && !isEditing && (
        <div className="flex space-x-3 mt-4">
          <button className="btn btn-primary flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
              <path d="m3 3 3 9-3 9 19-9Z" />
              <path d="M13 13h8" />
            </svg>
            Send Message
          </button>
          <button className="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <line x1="16" y1="8" x2="8" y2="8" />
              <line x1="16" y1="12" x2="8" y2="12" />
              <line x1="16" y1="16" x2="8" y2="16" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Save/cancel buttons when editing */}
      {isEditing && (
        <div className="flex space-x-3 mt-4">
          <button onClick={handleSave} className="btn btn-primary flex-1">Save Changes</button>
          <button onClick={() => setIsEditing(false)} className="btn btn-secondary flex-1">Cancel</button>
        </div>
      )}
    </div>
  );
}
