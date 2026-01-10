import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft } from "lucide-react";

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

export interface ProductFormData {
  name: string;
  category: string;
  unit: string;
  lot: string;
  expiry: string;
  sku: string;
  status: string;
}

const categories = [
  "Óleos",
  "Loja de Conveniência", 
  "Serviços"
];

const units = [
  "Litro",
  "Unidade",
  "Quilograma",
  "Metro",
  "Serviço",
  "Pacote",
  "Caixa",
  "Galão"
];

export function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: ProductFormData = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      unit: formData.get('unit') as string,
      lot: formData.get('lot') as string,
      expiry: formData.get('expiry') as string,
      sku: formData.get('sku') as string,
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
          <h2>Cadastrar Produto/Serviço</h2>
          <p className="text-muted-foreground">Preencha os dados do novo produto ou serviço</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados do Produto/Serviço</CardTitle>
          <CardDescription>
            Configure um novo produto ou serviço para o posto
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Dados básicos */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto/Serviço</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ex: Óleo Motor 5W30, Lavagem Completa, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade</Label>
                  <Select name="unit" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Controle de estoque */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lot">Lote</Label>
                  <Input
                    id="lot"
                    name="lot"
                    type="text"
                    placeholder="Ex: LOT001, LOTE2024-01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry">Data de Validade</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    type="date"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU Interno</Label>
                <Input
                  id="sku"
                  name="sku"
                  type="text"
                  placeholder="Ex: OL5W30001, SRV001"
                  required
                />
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Informações Importantes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• O produto será criado com status "Ativo" por padrão</li>
                  <li>• Para serviços, os campos de lote e validade são opcionais</li>
                  <li>• O SKU interno deve ser único para cada produto</li>
                  <li>• A categoria ajuda na organização e relatórios</li>
                </ul>
              </div>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Cadastrar Produto/Serviço
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