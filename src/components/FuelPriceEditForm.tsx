import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface FuelPriceEditFormProps {
  fuel: any;
  onSubmit: (data: FuelPriceEditFormData) => void;
  onCancel: () => void;
}

export interface FuelPriceEditFormData {
  fuelId: string;
  newPrice: string;
  effectiveDate: string;
  responsible: string;
  reason: string;
}

export function FuelPriceEditForm({ fuel, onSubmit, onCancel }: FuelPriceEditFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: FuelPriceEditFormData = {
      fuelId: fuel.id,
      newPrice: formData.get('newPrice') as string,
      effectiveDate: formData.get('effectiveDate') as string,
      responsible: formData.get('responsible') as string,
      reason: formData.get('reason') as string,
    };
    
    onSubmit(data);
  };

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2>Alterar Preço - {fuel.name}</h2>
          <p className="text-muted-foreground">Registre a alteração de preço do combustível</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Alteração de Preço</CardTitle>
          <CardDescription>
            Registre nova alteração de preço para {fuel.name}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Preço atual */}
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Informações Atuais</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Combustível:</span> {fuel.name}
                  </div>
                  <div>
                    <span className="font-medium">Preço Atual:</span> {fuel.price}
                  </div>
                  <div>
                    <span className="font-medium">Fornecedor:</span> {fuel.supplier}
                  </div>
                  <div>
                    <span className="font-medium">Estoque:</span> {fuel.stock}
                  </div>
                </div>
              </div>
            </div>

            {/* Novo preço */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPrice">Novo Preço</Label>
                  <Input
                    id="newPrice"
                    name="newPrice"
                    type="text"
                    placeholder="R$ 0,00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">Data de Vigência</Label>
                  <Input
                    id="effectiveDate"
                    name="effectiveDate"
                    type="date"
                    defaultValue={today}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsible">Responsável pela Alteração</Label>
                <Input
                  id="responsible"
                  name="responsible"
                  type="text"
                  placeholder="Nome do responsável"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo da Alteração</Label>
                <Input
                  id="reason"
                  name="reason"
                  type="text"
                  placeholder="Ex: Aumento do fornecedor, ajuste de margem, etc."
                  required
                />
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-yellow-800">Atenção</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Esta alteração será registrada no histórico de preços</li>
                  <li>• O preço anterior será mantido para referência</li>
                  <li>• A data de vigência define quando o novo preço entra em vigor</li>
                  <li>• Certifique-se de que o novo preço está correto</li>
                </ul>
              </div>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Confirmar Alteração
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