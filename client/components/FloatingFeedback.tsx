import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { MessageSquare, Send, X } from "lucide-react";
// import { useLanguage } from "@/lib/translations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
const FloatingFeedback = () => {
  const messengerRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //     const link = document.createElement('link');
  //     link.rel = 'stylesheet';
  //     link.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
  //     document.head.appendChild(link);
  
  //     const script = document.createElement('script');
  //     script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
  //     script.async = true;
  //     document.body.appendChild(script);
  // }, []);
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://www.gstatic.com/dialogflow-console/v1/df-messenger-bundle.js'; // Use the latest version
  //   script.async = true;
  //   script.onload = () => {
  //     if (messengerRef.current) {
  //       // Ensure the component is initialized after script load
  //       const messenger = messengerRef.current.querySelector('df-messenger');
  //       if (messenger) {
  //         // Optional: Add a small delay to ensure initialization
  //         setTimeout(() => {
  //           // Log to debug if the method exists
  //           console.log('Messenger initialized:', messenger);
  //         }, 1000);
  //       }
  //     }
  //   };
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  // const [feedbackForm, setFeedbackForm] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });
  // const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  // const { t, currentLanguage } = useLanguage();

  // const isRTL = currentLanguage === "ar";

  // const handleFeedbackSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!feedbackForm.message.trim()) {
  //     toast.error("Please enter your feedback message");
  //     return;
  //   }

  //   setIsSubmittingFeedback(true);

  //   try {
  //     // Simulate API call - replace with actual endpoint
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     // Here you would normally send to your backend
  //     // Create feedback object
  //     const newFeedback = {
  //       id: Date.now().toString(),
  //       name: feedbackForm.name || "Anonymous User",
  //       message: feedbackForm.message,
  //       timestamp: new Date(),
  //       language: currentLanguage,
  //       page: window.location.pathname,
  //     };

  //     console.log("Feedback submitted:", newFeedback);

  //     // Save to localStorage and dispatch event
  //     const savedFeedback = localStorage.getItem("voxa-user-feedback");
  //     let feedbacks = [];
  //     if (savedFeedback) {
  //       try {
  //         feedbacks = JSON.parse(savedFeedback);
  //       } catch (error) {
  //         console.error("Error parsing saved feedback:", error);
  //       }
  //     }

  //     const updatedFeedbacks = [newFeedback, ...feedbacks.slice(0, 4)];
  //     localStorage.setItem(
  //       "voxa-user-feedback",
  //       JSON.stringify(updatedFeedbacks),
  //     );

  //     // Dispatch event so Home page can update immediately
  //     window.dispatchEvent(
  //       new CustomEvent("voxa-feedback-submitted", { detail: newFeedback }),
  //     );

  //     toast.success(t("feedback.success"));
  //     setFeedbackForm({ name: "", email: "", message: "" });
  //     setShowFeedbackDialog(false);
  //   } catch (error) {
  //     toast.error(t("feedback.error"));
  //   } finally {
  //     setIsSubmittingFeedback(false);
  //   }
  // };

  // const handleFeedbackInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = e.target;
  //   setFeedbackForm((prev) => ({ ...prev, [name]: value }));
  // };

  return (
    <>
      <div className="mr-19">
      {/* Floating Feedback Button */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        
        {/* <df-messenger
        location="eu"
        project-id="tax-assistant-469117"
        agent-id="07d2fbc5-b94d-44e6-a9b7-a895b89b375c"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="tax-chatbot"></df-messenger-chat-bubble>
      </df-messenger>

      <style>
 {`
          df-messenger {
         z-index: 999;
    position: fixed;
            bottom: 16px;
            right: 16px;
            --df-messenger-font-color: #000;
            --df-messenger-font-family: Google Sans;
            --df-messenger-chat-background: #f3f6fc;
            --df-messenger-message-user-background: #d3e3fd;
            --df-messenger-message-bot-background: #fff;
          }
        `}
      </style> */}
        <iframe
  src="/bot.html"
  width="350"
  height="830"
  style={{ border: 'none', position: 'fixed', bottom: '16px', right: '16px', zIndex: 999 }}
></iframe>

        
        </Dialog>
        </div>
    </>
  );
};

export default FloatingFeedback;
