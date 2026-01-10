import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, Package, Tag } from "lucide-react";
import { ProductForm } from "./ProductForm";
import { PromotionForm } from "./PromotionForm";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface ProductsPageProps {
  gasStation: GasStation;
}

type FormType = "product" | "promotion" | null;

// Mock data
const mockProducts = [
  { 
    id: "1", 
    name: "Óleo Motor 5W30", 
    category: "Óleos",
    unit: "Litro",
    lot: "LOT001",
    expiry: "2025-12-31",
    sku: "OL5W30001",
    status: "Ativo" 
  },
  { 
    id: "2", 
    name: "Refrigerante Coca-Cola 350ml", 
    category: "Loja de Conveniência",
    unit: "Unidade",
    lot: "LOT002",
    expiry: "2024-06-15",
    sku: "CC350001",
    status: "Ativo" 
  },
  { 
    id: "3", 
    name: "Lavagem Completa", 
    category: "Serviços",
    unit: "Serviço",
    lot: "-",
    expiry: "-",
    sku: "SRV001",
    status: "Ativo" 
  },
  { 
    id: "4", 
    name: "Água Mineral 500ml", 
    category: "Loja de Conveniência",
    unit: "Unidade",
    lot: "LOT004",
    expiry: "2024-08-20",
    sku: "AG500001",
    status: "Inativo" 
  },
  { 
    id: "5", 
    name: "Troca de Óleo", 
    category: "Serviços",
    unit: "Serviço",
    lot: "-",
    expiry: "-",
    sku: "SRV002",
    status: "Ativo" 
  },
  { 
    id: "6", 
    name: "Salgadinho Doritos", 
    category: "Loja de Conveniência",
    unit: "Unidade",
    lot: "LOT005",
    expiry: "2024-04-10",
    sku: "SL001",
    status: "Ativo" 
  }
];

// Mock data for promotions
const mockPromotions = [
  {
    id: "1",
    name: "Desconto Combustível + Lavagem",
    type: "Combo",
    discountType: "percentage",
    discountValue: "15%",
    validFrom: "2024-01-15",
    validTo: "2024-02-15",
    paymentMethods: ["Cartão", "Dinheiro"],
    products: ["Lavagem Completa"],
    minAmount: "R$ 100,00",
    status: "Ativa"
  },
  {
    id: "2", 
    name: "Óleo Motor Promoção",
    type: "Produto Específico",
    discountType: "fixed",
    discountValue: "R$ 10,00",
    validFrom: "2024-01-10",
    validTo: "2024-01-31",
    paymentMethods: ["Cartão"],
    products: ["Óleo Motor 5W30"],
    minAmount: "-",
    status: "Ativa"
  },
  {
    id: "3",
    name: "Compre 3 Pague 2 - Loja",
    type: "Volume",
    discountType: "percentage", 
    discountValue: "33%",
    validFrom: "2024-01-01",
    validTo: "2024-01-30",
    paymentMethods: ["Cartão", "Dinheiro", "PIX"],
    products: ["Loja de Conveniência"],
    minAmount: "3 unidades",
    status: "Ativa"
  },
  {
    id: "4",
    name: "Black Friday Serviços",
    type: "Período Especial",
    discountType: "percentage",
    discountValue: "25%",
    validFrom: "2023-11-24",
    validTo: "2023-11-26", 
    paymentMethods: ["Cartão", "PIX"],
    products: ["Todos os Serviços"],
    minAmount: "-",
    status: "Expirada"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Óleos":
      return "secondary";
    case "Loja de Conveniência":
      return "outline";
    case "Serviços":
      return "destructive";
    default:
      return "outline";
  }
};

export function ProductsPage({ gasStation }: ProductsPageProps) {
  const [activeForm, setActiveForm] = useState<FormType>(null);

  const handleSubmitProduct = (data: any) => {
    console.log("Produto cadastrado:", data);
    setActiveForm(null);
  };

  const handleSubmitPromotion = (data: any) => {
    console.log("Promoção cadastrada:", data);
    setActiveForm(null);
  };

  if (activeForm === "product") {
    return (
      <ProductForm
        onSubmit={handleSubmitProduct}
        onCancel={() => setActiveForm(null)}
      />
    );
  }

  if (activeForm === "promotion") {
    return (
      <PromotionForm
        onSubmit={handleSubmitPromotion}
        onCancel={() => setActiveForm(null)}
      />
    );
  }

  // Separar promoções ativas das inativas
  const activePromotions = mockPromotions.filter(p => p.status === "Ativa");
  const inactivePromotions = mockPromotions.filter(p => p.status !== "Ativa");

  return (
    <div className="space-y-6">
      <div>
        <h2>Gerenciamento de Produtos e Serviços</h2>
        <p className="text-muted-foreground">Gerencie produtos, serviços e promoções do posto</p>
      </div>

      {/* Promoções */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            <CardTitle>Promoções</CardTitle>
            <Badge variant="outline" className="text-xs">
              {activePromotions.length} ativas
            </Badge>
          </div>
          <Button
            size="sm"
            onClick={() => setActiveForm("promotion")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Cadastrar Promoção
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Promoções Ativas em Verde */}
            {activePromotions.map((promotion) => (
              <div key={promotion.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{promotion.name}</h3>
                    <Badge 
                      variant="outline"
                      className="text-xs bg-white"
                    >
                      {promotion.type}
                    </Badge>
                    <Badge 
                      className="text-xs bg-green-600 text-white"
                    >
                      {promotion.discountValue}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Válida até:</span> {new Date(promotion.validTo).toLocaleDateString('pt-BR')}
                    </div>
                    <div>
                      <span className="font-medium">Produtos:</span> {promotion.products.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">Pagamentos:</span> {promotion.paymentMethods.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">Valor Mín:</span> {promotion.minAmount}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Pausar
                  </Button>
                </div>
              </div>
            ))}

            {/* Promoções Inativas */}
            {inactivePromotions.map((promotion) => (
              <div key={promotion.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{promotion.name}</h3>
                    <Badge 
                      variant="outline"
                      className="text-xs"
                    >
                      {promotion.type}
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className="text-xs"
                    >
                      {promotion.discountValue}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Validade:</span> {new Date(promotion.validFrom).toLocaleDateString('pt-BR')} até {new Date(promotion.validTo).toLocaleDateString('pt-BR')}
                    </div>
                    <div>
                      <span className="font-medium">Produtos:</span> {promotion.products.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">Pagamentos:</span> {promotion.paymentMethods.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {promotion.status}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Ativar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {mockPromotions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma promoção cadastrada ainda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Produtos e Serviços */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <CardTitle>Produtos e Serviços</CardTitle>
          </div>
          <Button
            size="sm"
            onClick={() => setActiveForm("product")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Cadastrar Produto/Serviço
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{product.name}</h3>
                    <Badge 
                      variant={getCategoryColor(product.category)}
                      className="text-xs"
                    >
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">SKU:</span> {product.sku}
                    </div>
                    <div>
                      <span className="font-medium">Unidade:</span> {product.unit}
                    </div>
                    {product.category !== "Serviços" && (
                      <>
                        <div>
                          <span className="font-medium">Lote:</span> {product.lot}
                        </div>
                        <div>
                          <span className="font-medium">Validade:</span> {product.expiry}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={product.status === "Ativo" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {product.status}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      {product.status === "Ativo" ? "Inativar" : "Ativar"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {mockProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum produto ou serviço cadastrado ainda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}