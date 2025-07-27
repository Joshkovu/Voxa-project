import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send, X } from "lucide-react";
import { useLanguage } from "@/lib/translations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FloatingFeedback = () => {
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const { t, currentLanguage } = useLanguage();

  const isRTL = currentLanguage === "ar";

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.message.trim()) {
      toast.error("Please enter your feedback message");
      return;
    }

    setIsSubmittingFeedback(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would normally send to your backend
      // Create feedback object
      const newFeedback = {
        id: Date.now().toString(),
        name: feedbackForm.name || "Anonymous User",
        message: feedbackForm.message,
        timestamp: new Date(),
        language: currentLanguage,
        page: window.location.pathname,
      };

      console.log("Feedback submitted:", newFeedback);

      // Save to localStorage and dispatch event
      const savedFeedback = localStorage.getItem("voxa-user-feedback");
      let feedbacks = [];
      if (savedFeedback) {
        try {
          feedbacks = JSON.parse(savedFeedback);
        } catch (error) {
          console.error("Error parsing saved feedback:", error);
        }
      }

      const updatedFeedbacks = [newFeedback, ...feedbacks.slice(0, 4)];
      localStorage.setItem(
        "voxa-user-feedback",
        JSON.stringify(updatedFeedbacks),
      );

      // Dispatch event so Home page can update immediately
      window.dispatchEvent(
        new CustomEvent("voxa-feedback-submitted", { detail: newFeedback }),
      );

      toast.success(t("feedback.success"));
      setFeedbackForm({ name: "", email: "", message: "" });
      setShowFeedbackDialog(false);
    } catch (error) {
      toast.error(t("feedback.error"));
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleFeedbackInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFeedbackForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "fixed bottom-6 bg-primary hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 z-50",
              isRTL ? "left-6" : "right-6",
            )}
            size="lg"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            {t("feedback.giveFeedback")}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md" dir={isRTL ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              {t("feedback.title")}
            </DialogTitle>
            <DialogDescription>{t("feedback.subtitle")}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="floating-feedback-name">
                {t("feedback.name")}
              </Label>
              <Input
                id="floating-feedback-name"
                name="name"
                value={feedbackForm.name}
                onChange={handleFeedbackInputChange}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floating-feedback-email">
                {t("feedback.email")}
              </Label>
              <Input
                id="floating-feedback-email"
                name="email"
                type="email"
                value={feedbackForm.email}
                onChange={handleFeedbackInputChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floating-feedback-message">
                {t("feedback.message")} *
              </Label>
              <Textarea
                id="floating-feedback-message"
                name="message"
                value={feedbackForm.message}
                onChange={handleFeedbackInputChange}
                placeholder={t("feedback.placeholder")}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFeedbackDialog(false)}
                className="flex-1"
              >
                {t("feedback.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmittingFeedback}
                className="flex-1"
              >
                {isSubmittingFeedback ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t("feedback.sending")}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {t("feedback.submit")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingFeedback;
