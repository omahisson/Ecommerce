import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { ArrowLeft } from "lucide-react";

interface PromotionFormProps {
  onSubmit: (data: PromotionFormData) => void;
  onCancel: () => void;
}

export interface PromotionFormData {
  name: string;
  description: string;
  type: string;
  discountType: string;
  discountValue: string;
  validFrom: string;
  validTo: string;
  paymentMethods: string[];
  products: string[];
  minAmount: string;
  maxUsage: string;
  status: string;
}

const promotionTypes = [
  "Produto Específico",
  "Categoria",
  "Volume",
  "Valor Mínimo",
  "Forma de Pagamento",
  "Período Especial",
  "Combo"
];

const paymentMethods = [
  "Dinheiro",
  "Cartão de Débito",
  "Cartão de Crédito",
  "PIX",
  "Vale Alimentação",
  "Vale Combustível"
];

const availableProducts = [
  "Óleo Motor 5W30",
  "Refrigerante Coca-Cola 350ml",
  "Lavagem Completa",
  "Água Mineral 500ml",
  "Troca de Óleo",
  "Salgadinho Doritos",
  "Loja de Conveniência",
  "Óleos",
  "Serviços",
  "Todos os Produtos"
];

export function PromotionForm({ onSubmit, onCancel }: PromotionFormProps) {
  const [discountType, setDiscountType] = useState<string>("");
  const [promotionType, setPromotionType] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const paymentMethods = availablePayments
      .filter(method => formData.get(`payment-${method}`) === 'on');

    const products = availableProducts
      .filter(product => formData.get(`product-${product}`) === 'on');

    const data: PromotionFormData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as string,
      discountType: formData.get('discountType') as string,
      discountValue: formData.get('discountValue') as string,
      validFrom: formData.get('validFrom') as string,
      validTo: formData.get('validTo') as string,
      paymentMethods,
      products,
      minAmount: formData.get('minAmount') as string,
      maxUsage: formData.get('maxUsage') as string,
      status: "Ativa"
    };
    
    onSubmit(data);
  };

  const availablePayments = paymentMethods;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2>Cadastrar Promoção</h2>
          <p className="text-muted-foreground">Configure uma nova promoção para o posto</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Dados da Promoção</CardTitle>
          <CardDescription>
            Preencha as informações para criar uma nova campanha promocional
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Informações básicas */}
            <div className="space-y-4">
              <h4 className="font-medium">Informações Básicas</h4>
              
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Promoção</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ex: Desconto de Final de Semana, Combo Lavagem + Óleo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descreva os detalhes da promoção..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Promoção</Label>
                  <Select name="type" onValueChange={setPromotionType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {promotionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountType">Tipo de Desconto</Label>
                  <Select name="discountType" onValueChange={setDiscountType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de desconto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentual (%)</SelectItem>
                      <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountValue">Valor do Desconto</Label>
                <Input
                  id="discountValue"
                  name="discountValue"
                  type="text"
                  placeholder={discountType === "percentage" ? "Ex: 15" : "Ex: 10,00"}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {discountType === "percentage" 
                    ? "Digite apenas o número (sem o símbolo %)" 
                    : "Digite apenas o valor (sem R$)"}
                </p>
              </div>
            </div>

            {/* Período de validade */}
            <div className="space-y-4">
              <h4 className="font-medium">Período de Validade</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom">Data de Início</Label>
                  <Input
                    id="validFrom"
                    name="validFrom"
                    type="date"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validTo">Data de Término</Label>
                  <Input
                    id="validTo"
                    name="validTo"
                    type="date"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Formas de pagamento */}
            <div className="space-y-4">
              <h4 className="font-medium">Formas de Pagamento Aceitas</h4>
              <p className="text-sm text-muted-foreground">
                Selecione as formas de pagamento que darão direito à promoção
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {availablePayments.map((method) => (
                  <div key={method} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id={`payment-${method}`} name={`payment-${method}`} />
                    <Label htmlFor={`payment-${method}`} className="flex-1">
                      {method}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Produtos aplicáveis */}
            <div className="space-y-4">
              <h4 className="font-medium">Produtos/Serviços Aplicáveis</h4>
              <p className="text-sm text-muted-foreground">
                Selecione os produtos ou categorias que participam da promoção
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableProducts.map((product) => (
                  <div key={product} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id={`product-${product}`} name={`product-${product}`} />
                    <Label htmlFor={`product-${product}`} className="flex-1">
                      {product}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Condições */}
            <div className="space-y-4">
              <h4 className="font-medium">Condições da Promoção</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAmount">Valor/Quantidade Mínima</Label>
                  <Input
                    id="minAmount"
                    name="minAmount"
                    type="text"
                    placeholder="Ex: R$ 50,00 ou 3 unidades"
                  />
                  <p className="text-sm text-muted-foreground">
                    Valor mínimo ou quantidade para ativar a promoção (opcional)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxUsage">Limite de Uso</Label>
                  <Input
                    id="maxUsage"
                    name="maxUsage"
                    type="number"
                    placeholder="Ex: 100"
                  />
                  <p className="text-sm text-muted-foreground">
                    Número máximo de vezes que a promoção pode ser usada (opcional)
                  </p>
                </div>
              </div>
            </div>

            {/* Informações de tipos de promoção */}
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Tipos de Promoção Disponíveis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Produto Específico:</span> Desconto em produtos selecionados
                  </div>
                  <div>
                    <span className="font-medium">Categoria:</span> Desconto em toda uma categoria
                  </div>
                  <div>
                    <span className="font-medium">Volume:</span> Desconto por quantidade (ex: leve 3 pague 2)
                  </div>
                  <div>
                    <span className="font-medium">Valor Mínimo:</span> Desconto a partir de um valor de compra
                  </div>
                  <div>
                    <span className="font-medium">Forma de Pagamento:</span> Desconto específico por pagamento
                  </div>
                  <div>
                    <span className="font-medium">Período Especial:</span> Campanhas sazonais (Black Friday, etc.)
                  </div>
                  <div>
                    <span className="font-medium">Combo:</span> Desconto na compra de produtos combinados
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <Button type="submit" className="flex-1">
              Cadastrar Promoção
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