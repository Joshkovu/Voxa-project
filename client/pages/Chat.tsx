
// import React, { useState, useRef, useEffect } from "react";
// 'use client';
// import { useChat } from '@ai-sdk/react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import {
//   MessageCircle,
//   Send,
//   Mic,
//   MicOff,
//   MoreVertical,
//   Paperclip,
//   Smile,
//   Phone,
//   Video,
//   Info,
//   Search,
//   Archive,
//   Pin,
//   Star,
//   Trash2,
//   Download,
//   Share2,
//   Settings,
//   HelpCircle,
//   Volume2,
//   VolumeX,
//   Image,
//   FileText,
// } from "lucide-react";
// import Navigation from "@/components/Navigation";
// import { cn } from "@/lib/utils";
// import { useLanguage } from "@/lib/translations";
// import { toast } from "sonner";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// //   DropdownMenuSeparator,
// //   DropdownMenuLabel,
// //   DropdownMenuGroup,
// // } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// // enum callStatus {
// //   INACTIVE = 'INACTIVE',
// //   CONNECTING = 'CONNECTING',
// //   ACTIVE = 'ACTIVE',
// //   FINISHED ='FINISHED '
// //  }
// // interface Message {
// //   id: string;
// //   content: string;
// //   sender: "user" | "voxa";
// //   timestamp: Date;
// //   type: "text" | "voice";
// //   isTyping?: boolean;
// // }

// const Chat = () => {
//   // const { t, currentLanguage } = useLanguage();
//   // const isRTL = currentLanguage === "ar";
//   const { messages, input, handleInputChange, handleSubmit} = useChat()
//   // const [messages, setMessages] = useState<Message[]>([
//   //   {
//   //     id: "1",
//   //     content: t("chat.welcomeMessage"),
//   //     sender: "voxa",
//   //     timestamp: new Date(),
//   //     type: "text",
//   //   },
//   // ]);
//   // const [newMessage, setNewMessage] = useState([]);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isVoxaTyping, setIsVoxaTyping] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isStarred, setIsStarred] = useState(false);
//   const [isPinned, setIsPinned] = useState(false);
//   const [isArchived, setIsArchived] = useState(false);
//   const [showSearchDialog, setShowSearchDialog] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showCallInterface, setShowCallInterface] = useState(false);
//   const [callStatus, setCallStatus] = useState<
//     "calling" | "connected" | "ended"
//   >("calling");
//   const [callDuration, setCallDuration] = useState(0);
//   const [isMicMuted, setIsMicMuted] = useState(false);
//   const [isSpeakerOn, setIsSpeakerOn] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const callTimerRef = useRef<NodeJS.Timeout | null>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages,isVoxaTyping]);

//   // Cleanup call timer on unmount
//   useEffect(() => {
//     return () => {
//       if (callTimerRef.current) {
//         clearInterval(callTimerRef.current);
//       }
//     };
//   }, []);

//   // Update welcome message when language changes
//   // useEffect(() => {
//   //   setMessages((prev) =>
//   //     prev.map((msg, index) =>
//   //       index === 0 && msg.sender === "voxa"
//   //         ? { ...msg, content: t("chat.welcomeMessage") }
//   //         : msg,
//   //     ),
//   //   );
//   // }, [t]);

//   // const generateVoxaResponse = (userMessage: string): string => {
//   //   const lowerMessage = userMessage.toLowerCase();

//   //   // Simple language-aware responses
//   //   const responses = {
//   //     greeting: {
//   //       en: "Hello! Great to meet you! I'm here to help with all your tax questions. What would you like to know about Uganda's tax system?",
//   //       lug: "Nkulamuse! Nnuya nnyo okukusisinkana! Ndi wano okukukoyamba ku bibuuzo byonna eby'omusolo. Oyagala okumanya ki ku nkola y'omusolo mu Uganda?",
//   //       ar: "مرحباً! من الرائع مقابلتك! أنا هنا لمساعدتك في جميع أسئلة الضرائب. ماذا تريد أن تعرف عن نظام الضرائب في أوغندا؟",
//   //       fr: "Salut! Ravi de vous rencontrer! Je suis ici pour vous aider avec toutes vos questions fiscales. Que souhaitez-vous savoir sur le système fiscal ougandais?",
//   //       sw: "Karibu! Nimefurahi kukutana nawe! Niko hapa kukusaidia na maswali yako yote ya kodi. Ungependa kujua nini kuhusu mfumo wa kodi wa Uganda?",
//   //     },
//   //     paye: {
//   //       en: "PAYE (Pay As You Earn) is calculated on your monthly salary using these 2024 rates:\n\n• 0% on income up to UGX 235,000\n• 10% on the next UGX 135,000\n• 20% on the next UGX 130,000\n• 30% on income above UGX 500,000\n\nWould you like me to calculate your specific PAYE based on your salary?",
//   //       lug: "PAYE (Pay As You Earn) ebazibwa ku musaala gwo ogwa buli mwezi ng'okozesa emiwendo gino egya 2024:\n\n• 0% ku nsaale etuukira UGX 235,000\n• 10% ku endala UGX 135,000\n• 20% ku endala UGX 130,000\n• 30% ku nsaale esukka UGX 500,000\n\nOyagala nkubalire PAYE yo okusinziira ku musaala gwo?",
//   //       ar: "يتم حساب ضريبة PAYE (ادفع كما تكسب) على راتبك الشهري باستخدام معدلات 2024 هذه:\n\n• 0% على الدخل حتى 235,000 شلن أوغندي\n• 10% على 135,000 شلن التالية\n• 20% على 130,000 شلن ��لتالية\n• 30% على الدخل فوق 500,000 شلن\n\nهل تريد أن أحسب ضريبة PAYE المحددة بناءً ع��ى راتبك؟",
//   //       fr: "PAYE (Pay As You Earn) est calculé sur votre salaire mensuel en utilisant ces taux 2024:\n\n• 0% sur les revenus jusqu'à 235 000 UGX\n• 10% sur les 135 000 UGX suivants\n• 20% sur les 130 000 UGX suivants\n• 30% sur les revenus au-dessus de 500 000 UGX\n\nVoulez-vous que je calcule votre PAYE spécifique basé sur votre salaire?",
//   //       sw: "PAYE (Pay As You Earn) inakokotolewa kwenye mshahara wako wa kila mwezi kwa kutumia viwango hivi vya 2024:\n\n• 0% kwenye mapato hadi UGX 235,000\n• 10% kwenye UGX 135,000 inayofuata\n• 20% kwenye UGX 130,000 inayofuata\n• 30% kwenye mapato zaidi ya UGX 500,000\n\nUngependa nikokotoe PAYE yako maalum kulingana na mshahara wako?",
//   //     },
//   //     vat: {
//   //       en: "VAT (Value Added Tax) in Uganda is 18% on most goods and services. Key points:\n\n• Businesses with annual turnover above UGX 150 million must register\n• Some items are exempt or zero-rated\n• Monthly VAT returns are required for registered businesses\n\nDo you need help with VAT calculations or registration?",
//   //       lug: "VAT (Value Added Tax) mu Uganda ya 18% ku bintu bingi n'obuweereza. Ensonga enkulu:\n\n• Bizinensi ezifuna omuwendo ogusukka UGX 150 million buli mwaka zirina okwewandiisa\n• Ebintu ebimu tebisaasaanyizibwako VAT\n• Alipoota za VAT za buli mwezi zeetaagisa mu bizinensi eziwandisiddwa\n\nOyetaaga obuyambi mu kubala VAT oba okwewandiisa?",
//   //       ar: "ضريبة القيمة المضافة في أوغندا 18% على معظم السلع والخدمات. النقاط الرئيسية:\n\n• الشركات التي يبلغ حجم مبيعاتها السنوي أكثر من 150 مليون شلن يجب أن تسجل\n• بعض السلع معفاة أو بمعدل صفر\n• إقرارات ضريبة القيمة المضافة الشهرية مطلوبة للشركات المسجلة\n\nهل تحتاج مساعدة في حسابات ضريبة القيمة المضافة أو التسجيل؟",
//   //       fr: "La TVA (Taxe sur la Valeur Ajoutée) en Ouganda est de 18% sur la plupart des biens et services. Points clés:\n\n• Les entreprises avec un chiffre d'affaires annuel supérieur à 150 millions UGX doivent s'enregistrer\n• Certains articles sont exonérés ou à taux zéro\n• Les déclarations TVA mensuelles sont requises pour les entreprises enregistrées\n\nAvez-vous besoin d'aide avec les calculs TVA ou l'enregistrement?",
//   //       sw: "Kodi ya VAT (Value Added Tax) huko Uganda ni 18% kwenye bidhaa na huduma nyingi. Mambo muhimu:\n\n• Biashara zenye mauzo ya kila mwaka zaidi ya UGX milioni 150 lazima zijisajili\n• Baadhi ya vitu vimesamehewa au vina kiwango cha sifuri\n• Ripoti za VAT za kila mwezi zinahitajika kwa biashara zilizosajiliwa\n\nUnahitaji msaada na hesabu za VAT au usajili?",
//   //     },
//   //     default: {
//   //       en: "Thank you for your tax question! Based on Ugandan tax law, I'd be happy to help you understand your obligations. For specific advice, I recommend consulting with a qualified tax professional. You can also use our Tax Calculator for quick PAYE calculations.",
//   //       lug: "Weebale ku kibuuzo kyo eky'omusolo! Okusinziira ku mateeka g'omusolo mu Uganda, nnayagala okukukorera okutegeera obuvunaanyizibwa bwo. Ku magezi ag'enjawulo, nkuteesa okwebuuza ku mukugu w'omusolo. Osobola era okukozesa Okubala Omusolo kwaffe ku kubala PAYE okw'amaanyi.",
//   //       ar: "شكراً لك على سؤال الضرائب! بناءً على قانون الضرائب الأوغندي، سأكون سعيداً لمساعدتك في فهم التزاماتك. للحصول على نصائح محددة، أنصحك بالتشاور مع متخصص ضرائب مؤهل. يمكنك أيضاً استخدام حاسبة الضرائب للحصول عل�� حسابات PAYE سريعة.",
//   //       fr: "Merci pour votre question fiscale! Basé sur la loi fiscale ougandaise, je serais heureux de vous aider à comprendre vos obligations. Pour des conseils spécifiques, je recommande de consulter un professionnel fiscal qualifié. Vous pouvez aussi utiliser notre Calculateur Fiscal pour des calculs PAYE rapides.",
//   //       sw: "Asante kwa swali lako la kodi! Kulingana na sheria ya kodi ya Uganda, ningependa kukusaidia kuelewa majukumu yako. Kwa ushauri maalum, napendelea ushauriane na mtaalamu wa kodi aliyeidhinishwa. Pia unaweza kutumia Kikokotoo chetu cha Kodi kwa hesabu za haraka za PAYE.",
//   //     },
//   //   };

//   //   const currentLang = currentLanguage as keyof typeof responses.greeting;

//   //   if (
//   //     lowerMessage.includes("hello") ||
//   //     lowerMessage.includes("hi") ||
//   //     lowerMessage.includes("hey") ||
//   //     lowerMessage.includes("hola") ||
//   //     lowerMessage.includes("salut") ||
//   //     lowerMessage.includes("مرحبا") ||
//   //     lowerMessage.includes("nkulamuse") ||
//   //     lowerMessage.includes("karibu")
//   //   ) {
//   //     return responses.greeting[currentLang] || responses.greeting.en;
//   //   }

//   //   if (lowerMessage.includes("paye") || lowerMessage.includes("salary")) {
//   //     return responses.paye[currentLang] || responses.paye.en;
//   //   }

//   //   if (lowerMessage.includes("vat") || lowerMessage.includes("value added")) {
//   //     return responses.vat[currentLang] || responses.vat.en;
//   //   }

//   //   return responses.default[currentLang] || responses.default.en;
//   // };

//   // const handleSendMessage = async () => {
//   //   // if (!newMessage.trim()) return;

//   //   // const userMessage: Message = {
//   //   //   id: Date.now().toString(),
//   //   //   content: '',
//   //   //   sender: "user",
//   //   //   timestamp: new Date(),
//   //   //   type: "text",
//   //   // };

//   //   // setMessages((prev) => [...prev, userMessage]);
//   //   // setNewMessage((prev) => [...prev, userMessage]);
//   //   setIsVoxaTyping(true);

//   //   // Simulate API delay
//   //   setTimeout(
//   //     () => {
//   //       // const response = generateVoxaResponse(newMessage);
//   //       // const voxaMessage: Message = {
//   //       //   id: (Date.now() + 1).toString(),
//   //       //   content: response,
//   //       //   sender: "voxa",
//   //       //   timestamp: new Date(),
//   //       //   type: "text",
//   //       // };

//   //       // setMessages((prev) => [...prev, voxaMessage]);
//   //       setIsVoxaTyping(false);
//   //     },
//   //     1500 + Math.random() * 1000,
//   //   );
//   // };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//      setIsVoxaTyping 
//     }
//   };

//   const handleVoiceToggle = () => {
//     setIsRecording(!isRecording);
//     if (!isRecording) {
//       setTimeout(() => {
//         setIsRecording(false);
//         // const voiceQuestions = {
//         //   en: "How do I calculate my PAYE tax?",
//         //   lug: "Nkola ntya okubala PAYE yange?",
//         //   ar: "كيف أحسب ضريبة PAYE؟",
//         //   fr: "Comment calculer ma taxe PAYE?",
//         //   sw: "Ninawezaje kukokotoa kodi yangu ya PAYE?",
//         // };
//         // setNewMessage(
//         //   voiceQuestions[currentLanguage as keyof typeof voiceQuestions] ||
//         //     voiceQuestions.en,
//         // );
//       }, 3000);
//     }
//   };

//   // const formatTime = (date: Date) => {
//   //   return date.toLocaleTimeString("en-GB", {
//   //     hour: "2-digit",
//   //     minute: "2-digit",
//   //   });
//   // };

//   // const handleClearChat = () => {
//   //   setMessages([
//   //     {
//   //       id: "1",
//   //       content: t("chat.welcomeMessage"),
//   //       sender: "voxa",
//   //       timestamp: new Date(),
//   //       type: "text",
//   //     },
//   //   ]);
//   //   toast.success("Chat cleared successfully!");
//   // };

//   // const handleExportChat = () => {
//   //   try {
//   //     const chatText = messages
//   //       .map(
//   //         (msg) =>
//   //           `[${formatTime(msg.timestamp)}] ${msg.sender === "user" ? "You" : "Voxa"}: ${msg.content}`,
//   //       )
//   //       .join("\n");

//   //     const blob = new Blob([chatText], { type: "text/plain" });
//   //     const url = URL.createObjectURL(blob);
//   //     const a = document.createElement("a");
//   //     a.href = url;
//   //     a.download = `voxa-chat-${new Date().toISOString().split("T")[0]}.txt`;
//   //     document.body.appendChild(a);
//   //     a.click();
//   //     document.body.removeChild(a);
//   //     URL.revokeObjectURL(url);
//   //     toast.success("Chat exported successfully!");
//   //   } catch (error) {
//   //     toast.error("Failed to export chat");
//   //   }
//   // };

//   // const handleShareChat = async () => {
//   //   const chatText = messages
//   //     .map((msg) => `${msg.sender === "user" ? "You" : "Voxa"}: ${msg.content}`)
//   //     .join("\n\n");

//   //   if (navigator.share) {
//   //     try {
//   //       await navigator.share({
//   //         title: "Voxa Chat Conversation",
//   //         text: chatText,
//   //       });
//   //       toast.success("Chat shared successfully!");
//   //     } catch (err) {
//   //       console.log("Error sharing:", err);
//   //       // Fallback to clipboard
//   //       await handleCopyToClipboard(chatText);
//   //     }
//   //   } else {
//   //     // Fallback - copy to clipboard
//   //     await handleCopyToClipboard(chatText);
//   //   }
//   // };

//   // const handleCopyToClipboard = async (text: string) => {
//   //   try {
//   //     await navigator.clipboard.writeText(text);
//   //     toast.success("Chat copied to clipboard!");
//   //   } catch (err) {
//   //     toast.error("Failed to copy to clipboard");
//   //   }
//   // };

//   // const handleSearchInChat = () => {
//   //   setShowSearchDialog(true);
//   // };

//   // const handleArchiveChat = () => {
//   //   setIsArchived(!isArchived);
//   //   toast.success(isArchived ? "Chat unarchived" : "Chat archived");
//   // };

//   // const handleChatSettings = () => {
//   //   toast.info("Chat settings coming soon!");
//   //   // You could implement a settings modal here
//   // };

//   // const handleHelpSupport = () => {
//   //   toast.info("Help & Support: Contact us at support@voxa.ai");
//   //   // You could implement a help modal or redirect to help page
//   // };

//   // const handleViewMedia = () => {
//   //   const mediaMessages = messages.filter(
//   //     (msg) =>
//   //       msg.type === "voice" ||
//   //       msg.content.includes("image") ||
//   //       msg.content.includes("file"),
//   //   );
//   //   if (mediaMessages.length === 0) {
//   //     toast.info("No media found in this chat");
//   //   } else {
//   //     toast.success(`Found ${mediaMessages.length} media item(s)`);
//   //   }
//   //   // Filter and show only media messages
//   // };

//   const handleViewDocuments = () => {
//     const docMessages = messages.filter(
//       (msg) =>
//         msg.content.includes("document") ||
//         msg.content.includes(".pdf") ||
//         msg.content.includes(".doc"),
//     );
//     if (docMessages.length === 0) {
//       toast.info("No documents found in this chat");
//     } else {
//       toast.success(`Found ${docMessages.length} document(s)`);
//     }
//     // Filter and show only document messages
//   };

//   const handleStartCall = () => {
//     setShowCallInterface(true);
//     setCallStatus("calling");
//     setCallDuration(0);

//     // Simulate call connecting after 3 seconds
//     setTimeout(() => {
//       setCallStatus("connected");
//       // Start call timer
//       callTimerRef.current = setInterval(() => {
//         setCallDuration((prev) => prev + 1);
//       }, 1000);
//     }, 3000);
//   };

//   const handleEndCall = () => {
//     if (callTimerRef.current) {
//       clearInterval(callTimerRef.current);
//       callTimerRef.current = null;
//     }
//     setCallStatus("ended");
//     setTimeout(() => {
//       setShowCallInterface(false);
//       setCallDuration(0);
//       setIsMicMuted(false);
//       setIsSpeakerOn(false);
//     }, 2000);
//   };

//   const formatCallDuration = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const toggleMic = () => {
//     setIsMicMuted(!isMicMuted);
//     // const message = isMicMuted
//     //   ? currentLanguage === "en"
//     //     ? "Microphone unmuted"
//     //     : currentLanguage === "lug"
//     //       ? "Mikrofoni egguddwa"
//     //       : currentLanguage === "ar"
//     //         ? "الميكروفون مفعل"
//     //         : currentLanguage === "fr"
//     //           ? "Microphone activé"
//     //           : currentLanguage === "sw"
//     //             ? "Mikrofoni imewashwa"
//     //             : "Microphone unmuted"
//     //   : currentLanguage === "en"
//     //     ? "Microphone muted"
//     //     : currentLanguage === "lug"
//     //       ? "Mikrofoni esiriddwa"
//     //       : currentLanguage === "ar"
//     //         ? "الميكروفون مكتوم"
//     //         : currentLanguage === "fr"
//     //           ? "Microphone coupé"
//     //           : currentLanguage === "sw"
//     //             ? "Mikrofoni imezimwa"
//     //             : "Microphone muted";
//     // toast.info(message);
//   };

//   const toggleSpeaker = () => {
//     setIsSpeakerOn(!isSpeakerOn);
//     // const message = isSpeakerOn
//     //   ? currentLanguage === "en"
//     //     ? "Speaker off"
//     //     : currentLanguage === "lug"
//     //       ? "Sipika ezisiriddwa"
//     //       : currentLanguage === "ar"
//     //         ? "مكبر الصوت مكتوم"
//     //         : currentLanguage === "fr"
//     //           ? "Haut-parleur coupé"
//     //           : currentLanguage === "sw"
//     //             ? "Spika imezimwa"
//     //             : "Speaker off"
//     //   : currentLanguage === "en"
//     //     ? "Speaker on"
//     //     : currentLanguage === "lug"
//     //       ? "Sipika ezigiddwa"
//     //       : currentLanguage === "ar"
//     //         ? "مكبر الصوت مفعل"
//     //         : currentLanguage === "fr"
//     //           ? "Haut-parleur activé"
//     //           : currentLanguage === "sw"
//     //             ? "Spika imewashwa"
//     //             : "Speaker on";
//     // toast.info(message);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navigation />

//       <div className="max-w-7xl mx-auto">
//         <div className="grid lg:grid-cols-4 h-[calc(100vh-4rem)]">
//           {/* Sidebar - Hidden on mobile */}
//           <div className="hidden lg:block lg:col-span-1 bg-white border-r border-gray-200">
//             <div className="p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900">
//                 {/* {t("chat.recentChats")} */}
//               </h2>
//             </div>
//             <div className="p-4">
//               <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
//                 <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
//                   <MessageCircle className="h-6 w-6 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="font-medium text-gray-900">Voxa</div>
//                   <div className="text-sm text-gray-500">
//                     {/* {t("nav.aiTaxAssistant")} */}
//                   </div>
//                 </div>
//                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               </div>
//             </div>
//           </div>

//           {/* Main Chat Area */}
//           <div className="lg:col-span-3 flex flex-col bg-white">
//             {/* Chat Header */}
//             <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
//                   <MessageCircle className="h-6 w-6 text-white" />
//                 </div>
//                 <div>
//                   <div className="flex items-center space-x-2">
//                     <span className="font-semibold text-gray-900">Voxa</span>
//                     {isPinned && <Pin className="h-4 w-4 text-primary" />}
//                     {isStarred && (
//                       <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     )}
//                     {isMuted && <VolumeX className="h-4 w-4 text-gray-400" />}
//                     {isArchived && (
//                       <Archive className="h-4 w-4 text-orange-500" />
//                     )}
//                   </div>
//                   <div className="text-sm text-green-600 flex items-center">
//                     <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
//                     {/* {t("chat.online")} • {t("nav.aiTaxAssistant")} */} Online
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="hidden sm:flex"
//                   onClick={handleStartCall}
//                 >
//                   <Phone className="h-4 w-4" />
//                 </Button>

//                 {/* WhatsApp-style dropdown menu */}
//                 {/* <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="sm">
//                       <MoreVertical className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="w-56">
//                     {/* <DropdownMenuLabel>{t("chat.options")}</DropdownMenuLabel> 
//                     <DropdownMenuSeparator /> */}

//                     {/* <DropdownMenuGroup>
//                       <DropdownMenuItem
//                         onClick={() => {
//                           setIsStarred(!isStarred);
//                           toast.success(
//                             isStarred ? "Chat unstarred" : "Chat starred",
//                           );
//                         }}
//                       >
//                         <Star
//                           className={cn(
//                             "h-4 w-4 mr-2",
//                             isStarred && "fill-yellow-400 text-yellow-400",
//                           )}
//                         />
//                         {/* {isStarred ? t("chat.unstarChat") : t("chat.starChat")} 
//                       </DropdownMenuItem> */}

//                       {/* <DropdownMenuItem
//                         onClick={() => {
//                           setIsPinned(!isPinned);
//                           toast.success(
//                             isPinned ? "Chat unpinned" : "Chat pinned",
//                           );
//                         }}
//                       >
//                         <Pin
//                           className={cn(
//                             "h-4 w-4 mr-2",
//                             isPinned && "text-primary",
//                           )}
//                         />
//                         {/* {isPinned ? t("chat.unpinChat") : t("chat.pinChat")} 
//                       </DropdownMenuItem>

//                       <DropdownMenuItem
//                         onClick={() => {
//                           setIsMuted(!isMuted);
//                           toast.success(
//                             isMuted
//                               ? "Notifications unmuted"
//                               : "Notifications muted",
//                           );
//                         }}
//                       >
//                         {isMuted ? (
//                           <Volume2 className="h-4 w-4 mr-2" />
//                         ) : (
//                           <VolumeX className="h-4 w-4 mr-2" />
//                         )}
//                         {/* {isMuted
//                           ? t("chat.unmuteNotifications")
//                           : t("chat.muteNotifications")} 
//                       </DropdownMenuItem>
//                     </DropdownMenuGroup>

//                     <DropdownMenuSeparator /> */}

//                     {/* <DropdownMenuGroup>
//                       <DropdownMenuItem onClick={handleSearchInChat}>
//                         <Search className="h-4 w-4 mr-2" />
//                         {/* {t("chat.searchInChat")} 
//                       </DropdownMenuItem>

//                       <DropdownMenuItem>
//                         <Image className="h-4 w-4 mr-2" />
//                         {/* {t("chat.viewMedia")} 
//                       </DropdownMenuItem>

//                       <DropdownMenuItem onClick={handleViewDocuments}>
//                         <FileText className="h-4 w-4 mr-2" />
//                         {/* {t("chat.viewDocuments")} 
//                       </DropdownMenuItem>
//                     </DropdownMenuGroup>

//                     <DropdownMenuSeparator />

//                     <DropdownMenuGroup> */}
//                       {/* <DropdownMenuItem >
//                         <Download className="h-4 w-4 mr-2" />
//                         {/* {t("chat.exportChat")} 
//                       </DropdownMenuItem>

//                       <DropdownMenuItem >
//                         <Share2 className="h-4 w-4 mr-2" />
//                         {/* {t("chat.shareChat")} 
//                       </DropdownMenuItem> */}

//                       {/* <DropdownMenuItem onClick={handleArchiveChat}>
//                         <Archive
//                           className={cn(
//                             "h-4 w-4 mr-2",
//                             isArchived && "text-primary",
//                           )}
//                         />
//                         {/* {isArchived
//                           ? t("chat.unarchiveChat")
//                           : t("chat.archiveChat")} 
//                       </DropdownMenuItem> */}
//                     {/* </DropdownMenuGroup> */}

//                     {/* <DropdownMenuSeparator /> */}

//                     {/* <DropdownMenuGroup>
//                       <DropdownMenuItem onClick={handleChatSettings}>
//                         <Settings className="h-4 w-4 mr-2" />
//                         {/* {t("chat.chatSettings")} 
//                       </DropdownMenuItem>

//                       <DropdownMenuItem onClick={handleHelpSupport}>
//                         <HelpCircle className="h-4 w-4 mr-2" />
//                         {/* {t("chat.helpSupport")} 
//                       </DropdownMenuItem>
//                     </DropdownMenuGroup> */}

//                     {/* <DropdownMenuSeparator /> */}

//                     {/* <DropdownMenuItem
      
//                       className="text-red-600 focus:text-red-600"
//                     >
//                       <Trash2 className="h-4 w-4 mr-2" />
//                       {/* {t("chat.clearChat")} 
//                     </DropdownMenuItem> */}
//                   {/* </DropdownMenuContent>
//                 </DropdownMenu> */}
//               </div>
//             </div>

//             {/* Search Dialog */}
//             <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
//               <DialogContent className="sm:max-w-md">
//                 <DialogHeader>
//                   {/* <DialogTitle>{t("chat.searchInChat")}</DialogTitle> */}
                  
//                   <DialogDescription>
//                     Search for messages in your conversation with Voxa
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="flex items-center space-x-2">
//                   <div className="grid flex-1 gap-2">
//                     <Input
//                       id="search"
//                       placeholder="Type to search messages..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     size="sm"
//                     className="px-3"
//                     onClick={() => {
//                       // Implement search functionality
//                       console.log("Searching for:", searchQuery);
//                       const results = messages.filter((msg) =>
//                         msg.content
//                           .toLowerCase()
//                           .includes(searchQuery.toLowerCase()),
//                       );
//                       console.log("Search results:", results);
//                       setShowSearchDialog(false);
//                     }}
//                   >
//                     <Search className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>

//             {/* WhatsApp-like Call Interface */}
//             {showCallInterface && (
//               <div className="fixed inset-0 bg-gradient-to-br from-green-600 to-green-800 z-50 flex flex-col items-center justify-center">
//                 <div className="text-center text-white space-y-6">
//                   {/* Profile Section */}
//                   <div className="space-y-4">
//                     <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
//                       <div className="w-24 h-24 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center">
//                         <MessageCircle className="h-12 w-12 text-white" />
//                       </div>
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-semibold">Voxa</h2>
//                       <p className="text-green-100">
//                         {/* {t("nav.aiTaxAssistant")} */}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Call Status */}
//                   <div className="space-y-2">
//                     {callStatus === "calling" && (
//                       <div className="space-y-4">
//                         {/* <p className="text-lg text-green-100">
//                           {currentLanguage === "en"
//                             ? "Calling..."
//                             : currentLanguage === "lug"
//                               ? "Nkuba essimu..."
//                               : currentLanguage === "ar"
//                                 ? "جاري الاتصال..."
//                                 : currentLanguage === "fr"
//                                   ? "Appel en cours..."
//                                   : currentLanguage === "sw"
//                                     ? "Ninapiga simu..."
//                                     : "Calling..."}
//                         </p> */}
//                         <div className="flex justify-center space-x-1">
//                           <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
//                           <div
//                             className="w-2 h-2 bg-white rounded-full animate-bounce"
//                             style={{ animationDelay: "0.1s" }}
//                           ></div>
//                           <div
//                             className="w-2 h-2 bg-white rounded-full animate-bounce"
//                             style={{ animationDelay: "0.2s" }}
//                           ></div>
//                         </div>
//                       </div>
//                     )}
//                     {callStatus === "connected" && (
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-center space-x-2">
//                           <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//                           {/* <p className="text-lg text-green-100">
//                             {currentLanguage === "en"
//                               ? "Connected"
//                               : currentLanguage === "lug"
//                                 ? "Nyambiddwa"
//                                 : currentLanguage === "ar"
//                                   ? "متصل"
//                                   : currentLanguage === "fr"
//                                     ? "Connecté"
//                                     : currentLanguage === "sw"
//                                       ? "Imeunganishwa"
//                                       : "Connected"}
//                           </p> */}
//                         </div>
//                         <p className="text-xl font-mono">
//                           {formatCallDuration(callDuration)}
//                         </p>
//                       </div>
//                     )}
//                     {callStatus === "ended" && (
//                       <div className="space-y-2">
//                         {/* <p className="text-lg text-green-100">
//                           {currentLanguage === "en"
//                             ? "Call Ended"
//                             : currentLanguage === "lug"
//                               ? "Essimu Eweddeko"
//                               : currentLanguage === "ar"
//                                 ? "انتهت المكالمة"
//                                 : currentLanguage === "fr"
//                                   ? "Appel Terminé"
//                                   : currentLanguage === "sw"
//                                     ? "Simu Imeisha"
//                                     : "Call Ended"}
//                         </p> */}
//                         {/* <p className="text-green-200">
//                           {currentLanguage === "en"
//                             ? "Duration"
//                             : currentLanguage === "lug"
//                               ? "Ebbanga"
//                               : currentLanguage === "ar"
//                                 ? "المدة"
//                                 : currentLanguage === "fr"
//                                   ? "Durée"
//                                   : currentLanguage === "sw"
//                                     ? "Muda"
//                                     : "Duration"}
//                           : {formatCallDuration(callDuration)}
//                         </p> */}
//                       </div>
//                     )}
//                   </div>

//                   {/* Call Controls */}
//                   {callStatus === "connected" && (
//                     <div className="flex justify-center space-x-6 mt-12">
//                       {/* Mute Button */}
//                       <button
//                         onClick={toggleMic}
//                         className={cn(
//                           "w-16 h-16 rounded-full flex items-center justify-center transition-all",
//                           isMicMuted
//                             ? "bg-red-500 hover:bg-red-600"
//                             : "bg-white bg-opacity-20 hover:bg-opacity-30",
//                         )}
//                       >
//                         {isMicMuted ? (
//                           <MicOff className="h-8 w-8 text-white" />
//                         ) : (
//                           <Mic className="h-8 w-8 text-white" />
//                         )}
//                       </button>

//                       {/* Speaker Button */}
//                       <button
//                         title='speaker'
//                         onClick={toggleSpeaker}
//                         className={cn(
//                           "w-16 h-16 rounded-full flex items-center justify-center transition-all",
//                           isSpeakerOn
//                             ? "bg-blue-500 hover:bg-blue-600"
//                             : "bg-white bg-opacity-20 hover:bg-opacity-30",
//                         )}
//                       >
//                         <Volume2 className="h-8 w-8 text-white" />
//                       </button>
//                     </div>
//                   )}

//                   {/* End Call Button */}
//                   {callStatus !== "ended" && (
//                     <div className="mt-12">
//                       <button
//                         title='end call'
//                         onClick={handleEndCall}
//                         className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all transform hover:scale-105"
//                       >
//                         <Phone className="h-8 w-8 text-white transform rotate-180" />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Background decoration */}
//                 <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
//                 <div className="absolute bottom-20 right-20 w-32 h-32 bg-white bg-opacity-5 rounded-full animate-pulse delay-1000"></div>
//                 <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-ping"></div>
//               </div>
//             )}

//             {/* Messages Area */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={cn(
//                     "flex",
//                   )}
//                 >
//                   <div
//                     className={cn(
//                       "max-w-[80%] sm:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm",
//                     )}
//                   >
//                     <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                       {message.parts.map((part, i) => {
//             switch (part.type) {
//               case 'text':
//                 return <div key={`${message.id}-${i}`}>{part.text}</div>;
//             }
//           })}
//                     </div>
//                     <div
//                       className={cn(
//                         "text-xs mt-2 opacity-70",
                       
//                       )}
//                     >
                      
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Typing Indicator */}
//               {isVoxaTyping && (
//                 <div
//                   className={cn(
//                     "flex",
            
//                   )}
//                 >
//                   <div
//                     className={cn(
//                       "bg-white text-gray-900 rounded-2xl px-4 py-3 shadow-sm border",
              
//                     )}
//                   >
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                       <div
//                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.1s" }}
//                       ></div>
//                       <div
//                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.2s" }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area */}
//             <div className="p-4 bg-white border-t border-gray-200">
//               <div className="flex items-end space-x-3">
//                 <div className="flex-1 relative">
//                   <form onSubmit={handleSubmit}>
//                   <Input
//                     ref={inputRef}
//                     value={input}
//                     onChange={handleInputChange}
//                     // onKeyPress={handleKeyPress}
//                     // placeholder={t("chat.typePlaceholder")}
//                     className="pr-20 py-3 text-sm rounded-full border-gray-300 focus:ring-primary focus:border-primary"
//                     />
//                     </form>
//                   <div
//                     className={cn(
//                       "absolute top-1/2 -translate-y-1/2 flex items-center space-x-1",
                    
//                     )}
//                     >
                      
//                     {/* <Button
//                       variant="ghost"
//                       size="sm"
//                       className="p-1 h-auto rounded-full hover:bg-gray-100"
//                     >
//                       <Paperclip className="h-4 w-4 text-gray-400" />
//                     </Button> */}
//                     {/* <Button
//                       variant="ghost"
//                       size="sm"
//                       className="p-1 h-auto rounded-full hover:bg-gray-100"
//                     >
//                       <Smile className="h-4 w-4 text-gray-400" />
//                     </Button> */}
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handleVoiceToggle}
//                   variant={isRecording ? "destructive" : "outline"}
//                   size="sm"
//                   className="rounded-full p-3 h-auto"
//                 >
//                   {isRecording ? (
//                     <MicOff className="h-5 w-5" />
//                   ) : (
//                     <Mic className="h-5 w-5" />
//                   )}
//                 </Button>

//                 <Button
//                   // onClick={handleSendMessage}
//                   // disabled={!newMessage.trim()}
//                   // onClick={()=> setIsVoxaTyping(true)}
//                   className="rounded-full p-3 h-auto bg-primary hover:bg-green-600"
//                 >
//                   <Send className="h-5 w-5" />
//                 </Button>
//               </div>

//               {isRecording && (
//                 <div className="mt-3 flex items-center justify-center space-x-2 text-red-600">
//                   <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                   <span className="text-sm font-medium">
//                     {/* {t("chat.recording")} */}
//                   </span>
//                 </div>
//               )}

//               <div className="mt-2 text-xs text-gray-500 text-center">
//                 {/* {t("chat.disclaimer")} */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
import React, { useEffect } from 'react';

// Declare the custom element for TypeScript
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

export default function Chat() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      
      <df-messenger
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
      </style>
    </>
  );
}
