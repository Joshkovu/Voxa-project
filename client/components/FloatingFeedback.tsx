import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { MessageSquare, Send, X } from "lucide-react";
// import { useLanguage } from "@/lib/translations";
declare global {
  interface Window {
    botpressWebChat: any
  }
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
declare module '@botpress/webchat' {
  export interface configuration {
    botId?: string;
    hostUrl?: string;
    messagingUrl?: string;
    themeColor?: string;
    footer?: string;
    allowFileUpload?: boolean;
    // Add other optional props as needed
  }
  export function WebChat(props: {
    clientId: string;
    configuration?: configuration;
  }): JSX.Element;
}
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";
// import Chat from "@/pages/Chat"; // Ensure this import is correct
// import { Link } from "react-router-dom";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        location?: string;
        'project-id'?: string;
        'agent-id'?: string;
        'language-code'?: string;
        'max-query-length'?: string | number;
      };
      'df-messenger-chat-bubble': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'chat-title'?: string;
      }
    }
  }
}

import React from 'react';
import { Webchat } from '@botpress/webchat';

const clientId = "e33a2677-47f1-4a5b-98a6-828cfce7e2de";

const FloatingFeedback = () => {
  const messengerRef = useRef<HTMLDivElement>(null);
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
const originalWarn = console.warn;
useEffect(() => {
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Support for defaultProps')) {
      return; // Suppress only the defaultProps warning
    }
    originalWarn(...args);
  };
  return () => {
    console.warn = originalWarn; // Restore original on unmount
  };
}, []);
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    script1.defer = true;

    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/07/16/06/20250716061755-ZJ8ECWPW.js";
    script2.defer = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        
      
        <div
          style={{
            display: isWebchatOpen ? 'block' : 'none',
            position: 'fixed',
            bottom: '70px',
            right: '16px',
            zIndex: 998,
          }}
        >
          <Webchat
            clientId={clientId}
            
          />
        </div>
      </div>
    </>
  );
};

export default FloatingFeedback;