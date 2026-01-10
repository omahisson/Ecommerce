import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft } from "lucide-react";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface ManagerFormProps {
  gasStations: GasStation[];
  onSubmit: (data: ManagerFormData) => void;
  onCancel: () => void;
}

export interface ManagerFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  assignedStations: string[];
}

export function ManagerForm({ gasStations, onSubmit, onCancel }: ManagerFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const assignedStations = gasStations
      .filter(station => formData.get(`station-${station.id}`) === 'on')
      .map(station => station.id);

    const data: ManagerFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
      assignedStations
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
          <h2>Cadastrar Gerente</h2>
          <p className="text-muted-foreground">Preencha os dados do novo gerente</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados do Gerente</CardTitle>
          <CardDescription>
            Gerentes supervisionam operações de postos específicos
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Dados básicos */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome completo do gerente"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="gerente@posto.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Digite a senha"
                  required
                />
              </div>
            </div>

            {/* Postos vinculados */}
            <div className="space-y-4">
              <Label>Postos Vinculados</Label>
              <p className="text-sm text-muted-foreground">
                Selecione os postos que este gerente supervisionará
              </p>
              <div className="grid grid-cols-1 gap-3">
                {gasStations.map((station) => (
                  <div key={station.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id={`station-${station.id}`} name={`station-${station.id}`} />
                    <Label htmlFor={`station-${station.id}`} className="flex-1">
                      {station.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Cadastrar Gerente
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