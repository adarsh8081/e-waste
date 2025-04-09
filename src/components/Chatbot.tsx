import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { IconBaseProps } from 'react-icons/lib';
import { FaRobot, FaPaperPlane, FaMicrophone, FaStop, FaExpand, FaCompress, FaRegCopy, FaRegTrashAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
  isLoading?: boolean;
  codeBlocks?: Array<{ language: string; code: string }>;
}

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ChatWindow = styled(motion.div)<{ isMaximized: boolean }>`
  position: ${props => props.isMaximized ? 'fixed' : 'absolute'};
  bottom: ${props => props.isMaximized ? '0' : '80px'};
  right: ${props => props.isMaximized ? '0' : '0'};
  width: ${props => props.isMaximized ? '100%' : '400px'};
  height: ${props => props.isMaximized ? '100%' : '600px'};
  background: #1f2937;
  border-radius: ${props => props.isMaximized ? '0' : '12px'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1001;
`;

const ChatHeader = styled.div`
  padding: 16px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #111827;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1f2937;
  }

  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 4px;
  }
`;

const MessageGroup = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  max-width: 85%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled(motion.div)<{ isUser: boolean; isError?: boolean }>`
  padding: 16px;
  border-radius: 12px;
  background: ${props => props.isError ? '#ef4444' : props.isUser ? props.theme.colors.primary : '#374151'};
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;

  code {
    font-family: 'Fira Code', monospace;
    background: rgba(0, 0, 0, 0.2);
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  pre {
    margin: 8px 0;
    padding: 12px;
    background: #1a1a1a;
    border-radius: 8px;
    overflow-x: auto;
  }
`;

const MessageActions = styled(motion.div)`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;

  ${MessageGroup}:hover & {
    opacity: 1;
  }
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 4px;
`;

const InputContainer = styled.div`
  padding: 16px;
  background: #1f2937;
  display: flex;
  gap: 8px;
  border-top: 1px solid #374151;
  position: relative;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 12px;
  padding-right: 40px;
  min-height: 24px;
  max-height: 200px;
  border: 1px solid #374151;
  border-radius: 12px;
  background: #111827;
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;
  resize: none;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: #6B7280;
  }
`;

const BaseButton = styled.button`
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;

const IconButton = styled(BaseButton)`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary};
  color: white;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const ActionButton = styled(BaseButton)`
  width: 32px;
  height: 32px;
  background: transparent;
  color: #9ca3af;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const MaximizeButton = styled(IconButton)`
  margin-left: auto;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LoadingDots = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  span {
    width: 4px;
    height: 4px;
    background: currentColor;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  }
`;

interface IconWrapperProps {
  Icon: IconType;
  size?: number;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ Icon, size }) => {
  const IconComponent = Icon as React.ComponentType<IconBaseProps>;
  return <IconComponent size={size} />;
};

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: any;
  [key: string]: any;
}

const CodeBlock: React.FC<CodeProps> = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      {...props}
      style={vscDarkPlus as { [key: string]: React.CSSProperties }}
      language={match[1]}
      PreTag="div"
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show success feedback
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    if (inputRef.current) {
      inputRef.current.style.height = 'inherit';
    }

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      
      setIsTyping(false);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement speech recognition
  };

  return (
    <ChatbotContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.5 }}
            isMaximized={isMaximized}
          >
            <ChatHeader>
              <HeaderLeft>
                <IconWrapper Icon={FaRobot} size={24} />
                <ChatTitle>E-Waste Assistant</ChatTitle>
              </HeaderLeft>
              <HeaderActions>
                <ActionButton onClick={() => setMessages([])}>
                  <IconWrapper Icon={FaRegTrashAlt} size={16} />
                </ActionButton>
                <MaximizeButton onClick={() => setIsMaximized(!isMaximized)}>
                  <IconWrapper Icon={isMaximized ? FaCompress : FaExpand} />
                </MaximizeButton>
              </HeaderActions>
            </ChatHeader>
            <MessagesContainer>
              {messages.map((message) => (
                <MessageGroup key={message.id} isUser={message.isUser}>
                  <MessageBubble
                    isUser={message.isUser}
                    isError={message.isError}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ReactMarkdown
                      components={{
                        code: CodeBlock as any
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </MessageBubble>
                  <MessageActions>
                    <ActionButton onClick={() => copyToClipboard(message.text)}>
                      <IconWrapper Icon={FaRegCopy} size={14} />
                    </ActionButton>
                    <ActionButton onClick={() => deleteMessage(message.id)}>
                      <IconWrapper Icon={FaRegTrashAlt} size={14} />
                    </ActionButton>
                  </MessageActions>
                  <Timestamp>{format(message.timestamp, 'h:mm a')}</Timestamp>
                </MessageGroup>
              ))}
              {isTyping && (
                <MessageGroup isUser={false}>
                  <MessageBubble isUser={false}>
                    <LoadingDots>
                      <span></span>
                      <span></span>
                      <span></span>
                    </LoadingDots>
                  </MessageBubble>
                </MessageGroup>
              )}
              <div ref={messagesEndRef} />
            </MessagesContainer>
            <InputContainer>
              <Input
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Send a message..."
                rows={1}
              />
              <IconButton onClick={toggleRecording}>
                <IconWrapper Icon={isRecording ? FaStop : FaMicrophone} />
              </IconButton>
              <IconButton 
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
              >
                <IconWrapper Icon={FaPaperPlane} />
              </IconButton>
            </InputContainer>
          </ChatWindow>
        )}
      </AnimatePresence>
      <ChatButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconWrapper Icon={FaRobot} />
      </ChatButton>
    </ChatbotContainer>
  );
};

export default Chatbot; 