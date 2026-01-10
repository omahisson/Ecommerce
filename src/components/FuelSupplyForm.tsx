import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft } from "lucide-react";

interface FuelSupplyFormProps {
  onSubmit: (data: FuelSupplyFormData) => void;
  onCancel: () => void;
  availableFuels: any[];
}

export interface FuelSupplyFormData {
  fuelType: string;
  quantity: string;
  unit: string;
  supplier: string;
  invoiceNumber: string;
  deliveryDate: string;
  expiryDate: string;
  unitPrice: string;
  totalPrice: string;
}

export function FuelSupplyForm({ onSubmit, onCancel, availableFuels }: FuelSupplyFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: FuelSupplyFormData = {
      fuelType: formData.get('fuelType') as string,
      quantity: formData.get('quantity') as string,
      unit: formData.get('unit') as string,
      supplier: formData.get('supplier') as string,
      invoiceNumber: formData.get('invoiceNumber') as string,
      deliveryDate: formData.get('deliveryDate') as string,
      expiryDate: formData.get('expiryDate') as string,
      unitPrice: formData.get('unitPrice') as string,
      totalPrice: formData.get('totalPrice') as string,
    };
    
    onSubmit(data);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value) || 0;
    const unitPriceInput = document.getElementById('unitPrice') as HTMLInputElement;
    const totalPriceInput = document.getElementById('totalPrice') as HTMLInputElement;
    
    if (unitPriceInput?.value) {
      const unitPrice = parseFloat(unitPriceInput.value.replace('R$ ', '').replace(',', '.')) || 0;
      const total = quantity * unitPrice;
      totalPriceInput.value = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  };

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unitPrice = parseFloat(e.target.value.replace('R$ ', '').replace(',', '.')) || 0;
    const quantityInput = document.getElementById('quantity') as HTMLInputElement;
    const totalPriceInput = document.getElementById('totalPrice') as HTMLInputElement;
    
    if (quantityInput?.value) {
      const quantity = parseFloat(quantityInput.value) || 0;
      const total = quantity * unitPrice;
      totalPriceInput.value = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2>Cadastrar Abastecimento</h2>
          <p className="text-muted-foreground">Registre a entrada de combustível no posto</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados do Abastecimento</CardTitle>
          <CardDescription>
            Registre detalhes da entrega de combustível
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Dados do combustível */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Tipo de Combustível</Label>
                  <Select name="fuelType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o combustível" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFuels.map((fuel) => (
                        <SelectItem key={fuel.id} value={fuel.name}>
                          {fuel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    step="0.01"
                    placeholder="Ex: 15000"
                    onChange={handleQuantityChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade</Label>
                  <Select name="unit" defaultValue="Litro" required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Litro">Litro</SelectItem>
                      <SelectItem value="m³">m³</SelectItem>
                      <SelectItem value="Galão">Galão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Número da Nota</Label>
                  <Input
                    id="invoiceNumber"
                    name="invoiceNumber"
                    type="text"
                    placeholder="Ex: NF123456"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Datas */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Data de Entrega</Label>
                  <Input
                    id="deliveryDate"
                    name="deliveryDate"
                    type="date"
                    required
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

            {/* Preços */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Preço Unitário</Label>
                  <Input
                    id="unitPrice"
                    name="unitPrice"
                    type="text"
                    placeholder="R$ 0,00"
                    onChange={handleUnitPriceChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalPrice">Valor Total</Label>
                  <Input
                    id="totalPrice"
                    name="totalPrice"
                    type="text"
                    placeholder="R$ 0,00"
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Informações Importantes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• O estoque será atualizado automaticamente após o cadastro</li>
                  <li>• Certifique-se de que a data de validade está correta</li>
                  <li>• O valor total é calculado automaticamente</li>
                  <li>• Mantenha a nota fiscal para auditoria</li>
                </ul>
              </div>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Registrar Abastecimento
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