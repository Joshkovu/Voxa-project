import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator as CalculatorIcon,
  DollarSign,
  Percent,
} from "lucide-react";
import Navigation from "@/components/Navigation";

interface PayeTaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

interface PayeCalculation {
  grossSalary: number;
  taxableIncome: number;
  payeTax: number;
  netSalary: number;
  breakdown: Array<{
    bracket: string;
    rate: number;
    taxableAmount: number;
    tax: number;
  }>;
}

const Calculator = () => {
  const [salary, setSalary] = useState("");
  const [incomeType, setIncomeType] = useState("monthly");
  const [payeResult, setPayeResult] = useState<PayeCalculation | null>(null);

  // VAT Calculator states
  const [vatAmount, setVatAmount] = useState("");
  const [vatType, setVatType] = useState("exclusive"); // exclusive or inclusive
  const [vatResult, setVatResult] = useState<{
    amount: number;
    vat: number;
    total: number;
  } | null>(null);

  // Uganda PAYE tax brackets for 2024 (monthly)
  const payeTaxBrackets: PayeTaxBracket[] = [
    { min: 0, max: 235000, rate: 0 }, // 0% on first UGX 235,000
    { min: 235001, max: 370000, rate: 10 }, // 10% on next UGX 135,000
    { min: 370001, max: 500000, rate: 20 }, // 20% on next UGX 130,000
    { min: 500001, max: null, rate: 30 }, // 30% on income above UGX 500,000
  ];

  const calculatePaye = () => {
    const grossSalary = parseFloat(salary);
    if (isNaN(grossSalary) || grossSalary <= 0) return;

    // Convert to monthly if needed
    let monthlySalary = grossSalary;
    if (incomeType === "annual") {
      monthlySalary = grossSalary / 12;
    }

    // Calculate PAYE using tax brackets
    let totalTax = 0;
    const breakdown: PayeCalculation["breakdown"] = [];

    for (const bracket of payeTaxBrackets) {
      if (monthlySalary <= bracket.min) break;

      const maxInBracket = bracket.max || monthlySalary;
      const taxableInBracket =
        Math.min(monthlySalary, maxInBracket) - bracket.min + 1;

      if (taxableInBracket > 0) {
        const taxInBracket = (taxableInBracket * bracket.rate) / 100;
        totalTax += taxInBracket;

        breakdown.push({
          bracket: bracket.max
            ? `UGX ${bracket.min.toLocaleString()} - UGX ${bracket.max.toLocaleString()}`
            : `UGX ${bracket.min.toLocaleString()}+`,
          rate: bracket.rate,
          taxableAmount: taxableInBracket,
          tax: taxInBracket,
        });
      }
    }

    const result: PayeCalculation = {
      grossSalary: monthlySalary,
      taxableIncome: monthlySalary,
      payeTax: totalTax,
      netSalary: monthlySalary - totalTax,
      breakdown,
    };

    setPayeResult(result);
  };

  const calculateVat = () => {
    const amount = parseFloat(vatAmount);
    if (isNaN(amount) || amount <= 0) return;

    const vatRate = 0.18; // 18% VAT in Uganda

    let result;
    if (vatType === "exclusive") {
      // Amount excludes VAT, calculate VAT to add
      const vat = amount * vatRate;
      const total = amount + vat;
      result = { amount, vat, total };
    } else {
      // Amount includes VAT, calculate VAT portion
      const amountExVat = amount / (1 + vatRate);
      const vat = amount - amountExVat;
      result = { amount: amountExVat, vat, total: amount };
    }

    setVatResult(result);
  };

  useEffect(() => {
    if (salary) calculatePaye();
  }, [salary, incomeType]);

  useEffect(() => {
    if (vatAmount) calculateVat();
  }, [vatAmount, vatType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <CalculatorIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tax Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your PAYE, VAT, and other tax obligations based on
            Uganda's current tax rates
          </p>
        </div>

        {/* Calculator Tabs */}
        <Tabs defaultValue="paye" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="paye" className="text-lg py-3">
              PAYE Calculator
            </TabsTrigger>
            <TabsTrigger value="vat" className="text-lg py-3">
              VAT Calculator
            </TabsTrigger>
          </TabsList>

          {/* PAYE Calculator */}
          <TabsContent value="paye">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    PAYE Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Amount (UGX)</Label>
                    <Input
                      id="salary"
                      type="number"
                      placeholder="Enter your salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income-type">Income Frequency</Label>
                    <Select value={incomeType} onValueChange={setIncomeType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={calculatePaye} className="w-full" size="lg">
                    Calculate PAYE
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              {payeResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>PAYE Calculation Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Gross Salary:</span>
                        <span className="text-lg font-bold">
                          UGX {payeResult.grossSalary.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                        <span className="font-medium">PAYE Tax:</span>
                        <span className="text-lg font-bold text-red-600">
                          UGX {payeResult.payeTax.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="font-medium">Net Salary:</span>
                        <span className="text-lg font-bold text-green-600">
                          UGX {payeResult.netSalary.toLocaleString()}
                        </span>
                      </div>

                      {/* Tax Breakdown */}
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Tax Breakdown:</h4>
                        <div className="space-y-2">
                          {payeResult.breakdown.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm p-2 bg-gray-50 rounded"
                            >
                              <span>
                                {item.bracket} ({item.rate}%)
                              </span>
                              <span>UGX {item.tax.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* VAT Calculator */}
          <TabsContent value="vat">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    VAT Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="vat-amount">Amount (UGX)</Label>
                    <Input
                      id="vat-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={vatAmount}
                      onChange={(e) => setVatAmount(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vat-type">VAT Type</Label>
                    <Select value={vatType} onValueChange={setVatType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exclusive">
                          VAT Exclusive (Add VAT)
                        </SelectItem>
                        <SelectItem value="inclusive">
                          VAT Inclusive (Extract VAT)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={calculateVat} className="w-full" size="lg">
                    Calculate VAT
                  </Button>

                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <strong>Note:</strong> VAT rate in Uganda is 18%. Some goods
                    and services may be exempt or zero-rated.
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              {vatResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>VAT Calculation Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Amount (Exc. VAT):</span>
                        <span className="text-lg font-bold">
                          UGX {vatResult.amount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="font-medium">VAT (18%):</span>
                        <span className="text-lg font-bold text-blue-600">
                          UGX {vatResult.vat.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="font-medium">Total (Inc. VAT):</span>
                        <span className="text-lg font-bold text-green-600">
                          UGX {vatResult.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>PAYE Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>PAYE (Pay As You Earn)</strong> is tax deducted from
                  employment income in Uganda.
                </p>
                <div>
                  <strong>Current Rates (2024):</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>0% on income up to UGX 235,000</li>
                    <li>10% on income from UGX 235,001 - UGX 370,000</li>
                    <li>20% on income from UGX 370,001 - UGX 500,000</li>
                    <li>30% on income above UGX 500,000</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>VAT Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>VAT (Value Added Tax)</strong> is 18% on most goods
                  and services in Uganda.
                </p>
                <div>
                  <strong>Key Points:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Registration required for turnover above UGX 150M</li>
                    <li>Some items are exempt or zero-rated</li>
                    <li>Monthly filing required for registered businesses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
