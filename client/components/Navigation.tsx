import { Link, useLocation } from "react-router-dom";
import { MessageCircle, User, LogOut, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage, languages } from "@/lib/translations";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState("JK");
  const { currentLanguage, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.code === currentLanguage) || languages[0]
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-none">
                  Voxa
                </span>
                <span className="text-xs text-gray-500 leading-none">
                  {t("nav.aiTaxAssistant")}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "text-primary bg-green-50"
                    : "text-gray-600 hover:text-primary hover:bg-green-50",
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-lg">{getCurrentLanguage().flag}</span>
                  <span className="hidden sm:inline">
                    {getCurrentLanguage().name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={cn(
                      "flex items-center space-x-3 cursor-pointer",
                      currentLanguage === language.code && "bg-green-50",
                    )}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Section */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {userInitials}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{t("nav.profile")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t("nav.logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">{t("nav.signup")}</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActive(item.path)
                      ? "text-primary bg-green-50"
                      : "text-gray-600 hover:text-primary hover:bg-green-50",
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {t("nav.language")}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.slice(0, 4).map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        handleLanguageChange(language.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center space-x-2 px-2 py-1 rounded text-sm",
                        currentLanguage === language.code
                          ? "bg-green-50 text-primary"
                          : "hover:bg-gray-50",
                      )}
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Auth */}
              {isLoggedIn ? (
                <div className="px-3 py-2 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {userInitials}
                    </div>
                    <span className="font-medium">{t("nav.profile")}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("nav.logout")}
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 border-t border-gray-200 space-y-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      {t("nav.signup")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
