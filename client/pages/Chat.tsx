import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  MoreVertical,
  Paperclip,
  Smile,
  Phone,
  Video,
  Info,
  Search,
  Archive,
  Pin,
  Star,
  Trash2,
  Download,
  Share2,
  Settings,
  HelpCircle,
  Volume2,
  VolumeX,
  Image,
  FileText,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/translations";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
'use client';

import { useChat } from '@ai-sdk/react';

const Chat = () => {
  const { t, currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

  // Vercel AI SDK hook
 const [input, setInput] = useState('');
  const { messages, status } = useChat();
const isLoading = status === 'streaming' || status === 'submitted';
  // Remove welcomeMessage and allMessages logic
  // Only use aiMessages for chat display
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [showCallInterface, setShowCallInterface] = useState(false);
  const [callStatus, setCallStatus] = useState<"calling" | "connected" | "ended">("calling");
  const [callDuration, setCallDuration] = useState(0);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleExportChat = () => {
    try {
      const chatText = messages
        .map(
          (msg) =>
            `[${formatTime(new Date())}] ${msg.role === "user" ? "You" : "Voxa"}: ${msg.parts}`,
        )
        .join("\n");

      const blob = new Blob([chatText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `voxa-chat-${new Date().toISOString().split("T")[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Chat exported successfully!");
    } catch (error) {
      toast.error("Failed to export chat");
    }
  };

  const handleShareChat = async () => {
    const chatText = messages
      .map((msg) => `${msg.role === "user" ? "You" : "Voxa"}: ${msg.parts}`)
      .join("\n\n");

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Voxa Chat Conversation",
          text: chatText,
        });
        toast.success("Chat shared successfully!");
      } catch (err) {
        await handleCopyToClipboard(chatText);
      }
    } else {
      await handleCopyToClipboard(chatText);
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Chat copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleSearchInChat = () => {
    setShowSearchDialog(true);
  };

  // const handleViewMedia = () => {
  //   const mediaMessages = messages.filter(
  //     (msg) =>
  //       msg.parts.includes("image") ||
  //       msg.parts.includes("file"),
  //   );
  //   if (mediaMessages.length === 0) {
  //     toast.info("No media found in this chat");
  //   } else {
  //     toast.success(`Found ${mediaMessages.length} media item(s)`);
  //   }
  // };

  // const handleViewDocuments = () => {
  //   const docMessages = messages.filter(
  //     (msg) =>
  //       msg.parts.includes("document") ||
  //       msg.parts.includes(".pdf") ||
  //       msg.parts.includes(".doc"),
  //   );
  //   if (docMessages.length === 0) {
  //     toast.info("No documents found in this chat");
  //   } else {
  //     toast.success(`Found ${docMessages.length} document(s)`);
  //   }
  // };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const voiceQuestions = {
          en: "How do I calculate my PAYE tax?",
          lug: "Nkola ntya okubala PAYE yange?",
          ar: "كيف أحسب ضريبة PAYE؟",
          fr: "Comment calculer ma taxe PAYE?",
          sw: "Ninawezaje kukokotoa kodi yangu ya PAYE?",
        };
         setInput(
          voiceQuestions[currentLanguage as keyof typeof voiceQuestions] ||
            voiceQuestions.en
        );
      }, 3000);
    }
  };

  const handleStartCall = () => {
    setShowCallInterface(true);
    setCallStatus("calling");
    setCallDuration(0);

    // Simulate call connecting after 3 seconds
    setTimeout(() => {
      setCallStatus("connected");
      // Start call timer
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }, 3000);
  };

  const handleEndCall = () => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    setCallStatus("ended");
    setTimeout(() => {
      setShowCallInterface(false);
      setCallDuration(0);
      setIsMicMuted(false);
      setIsSpeakerOn(false);
    }, 2000);
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
    const message = isMicMuted
      ? currentLanguage === "en"
        ? "Microphone unmuted"
        : currentLanguage === "lug"
          ? "Mikrofoni egguddwa"
          : currentLanguage === "ar"
            ? "الميكروفون مفعل"
            : currentLanguage === "fr"
              ? "Microphone activé"
              : currentLanguage === "sw"
                ? "Mikrofoni imewashwa"
                : "Microphone unmuted"
      : currentLanguage === "en"
        ? "Microphone muted"
        : currentLanguage === "lug"
          ? "Mikrofoni esiriddwa"
          : currentLanguage === "ar"
            ? "الميكروفون مكتوم"
            : currentLanguage === "fr"
              ? "Microphone coupé"
              : currentLanguage === "sw"
                ? "Mikrofoni imezimwa"
                : "Microphone muted";
    toast.info(message);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    const message = isSpeakerOn
      ? currentLanguage === "en"
        ? "Speaker off"
        : currentLanguage === "lug"
          ? "Sipika ezisiriddwa"
          : currentLanguage === "ar"
            ? "مكبر الصوت مكتوم"
            : currentLanguage === "fr"
              ? "Haut-parleur coupé"
              : currentLanguage === "sw"
                ? "Spika imezimwa"
                : "Speaker off"
      : currentLanguage === "en"
        ? "Speaker on"
        : currentLanguage === "lug"
          ? "Sipika ezigiddwa"
          : currentLanguage === "ar"
            ? "مكبر الصوت مفعل"
            : currentLanguage === "fr"
              ? "Haut-parleur activé"
              : currentLanguage === "sw"
                ? "Spika imewashwa"
                : "Speaker on";
    toast.info(message);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    // If useChat provides a 'append' function, use it to send the message
    if (typeof (useChat as any).append === "function") {
      (useChat as any).append({ content: input });
    }
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100" dir={isRTL ? "rtl" : "ltr"}>
      <Navigation />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 h-[calc(100vh-4rem)]">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1 bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {t("chat.recentChats")}
              </h2>
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Voxa</div>
                  <div className="text-sm text-gray-500">
                    {t("nav.aiTaxAssistant")}
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">Voxa</span>
                    {isPinned && <Pin className="h-4 w-4 text-primary" />}
                    {isStarred && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                    {isMuted && <VolumeX className="h-4 w-4 text-gray-400" />}
                    {isArchived && (
                      <Archive className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                  <div className="text-sm text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {t("chat.online")} • {t("nav.aiTaxAssistant")}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex"
                  onClick={handleStartCall}
                >
                  <Phone className="h-4 w-4" />
                </Button>

                {/* WhatsApp-style dropdown menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{t("chat.options")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsStarred(!isStarred);
                          toast.success(
                            isStarred ? "Chat unstarred" : "Chat starred",
                          );
                        }}
                      >
                        <Star
                          className={cn(
                            "h-4 w-4 mr-2",
                            isStarred && "fill-yellow-400 text-yellow-400",
                          )}
                        />
                        {isStarred ? t("chat.unstarChat") : t("chat.starChat")}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setIsPinned(!isPinned);
                          toast.success(
                            isPinned ? "Chat unpinned" : "Chat pinned",
                          );
                        }}
                      >
                        <Pin
                          className={cn(
                            "h-4 w-4 mr-2",
                            isPinned && "text-primary",
                          )}
                        />
                        {isPinned ? t("chat.unpinChat") : t("chat.pinChat")}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setIsMuted(!isMuted);
                          toast.success(
                            isMuted
                              ? "Notifications unmuted"
                              : "Notifications muted",
                          );
                        }}
                      >
                        {isMuted ? (
                          <Volume2 className="h-4 w-4 mr-2" />
                        ) : (
                          <VolumeX className="h-4 w-4 mr-2" />
                        )}
                        {isMuted
                          ? t("chat.unmuteNotifications")
                          : t("chat.muteNotifications")}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={handleSearchInChat}>
                        <Search className="h-4 w-4 mr-2" />
                        {t("chat.searchInChat")}
                      </DropdownMenuItem>

                      <DropdownMenuItem >
                        <Image className="h-4 w-4 mr-2" />
                        {t("chat.viewMedia")}
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        {t("chat.viewDocuments")}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={handleExportChat}>
                        <Download className="h-4 w-4 mr-2" />
                        {t("chat.exportChat")}
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={handleShareChat}>
                        <Share2 className="h-4 w-4 mr-2" />
                        {t("chat.shareChat")}
                      </DropdownMenuItem>

                      <DropdownMenuItem >
                        <Archive
                          className={cn(
                            "h-4 w-4 mr-2",
                            isArchived && "text-primary",
                          )}
                        />
                        {isArchived
                          ? t("chat.unarchiveChat")
                          : t("chat.archiveChat")}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem >
                        <Settings className="h-4 w-4 mr-2" />
                        {t("chat.chatSettings")}
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <HelpCircle className="h-4 w-4 mr-2" />
                        {t("chat.helpSupport")}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => {
                        window.location.reload();
                        toast.success("Chat cleared successfully!");
                      }}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t("chat.clearChat")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Search Dialog */}
            <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{t("chat.searchInChat")}</DialogTitle>
                  <DialogDescription>
                    Search for messages in your conversation with Voxa
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input
                      id="search"
                      placeholder="Type to search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3"
                    // onClick={() => {
                    //   const results = messages.filter((msg) =>
                    //     msg.parts
                    //       .toLowerCase()
                    //       .includes(searchQuery.toLowerCase()),
                    //   );
                    //   console.log("Search results:", results);
                    //   setShowSearchDialog(false);
                    // }}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* WhatsApp-like Call Interface */}
            {showCallInterface && (
              <div className="fixed inset-0 bg-gradient-to-br from-green-600 to-green-800 z-50 flex flex-col items-center justify-center">
                <div className="text-center text-white space-y-6">
                  {/* Profile Section */}
                  <div className="space-y-4">
                    <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Voxa</h2>
                      <p className="text-green-100">
                        {t("nav.aiTaxAssistant")}
                      </p>
                    </div>
                  </div>

                  {/* Call Status */}
                  <div className="space-y-2">
                    {callStatus === "calling" && (
                      <div className="space-y-4">
                        <p className="text-lg text-green-100">
                          {currentLanguage === "en"
                            ? "Calling..."
                            : currentLanguage === "lug"
                              ? "Nkuba essimu..."
                              : currentLanguage === "ar"
                                ? "جاري الاتصال..."
                                : currentLanguage === "fr"
                                  ? "Appel en cours..."
                                  : currentLanguage === "sw"
                                    ? "Ninapiga simu..."
                                    : "Calling..."}
                        </p>
                        <div className="flex justify-center space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {callStatus === "connected" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <p className="text-lg text-green-100">
                            {currentLanguage === "en"
                              ? "Connected"
                              : currentLanguage === "lug"
                                ? "Nyambiddwa"
                                : currentLanguage === "ar"
                                  ? "متصل"
                                  : currentLanguage === "fr"
                                    ? "Connecté"
                                    : currentLanguage === "sw"
                                      ? "Imeunganishwa"
                                      : "Connected"}
                          </p>
                        </div>
                        <p className="text-xl font-mono">
                          {formatCallDuration(callDuration)}
                        </p>
                      </div>
                    )}
                    {callStatus === "ended" && (
                      <div className="space-y-2">
                        <p className="text-lg text-green-100">
                          {currentLanguage === "en"
                            ? "Call Ended"
                            : currentLanguage === "lug"
                              ? "Essimu Eweddeko"
                              : currentLanguage === "ar"
                                ? "انتهت المكالمة"
                                : currentLanguage === "fr"
                                  ? "Appel Terminé"
                                  : currentLanguage === "sw"
                                    ? "Simu Imeisha"
                                    : "Call Ended"}
                        </p>
                        <p className="text-green-200">
                          {currentLanguage === "en"
                            ? "Duration"
                            : currentLanguage === "lug"
                              ? "Ebbanga"
                              : currentLanguage === "ar"
                                ? "المدة"
                                : currentLanguage === "fr"
                                  ? "Durée"
                                  : currentLanguage === "sw"
                                    ? "Muda"
                                    : "Duration"}
                          : {formatCallDuration(callDuration)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Call Controls */}
                  {callStatus === "connected" && (
                    <div className="flex justify-center space-x-6 mt-12">
                      {/* Mute Button */}
                      <button
                        onClick={toggleMic}
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                          isMicMuted
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-white bg-opacity-20 hover:bg-opacity-30",
                        )}
                      >
                        {isMicMuted ? (
                          <MicOff className="h-8 w-8 text-white" />
                        ) : (
                          <Mic className="h-8 w-8 text-white" />
                        )}
                      </button>

                      {/* Speaker Button */}
                      <button
                        title='speaker'
                        onClick={toggleSpeaker}
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                          isSpeakerOn
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-white bg-opacity-20 hover:bg-opacity-30",
                        )}
                      >
                        <Volume2 className="h-8 w-8 text-white" />
                      </button>
                    </div>
                  )}

                  {/* End Call Button */}
                  {callStatus !== "ended" && (
                    <div className="mt-12">
                      <button
                        title='end call'
                        onClick={handleEndCall}
                        className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all transform hover:scale-105"
                      >
                        <Phone className="h-8 w-8 text-white transform rotate-180" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Background decoration */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-white bg-opacity-5 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-ping"></div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex",
                    message.role === "user"
                      ? isRTL
                        ? "justify-start"
                        : "justify-end"
                      : isRTL
                        ? "justify-end"
                        : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] sm:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? `bg-primary text-white ${isRTL ? "rounded-bl-md" : "rounded-br-md"}`
                        : `bg-white text-gray-900 border ${isRTL ? "rounded-br-md" : "rounded-bl-md"}`,
                    )}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            } })}
                    </div>
                    <div
                      className={cn(
                        "text-xs mt-2 opacity-70",
                        message.role === "user"
                          ? "text-green-100"
                          : "text-gray-500",
                      )}
                    >
                      {/* Optionally format time */}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className={cn("flex", isRTL ? "justify-end" : "justify-start")}>
                  <div className={cn("bg-white text-gray-900 rounded-2xl px-4 py-3 shadow-sm border", isRTL ? "rounded-br-md" : "rounded-bl-md")}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSubmit}>
                <div className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={handleInputChange}
                      placeholder={t("chat.typePlaceholder")}
                      className="pr-20 py-3 text-sm rounded-full border-gray-300 focus:ring-primary focus:border-primary"
                    />
                    <div
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 flex items-center space-x-1",
                        isRTL ? "left-3" : "right-3",
                      )}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto rounded-full hover:bg-gray-100"
                      >
                        <Paperclip className="h-4 w-4 text-gray-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto rounded-full hover:bg-gray-100"
                      >
                        <Smile className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={cn(
                      "rounded-full p-3 h-auto",
                      isRecording ? "bg-green-200" : "bg-gray-100",
                    )}
                  >
                    {isRecording ? (
                      <Mic className="h-5 w-5 text-primary animate-pulse" />
                    ) : (
                      <Mic className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="rounded-full p-3 h-auto bg-primary hover:bg-green-600"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
              {/* ...recording indicator and disclaimer unchanged... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
