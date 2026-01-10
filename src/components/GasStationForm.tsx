import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface GasStationFormProps {
  onSubmit: (data: GasStationFormData) => void;
  onCancel: () => void;
}

export interface GasStationFormData {
  razaoSocial: string;
  cnpj: string;
  nomeFantasia: string;
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  telefone: string;
  email: string;
  horarioFuncionamento: string;
}

export function GasStationForm({ onSubmit, onCancel }: GasStationFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: GasStationFormData = {
      razaoSocial: formData.get('razaoSocial') as string,
      cnpj: formData.get('cnpj') as string,
      nomeFantasia: formData.get('nomeFantasia') as string,
      endereco: {
        rua: formData.get('rua') as string,
        numero: formData.get('numero') as string,
        complemento: formData.get('complemento') as string,
        bairro: formData.get('bairro') as string,
        cidade: formData.get('cidade') as string,
        estado: (formData.get('estado') as string).toUpperCase(),
        cep: formData.get('cep') as string,
      },
      telefone: formData.get('telefone') as string,
      email: formData.get('email') as string,
      horarioFuncionamento: formData.get('horarioFuncionamento') as string,
    };
    
    onSubmit(data);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    e.target.value = value;
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center">Cadastrar Novo Posto</CardTitle>
          <CardDescription className="text-center">
            Preencha os dados do posto de gasolina
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="razaoSocial">Razão Social *</Label>
                <Input
                  id="razaoSocial"
                  name="razaoSocial"
                  type="text"
                  placeholder="Razão social da empresa"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeFantasia">Nome Fantasia *</Label>
              <Input
                id="nomeFantasia"
                name="nomeFantasia"
                type="text"
                placeholder="Nome fantasia do posto"
                required
              />
            </div>

            {/* Endereço Completo */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Endereço</h4>
                <p className="text-sm text-muted-foreground">Informe o endereço completo do posto</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="rua">Rua/Avenida *</Label>
                  <Input
                    id="rua"
                    name="rua"
                    type="text"
                    placeholder="Ex: Rua das Flores, Av. Paulista"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    name="numero"
                    type="text"
                    placeholder="Ex: 123"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    name="complemento"
                    type="text"
                    placeholder="Ex: Sala 101, Loja 5 (opcional)"
                  />
                  <p className="text-xs text-muted-foreground">Campo opcional</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro *</Label>
                  <Input
                    id="bairro"
                    name="bairro"
                    type="text"
                    placeholder="Ex: Centro, Vila Madalena"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    name="cidade"
                    type="text"
                    placeholder="Ex: São Paulo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Input
                    id="estado"
                    name="estado"
                    type="text"
                    placeholder="Ex: SP"
                    maxLength={2}
                    required
                    onChange={handleEstadoChange}
                  />
                  <p className="text-xs text-muted-foreground">Use a sigla (2 letras)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    name="cep"
                    type="text"
                    placeholder="00000-000"
                    maxLength={9}
                    required
                    onChange={handleCepChange}
                  />
                  <p className="text-xs text-muted-foreground">Formato: 00000-000</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contato@posto.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horarioFuncionamento">Horário de Funcionamento *</Label>
              <Input
                id="horarioFuncionamento"
                name="horarioFuncionamento"
                type="text"
                placeholder="Ex: Segunda a Domingo, 6h às 22h"
                required
              />
              <p className="text-xs text-muted-foreground">Descreva os dias e horários de funcionamento</p>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Cadastrar Posto
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