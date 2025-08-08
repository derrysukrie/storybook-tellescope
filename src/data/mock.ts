import type { IMessage } from "../Molecules";

// Sample message templates for generating varied content
const sampleTexts = [
  "Hello! How can I help you today?",
  "That's a great question! Let me explain...",
  "I understand your concern. Here's what I found...",
  "Thanks for reaching out! Here's the information you requested.",
  "Perfect! I've processed your request and here are the results.",
  "That's interesting! Let me share some insights with you.",
  "I see what you mean. Here's a solution that might help.",
  "Great question! Here's what you need to know...",
  "I've analyzed your request and here's my recommendation.",
  "Thanks for the update! I'll process this information.",
  "That's a valid point. Let me provide some context...",
  "I appreciate your patience. Here's the latest update.",
  "Excellent question! Here's a detailed explanation...",
  "I understand the situation. Let me help you with this.",
  "That's a good observation. Here's what I think...",
  "Thanks for sharing! Here's my response to your message.",
  "I see the issue. Let me provide a solution...",
  "That's a complex topic. Let me break it down for you.",
  "I appreciate your input. Here's my perspective...",
  "Great feedback! Here's what I can tell you...",
];

const sampleAvatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
];

const sampleReactions = [
  { icon: "👍", count: Math.floor(Math.random() * 5) + 1 },
  { icon: "❤️", count: Math.floor(Math.random() * 3) + 1 },
  { icon: "🎉", count: Math.floor(Math.random() * 4) + 1 },
  { icon: "🔥", count: Math.floor(Math.random() * 2) + 1 },
  { icon: "📚", count: Math.floor(Math.random() * 3) + 1 },
  { icon: "💡", count: Math.floor(Math.random() * 2) + 1 },
  { icon: "✅", count: Math.floor(Math.random() * 4) + 1 },
  { icon: "🎯", count: Math.floor(Math.random() * 3) + 1 },
  { icon: "👀", count: Math.floor(Math.random() * 2) + 1 },
  { icon: "🤔", count: Math.floor(Math.random() * 2) + 1 },
  { icon: "🚀", count: Math.floor(Math.random() * 3) + 1 },
  { icon: "⚡", count: Math.floor(Math.random() * 2) + 1 },
];

const sampleImages = [
  { fileName: "document.pdf", url: "https://picsum.photos/300/400" },
  { fileName: "diagram.png", url: "https://picsum.photos/500/300" },
  { fileName: "screenshot.jpg", url: "https://picsum.photos/400/300" },
  { fileName: "chart.svg", url: "https://picsum.photos/600/400" },
  { fileName: "presentation.pptx", url: "https://picsum.photos/350/250" },
];

const sampleLinks = [
  "https://docs.example.com/guide",
  "https://help.example.com/solution",
  "https://resources.example.com/tutorial",
  "https://support.example.com/faq",
  "https://community.example.com/discussion",
];

// Function to generate 200 sample messages
export const generateSampleMessages = (count: number = 200): IMessage[] => {
  const messages: IMessage[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const isOutgoing = i % 3 === 0; // 33% outgoing messages
    const messageType = isOutgoing ? "OUTGOING" : "INCOMING";
    const timeOffset = (count - i) * 60000; // 1 minute intervals going backwards
    
    const message: IMessage = {
      id: `msg-${i}`,
      type: messageType,
      text: sampleTexts[i % sampleTexts.length],
      avatar: isOutgoing 
        ? "https://avatar.iran.liara.run/public"
        : sampleAvatars[i % sampleAvatars.length],
      createdAt: new Date(now.getTime() - timeOffset),
      isTranslated: Math.random() > 0.7, // 30% translated
      role: isOutgoing ? "User" : undefined,
    };

    // Add random features to some messages
    if (Math.random() > 0.6) {
      message.reactions = [sampleReactions[Math.floor(Math.random() * sampleReactions.length)]];
    }
    
    if (Math.random() > 0.8) {
      message.image = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    }
    
    if (Math.random() > 0.85) {
      message.link = sampleLinks[Math.floor(Math.random() * sampleLinks.length)];
    }
    
    if (Math.random() > 0.9) {
      message.scheduledTime = new Date(now.getTime() + Math.random() * 24 * 60 * 60 * 1000);
    }

    if (Math.random() > 0.95) {
      message.failedTime = new Date(now.getTime() + Math.random() * 24 * 60 * 60 * 1000);
    }

    messages.push(message);
  }
  
  return messages.reverse(); // Reverse to show oldest first
};

export const mockMessages: IMessage[] = generateSampleMessages(200);
