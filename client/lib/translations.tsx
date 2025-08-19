import React, { createContext, useContext, useState, ReactNode } from "react";

export type LanguageCode =
  | "en"
  | "lug"
  | "ach"
  | "rny"
  | "luo"
  | "sw"
  | "fr"
  | "ar";

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Translation keys and their values
const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.chat": "Chat",
    "nav.about": "About",
    "nav.calculator": "Calculator",
    "nav.laws": "Laws",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    "nav.language": "Languages",
    "nav.aiTaxAssistant": "AI Tax Assistant",

    // Home Page
    "home.hero.badge": "AI-Powered Tax Assistant",
    "home.hero.title": "Meet Voxa",
    "home.hero.subtitle":
      "Your intelligent multilingual assistant for navigating Uganda's tax system. Get instant answers, calculations, and guidance in your preferred language.",
    "home.hero.startChatting": "Start Chatting Now",
    "home.hero.tryVoice": "Try Voice Input",
    "home.hero.alwaysFree": "Always Free",
    "home.hero.noRegistration": "No Registration Required",
    "home.hero.multilingual": "Multilingual",

    // Stats
    "stats.questionsAnswered": "Questions Answered",
    "stats.languagesSupported": "Languages Supported",
    "stats.alwaysAvailable": "Always Available",
    "stats.freeToUse": "Free to Use",

    // Features
    "features.whyChoose": "Why Choose Voxa?",
    "features.subtitle":
      "Experience the future of tax assistance with AI-powered conversations in your preferred language",
    "features.aiConversations.title": "AI-Powered Conversations",
    "features.aiConversations.desc":
      "Chat naturally about your tax questions and get instant, accurate answers",
    "features.multilingual.title": "Multilingual Support",
    "features.multilingual.desc":
      "Available in English, Luganda, Acholi, Runyankole, and more",
    "features.voice.title": "Voice Interaction",
    "features.voice.desc":
      "Speak your questions aloud for hands-free tax assistance",
    "features.instant.title": "Instant Calculations",
    "features.instant.desc":
      "Get immediate PAYE, VAT, and other tax calculations",

    // Benefits
    "benefits.title": "Built for Uganda, Made for Everyone",
    "benefits.available24": "24/7 availability for all your tax questions",
    "benefits.accurate":
      "Accurate information based on Uganda Revenue Authority guidelines",
    "benefits.multiLang":
      "Support for multiple local and international languages",
    "benefits.voiceText": "Voice and text input for accessibility",
    "benefits.secure": "Secure and private conversations",
    "benefits.free": "Free to use for all Ugandans",

    // Feedback
    "feedback.title": "Help Us Improve Voxa",
    "feedback.subtitle":
      "Your feedback helps us make Voxa better for everyone. Share your thoughts and suggestions.",
    "feedback.placeholder":
      "Tell us what you think about Voxa, what features you'd like to see, or how we can improve your experience...",
    "feedback.submit": "Send Feedback",
    "feedback.success":
      "Thank you for your feedback! We'll use it to improve Voxa.",
    "feedback.error": "Failed to send feedback. Please try again.",
    "feedback.giveFeedback": "Give Feedback",
    "feedback.name": "Your Name (Optional)",
    "feedback.email": "Your Email (Optional)",
    "feedback.message": "Your Feedback",
    "feedback.cancel": "Cancel",
    "feedback.sending": "Sending...",

    // CTA
    "cta.ready": "Ready to Get Started?",
    "cta.subtitle":
      "Join thousands of Ugandans who trust Voxa for their tax questions. Start chatting now - it's completely free!",
    "cta.askTaxes": "Ask About Your Taxes Now",

    // About Page
    "about.title": "About Voxa",
    "about.subtitle":
      "Voxa is Uganda's first multilingual AI tax assistant, designed to make tax compliance accessible, understandable, and stress-free for everyone.",
    "about.mission": "Our Mission",
    "about.missionText":
      "To democratize tax knowledge in Uganda by providing an intelligent, multilingual assistant that helps individuals and businesses understand their tax obligations, make accurate calculations, and stay compliant with Uganda Revenue Authority requirements.",
    "about.whyChoose": "Why Choose Voxa?",
    "about.values": "Our Values",
    "about.accessibility": "Accessibility",
    "about.accessibilityDesc":
      "Making tax knowledge accessible to every Ugandan, regardless of background or language",
    "about.accuracy": "Accuracy",
    "about.accuracyDesc":
      "Providing reliable information based on current Uganda Revenue Authority guidelines",
    "about.technology": "Advanced AI Technology",
    "about.technologyDesc1":
      "Voxa is powered by state-of-the-art artificial intelligence trained specifically on Uganda's tax laws and regulations. Our AI understands context, provides accurate calculations, and can communicate in multiple local languages.",
    "about.technologyDesc2":
      "We continuously update our knowledge base to reflect the latest changes in tax law, ensuring you always receive current, relevant information.",
    "about.readyIntegration": "Ready for Botpress and Gemini integration",
    "our.Values": "Our Values",
    "reliable":"Providing reliable information based on current Uganda Revenue Authority guidelines",
    // Chat Page
    "chat.recentChats": "Recent Chats",
    "chat.online": "Online",
    "chat.typePlaceholder": "Type your tax question here...",
    "chat.recording": "Recording...",
    "chat.disclaimer":
      "Voxa is powered by AI. Information may not always be accurate. Always verify with URA for official guidance.",
    "chat.welcomeMessage":
      "Hello! I'm Voxa, your AI tax assistant. I'm here to help you with all your tax questions in Uganda. How can I assist you today?",
    "chat.options": "Chat Options",
    "chat.starChat": "Star Chat",
    "chat.unstarChat": "Unstar Chat",
    "chat.pinChat": "Pin Chat",
    "chat.unpinChat": "Unpin Chat",
    "chat.muteNotifications": "Mute Notifications",
    "chat.unmuteNotifications": "Unmute Notifications",
    "chat.searchInChat": "Search in Chat",
    "chat.viewMedia": "View Media",
    "chat.viewDocuments": "View Documents",
    "chat.exportChat": "Export Chat",
    "chat.shareChat": "Share Chat",
    "chat.archiveChat": "Archive Chat",
    "chat.unarchiveChat": "Unarchive Chat",
    "chat.chatSettings": "Chat Settings",
    "chat.helpSupport": "Help & Support",
    "chat.clearChat": "Clear Chat",
    "chat.calling": "Calling...",
    "chat.connected": "Connected",
    "chat.callEnded": "Call Ended",
    "chat.duration": "Duration",
    "chat.micMuted": "Microphone muted",
    "chat.micUnmuted": "Microphone unmuted",
    "chat.speakerOn": "Speaker on",
    "chat.speakerOff": "Speaker off",

    // Calculator
    "calc.title": "Tax Calculator",
    "calc.subtitle":
      "Calculate your PAYE, VAT, and other tax obligations based on Uganda's current tax rates",
    "calc.paye": "PAYE Calculator",
    "calc.vat": "VAT Calculator",
    "calc.salary": "Salary Amount (UGX)",
    "calc.enterSalary": "Enter your salary",
    "calc.frequency": "Income Frequency",
    "calc.monthly": "Monthly",
    "calc.annual": "Annual",
    "calc.calculate": "Calculate PAYE",
    "calc.results": "PAYE Calculation Results",
    "calc.gross": "Gross Salary:",
    "calc.tax": "PAYE Tax:",
    "calc.net": "Net Salary:",
    "calc.breakdown": "Tax Breakdown:",

    // Login Page
    "login.title": "Welcome Back",
    "login.subtitle": "Sign in to continue your tax conversations with Voxa",
    "login.signIn": "Sign In",
    "login.email": "Email Address",
    "login.password": "Password",
    "login.emailPlaceholder": "Enter your email",
    "login.passwordPlaceholder": "Enter your password",
    "login.rememberMe": "Remember me",
    "login.forgotPassword": "Forgot password?",
    "login.signingIn": "Signing In...",
    "login.orContinue": "Or continue with",
    "login.googleSignIn": "Continue with Google",
    "login.noAccount": "Don't have an account?",
    "login.signUpHere": "Sign up here",
    "login.backToHome": "Back to Home",
    "login.aiTaxAssistant": "AI Tax Assistant",
    "login.loginSuccess": "Login successful! Redirecting...",
    "login.loginFailed": "Login failed. Please try again.",
    "login.googleLoginFailed": "Google login failed. Please try again.",
    "login.termsPolicy": "By signing in, you agree to our",
    "login.termsOfService": "Terms of Service",
    "login.and": "and",
    "login.privacyPolicy": "Privacy Policy",

    // Signup Page
    "signup.title": "Join Voxa Today",
    "signup.subtitle":
      "Create your account to start getting personalized tax assistance",
    "signup.createAccount": "Create Account",
    "signup.firstName": "First Name",
    "signup.lastName": "Last Name",
    "signup.email": "Email Address",
    "signup.password": "Password",
    "signup.confirmPassword": "Confirm Password",
    "signup.firstNamePlaceholder": "First name",
    "signup.lastNamePlaceholder": "Last name",
    "signup.emailPlaceholder": "Enter your email",
    "signup.passwordPlaceholder": "Create a password",
    "signup.confirmPasswordPlaceholder": "Confirm your password",
    "signup.agreeToTerms": "I agree to the",
    "signup.termsOfService": "Terms of Service",
    "signup.and": "and",
    "signup.privacyPolicy": "Privacy Policy",
    "signup.creatingAccount": "Creating Account...",
    "signup.orContinue": "Or continue with",
    "signup.googleSignUp": "Continue with Google",
    "signup.haveAccount": "Already have an account?",
    "signup.signInHere": "Sign in here",
    "signup.backToHome": "Back to Home",
    "signup.aiTaxAssistant": "AI Tax Assistant",
    "signup.accountCreated":
      "Account created successfully! Please check your email to confirm your account.",
    "signup.signupFailed": "Signup failed. Please try again.",
    "signup.googleSignupFailed": "Google signup failed. Please try again.",
    "signup.passwordsNoMatch": "Passwords do not match",
    "signup.passwordTooShort": "Password must be at least 6 characters long",
    "signup.termsAgreement": "By creating an account, you agree to our",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.close": "Close",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
  },

  lug: {
    // Navigation
    "nav.home": "Amaka",
    "nav.chat": "Yokogana",
    "nav.about": "Ku Voxa",
    "nav.calculator": "Okubala",
    "nav.laws": "Amateeka",
    "nav.contact": "Tusisinkane",
    "nav.login": "Yingira",
    "nav.signup": "Weewandise",
    "nav.profile": "Ebikukwatako",
    "nav.logout": "Fuluma",
    "nav.language": "Enimi",
    "nav.aiTaxAssistant": "Omuyambi w'Omusolo gwa AI",

    // Home Page
    "home.hero.badge": "Omuyambi w'Omusolo ogukozesa AI",
    "home.hero.title": "Sisinkana ne Voxa",
    "home.hero.subtitle":
      "Omuyambi wo ogw'amagezi agakukuyamba ku nsonga z'omusolo mu Uganda. Funa ebibuuzo by'amangu, okubala, n'okukulembera mu lulimi lwo.",
    "home.hero.startChatting": "Tandika Okwogera Kati",
    "home.hero.tryVoice": "Gezaako Eddoboozi",
    "home.hero.alwaysFree": "Bwereere Bulijjo",
    "home.hero.noRegistration": "Tekyetaagisa Kwewandisa",
    "home.hero.multilingual": "Ennimi Nnyingi",

    // Stats
    "stats.questionsAnswered": "Ebibuuzo Ebyaddiddwamu",
    "stats.languagesSupported": "Ennimi Eziwagirwa",
    "stats.alwaysAvailable": "Aliwo Bulijjo",
    "stats.freeToUse": "Bwereere Okukozesa",

    // Features
    "features.whyChoose": "Lwaki Olonda Voxa?",
    "features.subtitle":
      "Labira ebiseera by'obunafu mu buwagizi bw'omusolo ng'okozesa emboozi za AI mu lulimi lwo",
    "features.aiConversations.title": "Emboozi za AI",
    "features.aiConversations.desc":
      "Yogera ku bibuuzo by'omusolo ofune ebiragiro by'amangu era ebiggya",
    "features.multilingual.title": "Obuwagizi bw'Ennimi Nnyingi",
    "features.multilingual.desc":
      "Buliwo mu Lungereza, Luganda, Acholi, Runyankole, n'endala",
    "features.voice.title": "Okukozesa Eddoboozi",
    "features.voice.desc":
      "Yogera ebibuuzo byo n'eddoboozi ly'obuyambi obuteetaagisa mikono",
    "features.instant.title": "Okubala okw'Amangu",
    "features.instant.desc":
      "Funa okubala okw'amangu okwa PAYE, VAT, n'emisolo egindi",

    // Benefits
    "benefits.title": "Yazimbiddwa Uganda, Yakozeddwa Bonna",
    "benefits.available24": "Aliwo essaawa 24/7 ku bibuuzo by'omusolo gwonna",
    "benefits.accurate":
      "Amawulire amaggya agasinziira ku ggayidilayini za Uganda Revenue Authority",
    "benefits.multiLang": "Obuwagizi bw'ennimi z'omu kitundu n'ez'amawanga",
    "benefits.voiceText": "Eddoboozi n'okuwandiika okw'okufuna bonna",
    "benefits.secure": "Emboozi ezitebenkedde era ez'ekyama",
    "benefits.free": "Bwereere okukozesa Bannayuganda bonna",

    // Feedback
    "feedback.title": "Tuyambe Okutumbula Voxa",
    "feedback.subtitle":
      "Endowooza zo zituyamba okufuula Voxa nnungi eri buli omu. Tugambire bye lowooza n'ebirowoozo byo.",
    "feedback.placeholder":
      "Tugambire bye lowooza ku Voxa, ebintu by'oyagala okulaba, oba engeri gye tuyinza okutumbula obumanyirivu bwo...",
    "feedback.submit": "Sindika Endowooza",
    "feedback.success":
      "Weebale ku ndowooza yo! Tujja kukozesa okutumbula Voxa.",
    "feedback.error": "Okusindika endowooza kulemye. Ddamu ogezaako.",
    "feedback.giveFeedback": "Wa Endowooza",
    "feedback.name": "Erinnya Lyo (Si kyetaagisa)",
    "feedback.email": "Email Yo (Si kyetaagisa)",
    "feedback.message": "Endowooza Yo",
    "feedback.cancel": "Sazaamu",
    "feedback.sending": "Nsindika...",

    // CTA
    "cta.ready": "Weetegese Okutandika?",
    "cta.subtitle":
      "Weegatte ku nukuta za Bannayuganda abakkiriza Voxa ku bibuuzo by'omusolo. Tandika okwogera kati - bwereere ddala!",
    "cta.askTaxes": "Buuza Ku Musolo Gwo Kati",

    // About Page
    "about.title": "Ku Voxa",
    "about.subtitle":
      "Voxa ye muyambi w'omusolo ogw'ennimi nnyingi ogwasooka mu Uganda, eyategukyiddwa okufuula omusolo gufuuliddwa okufunibwa n'okutegeerekeka bonna.",
    "about.mission": "Ekiruubirirwa Kyaffe",
    "about.missionText":
      "Okufuula amagezi g'omusolo mu Uganda gafunibwe bonna ng'okuwa omuyambi ogw'amagezi ogw'ennimi nnyingi aguyamba bantu ssente n'bizinensi okutegeeera obuvunaanyizibwa bw'omusolo gwabwe, okukola okubala okuggya, era okugoberera ebyetaago bya Uganda Revenue Authority.",

    // Chat Page
    "chat.recentChats": "Emboozi z'Okuvaayo",
    "chat.online": "Ku Mukutu",
    "chat.typePlaceholder": "Wandiika ekibuuzo ky'omusolo wano...",
    "chat.recording": "Nkwata...",
    "chat.disclaimer":
      "Voxa akozesa AI. Ebiweereddwa biyinza obutaba bya ffene bulijjo. Kakase na URA ku mulagiro ogw'obusibe.",
    "chat.welcomeMessage":
      "Nkulamuse! Nze Voxa, omuyambi wo w'omusolo wa AI. Ndi wano okukuyamba ku bibuuzo byonna eby'omusolo mu Uganda. Nkuyambe ntya leero?",
    "chat.options": "Ebikwata ku Mboozi",
    "chat.starChat": "Teeka Emmunyeenye ku Mboozi",
    "chat.unstarChat": "Ggyawo Emmunyeenye ku Mboozi",
    "chat.pinChat": "Songa Emboozi",
    "chat.unpinChat": "Ggyawo Okusonga Emboozi",
    "chat.muteNotifications": "Sirika Obubaka",
    "chat.unmuteNotifications": "Ggyawo Okusirika Obubaka",
    "chat.searchInChat": "Noonya mu Mboozi",
    "chat.viewMedia": "Laba Ebifaananyi",
    "chat.viewDocuments": "Laba Ebiwandiiko",
    "chat.exportChat": "Fulumya Emboozi",
    "chat.shareChat": "Gabana Emboozi",
    "chat.archiveChat": "Tereka Emboozi",
    "chat.unarchiveChat": "Ggyawo Emboozi mu Tereka",
    "chat.chatSettings": "Enteekateeka y'Emboozi",
    "chat.helpSupport": "Obuyambi n'Okukuuma",
    "chat.clearChat": "Sangula Emboozi",

    // Calculator
    "calc.title": "Okubala Omusolo",
    "calc.subtitle":
      "Bala PAYE yo, VAT, n'obuvunaanyizibwa bw'omusolo obulala okusinziira ku miwendo gy'omusolo egiri mu Uganda kati",
    "calc.paye": "Okubala PAYE",
    "calc.vat": "Okubala VAT",
    "calc.salary": "Omuwendo gw'Omusaala (UGX)",
    "calc.enterSalary": "Yingiza omusaala gwo",
    "calc.frequency": "Engeri y'Okufuna",
    "calc.monthly": "Buli Mwezi",
    "calc.annual": "Buli Mwaka",
    "calc.calculate": "Bala PAYE",
    "calc.results": "Ebiva mu Kubala PAYE",
    "calc.gross": "Omusaala Ogutannazikiddwa:",
    "calc.tax": "Omusolo gwa PAYE:",
    "calc.net": "Omusaala Ogusigadde:",
    "calc.breakdown": "Okugabanya Omusolo:",

    // Login Page
    "login.title": "Tudda Nawe",
    "login.subtitle": "Yingira okwongere emboozi z'omusolo ne Voxa",
    "login.signIn": "Yingira",
    "login.email": "Endagiriro ya Email",
    "login.password": "Ekigambo ky'Okuyingira",
    "login.emailPlaceholder": "Yingiza email yo",
    "login.passwordPlaceholder": "Yingiza ekigambo ky'okuyingira",
    "login.rememberMe": "Nzijukire",
    "login.forgotPassword": "Weerabidde ekigambo ky'okuyingira?",
    "login.signingIn": "Nyingira...",
    "login.orContinue": "Oba genda mu maaso nga okozesa",
    "login.googleSignIn": "Genda mu maaso ne Google",
    "login.noAccount": "Tolina account?",
    "login.signUpHere": "Weewandise wano",
    "login.backToHome": "Ddayo ku Maka",
    "login.aiTaxAssistant": "Omuyambi w'Omusolo gwa AI",
    "login.loginSuccess": "Okuyingira kuwedde! Nkulaga...",
    "login.loginFailed": "Okuyingira kulemye. Ddamu ogezaako.",
    "login.googleLoginFailed": "Okuyingira kwa Google kulemye. Ddamu ogezaako.",
    "login.termsPolicy": "Nga oyingira, okkiriza",
    "login.termsOfService": "Enkola z'Obuweereza",
    "login.and": "ne",
    "login.privacyPolicy": "Enkola z'Ekyama",

    // Signup Page
    "signup.title": "Weegatte ku Voxa Leero",
    "signup.subtitle":
      "Tonda account yo okutandikire okufuna obuyambi bw'omusolo obw'obuntu",
    "signup.createAccount": "Tonda Account",
    "signup.firstName": "Erinnya ery'Okubanza",
    "signup.lastName": "Erinnya ery'Enkomerero",
    "signup.email": "Endagiriro ya Email",
    "signup.password": "Ekigambo ky'Okuyingira",
    "signup.confirmPassword": "Kakasa Ekigambo ky'Okuyingira",
    "signup.firstNamePlaceholder": "Erinnya ery'okubanza",
    "signup.lastNamePlaceholder": "Erinnya ery'enkomerero",
    "signup.emailPlaceholder": "Yingiza email yo",
    "signup.passwordPlaceholder": "Tonda ekigambo ky'okuyingira",
    "signup.confirmPasswordPlaceholder": "Kakasa ekigambo ky'okuyingira",
    "signup.agreeToTerms": "Nkkiriza",
    "signup.termsOfService": "Enkola z'Obuweereza",
    "signup.and": "ne",
    "signup.privacyPolicy": "Enkola z'Ekyama",
    "signup.creatingAccount": "Ntonda Account...",
    "signup.orContinue": "Oba genda mu maaso nga okozesa",
    "signup.googleSignUp": "Genda mu maaso ne Google",
    "signup.haveAccount": "Olina account?",
    "signup.signInHere": "Yingira wano",
    "signup.backToHome": "Ddayo ku Maka",
    "signup.aiTaxAssistant": "Omuyambi w'Omusolo gwa AI",
    "signup.accountCreated":
      "Account etondeddwa obulungi! Kebera email yo okukakasa account yo.",
    "signup.signupFailed": "Okweewandisa kulemye. Ddamu ogezaako.",
    "signup.googleSignupFailed":
      "Okweewandisa kwa Google kulemye. Ddamu ogezaako.",
    "signup.passwordsNoMatch": "Ebigambo by'okuyingira tebikwatagana",
    "signup.passwordTooShort":
      "Ekigambo ky'okuyingira kirina okubeera obuwanvu bwa nnukuta 6 oba okusingawo",
    "signup.termsAgreement": "Nga otonda account, okkiriza",

    // Common
    "common.loading": "Ntegeka...",
    "common.error": "Ensobi",
    "common.success": "Biwedde",
    "common.cancel": "Sazaamu",
    "common.save": "Tereka",
    "common.close": "Ggalawo",
    "common.next": "Eddako",
    "common.previous": "Edda",
    "common.submit": "Sindika",
  },

  ach: {
    // Navigation
    "nav.home": "Gang",
    "nav.chat": "Lok",
    "nav.about": "Pi Voxa",
    "nav.calculator": "Kwon",
    "nav.laws": "Cik",
    "nav.contact": "Tudwogo",
    "nav.login": "Donyo",
    "nav.signup": "Coyo nyingi",
    "nav.profile": "Lok mamegi",
    "nav.logout": "Woko",
    "nav.language": "Leb",
    "nav.aiTaxAssistant": "Lukong cente me AI",

    // Home Page
    "home.hero.badge": "Lukong cente me AI",
    "home.hero.title": "Rom ki Voxa",
    "home.hero.subtitle":
      "Lukong ni ma lony ma tiyo ki leb mapol me konyo i lok cente pa Uganda. Nong lagam oyee, kwon, ki wek i leb ma imito.",
    "home.hero.startChatting": "Cak Lok Kombedi",
    "home.hero.tryVoice": "Tem dwon",
    "home.hero.alwaysFree": "Pe kica matwal",
    "home.hero.noRegistration": "Pe mito coyo nyingi",
    "home.hero.multilingual": "Leb mapol",

    // Stats
    "stats.questionsAnswered": "Lapeny ma kigamo",
    "stats.languagesSupported": "Leb ma kikonyo",
    "stats.alwaysAvailable": "Tye matwal",
    "stats.freeToUse": "Pe kica me tic",

    // Features
    "features.whyChoose": "Pingo iyero Voxa?",
    "features.subtitle":
      "Nen kare me lok cente ma anyuu ki lok AI i leb ma imito",
    "features.aiConversations.title": "Lok AI",
    "features.aiConversations.desc":
      "Lok malo pi lapeny cente ni nong lagam ma tet ki ma kare",
    "features.multilingual.title": "Konyo leb mapol",
    "features.multilingual.desc":
      "Tye i Leb Mundu, Luo, Acholi, Runyankole, ki mukene",
    "features.voice.title": "Tic ki dwon",
    "features.voice.desc": "Wac lapeny ni ki dwon pi konyo ma pe mito cing",
    "features.instant.title": "Kwon oyee",
    "features.instant.desc": "Nong kwon oyee me PAYE, VAT, ki cente mukene",

    // Benefits
    "benefits.title": "Kiguro pi Uganda, Kiyubu pi dano weng",
    "benefits.available24": "Tye nino 24/7 pi lapeny cente ducu",
    "benefits.accurate": "Ngec ma tet ma oketo i cik Uganda Revenue Authority",
    "benefits.multiLang": "Konyo leb pa lobo ki pa lwak",
    "benefits.voiceText": "Dwon ki coc pi konyo dano ducu",
    "benefits.secure": "Lok ma gengo ki ma peke",
    "benefits.free": "Pe kica pi jo Uganda ducu",

    // Feedback
    "feedback.title": "Kony Wa Me Yubo Voxa",
    "feedback.subtitle":
      "Tam ni konyo wa me yubo Voxa me dano ducu. Pok tam ni ki lok ma imito.",
    "feedback.placeholder":
      "Wac ni ngo itamo pi Voxa, jami ma imito neno, onyo kit ma watwero yubo kwede...",
    "feedback.submit": "Cwal Tam",
    "feedback.success": "Apwoyo pi tam ni! Wabitiyo kwede me yubo Voxa.",
    "feedback.error": "Cwalo tam pe olare. Tem doki.",
    "feedback.giveFeedback": "Mi Tam",
    "feedback.name": "Nying ni (Pe mite)",
    "feedback.email": "Email ni (Pe mite)",
    "feedback.message": "Tam ni",
    "feedback.cancel": "Juk",
    "feedback.sending": "Acwalo...",

    // CTA
    "cta.ready": "Iyubu me cako?",
    "cta.subtitle":
      "Ribo ki jo Uganda ma pol ma gengo Voxa pi lapeny cente. Cak lok kombedi - pe kica weng!",
    "cta.askTaxes": "Peny Pi Cente Ni Kombedi",

    // About Page
    "about.title": "Pi Voxa",
    "about.subtitle":
      "Voxa obedo lukong cente mukwongo ma leb mapol i Uganda, ma kiyubu me miyo cente bedo ma nongo ki ma pe tek pi dano ducu.",
    "about.mission": "Tic Wa",
    "about.missionText":
      "Me miyo ngec cente i Uganda bedo ma nongo pi dano ducu kun miyo lukong ma lony ma leb mapol ma konyo dano ki biznes me nongo tic cente, yubo kwon ma tet, ki lubo cik Uganda Revenue Authority.",

    // Chat Page
    "chat.recentChats": "Lok ma cokcoki",
    "chat.online": "I layeny",
    "chat.typePlaceholder": "Coo lapeny cente ni kany...",
    "chat.recording": "Amako...",
    "chat.disclaimer":
      "Voxa tiyo ki AI. Ngec romo bedo ma pe tet matwal. Jub tye ki URA pi ciko ma tet.",
    "chat.welcomeMessage":
      "Apwoyo! An Voxa, lukong cente ni pa AI. Atye kany me konyo i lapeny cente ducu i Uganda. Akonyo yin nining?",

    // Calculator
    "calc.title": "Mukwon Cente",
    "calc.subtitle":
      "Kwon PAYE ni, VAT, ki tic cente mukene malube ki wel cente ma tye i Uganda kombedi",
    "calc.paye": "Mukwon PAYE",
    "calc.vat": "Mukwon VAT",
    "calc.salary": "Wel cente (UGX)",
    "calc.enterSalary": "Ket wel cente ni",
    "calc.frequency": "Kare me nongo",
    "calc.monthly": "Dwe acel acel",
    "calc.annual": "Mwaka acel acel",
    "calc.calculate": "Kwon PAYE",
    "calc.results": "Jami ma oa i kwon PAYE",
    "calc.gross": "Cente ma pe kilubo:",
    "calc.tax": "Cente PAYE:",
    "calc.net": "Cente ma odong:",
    "calc.breakdown": "Neko cente:",

    // Login Page
    "login.title": "Pwocwa Doki",
    "login.subtitle": "Donyo me mede lok cente ni ki Voxa",
    "login.signIn": "Donyo",
    "login.email": "Kabedo pa Email",
    "login.password": "Lok me donyo",
    "login.emailPlaceholder": "Ket email ni",
    "login.passwordPlaceholder": "Ket lok donyo ni",
    "login.rememberMe": "Po na",
    "login.forgotPassword": "Iwil lok donyo?",
    "login.signingIn": "Adonyo...",
    "login.orContinue": "Onyo med ki",
    "login.googleSignIn": "Med ki Google",
    "login.noAccount": "Pe in ki account?",
    "login.signUpHere": "Coyo nyingi kany",
    "login.backToHome": "Dog i gang",
    "login.aiTaxAssistant": "Lukong cente me AI",
    "login.loginSuccess": "Donyo olare! Akelo yin...",
    "login.loginFailed": "Donyo pe olare. Tem doki.",
    "login.googleLoginFailed": "Donyo Google pe olare. Tem doki.",
    "login.termsPolicy": "I donyo, iyee",
    "login.termsOfService": "Cik pa Tic",
    "login.and": "ki",
    "login.privacyPolicy": "Cik pa Peke",

    // Signup Page
    "signup.title": "Ribo ki Voxa Tin",
    "signup.subtitle": "Yub account ni me cako nongo konyo cente ma pira",
    "signup.createAccount": "Yub Account",
    "signup.firstName": "Nying mukwongo",
    "signup.lastName": "Nying mogik",
    "signup.email": "Kabedo pa Email",
    "signup.password": "Lok me donyo",
    "signup.confirmPassword": "Mok Lok me donyo",
    "signup.firstNamePlaceholder": "Nying mukwongo",
    "signup.lastNamePlaceholder": "Nying mogik",
    "signup.emailPlaceholder": "Ket email ni",
    "signup.passwordPlaceholder": "Yub lok donyo",
    "signup.confirmPasswordPlaceholder": "Mok lok donyo",
    "signup.agreeToTerms": "Ayee",
    "signup.termsOfService": "Cik pa Tic",
    "signup.and": "ki",
    "signup.privacyPolicy": "Cik pa Peke",
    "signup.creatingAccount": "Ayubo account...",
    "signup.orContinue": "Onyo med ki",
    "signup.googleSignUp": "Med ki Google",
    "signup.haveAccount": "In ki account?",
    "signup.signInHere": "Donyo kany",
    "signup.backToHome": "Dog i gang",
    "signup.aiTaxAssistant": "Lukong cente me AI",
    "signup.accountCreated":
      "Account oyubu maber! Nen email ni me moko account ni.",
    "signup.signupFailed": "Coyo nyingi pe olare. Tem doki.",
    "signup.googleSignupFailed": "Coyo nyingi Google pe olare. Tem doki.",
    "signup.passwordsNoMatch": "Lok donyo pe rom",
    "signup.passwordTooShort": "Lok donyo myero obed boa 6 onyo mapol",
    "signup.termsAgreement": "I yubo account, iyee",

    // Common
    "common.loading": "Atye ka yubu...",
    "common.error": "Bal",
    "common.success": "Olare",
    "common.cancel": "Juk",
    "common.save": "Gwen",
    "common.close": "Lor",
    "common.next": "Malubo",
    "common.previous": "Ma otye",
    "common.submit": "Cwal",
  },

  rny: {
    // Navigation
    "nav.home": "Aharugo",
    "nav.chat": "Kwogana",
    "nav.about": "Kuri Voxa",
    "nav.calculator": "Okubara",
    "nav.laws": "Amateeka",
    "nav.contact": "Tusisinkane",
    "nav.login": "Injira",
    "nav.signup": "Kwihingura",
    "nav.profile": "Ebikurimu",
    "nav.logout": "Soma",
    "nav.language": "Endimi",
    "nav.aiTaxAssistant": "Omuyambi w'enshonga wa AI",

    // Home Page
    "home.hero.badge": "Omuyambi w'enshonga wa AI",
    "home.hero.title": "Sisinkana na Voxa",
    "home.hero.subtitle":
      "Omuyambi wawe w'obugyenzi obw'ennimi nyingi okukukorera ku biri bw'enshonga mu Uganda. Habw'ebibaro ebya hamwe, okubara, n'okuhugira mu rurimi rwawe.",
    "home.hero.startChatting": "Tandika Kwogana Hati",
    "home.hero.tryVoice": "Geriiriza Eddoboozi",
    "home.hero.alwaysFree": "Bwereere Buri gwaahi",
    "home.hero.noRegistration": "Tirikwetaagisa Kwehingura",
    "home.hero.multilingual": "Ennimi Nyingi",

    // Stats
    "stats.questionsAnswered": "Ebebuuzo Ebibwiremu",
    "stats.languagesSupported": "Ennimi Ezikurikirwamu",
    "stats.alwaysAvailable": "Habwongyereza Buri gwaahi",
    "stats.freeToUse": "Bwereere Okukozesa",

    // Features
    "features.whyChoose": "Kiki ekireeramu Voxa?",
    "features.subtitle":
      "Reba obusinguzi bw'obuyambi bw'enshonga na amakuriikuranisa ga AI mu rurimi rwawe",
    "features.aiConversations.title": "Amakuriikuranisa ga AI",
    "features.aiConversations.desc":
      "Kuriikurana ku byebinyuuzo by'enshonga ohabe amakuru ga hamwe era amatuufu",
    "features.multilingual.title": "Okukurikirwa kw'Ennimi Nyingi",
    "features.multilingual.desc":
      "Kiri mu Lungereza, Ruganda, Acholi, Runyankole, n'endala",
    "features.voice.title": "Okukozesa Eddoboozi",
    "features.voice.desc":
      "Garayikiira ebebuuzo byawe n'eddoboozi ly'obuyambi obuteetaagisa mikono",
    "features.instant.title": "Okubara okw'Ahamwe",
    "features.instant.desc":
      "Habwa okubara okw'ahamwe okwa PAYE, VAT, n'enshonga endala",

    // Benefits
    "benefits.title": "Ekizimbiwemu Uganda, Ekikozesibwemu Abandi Bona",
    "benefits.available24":
      "Eharugo essaaha 24/7 ku byebinyuuzo byona by'enshonga",
    "benefits.accurate":
      "Amakuru amatuufu agateireho emboozi za Uganda Revenue Authority",
    "benefits.multiLang": "Okukurikirwa kw'ennimi z'omu kyalo n'ez'amahanga",
    "benefits.voiceText": "Eddoboozi n'okuwandiika okukurikirwa abantu bona",
    "benefits.secure": "Amakuriikuranisa ag'okwesiga era ag'ekyama",
    "benefits.free": "Bwereere okukozesa Abanyauganda bona",

    // Feedback
    "feedback.title": "Dutungire Okutumbura Voxa",
    "feedback.subtitle":
      "Ebirigamu byawe bikatungira okufuura Voxa eri abandi bona. Tugambire ebirikuteebwa n'ebirowoozo byawe.",
    "feedback.placeholder":
      "Tugambire ebirikuteeberwa ku Voxa, ebintu by'oija kureeba, oba engeri gyetusobora okutumbura obumanyirivu bwawe...",
    "feedback.submit": "Sindika Ebirigamu",
    "feedback.success":
      "Twebaza ebirigamu byawe! Tubirikukozesa okutumbura Voxa.",
    "feedback.error": "Okusindika ebirigamu kwanze. Gariiriza doki.",
    "feedback.giveFeedback": "Tuhe Ebirigamu",
    "feedback.name": "Eriinnya Ryawe (Tirikwetaagisa)",
    "feedback.email": "Email Yawe (Tirikwetaagisa)",
    "feedback.message": "Ebirigamu Byawe",
    "feedback.cancel": "Siimuza",
    "feedback.sending": "Nkusindika...",

    // CTA
    "cta.ready": "Orikweetegeka Okutandika?",
    "cta.subtitle":
      "Kwegatte na rukuta rw'Abanyauganda abategyeka Voxa ku byebinyuuzo by'enshonga. Tandika okwogana hati - bwereere tiinahi!",
    "cta.askTaxes": "Buuza Ku Nshonga Yawe Hati",

    // About Page
    "about.title": "Kuri Voxa",
    "about.subtitle":
      "Voxa n'omuyambi w'enshonga ogw'okubanza ogw'ennimi nyingi mu Uganda, ogwakozesibwemu okufuura enshonga eba okufunibwa, okutegyerwa, era etarikoreramu abantu bona.",
    "about.mission": "Ekigenderirwa Kyaitu",
    "about.missionText":
      "Okufuura amagezi g'enshonga mu Uganda gafunibwe abantu bona tukaba tuhairemu omuyambi ogw'amagezi ogw'ennimi nyingi oguyamba abantu n'amabizinensi okutegyera obuvunaanyizibwa bwabwe obw'enshonga, okukora okubara okutuufu, era okugoberera ebyetaago bya Uganda Revenue Authority.",
    "our.Values": "Ebihango byaitu",
    "reliable":"Okuhayo amahango g'amazima agashingirize ku mateeka agariho hati",

    // Chat Page
    "chat.recentChats": "Amakuriikuranisa ag'Ahabwongyereza",
    "chat.online": "Ku mukutu",
    "chat.typePlaceholder": "Wandiika ekibuuzo ky'enshonga hanu...",
    "chat.recording": "Nkurata...",
    "chat.disclaimer":
      "Voxa akozesa AI. Amakuru gayinza kutaba gatuufu buri gwaahi. Hakikira na URA ku mubwirirwa ogw'obubwere.",
    "chat.welcomeMessage":
      "Nkaishoma! Ninye Voxa, omuyambi wawe w'enshonga wa AI. Ndi hanu okukuyamba ku byebinyuuzo byona eby'enshonga mu Uganda. Nkuyambe nkihi leero?",

    // Calculator
    "calc.title": "Okubara Enshonga",
    "calc.subtitle":
      "Bara PAYE yawe, VAT, n'obuvunaanyizibwa bw'enshonga obundi okusinziira ku migenzo gy'enshonga egiri mu Uganda hati",
    "calc.paye": "Okubara PAYE",
    "calc.vat": "Okubara VAT",
    "calc.salary": "Omugaso gw'Omushara (UGX)",
    "calc.enterSalary": "Teeka omushara gwawe",
    "calc.frequency": "Engeri y'Okuhwera",
    "calc.monthly": "Buri Kwezi",
    "calc.annual": "Buri Mwaka",
    "calc.calculate": "Bara PAYE",
    "calc.results": "Ebivaamu mu Kubara PAYE",
    "calc.gross": "Omushara Ogutakenderwemu:",
    "calc.tax": "Enshonga ya PAYE:",
    "calc.net": "Omushara Ogusigireyo:",
    "calc.breakdown": "Okugabanya Enshonga:",

    // Login Page
    "login.title": "Tugarukire Hamwe",
    "login.subtitle": "Injira okwongere emboozi z'enshonga na Voxa",
    "login.signIn": "Injira",
    "login.email": "Endagiriro ya Email",
    "login.password": "Ekigambo ky'Okuyingira",
    "login.emailPlaceholder": "Teeka email yawe",
    "login.passwordPlaceholder": "Teeka ekigambo ky'okuyingira",
    "login.rememberMe": "Nzijukire",
    "login.forgotPassword": "Weerabidde ekigambo ky'okuyingira?",
    "login.signingIn": "Nkuyingira...",
    "login.orContinue": "Ninga ogyenda na",
    "login.googleSignIn": "Gyenda na Google",
    "login.noAccount": "Tolina account?",
    "login.signUpHere": "Yehingure hanu",
    "login.backToHome": "Garuka ku Aharugo",
    "login.aiTaxAssistant": "Omuyambi w'enshonga wa AI",
    "login.loginSuccess": "Okuyingira kwakoze! Nkureeta...",
    "login.loginFailed": "Okuyingira kwanze. Gariiriza doki.",
    "login.googleLoginFailed": "Okuyingira Google kwanze. Gariiriza doki.",
    "login.termsPolicy": "Okuyingira, okkiriza",
    "login.termsOfService": "Engingo z'Obuweereza",
    "login.and": "na",
    "login.privacyPolicy": "Enkola z'Ekyama",

    // Signup Page
    "signup.title": "Yingira ku Voxa Hati",
    "signup.subtitle":
      "Kora account yawe okutandikire okuhwera obuyambi bw'enshonga obw'obuntu",
    "signup.createAccount": "Kora Account",
    "signup.firstName": "Eriinnya ery'Okubanza",
    "signup.lastName": "Eriinnya ery'Enkomerero",
    "signup.email": "Endagiriro ya Email",
    "signup.password": "Ekigambo ky'Okuyingira",
    "signup.confirmPassword": "Hakikira Ekigambo ky'Okuyingira",
    "signup.firstNamePlaceholder": "Eriinnya ery'okubanza",
    "signup.lastNamePlaceholder": "Eriinnya ery'enkomerero",
    "signup.emailPlaceholder": "Teeka email yawe",
    "signup.passwordPlaceholder": "Kora ekigambo ky'okuyingira",
    "signup.confirmPasswordPlaceholder": "Hakikira ekigambo ky'okuyingira",
    "signup.agreeToTerms": "Nkiriza",
    "signup.termsOfService": "Engingo z'Obuweereza",
    "signup.and": "na",
    "signup.privacyPolicy": "Enkola z'Ekyama",
    "signup.creatingAccount": "Nkukora account...",
    "signup.orContinue": "Oba genda na",
    "signup.googleSignUp": "Genda na Google",
    "signup.haveAccount": "Orikurimu account?",
    "signup.signInHere": "Yingira hanu",
    "signup.backToHome": "Garuka ku Aharugo",
    "signup.aiTaxAssistant": "Omuyambi w'enshonga wa AI",
    "signup.accountCreated":
      "Account ekorezemu bulungi! Reba email yawe okuhakikira account yawe.",
    "signup.signupFailed": "Okweyingura kwanze. Gariiriza doki.",
    "signup.googleSignupFailed":
      "Okweyingura kwa Google kwanze. Gariiriza doki.",
    "signup.passwordsNoMatch": "Ebigambo by'okuyingira tibirikukwatagana",
    "signup.passwordTooShort":
      "Ekigambo ky'okuyingira kirikubeera obureeba bwa 6 oba okurenga",
    "signup.termsAgreement": "Okukora account, okkiriza",

    // Common
    "common.loading": "Nkuteekateeka...",
    "common.error": "Ikosa",
    "common.success": "Birikoze",
    "common.cancel": "Siimuza",
    "common.save": "Kunga",
    "common.close": "Gara",
    "common.next": "Ekirikurikira",
    "common.previous": "Ekihaiseyo",
    "common.submit": "Sindika",
  },

  luo: {
    // Navigation (similar to Acholi but with some variations)
    "nav.home": "Dala",
    "nav.chat": "Wuoyo",
    "nav.about": "Kuom Voxa",
    "nav.calculator": "Kwan",
    "nav.laws": "Chike",
    "nav.contact": "Wuoyowa",
    "nav.login": "Donj",
    "nav.signup": "Chak",
    "nav.profile": "Wechi",
    "nav.logout": "Wuok",
    "nav.language": "Dhok",
    "nav.aiTaxAssistant": "Jakony osuru mar AI",

    // Home Page
    "home.hero.badge": "Jakony osuru mar AI",
    "home.hero.title": "Rom gi Voxa",
    "home.hero.subtitle":
      "Jakony ni mariek ma tiyo gi dhok mopogore me konyoi kuom weche osuru mag Uganda. Yud duoko mapiyo, kwan, gi yore mi dhok mitimore.",
    "home.hero.startChatting": "Chak Wuoyo Sani",
    "home.hero.tryVoice": "Tem dwol",
    "home.hero.alwaysFree": "Nono seche duto",
    "home.hero.noRegistration": "Ok dwaro chako",
    "home.hero.multilingual": "Dhok mopogore",

    // Features
    "features.whyChoose": "Angʼo momiyo iyiero Voxa?",
    "features.subtitle":
      "Ne kinde manyien mar kony osuru gi wuoyo AI e dhok mitimore",

    // Feedback
    "feedback.title": "Kony wa me yubo Voxa",
    "feedback.subtitle":
      "Paro ni konyo wa me miyo Voxa ber ne dano duto. Pok paro ni gi tam ma in-go.",
    "feedback.placeholder":
      "Nyis wa ngo itamo kuom Voxa, gik ma imito neno, kata kaka watwero yubo tiyo ni...",
    "feedback.submit": "Or Tam",
    "feedback.success": "Erokamano kuom tam ni! Wabitiyo kodgi yubo Voxa.",
    "feedback.error": "Oro tam ne ok olare. Tem kendo.",
    "feedback.giveFeedback": "Mi Tam",
    "feedback.name": "Nyingi (Ok chuni)",
    "feedback.email": "Email ni (Ok chuni)",
    "feedback.message": "Tam ni",
    "feedback.cancel": "Juk",
    "feedback.sending": "Aoro...",

    // Login Page
    "login.title": "Waduok Kendo",
    "login.subtitle": "Donj mondo idhi nyime kod wuoyo cente gi Voxa",
    "login.signIn": "Donj",
    "login.email": "Kar Email",
    "login.password": "Wach donj",
    "login.emailPlaceholder": "Ket email ni",
    "login.passwordPlaceholder": "Ket wach donj ni",
    "login.rememberMe": "Para",
    "login.forgotPassword": "Wil wach donj?",
    "login.signingIn": "Adonjo...",
    "login.orContinue": "Kata dhi gi",
    "login.googleSignIn": "Dhi gi Google",
    "login.noAccount": "Ionge gi account?",
    "login.signUpHere": "Chaki ka",
    "login.backToHome": "Dog dala",
    "login.aiTaxAssistant": "Jakony osuru AI",
    "login.loginSuccess": "Donjo ber! Akelo...",
    "login.loginFailed": "Donjo ok ber. Tem kendo.",
    "login.googleLoginFailed": "Donjo Google ok ber. Tem kendo.",
    "login.termsPolicy": "Kudonjo, iyie",
    "login.termsOfService": "Chike Tic",
    "login.and": "gi",
    "login.privacyPolicy": "Chike Mopondo",

    // Signup Page
    "signup.title": "Ribo gi Voxa Kawuono",
    "signup.subtitle": "Los account ni mondo ichak yudo kony cente mopogore",
    "signup.createAccount": "Los Account",
    "signup.firstName": "Nying mokwongo",
    "signup.lastName": "Nying mogik",
    "signup.email": "Kar Email",
    "signup.password": "Wach donj",
    "signup.confirmPassword": "Neno Wach donj",
    "signup.firstNamePlaceholder": "Nying mokwongo",
    "signup.lastNamePlaceholder": "Nying mogik",
    "signup.emailPlaceholder": "Ket email ni",
    "signup.passwordPlaceholder": "Los wach donj",
    "signup.confirmPasswordPlaceholder": "Neno wach donj",
    "signup.agreeToTerms": "Ayie",
    "signup.termsOfService": "Chike Tic",
    "signup.and": "gi",
    "signup.privacyPolicy": "Chike Mopondo",
    "signup.creatingAccount": "Alos account...",
    "signup.orContinue": "Kata dhi gi",
    "signup.googleSignUp": "Dhi gi Google",
    "signup.haveAccount": "In gi account?",
    "signup.signInHere": "Donj ka",
    "signup.backToHome": "Dog dala",
    "signup.aiTaxAssistant": "Jakony osuru AI",
    "signup.accountCreated":
      "Account olos maber! Ne email ni mondo ineno account ni.",
    "signup.signupFailed": "Chako ok ber. Tem kendo.",
    "signup.googleSignupFailed": "Chako Google ok ber. Tem kendo.",
    "signup.passwordsNoMatch": "Weche donj ok rom",
    "signup.passwordTooShort": "Wach donj nyaka obed 6 kata moloyo",
    "signup.termsAgreement": "Kulogo account, iyie",

    // Common
    "common.loading": "Teko...",
    "common.error": "Rach",
    "common.success": "Ber",
    "common.cancel": "Juk",
    "common.save": "Kan",
    "common.close": "Lor",
    "common.next": "Machielo",
    "common.previous": "Machon",
    "common.submit": "Or",
  },

  sw: {
    // Navigation
    "nav.home": "Nyumbani",
    "nav.chat": "Ongea",
    "nav.about": "Kuhusu Voxa",
    "nav.calculator": "Kikokotoo",
    "nav.laws": "Sheria",
    "nav.contact": "Wasiliana",
    "nav.login": "Ingia",
    "nav.signup": "Jisajili",
    "nav.profile": "Wasifu",
    "nav.logout": "Toka",
    "nav.language": "Lugha",
    "nav.aiTaxAssistant": "Msaidizi wa Kodi wa AI",

    // Home Page
    "home.hero.badge": "Msaidizi wa Kodi unaotumia AI",
    "home.hero.title": "Kutana na Voxa",
    "home.hero.subtitle":
      "Msaidizi wako wa akili wa lugha nyingi wa kukusaidia katika mfumo wa kodi wa Uganda. Pata majibu ya haraka, hesabu, na mwongozo katika lugha unayopendelea.",
    "home.hero.startChatting": "Anza Kuongea Sasa",
    "home.hero.tryVoice": "Jaribu Sauti",
    "home.hero.alwaysFree": "Bure Kila Wakati",
    "home.hero.noRegistration": "Hakuna Usajili",
    "home.hero.multilingual": "Lugha Nyingi",

    // Stats
    "stats.questionsAnswered": "Maswali Yaliyojibiwa",
    "stats.languagesSupported": "Lugha Zinazotumika",
    "stats.alwaysAvailable": "Inapatikana Kila Wakati",
    "stats.freeToUse": "Bure Kutumia",

    // Features
    "features.whyChoose": "Kwa Nini Chagua Voxa?",
    "features.subtitle":
      "Ona mustakbal wa usaidizi wa kodi na mazungumzo ya AI katika lugha unayopendelea",
    "features.aiConversations.title": "Mazungumzo ya AI",
    "features.aiConversations.desc":
      "Ongea kiasili kuhusu maswali yako ya kodi na upate majibu ya haraka na sahihi",
    "features.multilingual.title": "Msaada wa Lugha Nyingi",
    "features.multilingual.desc":
      "Inapatikana kwa Kiingereza, Luganda, Acholi, Runyankole, na nyingine",
    "features.voice.title": "Mwingiliano wa Sauti",
    "features.voice.desc":
      "Sema maswali yako kwa sauti kwa usaidizi usio na mikono",
    "features.instant.title": "Hesabu za Haraka",
    "features.instant.desc":
      "Pata hesabu za haraka za PAYE, VAT, na kodi nyingine",

    // Benefits
    "benefits.title": "Imeundwa kwa Uganda, Imetengenezwa kwa Kila Mtu",
    "benefits.available24":
      "Inapatikana masaa 24/7 kwa maswali yako yote ya kodi",
    "benefits.accurate":
      "Taarifa sahihi kulingana na miongozo ya Uganda Revenue Authority",
    "benefits.multiLang": "Msaada wa lugha za ndani na za kimataifa",
    "benefits.voiceText": "Ingizo la sauti na maandishi kwa upatikanaji",
    "benefits.secure": "Mazungumzo salama na ya faragha",
    "benefits.free": "Bure kutumia kwa Wauganda wote",

    // Feedback
    "feedback.title": "Tusaidie Kuboresha Voxa",
    "feedback.subtitle":
      "Maoni yako yanasaidia kufanya Voxa bora kwa kila mtu. Shiriki mawazo na mapendekezo yako.",
    "feedback.placeholder":
      "Tuambie unachofikiria kuhusu Voxa, vipengele unavyotaka kuona, au jinsi tunavyoweza kuboresha uzoefu wako...",
    "feedback.submit": "Tuma Maoni",
    "feedback.success": "Asante kwa maoni yako! Tutatumia kuboresha Voxa.",
    "feedback.error": "Imeshindwa kutuma maoni. Tafadhali jaribu tena.",
    "feedback.giveFeedback": "Toa Maoni",
    "feedback.name": "Jina Lako (Si Lazima)",
    "feedback.email": "Barua Pepe Yako (Si Lazima)",
    "feedback.message": "Maoni Yako",
    "feedback.cancel": "Ghairi",
    "feedback.sending": "Inatuma...",

    // CTA
    "cta.ready": "Uko Tayari Kuanza?",
    "cta.subtitle":
      "Jiunge na maelfu ya Wauganda wanaomwamini Voxa kwa maswali yao ya kodi. Anza kuongea sasa - ni bure kabisa!",
    "cta.askTaxes": "Uliza Kuhusu Kodi Zako Sasa",

    // About Page
    "about.title": "Kuhusu Voxa",
    "about.subtitle":
      "Voxa ni msaidizi wa kwanza wa kodi wa lugha nyingi wa AI nchini Uganda, iliyoundwa kufanya utii wa kodi upatikane, ueleweke, na usio na msongo wa mawazo kwa kila mtu.",
    "about.mission": "Dhamira Yetu",
    "about.missionText":
      "Kufanya maarifa ya kodi nchini Uganda yapatikane kwa kila mtu kwa kutoa msaidizi wa akili wa lugha nyingi ambaye husaidia watu binafsi na biashara kuelewa majukumu yao ya kodi, kufanya hesabu sahihi, na kubaki kutekeleza mahitaji ya Uganda Revenue Authority.",

    // Chat Page
    "chat.recentChats": "Mazungumzo ya Hivi Karibuni",
    "chat.online": "Mkondoni",
    "chat.typePlaceholder": "Chapa swali lako la kodi hapa...",
    "chat.recording": "Inanakili...",
    "chat.disclaimer":
      "Voxa inatumia AI. Taarifa huenda isikuwe sahihi kila wakati. Thibitisha na URA kwa mwongozo rasmi.",
    "chat.welcomeMessage":
      "Karibu! Mimi ni Voxa, msaidizi wako wa kodi wa AI. Niko hapa kukusaidia na maswali yako yote ya kodi nchini Uganda. Ningekusaidia vipi leo?",

    // Calculator
    "calc.title": "Kikokotoo cha Kodi",
    "calc.subtitle":
      "Kokotoa PAYE yako, VAT, na majukumu mengine ya kodi kulingana na viwango vya kodi vya Uganda vya sasa",
    "calc.paye": "Kikokotoo cha PAYE",
    "calc.vat": "Kikokotoo cha VAT",
    "calc.salary": "Kiasi cha Mshahara (UGX)",
    "calc.enterSalary": "Ingiza mshahara wako",
    "calc.frequency": "Mzunguko wa Mapato",
    "calc.monthly": "Kila Mwezi",
    "calc.annual": "Kila Mwaka",
    "calc.calculate": "Kokotoa PAYE",
    "calc.results": "Matokeo ya Kukokotoa PAYE",
    "calc.gross": "Mshahara Mkuu:",
    "calc.tax": "Kodi ya PAYE:",
    "calc.net": "Mshahara Safi:",
    "calc.breakdown": "Mgawanyo wa Kodi:",

    // Login Page
    "login.title": "Karibu Tena",
    "login.subtitle": "Ingia ili kuendelea na mazungumzo yako ya kodi na Voxa",
    "login.signIn": "Ingia",
    "login.email": "Anwani ya Barua Pepe",
    "login.password": "Nenosiri",
    "login.emailPlaceholder": "Ingiza barua pepe yako",
    "login.passwordPlaceholder": "Ingiza nenosiri lako",
    "login.rememberMe": "Nikumbuke",
    "login.forgotPassword": "Umesahau nenosiri?",
    "login.signingIn": "Ninaingia...",
    "login.orContinue": "Au endelea na",
    "login.googleSignIn": "Endelea na Google",
    "login.noAccount": "Huna akaunti?",
    "login.signUpHere": "Jisajili hapa",
    "login.backToHome": "Rudi Nyumbani",
    "login.aiTaxAssistant": "Msaidizi wa Kodi wa AI",
    "login.loginSuccess": "Kuingia kumefanikiwa! Ninakuelekeza...",
    "login.loginFailed": "Kuingia kumeshindwa. Tafadhali jaribu tena.",
    "login.googleLoginFailed":
      "Kuingia kwa Google kumeshindwa. Tafadhali jaribu tena.",
    "login.termsPolicy": "Kwa kuingia, unakubali",
    "login.termsOfService": "Masharti ya Huduma",
    "login.and": "na",
    "login.privacyPolicy": "Sera ya Faragha",

    // Signup Page
    "signup.title": "Jiunge na Voxa Leo",
    "signup.subtitle":
      "Unda akaunti yako ili kuanza kupata usaidizi wa kodi wa kibinafsi",
    "signup.createAccount": "Unda Akaunti",
    "signup.firstName": "Jina la Kwanza",
    "signup.lastName": "Jina la Mwisho",
    "signup.email": "Anwani ya Barua Pepe",
    "signup.password": "Nenosiri",
    "signup.confirmPassword": "Thibitisha Nenosiri",
    "signup.firstNamePlaceholder": "Jina la kwanza",
    "signup.lastNamePlaceholder": "Jina la mwisho",
    "signup.emailPlaceholder": "Ingiza barua pepe yako",
    "signup.passwordPlaceholder": "Unda nenosiri",
    "signup.confirmPasswordPlaceholder": "Thibitisha nenosiri lako",
    "signup.agreeToTerms": "Ninakubali",
    "signup.termsOfService": "Masharti ya Huduma",
    "signup.and": "na",
    "signup.privacyPolicy": "Sera ya Faragha",
    "signup.creatingAccount": "Ninaunda akaunti...",
    "signup.orContinue": "Au endelea na",
    "signup.googleSignUp": "Endelea na Google",
    "signup.haveAccount": "Una akaunti?",
    "signup.signInHere": "Ingia hapa",
    "signup.backToHome": "Rudi Nyumbani",
    "signup.aiTaxAssistant": "Msaidizi wa Kodi wa AI",
    "signup.accountCreated":
      "Akaunti imeundwa kwa mafanikio! Tafadhali angalia barua pepe yako kuthibitisha akaunti yako.",
    "signup.signupFailed": "Usajili umeshindwa. Tafadhali jaribu tena.",
    "signup.googleSignupFailed":
      "Usajili wa Google umeshindwa. Tafadhali jaribu tena.",
    "signup.passwordsNoMatch": "Nenosiri hazifanani",
    "signup.passwordTooShort": "Nenosiri lazima liwe na angalau herufi 6",
    "signup.termsAgreement": "Kwa kuunda akaunti, unakubali",

    // Common
    "common.loading": "Inapakia...",
    "common.error": "Hitilafu",
    "common.success": "Mafanikio",
    "common.cancel": "Ghairi",
    "common.save": "Hifadhi",
    "common.close": "Funga",
    "common.next": "Ifuatayo",
    "common.previous": "Iliyotangulia",
    "common.submit": "Wasilisha",
  },

  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.chat": "Chat",
    "nav.about": "À propos",
    "nav.calculator": "Calculateur",
    "nav.laws": "Lois",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "nav.profile": "Profil",
    "nav.logout": "Déconnexion",
    "nav.language": "Langues",
    "nav.aiTaxAssistant": "Assistant Fiscal IA",

    // Home Page
    "home.hero.badge": "Assistant Fiscal Alimenté par IA",
    "home.hero.title": "Rencontrez Voxa",
    "home.hero.subtitle":
      "Votre assistant multilingue intelligent pour naviguer dans le système fiscal ougandais. Obtenez des réponses instantanées, des calculs et des conseils dans votre langue préférée.",
    "home.hero.startChatting": "Commencer à Chatter",
    "home.hero.tryVoice": "Essayer la Voix",
    "home.hero.alwaysFree": "Toujours Gratuit",
    "home.hero.noRegistration": "Aucune Inscription",
    "home.hero.multilingual": "Multilingue",

    // Stats
    "stats.questionsAnswered": "Questions Répondues",
    "stats.languagesSupported": "Langues Supportées",
    "stats.alwaysAvailable": "Toujours Disponible",
    "stats.freeToUse": "Gratuit à Utiliser",

    // Features
    "features.whyChoose": "Pourquoi Choisir Voxa?",
    "features.subtitle":
      "Découvrez l'avenir de l'assistance fiscale avec des conversations IA dans votre langue préférée",
    "features.aiConversations.title": "Conversations IA",
    "features.aiConversations.desc":
      "Discutez naturellement de vos questions fiscales et obtenez des réponses instantanées et précises",
    "features.multilingual.title": "Support Multilingue",
    "features.multilingual.desc":
      "Disponible en anglais, luganda, acholi, runyankole, et plus",
    "features.voice.title": "Interaction Vocale",
    "features.voice.desc":
      "Posez vos questions à voix haute pour une assistance fiscale mains libres",
    "features.instant.title": "Calculs Instantanés",
    "features.instant.desc":
      "Obtenez des calculs immédiats PAYE, TVA et autres taxes",

    // Benefits
    "benefits.title": "Conçu pour l'Ouganda, Fait pour Tous",
    "benefits.available24":
      "Disponibilité 24/7 pour toutes vos questions fiscales",
    "benefits.accurate":
      "Informations précises basées sur les directives de l'Autorité des Revenus de l'Ouganda",
    "benefits.multiLang":
      "Support pour plusieurs langues locales et internationales",
    "benefits.voiceText": "Entrée vocale et textuelle pour l'accessibilité",
    "benefits.secure": "Conversations sécurisées et privées",
    "benefits.free": "Gratuit à utiliser pour tous les Ougandais",

    // Feedback
    "feedback.title": "Aidez-nous à Améliorer Voxa",
    "feedback.subtitle":
      "Vos commentaires nous aident à rendre Voxa meilleur pour tout le monde. Partagez vos pensées et suggestions.",
    "feedback.placeholder":
      "Dites-nous ce que vous pensez de Voxa, quelles fonctionnalités vous aimeriez voir, ou comment nous pouvons améliorer votre expérience...",
    "feedback.submit": "Envoyer Commentaires",
    "feedback.success":
      "Merci pour vos commentaires! Nous les utiliserons pour améliorer Voxa.",
    "feedback.error": "Échec de l'envoi des commentaires. Veuillez réessayer.",
    "feedback.giveFeedback": "Donner Commentaires",
    "feedback.name": "Votre Nom (Optionnel)",
    "feedback.email": "Votre Email (Optionnel)",
    "feedback.message": "Vos Commentaires",
    "feedback.cancel": "Annuler",
    "feedback.sending": "Envoi...",

    // CTA
    "cta.ready": "Prêt à Commencer?",
    "cta.subtitle":
      "Rejoignez des milliers d'Ougandais qui font confiance à Voxa pour leurs questions fiscales. Commencez à chatter maintenant - c'est complètement gratuit!",
    "cta.askTaxes": "Demandez à Propos de Vos Taxes Maintenant",

    // About Page
    "about.title": "À Propos de Voxa",
    "about.subtitle":
      "Voxa est le premier assistant fiscal multilingue IA de l'Ouganda, conçu pour rendre la conformité fiscale accessible, compréhensible et sans stress pour tous.",
    "about.mission": "Notre Mission",
    "about.missionText":
      "Démocratiser les connaissances fiscales en Ouganda en fournissant un assistant intelligent multilingue qui aide les individus et les entreprises à comprendre leurs obligations fiscales, faire des calculs précis, et rester conformes aux exigences de l'Autorité des Revenus de l'Ouganda.",

    // Chat Page
    "chat.recentChats": "Discussions Récentes",
    "chat.online": "En Ligne",
    "chat.typePlaceholder": "Tapez votre question fiscale ici...",
    "chat.recording": "Enregistrement...",
    "chat.disclaimer":
      "Voxa est alimenté par IA. Les informations peuvent ne pas toujours être exactes. Vérifiez toujours avec URA pour des conseils officiels.",
    "chat.welcomeMessage":
      "Salut! Je suis Voxa, votre assistant fiscal IA. Je suis ici pour vous aider avec toutes vos questions fiscales en Ouganda. Comment puis-je vous aider aujourd'hui?",

    // Calculator
    "calc.title": "Calculateur de Taxes",
    "calc.subtitle":
      "Calculez votre PAYE, TVA, et autres obligations fiscales basées sur les taux fiscaux actuels de l'Ouganda",
    "calc.paye": "Calculateur PAYE",
    "calc.vat": "Calculateur TVA",
    "calc.salary": "Montant du Salaire (UGX)",
    "calc.enterSalary": "Entrez votre salaire",
    "calc.frequency": "Fréquence de Revenu",
    "calc.monthly": "Mensuel",
    "calc.annual": "Annuel",
    "calc.calculate": "Calculer PAYE",
    "calc.results": "Résultats du Calcul PAYE",
    "calc.gross": "Salaire Brut:",
    "calc.tax": "Taxe PAYE:",
    "calc.net": "Salaire Net:",
    "calc.breakdown": "Répartition des Taxes:",

    // Login Page
    "login.title": "Bon Retour",
    "login.subtitle":
      "Connectez-vous pour continuer vos conversations fiscales avec Voxa",
    "login.signIn": "Se Connecter",
    "login.email": "Adresse Email",
    "login.password": "Mot de Passe",
    "login.emailPlaceholder": "Entrez votre email",
    "login.passwordPlaceholder": "Entrez votre mot de passe",
    "login.rememberMe": "Se souvenir de moi",
    "login.forgotPassword": "Mot de passe oublié?",
    "login.signingIn": "Connexion...",
    "login.orContinue": "Ou continuer avec",
    "login.googleSignIn": "Continuer avec Google",
    "login.noAccount": "Pas de compte?",
    "login.signUpHere": "Inscrivez-vous ici",
    "login.backToHome": "Retour à l'Accueil",
    "login.aiTaxAssistant": "Assistant Fiscal IA",
    "login.loginSuccess": "Connexion réussie! Redirection...",
    "login.loginFailed": "Connexion échouée. Veuillez réessayer.",
    "login.googleLoginFailed": "Connexion Google échouée. Veuillez réessayer.",
    "login.termsPolicy": "En vous connectant, vous acceptez nos",
    "login.termsOfService": "Conditions de Service",
    "login.and": "et",
    "login.privacyPolicy": "Politique de Confidentialité",

    // Signup Page
    "signup.title": "Rejoignez Voxa Aujourd'hui",
    "signup.subtitle":
      "Créez votre compte pour commencer à recevoir une assistance fiscale personnalisée",
    "signup.createAccount": "Créer un Compte",
    "signup.firstName": "Prénom",
    "signup.lastName": "Nom de Famille",
    "signup.email": "Adresse Email",
    "signup.password": "Mot de Passe",
    "signup.confirmPassword": "Confirmer le Mot de Passe",
    "signup.firstNamePlaceholder": "Prénom",
    "signup.lastNamePlaceholder": "Nom de famille",
    "signup.emailPlaceholder": "Entrez votre email",
    "signup.passwordPlaceholder": "Créez un mot de passe",
    "signup.confirmPasswordPlaceholder": "Confirmez votre mot de passe",
    "signup.agreeToTerms": "J'accepte les",
    "signup.termsOfService": "Conditions de Service",
    "signup.and": "et",
    "signup.privacyPolicy": "Politique de Confidentialité",
    "signup.creatingAccount": "Création du compte...",
    "signup.orContinue": "Ou continuer avec",
    "signup.googleSignUp": "Continuer avec Google",
    "signup.haveAccount": "Vous avez un compte?",
    "signup.signInHere": "Connectez-vous ici",
    "signup.backToHome": "Retour à l'Accueil",
    "signup.aiTaxAssistant": "Assistant Fiscal IA",
    "signup.accountCreated":
      "Compte créé avec succès! Veuillez vérifier votre email pour confirmer votre compte.",
    "signup.signupFailed": "Inscription échouée. Veuillez réessayer.",
    "signup.googleSignupFailed":
      "Inscription Google échouée. Veuillez réessayer.",
    "signup.passwordsNoMatch": "Les mots de passe ne correspondent pas",
    "signup.passwordTooShort":
      "Le mot de passe doit contenir au moins 6 caractères",
    "signup.termsAgreement": "En créant un compte, vous acceptez nos",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.save": "Sauvegarder",
    "common.close": "Fermer",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.submit": "Soumettre",
  },

  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.chat": "المحادثة",
    "nav.about": "حول فوكسا",
    "nav.calculator": "الحاسبة",
    "nav.laws": "القوانين",
    "nav.contact": "التواصل",
    "nav.login": "تسجيل الدخول",
    "nav.signup": "إنشاء حساب",
    "nav.profile": "الملف الشخصي",
    "nav.logout": "تسجيل الخروج",
    "nav.language": "اللغة",
    "nav.aiTaxAssistant": "مساعد الضرائب بالذكاء الاصطناعي",

    // Home Page
    "home.hero.badge": "مساعد الضرائب بالذكاء الاصطناعي",
    "home.hero.title": "تعرف على فوكسا",
    "home.hero.subtitle":
      "مساعدك الذكي متعدد اللغات للتنقل في نظام الضرائب الأوغندي. احصل على إجابات فورية وحسابات وإرشادات بلغتك المفضلة.",
    "home.hero.startChatting": "ابدأ المحادثة الآن",
    "home.hero.tryVoice": "جرب الإدخال الصوتي",
    "home.hero.alwaysFree": "مجاني دائماً",
    "home.hero.noRegistration": "لا يتطلب تسجيل",
    "home.hero.multilingual": "متعدد اللغات",

    // Stats
    "stats.questionsAnswered": "الأسئلة المجابة",
    "stats.languagesSupported": "اللغات المدعومة",
    "stats.alwaysAvailable": "متاح دائماً",
    "stats.freeToUse": "مجاني للاستخدام",

    // Features
    "features.whyChoose": "لماذا تختار فوكسا؟",
    "features.subtitle":
      "اكتشف مستقبل المساعدة الضريبية مع محادثات الذكاء الاصطناعي بلغتك المفضلة",
    "features.aiConversations.title": "محادثات الذكاء الاصطناعي",
    "features.aiConversations.desc":
      "تحدث بطبيعية حول أسئلة الضرائب واحصل على إجابات فورية ودقيقة",
    "features.multilingual.title": "دعم متعدد اللغات",
    "features.multilingual.desc":
      "متاح باللغة الإنجليزية ولوغاندا وأشولي ورونيانكولي والمزيد",
    "features.voice.title": "التفاعل الصوتي",
    "features.voice.desc":
      "اطرح أسئلتك بصوت عالٍ للحصول على مساعدة ضريبية بدون استخدام اليدين",
    "features.instant.title": "حسابات فورية",
    "features.instant.desc":
      "احصل على حسابات فورية لـ PAYE وضريبة القيمة المضافة والضرائب الأخرى",

    // Benefits
    "benefits.title": "مصمم لأوغندا، مصنوع للجميع",
    "benefits.available24": "متاح 24/7 لجميع أسئلة الضرائب",
    "benefits.accurate":
      "معلومات دقيقة مبنية على إرشادات هيئة الإيرادات الأوغندية",
    "benefits.multiLang": "دعم للغات المحلية والدولية المتعددة",
    "benefits.voiceText": "إدخال صوتي ونصي لسه��لة الوصول",
    "benefits.secure": "محادثات آمنة وخاصة",
    "benefits.free": "مجاني للاستخدام لجميع الأوغنديين",

    // Feedback
    "feedback.title": "ساعدنا في تحسين فوكسا",
    "feedback.subtitle":
      "ملاحظاتك تساعدنا في جعل فوكسا أفضل للجميع. شارك أفكارك واقتراحاتك.",
    "feedback.placeholder":
      "أخبرنا برأيك في فوكسا، والميزات التي تود رؤيتها، أو كيف يمكننا تحسين تجربتك...",
    "feedback.submit": "إرسال الملاحظات",
    "feedback.success": "شكراً لك على ملاحظاتك! سنستخدمها لتحسين فوكسا.",
    "feedback.error": "فشل في إرسال الملاحظات. حاول مرة أخرى.",
    "feedback.giveFeedback": "إعطاء ملاحظات",
    "feedback.name": "اسمك (اختياري)",
    "feedback.email": "بريدك الإلكتروني (اختياري)",
    "feedback.message": "ملاحظاتك",
    "feedback.cancel": "إلغاء",
    "feedback.sending": "جاري الإرسال...",

    // CTA
    "cta.ready": "هل أنت مستعد للبدء؟",
    "cta.subtitle":
      "انضم إلى آلاف الأوغنديين الذين يثقون في فوكسا لأسئلة الضرائب. ابدأ المحادثة الآن - مجاني تماماً!",
    "cta.askTaxes": "اسأل عن ضرائبك الآن",

    // About Page
    "about.title": "حول فوكسا",
    "about.subtitle":
      "فوكسا هو أول مساعد ضرائب متعدد اللغات بالذكاء الاصطناعي في أوغندا، مصمم لجعل الامتثال الضريبي في متناول الجميع ومفهوماً وخالياً من التوتر.",
    "about.mission": "مهمتنا",
    "about.missionText":
      "إضفاء الطابع الديمقراطي على معرفة الضرائب في أوغندا من خلال توفير مساعد ذكي متعدد اللغات يساعد الأفراد والشركات على فهم التزاماتهم الضريبية وإجراء حسابات دقيقة والبقاء متوافقين مع متطلبات هيئة الإيرادات الأوغندية.",

    // Chat Page
    "chat.recentChats": "المحادثات الأخيرة",
    "chat.online": "متصل",
    "chat.typePlaceholder": "اكتب سؤال الضرائب هنا...",
    "chat.recording": "جاري التسجيل...",
    "chat.disclaimer":
      "فوكسا مدعوم بالذكاء الاصطناعي. قد لا تكون المعلومات دقيقة دائماً. تحقق دائماً مع URA للإرشادات الرس��ية.",
    "chat.welcomeMessage":
      "مرحباً! أنا فوكسا، مساعد الضرائب بالذكاء الاصطناعي. أنا هنا لمساعدتك في جميع أسئلة الضرائب في أوغندا. كيف يمكنني مساعدتك اليوم؟",
    "chat.options": "خيارات المحادثة",
    "chat.starChat": "تمييز المحادثة بنجمة",
    "chat.unstarChat": "إزالة النجمة من المحادثة",
    "chat.pinChat": "تثبيت المحادثة",
    "chat.unpinChat": "إلغاء تثبيت المحادثة",
    "chat.muteNotifications": "كتم الإشعارات",
    "chat.unmuteNotifications": "إلغاء كتم الإشعارات",
    "chat.searchInChat": "البحث في المحادثة",
    "chat.viewMedia": "عرض الوسائط",
    "chat.viewDocuments": "عرض المستندات",
    "chat.exportChat": "تصدير المحادثة",
    "chat.shareChat": "مشاركة المحادثة",
    "chat.archiveChat": "أرشفة المحادثة",
    "chat.unarchiveChat": "إلغاء أرشفة المحادثة",
    "chat.chatSettings": "إعدادات المحادثة",
    "chat.helpSupport": "المساعدة والدعم",
    "chat.clearChat": "مسح ��لمحادثة",

    // Calculator
    "calc.title": "حاسبة الضرائب",
    "calc.subtitle":
      "احسب ضريبة PAYE وضريبة القيمة المضافة والالتزامات الضريبية الأخرى بناءً على معدلات الضرائب الحالية في أوغندا",
    "calc.paye": "حاسبة PAYE",
    "calc.vat": "حاسبة ضريبة القيمة المضافة",
    "calc.salary": "مبلغ الراتب (UGX)",
    "calc.enterSalary": "أدخل راتبك",
    "calc.frequency": "تكرار الدخل",
    "calc.monthly": "شهرياً",
    "calc.annual": "سنوياً",
    "calc.calculate": "احسب PAYE",
    "calc.results": "نتائج حساب PAYE",
    "calc.gross": "الراتب الإجمالي:",
    "calc.tax": "ضريبة PAYE:",
    "calc.net": "الراتب الصافي:",
    "calc.breakdown": "تفصيل الضرائب:",

    // Login Page
    "login.title": "مرحباً بعودتك",
    "login.subtitle": "سجل الدخول لمتابعة محادثات الضرائب مع فوكسا",
    "login.signIn": "تسجيل الدخول",
    "login.email": "عنوان البريد الإلكتروني",
    "login.password": "كلمة المرور",
    "login.emailPlaceholder": "أدخل بريدك الإلكتروني",
    "login.passwordPlaceholder": "أدخل كلمة المرور",
    "login.rememberMe": "تذكرني",
    "login.forgotPassword": "نسيت كلمة المرور؟",
    "login.signingIn": "جاري تسجيل الدخول...",
    "login.orContinue": "أو تابع مع",
    "login.googleSignIn": "متابعة مع جوجل",
    "login.noAccount": "ليس لديك حساب؟",
    "login.signUpHere": "سجل هنا",
    "login.backToHome": "العودة للرئيسية",
    "login.aiTaxAssistant": "مساعد الضرائب بالذكاء الاصطناعي",
    "login.loginSuccess": "تم تسجيل الدخول بنجاح! جاري التوجيه...",
    "login.loginFailed": "فشل تسجيل الدخول. حاول مرة أخرى.",
    "login.googleLoginFailed": "فشل تسجيل الدخول بجوجل. حاول مرة أخرى.",
    "login.termsPolicy": "بتسجيل الدخول، أنت توافق على",
    "login.termsOfService": "شروط الخدمة",
    "login.and": "و",
    "login.privacyPolicy": "سياسة الخصوصية",

    // Signup Page
    "signup.title": "انضم إلى فوكسا اليوم",
    "signup.subtitle": "أنشئ حسابك لبدء الحصول على المساعدة الضريبية الشخصية",
    "signup.createAccount": "إنشاء حساب",
    "signup.firstName": "الاسم الأول",
    "signup.lastName": "اسم العائلة",
    "signup.email": "عنوان البريد الإلكتروني",
    "signup.password": "كلمة المرور",
    "signup.confirmPassword": "تأكيد كلمة المرور",
    "signup.firstNamePlaceholder": "الاسم الأول",
    "signup.lastNamePlaceholder": "اسم العائلة",
    "signup.emailPlaceholder": "أدخل بريدك الإلكتروني",
    "signup.passwordPlaceholder": "أنشئ كلمة مرور",
    "signup.confirmPasswordPlaceholder": "أكد كلمة المرور",
    "signup.agreeToTerms": "أوافق على",
    "signup.termsOfService": "شروط الخدمة",
    "signup.and": "و",
    "signup.privacyPolicy": "سياسة الخصوصية",
    "signup.creatingAccount": "جاري إنشاء الحساب...",
    "signup.orContinue": "أو تابع مع",
    "signup.googleSignUp": "متابعة مع جوجل",
    "signup.haveAccount": "لديك حساب؟",
    "signup.signInHere": "سجل الدخول هنا",
    "signup.backToHome": "العودة للرئيسية",
    "signup.aiTaxAssistant": "مساعد الضرائب بالذكاء الاصطناعي",
    "signup.accountCreated":
      "تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني لتأكيد حسابك.",
    "signup.signupFailed": "فشل التسجيل. حاول مرة أخرى.",
    "signup.googleSignupFailed": "فشل التسجيل بجوجل. حاول مرة أخرى.",
    "signup.passwordsNoMatch": "كلمات المرور غير متطابقة",
    "signup.passwordTooShort": "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل",
    "signup.termsAgreement": "بإنشاء حساب، أنت توافق على",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.close": "إغلاق",
    "common.next": "التالي",
    "common.previous": "السابق",
    "common.submit": "إرسال",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    // Store in localStorage for persistence
    localStorage.setItem("voxa-language", lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  // Load saved language on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem("voxa-language") as LanguageCode;
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const languages = [
  { code: "en" as LanguageCode, name: "English", flag: "🇺🇸" },
  { code: "lug" as LanguageCode, name: "Luganda", flag: "🇺🇬" },
  { code: "ach" as LanguageCode, name: "Acholi", flag: "🇺🇬" },
  { code: "rny" as LanguageCode, name: "Runyankole", flag: "🇺🇬" },
  { code: "luo" as LanguageCode, name: "Luo", flag: "����🇬" },
  { code: "sw" as LanguageCode, name: "Swahili", flag: "🇰🇪" },
  { code: "fr" as LanguageCode, name: "Français", flag: "🇫🇷" },
  { code: "ar" as LanguageCode, name: "العربية", flag: "🇸🇦" },
];
