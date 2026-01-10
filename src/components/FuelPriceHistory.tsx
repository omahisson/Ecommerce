import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface FuelPriceHistoryProps {
  fuel: any;
  onBack: () => void;
}

// Mock data for price history
const mockPriceHistory = [
  {
    id: "1",
    date: "2024-01-20",
    previousPrice: "R$ 5,35",
    newPrice: "R$ 5,45",
    responsible: "João Silva",
    reason: "Aumento do fornecedor",
    trend: "up"
  },
  {
    id: "2", 
    date: "2024-01-15",
    previousPrice: "R$ 5,40",
    newPrice: "R$ 5,35",
    responsible: "Maria Santos",
    reason: "Ajuste de margem",
    trend: "down"
  },
  {
    id: "3",
    date: "2024-01-10",
    previousPrice: "R$ 5,30",
    newPrice: "R$ 5,40",
    responsible: "Carlos Oliveira",
    reason: "Reajuste semanal",
    trend: "up"
  },
  {
    id: "4",
    date: "2024-01-05",
    previousPrice: "R$ 5,30",
    newPrice: "R$ 5,30",
    responsible: "Ana Costa",
    reason: "Manutenção de preço",
    trend: "stable"
  },
  {
    id: "5",
    date: "2024-01-01",
    previousPrice: "R$ 5,25",
    newPrice: "R$ 5,30",
    responsible: "João Silva",
    reason: "Início do ano",
    trend: "up"
  }
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    default:
      return <Minus className="h-4 w-4 text-gray-500" />;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "destructive";
    case "down":
      return "default";
    default:
      return "secondary";
  }
};

export function FuelPriceHistory({ fuel, onBack }: FuelPriceHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2>Histórico de Preços - {fuel.name}</h2>
          <p className="text-muted-foreground">Visualize todas as alterações de preço deste combustível</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Histórico de Alterações
            <Badge variant="outline">{mockPriceHistory.length} registros</Badge>
          </CardTitle>
          <CardDescription>
            Preço atual: {fuel.price} • Fornecedor: {fuel.supplier}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPriceHistory.map((record, index) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(record.trend)}
                      <span className="font-medium">
                        {record.previousPrice} → {record.newPrice}
                      </span>
                    </div>
                    <Badge 
                      variant={getTrendColor(record.trend)}
                      className="text-xs"
                    >
                      {record.trend === "up" ? "Aumento" : 
                       record.trend === "down" ? "Redução" : "Mantido"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Data:</span> {new Date(record.date).toLocaleDateString('pt-BR')}
                    </div>
                    <div>
                      <span className="font-medium">Responsável:</span> {record.responsible}
                    </div>
                    <div>
                      <span className="font-medium">Motivo:</span> {record.reason}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    #{index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {mockPriceHistory.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma alteração de preço registrada ainda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo estatístico */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Período</CardTitle>
          <CardDescription>
            Estatísticas das alterações nos últimos 30 dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-medium">5</div>
              <div className="text-sm text-muted-foreground">Total de Alterações</div>
            </div>
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-medium text-red-600">3</div>
              <div className="text-sm text-red-600">Aumentos</div>
            </div>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-medium text-green-600">1</div>
              <div className="text-sm text-green-600">Reduções</div>
            </div>
            <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-2xl font-medium text-gray-600">1</div>
              <div className="text-sm text-gray-600">Manutenções</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}