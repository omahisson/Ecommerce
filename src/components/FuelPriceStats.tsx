import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface FuelPriceStatsProps {
  fuel: any;
  onBack: () => void;
}

// Mock data for charts
const priceEvolutionData = [
  { date: "01/01", price: 5.25, month: "Jan" },
  { date: "05/01", price: 5.30, month: "Jan" },
  { date: "10/01", price: 5.40, month: "Jan" },
  { date: "15/01", price: 5.35, month: "Jan" },
  { date: "20/01", price: 5.45, month: "Jan" },
  { date: "25/01", price: 5.45, month: "Jan" },
  { date: "30/01", price: 5.50, month: "Jan" }
];

const monthlyAverageData = [
  { month: "Out", average: 5.15, changes: 4 },
  { month: "Nov", average: 5.22, changes: 3 },
  { month: "Dez", average: 5.28, changes: 5 },
  { month: "Jan", average: 5.38, changes: 5 }
];

const competitorComparison = [
  { competitor: "Posto A", price: 5.42 },
  { competitor: "Posto B", price: 5.48 },
  { competitor: "Nossa Rede", price: 5.45 },
  { competitor: "Posto C", price: 5.50 },
  { competitor: "Posto D", price: 5.55 }
];

export function FuelPriceStats({ fuel, onBack }: FuelPriceStatsProps) {
  const formatPrice = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2>Estatísticas de Preços - {fuel.name}</h2>
          <p className="text-muted-foreground">Análise detalhada da evolução e comparação de preços</p>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-medium text-blue-600">R$ 5,45</div>
            <div className="text-sm text-muted-foreground">Preço Atual</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-medium text-green-600">R$ 5,38</div>
            <div className="text-sm text-muted-foreground">Média do Mês</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-medium text-orange-600">+1,87%</div>
            <div className="text-sm text-muted-foreground">Variação Mensal</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-medium text-purple-600">5</div>
            <div className="text-sm text-muted-foreground">Alterações no Mês</div>
          </CardContent>
        </Card>
      </div>

      {/* Evolução dos preços */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução dos Preços</CardTitle>
          <CardDescription>
            Histórico de preços dos últimos 30 dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  domain={['dataMin - 0.05', 'dataMax + 0.05']}
                  tickFormatter={formatPrice}
                />
                <Tooltip 
                  formatter={(value: number) => [formatPrice(value), "Preço"]}
                  labelStyle={{ color: "#000" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Média mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Média Mensal</CardTitle>
          <CardDescription>
            Preço médio e quantidade de alterações por mês
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAverageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  domain={['dataMin - 0.05', 'dataMax + 0.05']}
                  tickFormatter={formatPrice}
                />
                <Tooltip 
                  formatter={(value: number) => [formatPrice(value), "Preço Médio"]}
                  labelStyle={{ color: "#000" }}
                />
                <Bar dataKey="average" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
          <CardDescription>
            Análise automática baseada nos dados históricos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Tendência de Preços</h4>
              <p className="text-sm text-blue-700">
                O preço teve uma tendência de alta nos últimos 30 dias, com aumento de 1,87%. 
                A maior parte dos ajustes foram aumentos seguindo as variações do fornecedor.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}