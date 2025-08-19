import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  Mic,
  Globe,
  Zap,
  CheckCircle,
  Users,
  MessageSquare,
  Send,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage, languages } from "@/lib/translations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [userFeedbacks, setUserFeedbacks] = useState<
    Array<{
      id: string;
      name: string;
      message: string;
      timestamp: Date;
      language: string;
    }>
  >([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const { t, currentLanguage } = useLanguage();

  const features = [
    {
      icon: MessageCircle,
      title: t("features.aiConversations.title"),
      description: t("features.aiConversations.desc"),
    },
    {
      icon: Globe,
      title: t("features.multilingual.title"),
      description: t("features.multilingual.desc"),
    },
    {
      icon: Mic,
      title: t("features.voice.title"),
      description: t("features.voice.desc"),
    },
    {
      icon: Zap,
      title: t("features.instant.title"),
      description: t("features.instant.desc"),
    },
  ];

  const benefits = [
    t("benefits.available24"),
    t("benefits.accurate"),
    t("benefits.multiLang"),
    t("benefits.voiceText"),
    t("benefits.secure"),
    t("benefits.free"),
  ];

  const stats = [
    {
      number: questionsAnswered.toLocaleString() + "+",
      label: t("stats.questionsAnswered"),
    },
    {
      number: languages.length.toString(),
      label: t("stats.languagesSupported"),
    },
    { number: "24/7", label: t("stats.alwaysAvailable") },
    { number: "100%", label: t("stats.freeToUse") },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Load feedback from localStorage and calculate stats on component mount
  useEffect(() => {
    const savedFeedback = localStorage.getItem("voxa-user-feedback");
    if (savedFeedback) {
      try {
        const feedbacks = JSON.parse(savedFeedback).map((fb: any) => ({
          ...fb,
          timestamp: new Date(fb.timestamp),
        }));
        setUserFeedbacks(feedbacks);
      } catch (error) {
        console.error("Error loading saved feedback:", error);
      }
    }

    // Calculate dynamic questions answered based on chats and feedback
    const savedChats = localStorage.getItem("voxa-chat-messages");
    const chatCount = savedChats ? JSON.parse(savedChats).length || 0 : 0;
    const feedbackCount = userFeedbacks.length || 0;
    const baseCount = 1247; // Starting base number
    setQuestionsAnswered(baseCount + chatCount + feedbackCount);
  }, [userFeedbacks.length]);

  // Listen for new feedback submissions from floating button
  useEffect(() => {
    const handleNewFeedback = (event: CustomEvent) => {
      const newFeedback = event.detail;
      setUserFeedbacks((prev) => {
        const updated = [newFeedback, ...prev.slice(0, 4)];
        localStorage.setItem("voxa-user-feedback", JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener(
      "voxa-feedback-submitted",
      handleNewFeedback as EventListener,
    );
    return () => {
      window.removeEventListener(
        "voxa-feedback-submitted",
        handleNewFeedback as EventListener,
      );
    };
  }, []);

  // Set text direction for Arabic
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
      console.log("Feedback submitted:", {
        ...feedbackForm,
        language: currentLanguage,
        timestamp: new Date().toISOString(),
      });

      // Add the feedback to the Real User Experience section
      const newFeedback = {
        id: Date.now().toString(),
        name: feedbackForm.name || "Anonymous User",
        message: feedbackForm.message,
        timestamp: new Date(),
        language: currentLanguage,
      };

      setUserFeedbacks((prev) => {
        const updated = [newFeedback, ...prev.slice(0, 4)];
        localStorage.setItem("voxa-user-feedback", JSON.stringify(updated));
        return updated;
      });

      // Dispatch event for other components listening
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
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-100 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-200 rounded-full opacity-30 animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`space-y-8 transition-all duration-1000 transform ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : `${isRTL ? "translate-x-10" : "-translate-x-10"} opacity-0`
              }`}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  <span>{t("home.hero.badge")}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                  {t("home.hero.title")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">
                    Voxa
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
                  {t("home.hero.subtitle")}
                </p>
              </div>

              {/* <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-lg px-8 py-4 bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {t("home.hero.startChatting")}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div> */}

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{t("home.hero.alwaysFree")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{t("home.hero.noRegistration")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{t("home.hero.multilingual")}</span>
                </div>
              </div>
            </div>

            {/* Right Content - Animated Feature Showcase */}
            <div
              className={`relative transition-all duration-1000 transform delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : `${isRTL ? "-translate-x-10" : "translate-x-10"} opacity-0`
              }`}
            >
              <div className="relative">
                {/* Chat Interface Preview */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 border">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Voxa</div>
                      <div className="text-sm text-green-600">
                        {t("chat.online")}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 h-64 overflow-hidden">
                    {/* Sample Messages */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">{t("chat.welcomeMessage")}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-primary text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">
                          {currentLanguage === "ar"
                            ? "كيف أحسب ضريبة PAYE؟"
                            : currentLanguage === "fr"
                              ? "Comment calculer ma taxe PAYE?"
                              : currentLanguage === "sw"
                                ? "Ninawezaje kukokotoa kodi yangu ya PAYE?"
                                : currentLanguage === "lug"
                                  ? "Nkola ntya okubala PAYE yange?"
                                  : "How do I calculate my PAYE tax?"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">
                          {currentLanguage === "ar"
                            ? "سأساعدك في حساب ضريبة PAYE! ضريبة PAYE في أوغندا لها شرائح ضريبية مختلفة..."
                            : currentLanguage === "fr"
                              ? "Je vais vous aider à calculer votre taxe PAYE! Le PAYE en Ouganda a différentes tranches d'imposition..."
                              : currentLanguage === "sw"
                                ? "Nitakusaidia kukokotoa kodi yako ya PAYE! PAYE huko Uganda ina viwango vya kodi tofauti..."
                                : currentLanguage === "lug"
                                  ? "Njakuyamba okubala PAYE yo! PAYE mu Uganda erina emiwendo gy'omusolo egitali gimu..."
                                  : "I'll help you calculate your PAYE tax! PAYE in Uganda has different tax brackets..."}
                        </p>
                      </div>
                    </div>

                    {/* Animated typing indicator */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                      <span className="text-gray-500 text-sm">
                        {t("chat.typePlaceholder")}
                      </span>
                    </div>
                    <Button size="sm" className="rounded-full">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Floating Feature Cards */}
                <div
                  className={`absolute -top-4 ${isRTL ? "-left-4" : "-right-4"} animate-float`}
                >
                  <div className="bg-white rounded-lg shadow-lg p-3 border">
                    <Globe className="h-6 w-6 text-primary mx-auto mb-1" />
                    <div className="text-xs font-medium text-center">
                      {languages.length} {t("nav.language").toLowerCase()}
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute -bottom-4 ${isRTL ? "-right-4" : "-left-4"} animate-float delay-1000`}
                >
                  <div className="bg-white rounded-lg shadow-lg p-3 border">
                    <Zap className="h-6 w-6 text-green-500 mx-auto mb-1" />
                    <div className="text-xs font-medium text-center">
                      Instant AI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 delay-${
                  index * 100
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("features.whyChoose")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`transition-all duration-500 hover:shadow-xl hover:scale-105 ${
                    currentFeature === index
                      ? "ring-2 ring-primary shadow-lg"
                      : ""
                  }`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t("benefits.title")}
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Real User Experience
                    </div>
                    <div className="text-sm text-gray-500">
                      {userFeedbacks.length > 0
                        ? `${userFeedbacks.length + 2} user testimonials`
                        : "Accessible to everyone"}
                    </div>
                  </div>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {/* Display submitted user feedback first */}
                  {userFeedbacks.map((feedback, index) => (
                    <div
                      key={feedback.id}
                      className={`p-4 rounded-lg ${
                        index % 3 === 0
                          ? "bg-green-50"
                          : index % 3 === 1
                            ? "bg-blue-50"
                            : "bg-purple-50"
                      } animate-in slide-in-from-top duration-500`}
                    >
                      <p className="text-sm text-gray-700 italic">
                        \"{feedback.message}\"
                      </p>
                      <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                        <span>- {feedback.name}</span>
                        <span className="text-xs text-gray-400">
                          {feedback.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      {index === 0 && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            ✨ Latest feedback
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Default testimonials */}
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-700 italic">
                      {currentLanguage === "lug"
                        ? "\"Voxa yanjinyizza okutegeerera obuvunaanyizibwa bwange obw'omusolo mu Luganda. Kiri nga ndi ne mukugu w'omusolo mu nsawo yange!\""
                        : currentLanguage === "sw"
                          ? '"Voxa amenisaidia kuelewa majukumu yangu ya kodi kwa Kiswahili. Ni kama kuwa na mtaalamu wa kodi mfukoni mwangu!"'
                          : '"Voxa helped me understand my tax obligations in Luganda. It\'s like having a tax expert in my pocket!"'}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      - Sarah,{" "}
                      {currentLanguage === "lug"
                        ? "Nyini Bizinensi Ntono"
                        : currentLanguage === "sw"
                          ? "Mmiliki Biashara Ndogo"
                          : "Small Business Owner"}
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700 italic">
                      {currentLanguage === "lug"
                        ? '"Ekimu ky\'eddoboozi kyewuunyisa. Nsobola okubuuza ebibuuzo nga nvuga emmotoka okugenda ku mulimu."'
                        : currentLanguage === "sw"
                          ? '"Kipengele cha sauti ni cha ajabu. Ninaweza kuuliza maswali nikiendesha gari kwenda kazini."'
                          : '"The voice feature is amazing. I can ask questions while driving to work."'}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      - James,{" "}
                      {currentLanguage === "lug"
                        ? "Omukozi"
                        : currentLanguage === "sw"
                          ? "Mfanyakazi"
                          : "Employee"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("feedback.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {t("feedback.subtitle")}
            </p>
          </div>

          {/* Feedback Button and Dialog */}
          <Dialog
            open={showFeedbackDialog}
            onOpenChange={setShowFeedbackDialog}
          >
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary transition-all duration-300 transform hover:scale-105"
              >
                <MessageSquare className="h-5 w-5 mr-2 " />
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
                  <Label htmlFor="feedback-name">{t("feedback.name")}</Label>
                  <Input
                    id="feedback-name"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleFeedbackInputChange}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-email">{t("feedback.email")}</Label>
                  <Input
                    id="feedback-email"
                    name="email"
                    type="email"
                    value={feedbackForm.email}
                    onChange={handleFeedbackInputChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-message">
                    {t("feedback.message")} *
                  </Label>
                  <Textarea
                    id="feedback-message"
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

          {/* Quick Feedback Options */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => {
                setFeedbackForm((prev) => ({
                  ...prev,
                  message:
                    "I love using Voxa for my tax questions! It's very helpful.",
                }));
                setShowFeedbackDialog(true);
              }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Great Experience
              </h3>
              <p className="text-gray-600 text-sm">
                Share what you love about Voxa
              </p>
            </div>

            <div
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => {
                setFeedbackForm((prev) => ({
                  ...prev,
                  message: "I would like to suggest a new feature for Voxa...",
                }));
                setShowFeedbackDialog(true);
              }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Feature Request
              </h3>
              <p className="text-gray-600 text-sm">
                Suggest new features or improvements
              </p>
            </div>

            <div
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => {
                setFeedbackForm((prev) => ({
                  ...prev,
                  message: "I encountered an issue with Voxa...",
                }));
                setShowFeedbackDialog(true);
              }}
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Report Issue</h3>
              <p className="text-gray-600 text-sm">
                Let us know about any problems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t("cta.ready")}
          </h2>
          <p className="text-xl text-green-100 mb-8">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link to="/chat">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100 transform hover:scale-105 transition-all"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {t("cta.askTaxes")}
              </Button>
            </Link> */}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes slideInFromTop {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation: slideInFromTop 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
