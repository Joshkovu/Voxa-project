# Voxa - Multilingual AI Tax Assistant 🇺🇬

A modern, responsive web application providing AI-powered tax assistance for Uganda. Built with React, TypeScript, and Supabase authentication. **Now with full multilingual support - click any language to instantly translate the entire interface!**

## 🌟 Features

### 🤖 AI-Powered Chat Interface

- WhatsApp/Messenger-style chat interface
- Context-aware responses about Uganda's tax system
- Real-time typing indicators and smooth animations
- Voice input capability with microphone integration

### 🌍 **Full Multilingual Support with Live Translation**

**Click any language button to instantly translate the entire application!**

- **English** 🇺🇸 - International standard
- **Luganda** 🇺🇬 - Central Uganda (Fully translated)
- **Acholi** 🇺🇬 - Northern Uganda (Fully translated)
- **Runyankole** 🇺🇬 - Western Uganda (Fully translated)
- **Luo** 🇺🇬 - Northern Uganda (Partial translation)
- **Swahili** 🇰🇪 - East African lingua franca (Fully translated)
- **French** 🇫🇷 - International (Fully translated)
- **Arabic** 🇸🇦 - Middle Eastern/North African (Fully translated with RTL support)

**Features:**

- **Instant Translation**: Click any language flag to immediately translate all page content
- **Persistent Selection**: Your language choice is saved and remembered
- **Context-Aware AI**: Voxa responds in your selected language
- **RTL Support**: Arabic language includes proper right-to-left layout
- **Cultural Adaptation**: Translations include local context and examples

### 🔐 Authentication

- Supabase-powered authentication
- Email/password and Google OAuth signup
- User profile management with initials display
- Secure session management

### 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Modern green and white theme
- Smooth animations and transitions

### 🧮 Tax Tools

- PAYE (Pay As You Earn) calculator
- VAT calculator (18% Uganda rate)
- Interactive tax breakdown displays
- Current 2024 Uganda tax brackets

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for authentication)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd voxa-tax-assistant
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Start development server**

```bash
npm run dev
```

5. **Open your browser**
   Visit `http://localhost:8080` to see Voxa in action!

6. **Test the translation system**
   - Click the language selector in the navigation (globe icon with flag)
   - Select any language to see the entire interface translate instantly
   - Try the chat feature to see AI responses in your selected language

## 🏗️ Project Structure

```
client/
├── components/
│   ├── ui/              # Reusable UI components (buttons, inputs, etc.)
│   └── Navigation.tsx   # Main navigation with language selector
├── pages/
│   ├── Home.tsx         # Animated landing page (translated)
│   ├── Chat.tsx         # Main chat interface (translated)
│   ├── About.tsx        # About Voxa (translated)
│   ├── Login.tsx        # Authentication login
│   ├── Signup.tsx       # User registration
│   ├── Calculator.tsx   # Tax calculator tools
│   ├── Laws.tsx         # Tax laws (placeholder)
│   └── Contact.tsx      # Contact page
├── lib/
│   ├── translations.tsx # Complete translation system
│   ├── supabase.ts      # Supabase client configuration
│   └── utils.ts         # Utility functions
└── global.css           # TailwindCSS configuration

server/
├── routes/              # API endpoints
└── index.ts             # Express server setup

shared/
└── api.ts               # Shared TypeScript interfaces
```

## 🎨 Design System

### Colors

- **Primary Green**: `hsl(142, 76%, 36%)` - Uganda-inspired green
- **Accent Green**: `hsl(142, 69%, 58%)` - Lighter accent
- **Background**: Clean white with subtle green gradients
- **Text**: Professional grays for readability

### Components

- Built with Radix UI primitives
- TailwindCSS for styling
- Consistent spacing and typography
- Accessible color contrasts

## 🌐 Translation System

### How It Works

The translation system is built using React Context and provides:

1. **LanguageProvider**: Wraps the entire app and manages current language state
2. **useLanguage Hook**: Provides access to translation functions and current language
3. **Translation Files**: Complete translations stored in `client/lib/translations.tsx`
4. **Persistent Storage**: Selected language is saved in localStorage
5. **RTL Support**: Automatic right-to-left layout for Arabic

### Using Translations

```typescript
import { useLanguage } from "@/lib/translations";

const MyComponent = () => {
  const { t, currentLanguage, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t("home.hero.title")}</h1>
      <p>{t("home.hero.subtitle")}</p>
    </div>
  );
};
```

### Adding New Translations

1. **Add new keys** to the translation object in `client/lib/translations.tsx`
2. **Provide translations** for all supported languages
3. **Use the `t()` function** in your components
4. **Test** by switching languages in the UI

Example:

```typescript
// In translations.tsx
const translations = {
  en: {
    "myKey": "Hello World",
    "myOtherKey": "Welcome to Voxa"
  },
  lug: {
    "myKey": "Nkulamuse Ensi",
    "myOtherKey": "Tusanyuse ku Voxa"
  }
  // ... other languages
};

// In your component
const { t } = useLanguage();
return <h1>{t("myKey")}</h1>; // Displays "Hello World" or "Nkulamuse Ensi"
```

## 🔌 Chatbot Integration

Voxa is designed to easily integrate with:

### Botpress

- RESTful API endpoints ready
- Webhook support for real-time responses
- Custom actions for tax calculations
- Multilingual response support

### Google Gemini

- API integration patterns established
- Environment variables configured
- Context-aware conversation handling
- Language-aware prompt engineering

### Integration Steps

1. Set up your chatbot platform (Botpress/Gemini)
2. Configure webhook URLs in environment variables
3. Update the chat interface to call your API endpoints
4. Ensure responses respect the current language setting
5. Deploy and test conversations in all supported languages

## 🌐 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Environment Setup

- Configure Supabase for authentication
- Set up domain for OAuth redirects
- Enable required authentication providers
- Configure email templates (optional)

## 📱 Mobile Optimization

- **Touch-friendly**: Large tap targets for mobile users
- **Voice input**: Microphone button for accessibility
- **Responsive chat**: Adapts to all screen sizes
- **Fast loading**: Optimized bundle sizes
- **PWA-ready**: Can be installed as mobile app
- **Language switching**: Easy mobile-friendly language selector

## 🇺🇬 Uganda Tax Features

### PAYE Calculator

- 2024 tax brackets implemented
- Monthly and annual salary support
- Detailed tax breakdown display
- Instant calculations
- **Multilingual explanations**

### VAT Calculator

- 18% Uganda VAT rate
- Inclusive/exclusive calculations
- Business registration guidance
- URA compliance information
- **Local language support**

### Tax Information

- Current Uganda Revenue Authority guidelines
- **Local language explanations**
- Cultural context awareness
- Accessible to all education levels

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run typecheck    # TypeScript validation
npm test             # Run tests
npm run format.fix   # Format code
```

### Testing the Translation System

1. **Start the development server**: `npm run dev`
2. **Open the application** in your browser
3. **Click the language selector** (globe icon with flag in navigation)
4. **Select different languages** and watch the interface translate instantly
5. **Test the chat feature** to see AI responses in different languages
6. **Check RTL support** by selecting Arabic

### Adding New Languages

1. **Add language code** to the `LanguageCode` type in `translations.tsx`
2. **Add language object** to the `languages` array
3. **Provide complete translations** in the `translations` object
4. **Test thoroughly** with native speakers
5. **Update documentation**

### Customizing AI Responses

- Edit `generateVoxaResponse()` in `Chat.tsx`
- Add language-specific responses
- Include local context and examples
- Maintain professional, helpful tone in all languages

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Translation Contributions

We welcome native speakers to help improve our translations:

1. **Review existing translations** in `client/lib/translations.tsx`
2. **Suggest improvements** via GitHub issues
3. **Add new languages** following the established pattern
4. **Test thoroughly** on the live application

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Uganda Revenue Authority** - Tax information and guidelines
- **Native speakers** - Translation accuracy and cultural context
- **Supabase** - Authentication and database services
- **Radix UI** - Accessible component primitives
- **TailwindCSS** - Utility-first CSS framework
- **React & TypeScript** - Modern web development

---

**Built with ❤️ for Uganda's taxpayers**

_Making tax compliance accessible to everyone, in every language._

### 🌟 **Try it now: Click any language button to see the magic happen!**
