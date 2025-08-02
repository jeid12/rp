'use client';

import { useState, useRef, useEffect } from 'react';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '👋 **Welcome! I\'m your AI Career Advisor**\n\nI\'m here to help you discover amazing opportunities! I can assist you with:\n\n• **Scholarships** - Academic funding opportunities\n• **Internships** - Professional experience programs  \n• **Jobs** - Career opportunities across industries\n• **Research** - Academic and industry research positions\n\n**Try asking me:**\n- "Find computer science scholarships"\n- "Show me remote job opportunities"\n- "What internships are available in marketing?"\n\nWhat would you like to explore today? 🚀',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomePulse, setShowWelcomePulse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Hide welcome pulse after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePulse(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Check if it's a greeting or casual conversation
      const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'how are you', 'what\'s up'];
      const isGreeting = greetings.some(greeting => 
        currentQuery.toLowerCase().includes(greeting) && currentQuery.length < 20
      );

      if (isGreeting) {
        const greetingResponses = [
          "Hi there! 👋 I'm your AI career advisor. I'm here to help you find amazing opportunities like scholarships, internships, and jobs. What kind of opportunities are you looking for today?",
          "Hello! 😊 Great to meet you! I specialize in helping people find career opportunities. Whether you're looking for scholarships, internships, or job openings, I'm here to help. What interests you?",
          "Hey! 🌟 I'm excited to help you discover your next opportunity. I can search for scholarships, jobs, internships, and more. What field or type of opportunity are you interested in?"
        ];
        
        const randomResponse = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
        
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: randomResponse,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      // For other queries, use the search API
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ 
          query: currentQuery,
          timestamp: new Date().getTime()
        }),
      });

      const data = await response.json();
      
      let botContent = data.answer || data.error || 'Sorry, I couldn\'t find any relevant information.';
      
      // Add helpful follow-up suggestions if it's a search result
      if (data.answer && !data.error) {
        botContent += '\n\n💡 **Want to explore more?**\n- Try being more specific about your field of interest\n- Ask about deadlines or requirements\n- Browse all opportunities in the main page';
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: '😅 Oops! I encountered a technical issue. Please try asking your question again, or feel free to browse opportunities directly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMaximized) setIsMaximized(false);
  };

  const formatMessage = (content) => {
    // Enhanced markdown-like formatting with link detection
    let formatted = content
      // Convert URLs to clickable links
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium">🔗 View Opportunity</a>')
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      // Headers
      .replace(/### (.*?)(\n|$)/g, '<h3 class="text-lg font-bold text-gray-900 mt-4 mb-2 border-l-4 border-blue-500 pl-3">$1</h3>')
      .replace(/## (.*?)(\n|$)/g, '<h2 class="text-xl font-bold text-gray-900 mt-4 mb-3">$1</h2>')
      // List items with better styling
      .replace(/- \*\*(.*?)\*\*/g, '<li class="ml-4 mb-2 flex items-start"><span class="text-blue-500 mr-2 font-bold">•</span><strong class="font-semibold">$1</strong>')
      .replace(/- (.*?)(\n|$)/g, '<li class="ml-4 mb-1 flex items-start"><span class="text-blue-500 mr-2">•</span><span>$1</span></li>')
      // Email links
      .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="text-blue-600 hover:text-blue-800 underline font-medium">$1</a>')
      // Line breaks
      .split('\n').join('<br/>');

    // Wrap lists in ul tags
    if (formatted.includes('<li class=')) {
      formatted = formatted.replace(/(<li class="[^"]*">.*?<\/li>)/gs, '<ul class="space-y-1 my-2">$1</ul>');
    }

    return formatted;
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        {/* Welcome pulse animation */}
        {showWelcomePulse && (
          <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping opacity-30"></div>
        )}
        <button
          onClick={() => {
            setIsOpen(true);
            setShowWelcomePulse(false);
          }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group border-2 border-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
          <svg className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div className="absolute -top-14 right-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden sm:block shadow-lg">
            <div className="font-medium">AI Career Assistant</div>
            <div className="text-xs text-gray-300">Click to start chatting! 💬</div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      </div>
    );
  }

  // Chat interface with maximize/minimize functionality
  const getChatContainerClass = () => {
    if (isMaximized) {
      return "fixed inset-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200";
    }
    if (isMinimized) {
      return "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-80 sm:w-96 h-16 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200";
    }
    return "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-80 sm:w-96 h-96 sm:h-[36rem] bg-white rounded-2xl shadow-2xl z-50 border border-gray-200";
  };

  return (
    <div className={getChatContainerClass()}>
      {/* Header with enhanced controls */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white p-3 sm:p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 animate-pulse"></div>
        
        <div className="flex items-center space-x-3 relative z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center">
              Career AI Assistant
              <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </h3>
            <p className="text-xs text-white/90 flex items-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
              Online & Ready
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2 relative z-10">
          {/* Minimize button */}
          <button
            onClick={toggleMinimize}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 group"
            title="Minimize"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          {/* Maximize/Restore button */}
          <button
            onClick={toggleMaximize}
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 group"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
              </svg>
            ) : (
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
          
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 group"
            title="Close"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Show only header when minimized */}
      {isMinimized && (
        <div className="flex-1 flex items-center justify-center p-2">
          <button
            onClick={() => setIsMinimized(false)}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>Click to restore chat</span>
          </button>
        </div>
      )}

      {/* Messages - only show when not minimized */}
      {!isMinimized && (
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isMaximized ? 'h-[calc(100vh-180px)]' : 'h-64 sm:h-80'}`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} ${
                message.type === 'user' ? 'animate-in slide-in-from-right-5 duration-300' : 'animate-in slide-in-from-left-5 duration-300'
              }`}
            >
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2 ml-auto' : 'order-1'}`}>
                {message.type === 'bot' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Career AI</span>
                  </div>
                )}
                
                {message.type === 'user' && (
                  <div className="flex items-center justify-end space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">You</span>
                    <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                <div
                  className={`px-5 py-4 rounded-2xl shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white shadow-xl border-2 border-blue-300/50'
                      : 'bg-white border border-gray-200 text-gray-800'
                  } ${message.type === 'bot' ? 'rounded-tl-md' : 'rounded-tr-md'}`}
                >
                  {message.type === 'user' ? (
                    <div className="leading-relaxed">
                      {/* Enhanced user query visibility */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2 animate-pulse shadow-sm"></div>
                          <span className="text-xs font-bold text-white/95 uppercase tracking-wider">Your Query</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-3 h-3 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span className="text-xs text-white/80 font-medium">High Priority</span>
                        </div>
                      </div>
                      
                      {/* Highlighted query text */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm"></div>
                        <div className="relative font-semibold text-lg bg-gradient-to-r from-white/20 to-white/10 rounded-lg p-4 border border-white/30 backdrop-blur-sm">
                          <div className="flex items-start space-x-2">
                            <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                            <span className="leading-relaxed">&ldquo;{message.content}&rdquo;</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="leading-relaxed prose prose-sm max-w-none text-sm"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  )}
                </div>
                
                <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-right mr-4' : 'ml-8 text-gray-400'}`}>
                  {message.type === 'user' ? (
                    <div className="flex items-center justify-end space-x-2">
                      <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200">
                        <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ) : (
                    message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">Analyzing your query...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input - only show when not minimized */}
      {!isMinimized && (
        <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-b-2xl">
          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setInputMessage('Find computer science scholarships')}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-xs font-medium hover:from-blue-200 hover:to-blue-300 transition-all duration-200 border border-blue-300"
                >
                  💻 CS Scholarships
                </button>
                <button
                  onClick={() => setInputMessage('Show me remote job opportunities')}
                  className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full text-xs font-medium hover:from-green-200 hover:to-green-300 transition-all duration-200 border border-green-300"
                >
                  🏠 Remote Jobs
                </button>
                <button
                  onClick={() => setInputMessage('What internships are available in marketing?')}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full text-xs font-medium hover:from-purple-200 hover:to-purple-300 transition-all duration-200 border border-purple-300"
                >
                  📈 Marketing
                </button>
              </div>
            </div>
          )}
          
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about scholarships, jobs, internships..."
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm font-bold text-black transition-all duration-200 bg-white shadow-sm placeholder:text-gray-400 placeholder:font-normal"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span className="hidden sm:block font-medium">Press Enter to send, Shift+Enter for new line</span>
            <span className="sm:hidden font-medium">Tap to send</span>
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium text-green-600">AI Ready</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
