import { useState, useRef, useEffect } from 'react';
import { api } from '../utils/api';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

/**
 * Strategy Chat Component
 * Allows conversational interaction with the agent about strategy and insights
 */
export default function StrategyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: "Hi there! I'm your Northstar sales assistant. How can I help with your sales strategy today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Example strategic questions for quick selection
  const exampleQuestions = [
    "What's my best performing message template?",
    "How can I improve my response rate?",
    "Which industries should I focus on next week?",
    "What are the common traits of my high-value leads?",
  ];

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Handle sending a message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim() || isTyping) return;
    
    // Add user message to the chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // For demo, simulate backend API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate a response based on the question
      let responseContent = '';
      const query = userMessage.content.toLowerCase();
      
      if (query.includes('best performing') || query.includes('template')) {
        responseContent = "Based on your campaign data, your 'Pain Point Solution' template has the highest response rate at 12.8%. It works particularly well with tech companies and focuses on addressing specific pain points with concrete examples.";
      } 
      else if (query.includes('improve') || query.includes('response rate')) {
        responseContent = "To improve your response rate, I recommend:\n\n1. Shortening your messages by 20-30%\n2. Including a specific, personalized detail in the first sentence\n3. Testing questions in your subject lines\n4. Following up 3-4 days after initial contact\n\nWould you like me to help you implement any of these strategies?";
      }
      else if (query.includes('industry') || query.includes('focus')) {
        responseContent = "Looking at your lead data, I recommend focusing on SaaS companies in the 20-100 employee range next week. They've shown a 2.3x higher conversion rate than other segments. Healthcare technology might also be worth exploring - although your dataset there is smaller, initial results are promising.";
      }
      else if (query.includes('trait') || query.includes('high-value')) {
        responseContent = "The common traits among your high-value leads are:\n\n• Companies with 20-200 employees\n• B2B SaaS or service businesses\n• Recently raised funding or launched new products\n• Technical decision-makers (CTOs, VP Engineering)\n\nI've tagged your lead queue with these attributes for easier targeting.";
      }
      else if (query.includes('email') || query.includes('subject line')) {
        responseContent = "Your most effective subject lines are short (4-7 words) and include either:\n\n1. A specific question about the prospect's business\n2. A reference to a recent company announcement\n\nFor example, \"Question about [Company]'s recent launch\" has a 34% open rate, compared to the industry average of 21%.";
      }
      else if (query.includes('best time') || query.includes('when')) {
        responseContent = "Based on your historical data, Tuesday and Wednesday mornings (8-10am) show the highest engagement rates for initial outreach. For follow-ups, Thursday afternoons have worked well. I'd avoid Friday afternoons and Monday mornings, which show 30% lower response rates.";
      }
      else if (query.includes('competitor') || query.includes('competition')) {
        responseContent = "I've analyzed mentions of competitors in your lead conversations. The most frequently mentioned alternatives are:\n\n1. TechSales Pro (32% of mentions)\n2. LeadGenius (24%)\n3. SalesAI (18%)\n\nThe main differentiators cited are pricing structure and integration capabilities.";
      }
      else {
        responseContent = "That's a great question. Based on the data we have, I can see that your outreach is performing above industry average, particularly with customized messages addressing specific pain points. Would you like me to analyze any particular aspect of your strategy in more detail?";
      }
      
      // Add agent response
      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        role: 'agent',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'agent',
          content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle pressing Enter to send (but allow Shift+Enter for new lines)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl bg-background-soft overflow-hidden shadow-glow">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background'
                }`}
              >
                <div className="text-sm whitespace-pre-line">{message.content}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {/* Show typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-background rounded-2xl px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element to help with scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Example questions */}
      <div className="px-4 py-2 border-t border-border/10 flex space-x-2 overflow-x-auto">
        {exampleQuestions.map((question, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(question);
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            className="px-3 py-1.5 bg-background rounded-lg text-xs whitespace-nowrap hover:bg-background-soft transition-colors"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Message input */}
      <div className="border-t border-border/10 p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="flex-1 bg-background rounded-lg overflow-hidden">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your strategy or campaign results..."
              className="w-full resize-none py-3 px-4 bg-transparent outline-none text-foreground min-h-[45px] max-h-[150px]"
              rows={1}
              disabled={isTyping}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`
              flex-shrink-0 rounded-lg p-3 transition-colors
              ${
                !input.trim() || isTyping
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary-accent'
              }
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
              className="w-5 h-5"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
