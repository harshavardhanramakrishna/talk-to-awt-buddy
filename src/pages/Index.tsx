
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  content: string;
  isBot: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! Before we start chatting, please enter your name and email.", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!isRegistered) {
      if (!userName) {
        setUserName(input);
        setMessages(prev => [...prev, 
          { content: input, isBot: false },
          { content: "Great! Now please enter your email.", isBot: true }
        ]);
      } else if (!userEmail) {
        setUserEmail(input);
        setMessages(prev => [...prev, 
          { content: input, isBot: false },
          { content: `Thanks ${userName}! How can I assist you today?`, isBot: true }
        ]);
        setIsRegistered(true);
      }
    } else {
      // Add user message
      setMessages(prev => [...prev, { content: input, isBot: false }]);
      
      // Simulate bot response (replace with actual API call)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          content: "This is a simulated response. Replace this with actual bot logic from your Python code.",
          isBot: true
        }]);
      }, 1000);
    }
    
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex flex-col">
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        <div className="bg-white rounded-lg shadow-sm flex-1 flex flex-col">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.isBot 
                      ? 'bg-[#F3F3F7] text-gray-800' 
                      : 'bg-[#E7F8FF] text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isRegistered ? "Type your message..." : "Enter your details..."}
                className="flex-1"
              />
              <Button type="submit" className="bg-[#9b87f5] hover:bg-[#8b77e5]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
