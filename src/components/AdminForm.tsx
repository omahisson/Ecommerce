import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface AdminFormProps {
  gasStations: GasStation[];
  onSubmit: (data: AdminFormData) => void;
  onCancel: () => void;
}

export interface AdminFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  permissions: {
    manageAllStations: boolean;
    manageManagers: boolean;
    manageEmployees: boolean;
    manageProducts: boolean;
  };
  allowedStations: string[];
}

export function AdminForm({ gasStations, onSubmit, onCancel }: AdminFormProps) {
  const [manageAllStations, setManageAllStations] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const allowedStations = manageAllStations 
      ? gasStations.map(station => station.id)
      : gasStations
          .filter(station => formData.get(`station-${station.id}`) === 'on')
          .map(station => station.id);

    const data: AdminFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
      permissions: {
        manageAllStations: formData.get('manageAllStations') === 'on',
        manageManagers: formData.get('manageManagers') === 'on',
        manageEmployees: formData.get('manageEmployees') === 'on',
        manageProducts: formData.get('manageProducts') === 'on',
      },
      allowedStations
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
          <h2>Cadastrar Administrador</h2>
          <p className="text-muted-foreground">Preencha os dados do novo administrador</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Dados do Administrador</CardTitle>
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
                  placeholder="Nome completo do administrador"
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
                    placeholder="admin@postonet.com"
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

            {/* Permissões de gerenciamento */}
            <div className="space-y-4">
              <Label>Permissões de Gerenciamento</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="manageAllStations" 
                    name="manageAllStations"
                    checked={manageAllStations}
                    onCheckedChange={(checked) => setManageAllStations(checked as boolean)}
                  />
                  <Label htmlFor="manageAllStations" className="text-sm">
                    Gerenciar todos os postos
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="manageManagers" name="manageManagers" />
                  <Label htmlFor="manageManagers" className="text-sm">
                    Gerenciar Gerentes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="manageEmployees" name="manageEmployees" />
                  <Label htmlFor="manageEmployees" className="text-sm">
                    Gerenciar Funcionários
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="manageProducts" name="manageProducts" />
                  <Label htmlFor="manageProducts" className="text-sm">
                    Gerenciar Produtos
                  </Label>
                </div>
              </div>
            </div>

            {/* Postos permitidos - só aparece se não gerenciar todos */}
            {!manageAllStations && (
              <div className="space-y-4">
                <Label>Postos Permitidos</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {gasStations.map((station) => (
                    <div key={station.id} className="flex items-center space-x-2">
                      <Checkbox id={`station-${station.id}`} name={`station-${station.id}`} />
                      <Label htmlFor={`station-${station.id}`} className="text-sm">
                        {station.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Cadastrar Administrador
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