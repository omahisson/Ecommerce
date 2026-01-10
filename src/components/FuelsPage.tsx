import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, Fuel, Droplets, TrendingUp, Clock } from "lucide-react";
import { FuelPumpForm } from "./FuelPumpForm";
import { FuelTypeForm } from "./FuelTypeForm";
import { FuelSupplyForm } from "./FuelSupplyForm";
import { FuelPriceEditForm } from "./FuelPriceEditForm";
import { FuelPriceHistory } from "./FuelPriceHistory";
import { FuelPriceStats } from "./FuelPriceStats";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface FuelsPageProps {
  gasStation: GasStation;
}

type FormType = "pump" | "fuel-type" | "supply" | "price-edit" | "history" | "stats" | null;

// Mock data
const mockFuelPumps = [
  { 
    id: "1", 
    name: "Bomba 01", 
    fuelTypes: ["Gasolina Comum", "Gasolina Aditivada"], 
    status: "Ativa" 
  },
  { 
    id: "2", 
    name: "Bomba 02", 
    fuelTypes: ["Etanol", "Gasolina Comum"], 
    status: "Ativa" 
  },
  { 
    id: "3", 
    name: "Bomba 03", 
    fuelTypes: ["Diesel S-10", "Diesel Comum"], 
    status: "Manutenção" 
  },
  { 
    id: "4", 
    name: "Bomba 04", 
    fuelTypes: ["Gasolina Aditivada", "Etanol"], 
    status: "Ativa" 
  },
  { 
    id: "5", 
    name: "Bomba 05", 
    fuelTypes: ["GNV"], 
    status: "Ativa" 
  }
];

const mockFuelTypes = [
  { 
    id: "1", 
    name: "Gasolina Comum", 
    price: "R$ 5,45",
    supplier: "Petrobras",
    lastDelivery: "2024-01-15",
    expiry: "2024-03-15",
    stock: "15.000L",
    status: "Ativo" 
  },
  { 
    id: "2", 
    name: "Gasolina Aditivada", 
    price: "R$ 5,65",
    supplier: "Shell",
    lastDelivery: "2024-01-14",
    expiry: "2024-03-14",
    stock: "8.500L",
    status: "Ativo" 
  },
  { 
    id: "3", 
    name: "Etanol", 
    price: "R$ 3,89",
    supplier: "Raízen",
    lastDelivery: "2024-01-16",
    expiry: "2024-02-16",
    stock: "12.000L",
    status: "Ativo" 
  },
  { 
    id: "4", 
    name: "Diesel S-10", 
    price: "R$ 5,99",
    supplier: "Petrobras",
    lastDelivery: "2024-01-13",
    expiry: "2024-06-13",
    stock: "20.000L",
    status: "Ativo" 
  },
  { 
    id: "5", 
    name: "GNV", 
    price: "R$ 4,12",
    supplier: "Comgás",
    lastDelivery: "2024-01-12",
    expiry: "-",
    stock: "5.000m³",
    status: "Ativo" 
  }
];

export function FuelsPage({ gasStation }: FuelsPageProps) {
  const [activeForm, setActiveForm] = useState<FormType>(null);
  const [selectedFuel, setSelectedFuel] = useState<any>(null);

  const handleSubmitPump = (data: any) => {
    console.log("Bomba cadastrada:", data);
    setActiveForm(null);
  };

  const handleSubmitFuelType = (data: any) => {
    console.log("Combustível cadastrado:", data);
    setActiveForm(null);
  };

  const handleSubmitSupply = (data: any) => {
    console.log("Abastecimento cadastrado:", data);
    setActiveForm(null);
  };

  const handleSubmitPriceEdit = (data: any) => {
    console.log("Preço atualizado:", data);
    setActiveForm(null);
    setSelectedFuel(null);
  };

  const handleEditPrice = (fuel: any) => {
    setSelectedFuel(fuel);
    setActiveForm("price-edit");
  };

  const handleViewHistory = (fuel: any) => {
    setSelectedFuel(fuel);
    setActiveForm("history");
  };

  const handleViewStats = (fuel: any) => {
    setSelectedFuel(fuel);
    setActiveForm("stats");
  };

  if (activeForm === "pump") {
    return (
      <FuelPumpForm
        onSubmit={handleSubmitPump}
        onCancel={() => setActiveForm(null)}
      />
    );
  }

  if (activeForm === "fuel-type") {
    return (
      <FuelTypeForm
        onSubmit={handleSubmitFuelType}
        onCancel={() => setActiveForm(null)}
      />
    );
  }

  if (activeForm === "supply") {
    return (
      <FuelSupplyForm
        onSubmit={handleSubmitSupply}
        onCancel={() => setActiveForm(null)}
        availableFuels={mockFuelTypes}
      />
    );
  }

  if (activeForm === "price-edit" && selectedFuel) {
    return (
      <FuelPriceEditForm
        fuel={selectedFuel}
        onSubmit={handleSubmitPriceEdit}
        onCancel={() => {
          setActiveForm(null);
          setSelectedFuel(null);
        }}
      />
    );
  }

  if (activeForm === "history" && selectedFuel) {
    return (
      <FuelPriceHistory
        fuel={selectedFuel}
        onBack={() => {
          setActiveForm(null);
          setSelectedFuel(null);
        }}
      />
    );
  }

  if (activeForm === "stats" && selectedFuel) {
    return (
      <FuelPriceStats
        fuel={selectedFuel}
        onBack={() => {
          setActiveForm(null);
          setSelectedFuel(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gerenciamento de Combustíveis</h2>
          <p className="text-muted-foreground">Gerencie abastecimentos, bombas e tipos de combustível</p>
        </div>
        <Button
          onClick={() => setActiveForm("supply")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Cadastrar Abastecimento
        </Button>
      </div>

      {/* Tipos de Combustível */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            <CardTitle>Tipos de Combustível</CardTitle>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveForm("fuel-type")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Tipo
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockFuelTypes.map((fuel) => (
              <div key={fuel.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{fuel.name}</h3>
                    <Badge className="text-xs">{fuel.price}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Fornecedor:</span> {fuel.supplier}
                    </div>
                    <div>
                      <span className="font-medium">Último Abastecimento:</span> {fuel.lastDelivery}
                    </div>
                    <div>
                      <span className="font-medium">Validade:</span> {fuel.expiry}
                    </div>
                    <div>
                      <span className="font-medium">Estoque:</span> {fuel.stock}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {fuel.status}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditPrice(fuel)}
                  >
                    Preço
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewHistory(fuel)}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewStats(fuel)}
                  >
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {mockFuelTypes.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum tipo de combustível cadastrado ainda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bombas de Combustível */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Fuel className="h-5 w-5" />
            <CardTitle>Bombas de Combustível</CardTitle>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveForm("pump")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Bomba
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockFuelPumps.map((pump) => (
              <div key={pump.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{pump.name}</h3>
                  <Badge 
                    variant={pump.status === "Ativa" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {pump.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Combustíveis:</p>
                  <div className="flex flex-wrap gap-1">
                    {pump.fuelTypes.map((fuel) => (
                      <Badge key={fuel} variant="outline" className="text-xs">
                        {fuel}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {pump.status === "Ativa" ? "Inativar" : "Ativar"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {mockFuelPumps.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma bomba cadastrada ainda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}