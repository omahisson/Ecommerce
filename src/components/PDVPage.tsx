import { useState } from "react";
import { Fuel, ShoppingBag, Minus, Plus, Search, Wrench, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { ShiftOpenForm, ShiftData } from "./ShiftOpenForm";
import { ShiftCloseDialog } from "./ShiftCloseDialog";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface PDVPageProps {
  gasStation: GasStation;
}

interface FuelStock {
  id: string;
  name: string;
  type: string;
  currentStock: number;
  lote: string;
  validade: string;
  price: number;
  unit: string;
}

interface ProductStock {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  lote: string;
  validade: string;
  price: number;
  unit: string;
}

interface ServiceStock {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  available: boolean;
}

interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  lote?: string;
  validade?: string;
  type: "fuel" | "product" | "service";
}

// Mock data - substitua por dados reais da sua API
const mockFuels: FuelStock[] = [
  {
    id: "1",
    name: "Gasolina Comum",
    type: "Gasolina",
    currentStock: 5000,
    lote: "LOT001",
    validade: "2024-12-31",
    price: 5.49,
    unit: "L"
  },
  {
    id: "2", 
    name: "Gasolina Aditivada",
    type: "Gasolina",
    currentStock: 3000,
    lote: "LOT002",
    validade: "2024-12-31",
    price: 5.79,
    unit: "L"
  },
  {
    id: "3",
    name: "Etanol",
    type: "Etanol", 
    currentStock: 4500,
    lote: "LOT003",
    validade: "2024-11-30",
    price: 3.89,
    unit: "L"
  },
  {
    id: "4",
    name: "Diesel S-10",
    type: "Diesel",
    currentStock: 8000,
    lote: "LOT004", 
    validade: "2025-01-15",
    price: 4.25,
    unit: "L"
  }
];

const mockProducts: ProductStock[] = [
  {
    id: "1",
    name: "Água Mineral 500ml",
    category: "Bebidas",
    currentStock: 150,
    lote: "H2O001",
    validade: "2025-06-15",
    price: 2.50,
    unit: "un"
  },
  {
    id: "2",
    name: "Refrigerante Coca-Cola 350ml", 
    category: "Bebidas",
    currentStock: 200,
    lote: "COCA001",
    validade: "2024-12-20",
    price: 4.50,
    unit: "un"
  },
  {
    id: "3",
    name: "Chocolate Lacta",
    category: "Doces",
    currentStock: 80,
    lote: "CHOC001",
    validade: "2024-10-30",
    price: 3.75,
    unit: "un"
  },
  {
    id: "4",
    name: "Óleo Lubrificante 1L",
    category: "Automotivo",
    currentStock: 45,
    lote: "OIL001",
    validade: "2026-03-12",
    price: 25.90,
    unit: "un"
  }
];

const mockServices: ServiceStock[] = [
  {
    id: "1",
    name: "Troca de Óleo",
    category: "Manutenção",
    price: 45.00,
    unit: "serviço",
    available: true
  },
  {
    id: "2",
    name: "Lavagem Simples",
    category: "Lavagem",
    price: 15.00,
    unit: "serviço",
    available: true
  },
  {
    id: "3",
    name: "Lavagem Completa",
    category: "Lavagem",
    price: 25.00,
    unit: "serviço",
    available: true
  },
  {
    id: "4",
    name: "Calibragem de Pneus",
    category: "Manutenção",
    price: 5.00,
    unit: "serviço",
    available: true
  },
  {
    id: "5",
    name: "Aspiração Interna",
    category: "Limpeza",
    price: 10.00,
    unit: "serviço",
    available: true
  }
];

export function PDVPage({ gasStation }: PDVPageProps) {
  const [shiftOpen, setShiftOpen] = useState(false);
  const [shiftData, setShiftData] = useState<ShiftData | null>(null);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"fuel" | "products" | "services">("fuel");
  const [searchTerm, setSearchTerm] = useState("");
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<FuelStock | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceStock | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [fuelByPrice, setFuelByPrice] = useState(false);
  const [fuelPrice, setFuelPrice] = useState("");

  const filteredFuels = mockFuels.filter(fuel =>
    fuel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fuel.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToSale = () => {
    if (activeTab === "fuel" && selectedFuel) {
      let finalQuantity = quantity;
      let finalPrice = selectedFuel.price;

      if (fuelByPrice && fuelPrice) {
        const priceValue = parseFloat(fuelPrice);
        finalQuantity = priceValue / selectedFuel.price;
        if (finalQuantity > selectedFuel.currentStock) {
          toast.error("Quantidade indisponível em estoque");
          return;
        }
      } else {
        if (quantity > selectedFuel.currentStock) {
          toast.error("Quantidade indisponível em estoque");
          return;
        }
      }

      const newItem: SaleItem = {
        id: `sale-${Date.now()}`,
        name: selectedFuel.name,
        quantity: finalQuantity,
        price: finalPrice,
        total: finalQuantity * finalPrice,
        lote: selectedFuel.lote,
        validade: selectedFuel.validade,
        type: "fuel"
      };

      setSaleItems(prev => [...prev, newItem]);
      setQuantity(1);
      setFuelPrice("");
      setSelectedFuel(null);
    } else if (activeTab === "products" && selectedProduct) {
      if (quantity > selectedProduct.currentStock) {
        toast.error("Quantidade indisponível em estoque");
        return;
      }

      const newItem: SaleItem = {
        id: `sale-${Date.now()}`,
        name: selectedProduct.name,
        quantity,
        price: selectedProduct.price,
        total: quantity * selectedProduct.price,
        lote: selectedProduct.lote,
        validade: selectedProduct.validade,
        type: "product"
      };

      setSaleItems(prev => [...prev, newItem]);
      setQuantity(1);
      setSelectedProduct(null);
    } else if (activeTab === "services" && selectedService) {
      const newItem: SaleItem = {
        id: `sale-${Date.now()}`,
        name: selectedService.name,
        quantity,
        price: selectedService.price,
        total: quantity * selectedService.price,
        type: "service"
      };

      setSaleItems(prev => [...prev, newItem]);
      setQuantity(1);
      setSelectedService(null);
    }
  };

  const removeFromSale = (itemId: string) => {
    setSaleItems(prev => prev.filter(item => item.id !== itemId));
  };

  const finalizeSale = () => {
    if (saleItems.length === 0) {
      toast.error("Adicione itens à venda");
      return;
    }

    // Aqui você implementaria a lógica para salvar a venda e dar baixa no estoque
    console.log("Venda finalizada:", {
      gasStation: gasStation.id,
      items: saleItems,
      total: getTotalSale(),
      timestamp: new Date().toISOString()
    });

    toast.success("Venda finalizada com sucesso!");
    setSaleItems([]);
  };

  const getTotalSale = () => {
    return saleItems.reduce((total, item) => total + item.total, 0);
  };

  const handleOpenShift = (data: ShiftData) => {
    setShiftData(data);
    setShiftOpen(true);
    toast.success(`Turno ${data.shiftType} aberto por ${data.operator}`);
  };

  const handleCloseShift = (finalCash: number) => {
    if (shiftData) {
      console.log("Turno fechado:", {
        ...shiftData,
        finalCash,
        closeTime: new Date().toLocaleString('pt-BR')
      });
      toast.success("Turno fechado com sucesso!");
    }
    setShiftOpen(false);
    setShiftData(null);
    setShowCloseDialog(false);
    setSaleItems([]);
  };

  // Se não há turno aberto, mostrar formulário de abertura
  if (!shiftOpen) {
    return <ShiftOpenForm onOpenShift={handleOpenShift} gasStationName={gasStation.name} />;
  }

  return (
    <div className="space-y-6">
      {/* Header com informações do turno */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1>PDV - Ponto de Venda</h1>
          <p className="text-muted-foreground">
            Turno {shiftData?.shiftType} • Operador: {shiftData?.operator} • Aberto às: {shiftData?.openTime}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowCloseDialog(true)}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Fechar Turno
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção de Produtos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Produtos Disponíveis</CardTitle>
              <CardDescription>
                Selecione os itens para venda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => {
                setActiveTab(value as "fuel" | "products" | "services");
                setSelectedFuel(null);
                setSelectedProduct(null);
                setSelectedService(null);
                setQuantity(1);
                setFuelPrice("");
              }}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="fuel" className="flex items-center gap-2">
                    <Fuel className="h-4 w-4" />
                    Combustíveis
                  </TabsTrigger>
                  <TabsTrigger value="products" className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Conveniência
                  </TabsTrigger>
                  <TabsTrigger value="services" className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Serviços
                  </TabsTrigger>
                </TabsList>

                {/* Combustíveis */}
                <TabsContent value="fuel" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredFuels.map((fuel) => (
                      <Card
                        key={fuel.id}
                        className={`cursor-pointer transition-colors ${
                          selectedFuel?.id === fuel.id ? "border-primary bg-accent" : ""
                        }`}
                        onClick={() => setSelectedFuel(fuel)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4>{fuel.name}</h4>
                              <Badge variant="secondary">{fuel.type}</Badge>
                            </div>
                            <p className="text-muted-foreground">
                              R$ {fuel.price.toFixed(2)}/{fuel.unit}
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm">Estoque: {fuel.currentStock} {fuel.unit}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Produtos */}
                <TabsContent value="products" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className={`cursor-pointer transition-colors ${
                          selectedProduct?.id === product.id ? "border-primary bg-accent" : ""
                        }`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4>{product.name}</h4>
                              <Badge variant="secondary">{product.category}</Badge>
                            </div>
                            <p className="text-muted-foreground">
                              R$ {product.price.toFixed(2)}/{product.unit}
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm">Estoque: {product.currentStock} {product.unit}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Serviços */}
                <TabsContent value="services" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredServices.map((service) => (
                      <Card
                        key={service.id}
                        className={`cursor-pointer transition-colors ${
                          selectedService?.id === service.id ? "border-primary bg-accent" : ""
                        } ${!service.available ? "opacity-50" : ""}`}
                        onClick={() => service.available && setSelectedService(service)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4>{service.name}</h4>
                              <Badge variant="secondary">{service.category}</Badge>
                            </div>
                            <p className="text-muted-foreground">
                              R$ {service.price.toFixed(2)}/{service.unit}
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm">
                                Status: {service.available ? "Disponível" : "Indisponível"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Quantidade e Adicionar */}
              {(selectedFuel || selectedProduct || selectedService) && (
                <div className="space-y-4 p-4 bg-accent rounded-lg">
                  {/* Opção para combustível: quantidade ou preço */}
                  {selectedFuel && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="by-quantity"
                            name="fuel-type"
                            checked={!fuelByPrice}
                            onChange={() => setFuelByPrice(false)}
                          />
                          <Label htmlFor="by-quantity">Por Quantidade</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="by-price"
                            name="fuel-type"
                            checked={fuelByPrice}
                            onChange={() => setFuelByPrice(true)}
                          />
                          <Label htmlFor="by-price">Por Preço</Label>
                        </div>
                      </div>

                      {fuelByPrice ? (
                        <div className="flex items-center gap-2">
                          <Label htmlFor="fuel-price">Valor (R$):</Label>
                          <Input
                            id="fuel-price"
                            type="number"
                            step="0.01"
                            value={fuelPrice}
                            onChange={(e) => setFuelPrice(e.target.value)}
                            className="w-32"
                            placeholder="0,00"
                          />
                          {fuelPrice && (
                            <span className="text-sm text-muted-foreground">
                              ≈ {(parseFloat(fuelPrice) / selectedFuel.price).toFixed(2)}L
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Label htmlFor="quantity">Quantidade (L):</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setQuantity(Math.max(0.1, quantity - 1))}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              id="quantity"
                              type="number"
                              step="0.1"
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                              className="w-24 text-center"
                              min="0.1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quantidade para produtos e serviços */}
                  {(selectedProduct || selectedService) && (
                    <div className="flex items-center gap-2">
                      <Label htmlFor="quantity">Quantidade:</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          id="quantity"
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button onClick={addToSale} className="w-full">
                    Adicionar à Venda
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Carrinho de Venda */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Itens da Venda</CardTitle>
              <CardDescription>
                {saleItems.length} item(ns) selecionado(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {saleItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum item adicionado
                </p>
              ) : (
                <>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {saleItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-background rounded border"
                      >
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.type === "fuel" ? `${item.quantity.toFixed(2)}L` : `${item.quantity}x`} R$ {item.price.toFixed(2)}
                          </p>
                          {item.type === "service" && (
                            <p className="text-xs text-muted-foreground">
                              Serviço
                            </p>
                          )}
                        </div>
                        <div className="text-right space-y-1">
                          <p>R$ {item.total.toFixed(2)}</p>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromSale(item.id)}
                          >
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total:</span>
                      <span className="text-xl">R$ {getTotalSale().toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={finalizeSale}
                    >
                      Finalizar Venda
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de fechamento de turno */}
      {shiftData && (
        <ShiftCloseDialog
          open={showCloseDialog}
          onClose={() => setShowCloseDialog(false)}
          onConfirmClose={handleCloseShift}
          shiftData={shiftData}
        />
      )}
    </div>
  );
}