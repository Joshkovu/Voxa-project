import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Globe, Zap, Heart, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/translations";

const About = () => {
  const { t, currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "ar";

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
      icon: Zap,
      title: t("features.instant.title"),
      description: t("features.instant.desc"),
    },
    {
      icon: Users,
      title: "Community Focused",
      description:
        "Built specifically for Uganda's tax landscape and local business needs",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: t("about.accessibility"),
      description: t("about.accessibilityDesc"),
    },
    {
      icon: Award,
      title: t("about.accuracy"),
      description: t("about.accuracyDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t("about.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("about.mission")}
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                {t("about.missionText")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t("features.whyChoose")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t("about.values")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span>{value.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("about.technology")}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{t("about.technologyDesc1")}</p>
                <p>{t("about.technologyDesc2")}</p>
                <div className="flex items-center space-x-2 pt-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    {t("about.readyIntegration")}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-2">
                      <span className="text-sm text-gray-600">
                        {currentLanguage === "ar"
                          ? "كيف أحسب ضريبة القيمة المضافة؟"
                          : currentLanguage === "fr"
                            ? "Comment calculer la TVA?"
                            : currentLanguage === "sw"
                              ? "Ningekokotoa VAT vipi?"
                              : currentLanguage === "lug"
                                ? "Nkola ntya okubala VAT?"
                                : "How do I calculate VAT?"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 bg-primary text-white rounded-lg p-3 text-sm">
                      {currentLanguage === "ar"
                        ? "ضريبة القيمة المضافة في أوغندا 18%. للمبالغ غير شاملة الضريبة، اضرب في 0.18 للحصول على الضريبة..."
                        : currentLanguage === "fr"
                          ? "La TVA en Ouganda est de 18%. Pour les montants hors TVA, multipliez par 0,18 pour obtenir la TVA..."
                          : currentLanguage === "sw"
                            ? "Kodi ya VAT huko Uganda ni 18%. Kwa kiasi kisicho jumuisha VAT, zidisha na 0.18 kupata VAT..."
                            : currentLanguage === "lug"
                              ? "VAT mu Uganda ya 18%. Ku miwendo egitannazikiddwamu VAT, guba 0.18 ofune VAT..."
                              : "VAT in Uganda is 18%. For VAT-exclusive amounts, multiply by 0.18 to get VAT. For inclusive amounts, divide by 1.18 to get the base amount..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary to-green-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">{t("cta.ready")}</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  {t("cta.askTaxes")}
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  {t("nav.signup")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
