import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, BookOpen, FileText, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const Laws = () => {
  const lawCategories = [
    {
      title: "Income Tax Act",
      description: "Comprehensive guide to income tax regulations in Uganda",
      icon: FileText,
      sections: [
        "Individual Income Tax",
        "Corporate Income Tax",
        "Capital Gains Tax",
        "Withholding Tax",
      ],
    },
    {
      title: "Value Added Tax Act",
      description: "VAT regulations and requirements",
      icon: BookOpen,
      sections: [
        "VAT Registration",
        "VAT Rates and Exemptions",
        "VAT Returns and Filing",
        "Import and Export VAT",
      ],
    },
    {
      title: "Tax Procedures Code Act",
      description: "Administrative procedures and compliance requirements",
      icon: Scale,
      sections: [
        "Tax Registration",
        "Returns and Assessments",
        "Appeals and Objections",
        "Penalties and Interest",
      ],
    },
  ];

  const quickLinks = [
    "Uganda Revenue Authority (URA) Official Website",
    "Tax Laws and Regulations",
    "Tax Forms and Templates",
    "Taxpayer Rights and Obligations",
    "Recent Tax Law Updates",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Uganda Tax Laws
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive guide to Uganda's tax laws, regulations, and
            compliance requirements
          </p>
        </div>

        {/* Law Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {lawCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <div className="space-y-2">
                    {category.sections.map((section, sectionIndex) => (
                      <div
                        key={sectionIndex}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-sm font-medium">{section}</span>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Quick Links & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span className="font-medium">{link}</span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Notice */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're working on providing comprehensive access to Uganda's tax
              laws and regulations. This section will include searchable tax
              laws, recent updates, and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Request a Specific Law</Button>
              <Button size="lg" variant="outline">
                Subscribe for Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Laws;
