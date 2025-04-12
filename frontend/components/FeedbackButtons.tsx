import { useState } from 'react';
import { api } from '../utils/api';

interface FeedbackButtonsProps {
  itemId: string;
  itemType: 'message' | 'lead' | 'search';
  onFeedback?: (feedback: 'up' | 'down', id: string) => void;
}

/**
 * Feedback Buttons Component
 * Allows users to give thumbs up/down feedback on messages, leads, or searches
 * Used by the agent to learn and improve over time
 */
export default function FeedbackButtons({
  itemId,
  itemType,
  onFeedback,
}: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHoveringUp, setIsHoveringUp] = useState(false);
  const [isHoveringDown, setIsHoveringDown] = useState(false);

  // Submit feedback handler
  const submitFeedback = async (value: 'up' | 'down') => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call the API
      // const response = await api.feedback.submit({
      //   itemId,
      //   itemType,
      //   value
      // });
      
      // For demo, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setFeedback(value);
      
      // Call callback if provided
      if (onFeedback) {
        onFeedback(value, itemId);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Button animations
  const getThumbUpClasses = () => {
    if (feedback === 'up') {
      return 'text-success scale-110';
    }
    if (isHoveringUp) {
      return 'scale-110 text-primary';
    }
    if (feedback === 'down') {
      return 'text-muted-foreground opacity-50';
    }
    return 'text-muted-foreground hover:text-primary';
  };

  const getThumbDownClasses = () => {
    if (feedback === 'down') {
      return 'text-destructive scale-110';
    }
    if (isHoveringDown) {
      return 'scale-110 text-destructive';
    }
    if (feedback === 'up') {
      return 'text-muted-foreground opacity-50';
    }
    return 'text-muted-foreground hover:text-destructive';
  };

  return (
    <div className="flex space-x-2">
      {/* Thumbs up button */}
      <button
        onClick={() => submitFeedback('up')}
        onMouseEnter={() => setIsHoveringUp(true)}
        onMouseLeave={() => setIsHoveringUp(false)}
        disabled={isSubmitting}
        aria-label="Thumbs up"
        className={`
          p-1.5 rounded-lg transition-all duration-200
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          ${feedback === 'up' ? 'bg-success/10' : 'hover:bg-success/10'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 transition-all duration-200 ${getThumbUpClasses()}`}
        >
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
      </button>

      {/* Thumbs down button */}
      <button
        onClick={() => submitFeedback('down')}
        onMouseEnter={() => setIsHoveringDown(true)}
        onMouseLeave={() => setIsHoveringDown(false)}
        disabled={isSubmitting}
        aria-label="Thumbs down"
        className={`
          p-1.5 rounded-lg transition-all duration-200
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          ${feedback === 'down' ? 'bg-destructive/10' : 'hover:bg-destructive/10'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 transition-all duration-200 ${getThumbDownClasses()}`}
        >
          <path d="M17 14V2" />
          <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
        </svg>
      </button>
    </div>
  );
}
