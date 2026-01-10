import { useState } from "react";
import { Calendar, Download, TrendingUp, Users, DollarSign, Package, Fuel, Settings, BarChart3, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface ReportsPageProps {
  gasStation: GasStation;
}

export function ReportsPage({ gasStation }: ReportsPageProps) {
  const [financialPeriod, setFinancialPeriod] = useState("monthly");
  const [networkPeriod, setNetworkPeriod] = useState("monthly");
  const [pricePeriod, setPricePeriod] = useState("monthly");
  const [stockPeriod, setStockPeriod] = useState("current");
  const [operationalPeriod, setOperationalPeriod] = useState("daily");

  const mockFinancialData = {
    totalRevenue: 125430.50,
    averageTicket: 87.25,
    totalTransactions: 1438,
    topPaymentMethod: "Cartão de Crédito (45%)"
  };

  const mockNetworkData = [
    { name: "Posto Shell Centro", revenue: 125430.50, rank: 1 },
    { name: "Posto BR Rodovia", revenue: 98750.30, rank: 2 },
    { name: "Posto Ipiranga Vila", revenue: 87650.20, rank: 3 },
    { name: "Posto Texaco Norte", revenue: 76540.10, rank: 4 }
  ];

  const mockTopProducts = [
    { name: "Gasolina Comum", sales: 15420, revenue: 89250.30 },
    { name: "Diesel S-10", sales: 8750, revenue: 52800.40 },
    { name: "Etanol", sales: 6320, revenue: 31250.80 },
    { name: "Água Mineral", sales: 2850, revenue: 7125.00 },
    { name: "Refrigerante", sales: 1960, revenue: 8820.00 }
  ];

  const mockPriceHistory = [
    { product: "Gasolina Comum", responsible: "João Silva", oldPrice: 5.85, newPrice: 5.89, date: "2024-09-20", validity: "2024-09-21" },
    { product: "Diesel S-10", responsible: "Maria Santos", oldPrice: 5.95, newPrice: 6.02, date: "2024-09-19", validity: "2024-09-20" },
    { product: "Etanol", responsible: "Carlos Lima", oldPrice: 4.25, newPrice: 4.29, date: "2024-09-18", validity: "2024-09-19" }
  ];

  const mockCriticalStock = [
    { item: "Gasolina Aditivada", quantity: 850, minStock: 1000, status: "Baixo", validity: "2024-12-15" },
    { item: "Óleo Lubrificante 1L", quantity: 12, minStock: 20, status: "Vencimento", validity: "2024-10-30" },
    { item: "Chocolate Lacta", quantity: 8, minStock: 15, status: "Vencimento", validity: "2024-10-25" }
  ];

  const handleDownloadReport = (reportType: string) => {
    // Simular download do relatório
    console.log(`Baixando relatório: ${reportType}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1>Relatórios - {gasStation.name}</h1>
        <p className="text-muted-foreground">
          Analise o desempenho e acompanhe indicadores importantes do seu posto
        </p>
      </div>

      {/* Relatórios Financeiros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Relatórios Financeiros
              </CardTitle>
              <CardDescription>
                Acompanhe faturamento, ticket médio e vendas por período
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={financialPeriod} onValueChange={setFinancialPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => handleDownloadReport("financeiro")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Baixar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Faturamento Total</p>
              <p className="text-2xl font-semibold">R$ {mockFinancialData.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Ticket Médio</p>
              <p className="text-2xl font-semibold">R$ {mockFinancialData.averageTicket.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total de Vendas</p>
              <p className="text-2xl font-semibold">{mockFinancialData.totalTransactions}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Pagamento Principal</p>
              <p className="text-sm font-medium">{mockFinancialData.topPaymentMethod}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios da Rede */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Relatórios da Rede
              </CardTitle>

            </div>
            <div className="flex items-center gap-2">
              <Select value={networkPeriod} onValueChange={setNetworkPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => handleDownloadReport("rede")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Baixar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Ranking de Postos */}
          <div className="space-y-3">
            <h4>Ranking de Faturamento</h4>
            <div className="space-y-2">
              {mockNetworkData.map((posto) => (
                <div key={posto.name} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">#{posto.rank}</Badge>
                    <span className={posto.name === gasStation.name ? "font-semibold" : ""}>{posto.name}</span>
                    {posto.name === gasStation.name && <Badge>Atual</Badge>}
                  </div>
                  <span className="font-medium">R$ {posto.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Produtos Mais Vendidos */}
          <div className="space-y-3">
            <h4>Produtos Mais Vendidos</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Faturamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTopProducts.map((product, index) => (
                  <TableRow key={product.name}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sales.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios de Preço */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Relatórios de Preço
              </CardTitle>

            </div>
            <div className="flex items-center gap-2">
              <Select value={pricePeriod} onValueChange={setPricePeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => handleDownloadReport("precos")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Baixar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Preço Anterior</TableHead>
                <TableHead>Novo Preço</TableHead>
                <TableHead>Data Alteração</TableHead>
                <TableHead>Vigência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPriceHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.responsible}</TableCell>
                  <TableCell>R$ {item.oldPrice.toFixed(2)}</TableCell>
                  <TableCell>R$ {item.newPrice.toFixed(2)}</TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{new Date(item.validity).toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Relatórios de Estoque */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Relatórios de Estoque
              </CardTitle>

            </div>
            <div className="flex items-center gap-2">
              <Select value={stockPeriod} onValueChange={setStockPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Atual</SelectItem>
                  <SelectItem value="movements">Movimentações</SelectItem>
                  <SelectItem value="critical">Vencimento</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => handleDownloadReport("estoque")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Baixar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <h4>Itens em Situação de Vencimento</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Estoque Mín.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Validade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCriticalStock.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.item}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "Vencimento" ? "destructive" : "secondary"}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(item.validity).toLocaleDateString('pt-BR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Operacionais */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Relatórios Operacionais
              </CardTitle>
              <CardDescription>
                Análises por bomba, combustível e turno de trabalho
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={operationalPeriod} onValueChange={setOperationalPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="shift">Por Turno</SelectItem>
                  <SelectItem value="pump">Por Bomba</SelectItem>
                  <SelectItem value="fuel">Por Combustível</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => handleDownloadReport("operacional")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Baixar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Fuel className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bombas Ativas</p>
                    <p className="text-xl font-semibold">8/10</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Turnos Ativos</p>
                    <p className="text-xl font-semibold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Relatórios Hoje</p>
                    <p className="text-xl font-semibold">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}