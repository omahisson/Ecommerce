import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft } from "lucide-react";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface EmployeeFormProps {
  gasStations: GasStation[];
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}

export interface EmployeeFormData {
  name: string;
  surname: string;
  cpf: string;
  position: string;
  stationId: string;
}

const positions = [
  "Frentista",
  "Caixa",
  "Gerente de Turno",
  "Auxiliar de Limpeza",
  "Mecânico",
  "Vendedor",
  "Supervisor"
];

export function EmployeeForm({ gasStations, onSubmit, onCancel }: EmployeeFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: EmployeeFormData = {
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      cpf: formData.get('cpf') as string,
      position: formData.get('position') as string,
      stationId: formData.get('stationId') as string,
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
          <h2>Cadastrar Funcionário</h2>
          <p className="text-muted-foreground">Preencha os dados do novo funcionário</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados do Funcionário</CardTitle>
          <CardDescription>
            Funcionários executam operações diárias nos postos
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Dados pessoais */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nome do funcionário"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Sobrenome</Label>
                  <Input
                    id="surname"
                    name="surname"
                    type="text"
                    placeholder="Sobrenome do funcionário"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>

            {/* Dados profissionais */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Select name="position" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stationId">Posto de Trabalho</Label>
                <Select name="stationId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o posto" />
                  </SelectTrigger>
                  <SelectContent>
                    {gasStations.map((station) => (
                      <SelectItem key={station.id} value={station.id}>
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Cadastrar Funcionário
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