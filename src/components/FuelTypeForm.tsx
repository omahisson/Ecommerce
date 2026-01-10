import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface FuelTypeFormProps {
  onSubmit: (data: FuelTypeFormData) => void;
  onCancel: () => void;
}

export interface FuelTypeFormData {
  name: string;
  price: string;
  supplier: string;
  stock: string;
  unit: string;
  expiryDate: string;
  status: string;
}

export function FuelTypeForm({ onSubmit, onCancel }: FuelTypeFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: FuelTypeFormData = {
      name: formData.get('name') as string,
      price: formData.get('price') as string,
      supplier: formData.get('supplier') as string,
      stock: formData.get('stock') as string,
      unit: formData.get('unit') as string,
      expiryDate: formData.get('expiryDate') as string,
      status: "Ativo"
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
          <h2>Cadastrar Tipo de Combustível</h2>
          <p className="text-muted-foreground">Preencha os dados do novo combustível</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados do Combustível</CardTitle>
          <CardDescription>
            Configure um novo tipo de combustível para o posto
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Dados básicos */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Combustível</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ex: Gasolina Comum, Diesel S-10, Etanol"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço por Unidade</Label>
                  <Input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="Ex: R$ 5,45"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade de Medida</Label>
                  <Input
                    id="unit"
                    name="unit"
                    type="text"
                    placeholder="Ex: Litro, m³"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dados do fornecedor */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Fornecedor</Label>
                <Input
                  id="supplier"
                  name="supplier"
                  type="text"
                  placeholder="Ex: Petrobras, Shell, Raízen"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque Inicial</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="text"
                    placeholder="Ex: 15000 (sem unidade)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Data de Validade</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Informações Importantes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• O combustível será criado com status "Ativo" por padrão</li>
                  <li>• O preço pode ser atualizado posteriormente</li>
                  <li>• Certifique-se de que o nome do combustível está correto</li>
                  <li>• O estoque será atualizado automaticamente com os abastecimentos</li>
                  <li>• A data de validade é importante para controle de qualidade</li>
                </ul>
              </div>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Cadastrar Combustível
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