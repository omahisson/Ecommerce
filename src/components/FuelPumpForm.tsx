import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft } from "lucide-react";

interface FuelPumpFormProps {
  onSubmit: (data: FuelPumpFormData) => void;
  onCancel: () => void;
}

export interface FuelPumpFormData {
  name: string;
  fuelTypes: string[];
  status: string;
}

const availableFuels = [
  "Gasolina Comum",
  "Gasolina Aditivada", 
  "Gasolina Premium",
  "Etanol",
  "Diesel S-10",
  "Diesel Comum",
  "Diesel S-500",
  "GNV",
  "Arla 32"
];

export function FuelPumpForm({ onSubmit, onCancel }: FuelPumpFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const fuelTypes = availableFuels
      .filter(fuel => formData.get(`fuel-${fuel}`) === 'on');

    const data: FuelPumpFormData = {
      name: formData.get('name') as string,
      fuelTypes,
      status: "Ativa"
    };
    
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2>Cadastrar Bomba de Combustível</h2>
          <p className="text-muted-foreground">Preencha os dados da nova bomba</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados da Bomba</CardTitle>
          <CardDescription>
            Configure uma nova bomba de combustível para o posto
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Dados básicos */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Bomba</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ex: Bomba 01, Bomba A, etc."
                  required
                />
              </div>
            </div>

            {/* Tipos de combustível */}
            <div className="space-y-4">
              <Label>Tipos de Combustível</Label>
              <p className="text-sm text-muted-foreground">
                Selecione os tipos de combustível que esta bomba irá dispensar
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableFuels.map((fuel) => (
                  <div key={fuel} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id={`fuel-${fuel}`} name={`fuel-${fuel}`} />
                    <Label htmlFor={`fuel-${fuel}`} className="flex-1">
                      {fuel}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Informações Importantes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• A bomba será criada com status "Ativa" por padrão</li>
                  <li>• Você pode alterar os combustíveis posteriormente</li>
                  <li>• Selecione pelo menos um tipo de combustível</li>
                </ul>
              </div>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Cadastrar Bomba
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}