import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Search, 
  Fuel, 
  ShoppingBag, 
  Wrench,
  Plus,
  Minus,
  Trash2,
  Phone,
  Mail,
  CreditCard,
  FileText,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Leaf,
  Package2,
  Truck,
  MapPin,
  CheckCircle,
  User,
  RefreshCw,
  RotateCcw,
  MessageCircle,
  Send,
  X
} from "lucide-react";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { ProductDetailPage } from "./ProductDetailPage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";

interface Product {
  id: string;
  name: string;
  price: number;
  category: "combustivel" | "produto" | "servico" | "cogumelo" | "kit";
  description: string;
  imageUrl: string;
  inStock: boolean;
  unit?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface EcommercePageProps {
  onBackToLogin: () => void;
}

export function EcommercePage({ onBackToLogin }: EcommercePageProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "payment" | null>(null);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [shippingOption, setShippingOption] = useState<"correios" | "pac" | null>(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "boleto" | "cartao" | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState(1);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'bot' | 'user', timestamp: Date}[]>([
    { text: "Olá estamos aqui para te ajudar", sender: "bot", timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Mock data de produtos
  const mockProducts: Product[] = [
    // Combustíveis
    // Cogumelos
    {
      id: "11",
      name: "Psilocybe Cubensis",
      price: 15.00,
      category: "cogumelo",
      description: "Psilocybe Cubensis – Amostra Etnobotânica (Separados a vácuo)",
      imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/09a10813747869.56277986f27b9.jpg",
      inStock: true,
      unit: "grama"
    },
    {
      id: "12",
      name: "Juba de Leão - Hericium erinaceus",
      price: 2.09,
      category: "cogumelo",
      description: "Hericium erinaceus – Cogumelo Nootrópico (Selado a vácuo)",
      imageUrl: "https://plus.unsplash.com/premium_photo-1696617442006-aaec3e7a6fcd?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGVyaWNpdW0lMjBlcmluYWNldXN8ZW58MHx8MHx8fDA%3D",
      inStock: true,
      unit: "grama"
    },
    {
      id: "13",
      name: "Ganoderma lucidum - Reishi",
      price: 2.54,
      category: "cogumelo",
      description: "Ganoderma lucidum – (Desidratado e selado a vácuo)",
      imageUrl: "https://plus.unsplash.com/premium_photo-1675720902465-82781aaa96bb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEdhbm9kZXJtYSUyMGx1Y2lkdW18ZW58MHx8MHx8fDA%3D",
      inStock: true,
      unit: "grama"
    },
    // Kits de Cultivo
    {
      id: "14",
      name: "Kit Cultivo FÁCIL 1L de P. cubensis",
      price: 124.00,
      category: "kit",
      description: "Kit completo para cultivo caseiro de Psilocybe cubensis - 1 litro",
      imageUrl: "https://static.wixstatic.com/media/00b222_40ac28ddc687467dab38fc0b5dd92027~mv2.jpeg/v1/fill/w_750,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/00b222_40ac28ddc687467dab38fc0b5dd92027~mv2.jpeg",
      inStock: true,
      unit: "kit"
    },
    {
      id: "15",
      name: "Kit Cultivo FÁCIL 1L de Hericium erinaceus",
      price: 35.92,
      category: "kit",
      description: "Kit completo para cultivo caseiro de Juba de Leão - 1 litro",
      imageUrl: "https://static.wixstatic.com/media/00b222_a223a2a2ce014121862ffd03e91c69f2~mv2.png/v1/fill/w_750,h_750,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/00b222_a223a2a2ce014121862ffd03e91c69f2~mv2.png",
      inStock: true,
      unit: "kit"
    },
    {
      id: "16",
      name: "Kit Cultivo FÁCIL 1L de Ganoderma lucidum",
      price: 40.41,
      category: "kit",
      description: "Kit completo para cultivo caseiro de Reishi - 1 litro",
      imageUrl: "https://static.wixstatic.com/media/00b222_a4fe4917a17a4b82962c157aa796c46f~mv2.jpeg/v1/fill/w_750,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/00b222_a4fe4917a17a4b82962c157aa796c46f~mv2.jpeg",
      inStock: true,
      unit: "kit"
    }
  ];

  // Mock data de pedidos realizados
  const mockOrders = [
    {
      id: "ORD-2026-001",
      date: "05/01/2026",
      status: "Entregue",
      total: 135.41,
      items: [
        { name: "Kit Cultivo FÁCIL 1L de Hericium erinaceus", quantity: 2, price: 45.00 },
        { name: "Hericium erinaceus", quantity: 3, price: 15.00 }
      ],
      shippingAddress: "Rua das Flores, 123 - São Paulo, SP"
    },
    {
      id: "ORD-2026-002",
      date: "03/01/2026",
      status: "Em trânsito",
      total: 80.82,
      items: [
        { name: "Kit Cultivo FÁCIL 1L de Ganoderma lucidum", quantity: 2, price: 40.41 }
      ],
      shippingAddress: "Av. Paulista, 1000 - São Paulo, SP"
    },
    {
      id: "ORD-2025-089",
      date: "28/12/2025",
      status: "Entregue",
      total: 60.00,
      items: [
        { name: "Ganoderma lucidum", quantity: 4, price: 15.00 }
      ],
      shippingAddress: "Rua Augusta, 500 - São Paulo, SP"
    },
    {
      id: "ORD-2025-078",
      date: "20/12/2025",
      status: "Cancelado",
      total: 30.00,
      items: [
        { name: "Psilocybe Cubensis", quantity: 2, price: 15.00 }
      ],
      shippingAddress: "Rua Oscar Freire, 200 - São Paulo, SP"
    }
  ];

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "combustivel":
        return <Fuel className="h-4 w-4" />;
      case "produto":
        return <ShoppingBag className="h-4 w-4" />;
      case "servico":
        return <Wrench className="h-4 w-4" />;
      case "cogumelo":
        return <Leaf className="h-4 w-4" />;
      case "kit":
        return <Package2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "combustivel":
        return "Combustível";
      case "produto":
        return "Produto";
      case "servico":
        return "Serviço";
      case "cogumelo":
        return "Cogumelo";
      case "kit":
        return "Kit de Cultivo";
      default:
        return "";
    }
  };

  const handleSendChatMessage = () => {
    if (chatInput.trim() === "") return;
    
    // Adiciona mensagem do usuário
    const userMessage = {
      text: chatInput,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    
    // Simula resposta do bot após 1 segundo
    setTimeout(() => {
      const botMessage = {
        text: "Obrigado pela sua mensagem! Em breve um de nossos atendentes irá responder.",
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getRelatedProducts = (product: Product | null) => {
    if (!product) return [];
    return mockProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  };

  const handleCepSearch = async () => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress(data.logradouro || "");
          setNeighborhood(data.bairro || "");
          setCity(data.localidade || "");
          setState(data.uf || "");
          // Calcula frete mock
          setShippingCost(Math.random() * 20 + 10); // Entre R$ 10 e R$ 30
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const getPaymentMethodLabel = () => {
    if (paymentMethod === "pix") return "PIX";
    if (paymentMethod === "boleto") return "Boleto Bancário";
    if (paymentMethod === "cartao") return `Cartão de Crédito (${installments}x)`;
    return "";
  };

  // Tela de Sucesso
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div>
              <h1 className="font-semibold">🍄 Shop Cogumelos</h1>
            </div>
          </div>
        </header>

        <div className="container max-w-3xl py-12 px-4 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="w-full">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-3xl mb-2">Pedido Realizado com Sucesso!</CardTitle>
              <CardDescription className="text-base">
                Obrigado por sua compra. Você receberá um e-mail de confirmação em breve.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Itens Comprados */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Itens Comprados</h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      R$ {(
                        getTotalPrice() +
                        (shippingOption === "correios"
                          ? shippingCost
                          : shippingCost * 0.7)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Endereço de Entrega */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço de Entrega
                </h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm">
                    {address}, {number} {complement && `- ${complement}`}
                  </p>
                  <p className="text-sm">
                    {neighborhood} - {city}/{state}
                  </p>
                  <p className="text-sm">
                    CEP: {cep}
                  </p>
                </div>
              </div>

              {/* Opção de Entrega */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Opção de Entrega
                </h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {shippingOption === "correios" ? "Correios - SEDEX" : "Correios - PAC"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {shippingOption === "correios" 
                          ? "Entrega em 3-5 dias úteis" 
                          : "Entrega em 7-10 dias úteis"}
                      </p>
                    </div>
                    <p className="font-bold">
                      R$ {(shippingOption === "correios"
                        ? shippingCost
                        : shippingCost * 0.7
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Forma de Pagamento
                </h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium">{getPaymentMethodLabel()}</p>
                  {paymentMethod === "pix" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Aguardando pagamento via PIX
                    </p>
                  )}
                  {paymentMethod === "boleto" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Boleto enviado para seu e-mail
                    </p>
                  )}
                  {paymentMethod === "cartao" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Cartão final {cardNumber.slice(-4)} - {installments}x de R$ {(
                        (getTotalPrice() + (shippingOption === "correios" ? shippingCost : shippingCost * 0.7)) / installments
                      ).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    setOrderCompleted(false);
                    setCheckoutStep(null);
                    setCart([]);
                    setPaymentMethod(null);
                    setCardNumber("");
                    setCardName("");
                    setCardExpiry("");
                    setCardCvv("");
                    setInstallments(1);
                    setCep("");
                    setAddress("");
                    setNumber("");
                    setComplement("");
                    setNeighborhood("");
                    setCity("");
                    setState("");
                    setShippingOption(null);
                    setShippingCost(0);
                    setSelectedProduct(null);
                    setSearchQuery("");
                  }}
                >
                  Continuar Comprando
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Se estiver na etapa de checkout, renderiza apenas o checkout
  if (checkoutStep === "address") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCheckoutStep(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-semibold">🍄 Shop Cogumelos - Checkout</h1>
                <p className="text-sm text-muted-foreground">Endereço de Entrega</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container max-w-4xl py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulário de Endereço */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereço de Entrega
                  </CardTitle>
                  <CardDescription>
                    Preencha seu endereço para calcular o frete
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        value={cep}
                        onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                        maxLength={8}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        className="w-full"
                        onClick={handleCepSearch}
                        disabled={cep.length !== 8}
                      >
                        Buscar
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      placeholder="Rua, Avenida..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        placeholder="123"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        placeholder="Apto, Casa..."
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      placeholder="Centro"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        placeholder="São Paulo"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        placeholder="SP"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        maxLength={2}
                      />
                    </div>
                  </div>

                  {shippingCost > 0 && (
                    <>
                      <Separator className="my-6" />
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          Opções de Entrega
                        </h3>
                        <div className="space-y-3">
                          <Card
                            className={`cursor-pointer transition-all ${
                              shippingOption === "correios"
                                ? "border-primary ring-2 ring-primary"
                                : "hover:border-primary/50"
                            }`}
                            onClick={() => setShippingOption("correios")}
                          >
                            <CardContent className="pt-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Correios - SEDEX</p>
                                  <p className="text-sm text-muted-foreground">
                                    Entrega em 3-5 dias úteis
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg">
                                    R$ {shippingCost.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card
                            className={`cursor-pointer transition-all ${
                              shippingOption === "pac"
                                ? "border-primary ring-2 ring-primary"
                                : "hover:border-primary/50"
                            }`}
                            onClick={() => setShippingOption("pac")}
                          >
                            <CardContent className="pt-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Correios - PAC</p>
                                  <p className="text-sm text-muted-foreground">
                                    Entrega em 7-10 dias úteis
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg">
                                    R$ {(shippingCost * 0.7).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    {shippingOption && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frete:</span>
                        <span className="font-medium">
                          R$ {(shippingOption === "correios"
                            ? shippingCost
                            : shippingCost * 0.7
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="text-2xl font-bold">
                      R$ {(
                        getTotalPrice() +
                        (shippingOption
                          ? shippingOption === "correios"
                            ? shippingCost
                            : shippingCost * 0.7
                          : 0)
                      ).toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!shippingOption}
                    onClick={() => setCheckoutStep("payment")}
                  >
                    Avançar para Pagamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === "payment") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCheckoutStep("address")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-semibold">🍄 Shop Cogumelos - Checkout</h1>
                <p className="text-sm text-muted-foreground">Pagamento</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container max-w-4xl py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulário de Pagamento */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Forma de Pagamento
                  </CardTitle>
                  <CardDescription>
                    Escolha como deseja pagar seu pedido
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Opções de Pagamento */}
                  <div className="space-y-3">
                    {/* PIX */}
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "pix"
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setPaymentMethod("pix")}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-background border-2 flex items-center justify-center">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                              <path d="M2 17l10 5 10-5"/>
                              <path d="M2 12l10 5 10-5"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">PIX</p>
                            <p className="text-sm text-muted-foreground">
                              Aprovação imediata
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Boleto */}
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "boleto"
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setPaymentMethod("boleto")}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-background border-2 flex items-center justify-center">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                              <line x1="9" y1="13" x2="15" y2="13"/>
                              <line x1="9" y1="17" x2="15" y2="17"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">Boleto Bancário</p>
                            <p className="text-sm text-muted-foreground">
                              Vencimento em 3 dias úteis
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Cartão */}
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "cartao"
                          ? "border-primary ring-2 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setPaymentMethod("cartao")}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-background border-2 flex items-center justify-center">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="5" width="20" height="14" rx="2"/>
                              <line x1="2" y1="10" x2="22" y2="10"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">Cartão de Crédito/Débito</p>
                            <p className="text-sm text-muted-foreground">
                              Parcelamento disponível
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Formulário de Cartão */}
                  {paymentMethod === "cartao" && (
                    <>
                      <Separator className="my-6" />
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nome no Cartão</Label>
                          <Input
                            id="cardName"
                            placeholder="JOÃO SILVA"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Validade</Label>
                            <Input
                              id="cardExpiry"
                              placeholder="MM/AA"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvv">CVV</Label>
                            <Input
                              id="cardCvv"
                              placeholder="123"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              maxLength={4}
                              type="password"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="installments">Parcelamento</Label>
                          <select
                            id="installments"
                            value={installments}
                            onChange={(e) => setInstallments(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value={1}>
                              1x de R$ {(getTotalPrice() + (shippingOption === "correios" ? shippingCost : shippingCost * 0.7)).toFixed(2)} sem juros
                            </option>
                            <option value={2}>
                              2x de R$ {((getTotalPrice() + (shippingOption === "correios" ? shippingCost : shippingCost * 0.7)) / 2).toFixed(2)} sem juros
                            </option>
                            <option value={3}>
                              3x de R$ {((getTotalPrice() + (shippingOption === "correios" ? shippingCost : shippingCost * 0.7)) / 3).toFixed(2)} sem juros
                            </option>
                            <option value={4}>
                              4x de R$ {((getTotalPrice() + (shippingOption === "correios" ? shippingCost : shippingCost * 0.7)) / 4).toFixed(2)} sem juros
                            </option>
                            <option value={5}>
                              5x de R$ {((getTotalPrice() + (shippingOption === "correios" ? shippingCost : shippingCost * 0.7)) / 5).toFixed(2)} sem juros
                            </option>
                            <option value={6}>
                              6x de R$ {((getTotalPrice() + (shippingOption === "correios" ? shippingCost : shippingCost * 0.7)) / 6).toFixed(2)} sem juros
                            </option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Informações PIX */}
                  {paymentMethod === "pix" && (
                    <div className="bg-muted/50 p-4 rounded-lg mt-4">
                      <p className="text-sm text-muted-foreground">
                        Após confirmar o pedido, você receberá um QR Code para realizar o pagamento via PIX.
                      </p>
                    </div>
                  )}

                  {/* Informações Boleto */}
                  {paymentMethod === "boleto" && (
                    <div className="bg-muted/50 p-4 rounded-lg mt-4">
                      <p className="text-sm text-muted-foreground">
                        O boleto será gerado após a confirmação do pedido. O prazo de vencimento é de 3 dias úteis.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-medium">R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete:</span>
                      <span className="font-medium">
                        R$ {(shippingOption === "correios"
                          ? shippingCost
                          : shippingCost * 0.7
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="text-2xl font-bold">
                      R$ {(
                        getTotalPrice() +
                        (shippingOption === "correios"
                          ? shippingCost
                          : shippingCost * 0.7)
                      ).toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!paymentMethod}
                    onClick={() => {
                      // Criar objeto do pedido
                      const newOrder = {
                        id: `ORD-2026-${String(completedOrders.length + 1).padStart(3, '0')}`,
                        date: new Date().toLocaleDateString('pt-BR'),
                        status: "Em processamento",
                        total: getTotalPrice() + shippingCost,
                        items: cart.map(item => ({
                          name: item.name,
                          quantity: item.quantity,
                          price: item.price
                        })),
                        shippingAddress: `${address}, ${number}${complement ? ', ' + complement : ''} - ${city}, ${state}`,
                        paymentMethod: paymentMethod,
                        shippingOption: shippingOption
                      };
                      
                      // Adicionar pedido à lista
                      setCompletedOrders([newOrder, ...completedOrders]);
                      
                      setOrderCompleted(true);
                    }}
                  >
                    Finalizar Compra
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Página Minhas Compras */}
      {showMyOrders && (
        <div className="fixed inset-0 bg-background z-50 overflow-auto">
          <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMyOrders(false)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="font-semibold">Minhas Compras</h1>
              </div>
            </div>
          </header>

          <div className="container py-8 px-4 max-w-4xl">
            <div className="space-y-4">
              {[...completedOrders, ...mockOrders].map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                        <CardDescription>Realizado em {order.date}</CardDescription>
                      </div>
                      <Badge 
                        variant={
                          order.status === "Entregue" 
                            ? "default" 
                            : order.status === "Em trânsito" || order.status === "Em processamento"
                            ? "secondary" 
                            : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Itens do pedido:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">
                            R$ {(item.quantity * item.price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {order.shippingAddress}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-semibold">Total:</span>
                      <span className="text-xl font-bold">R$ {order.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Ver Detalhes
                    </Button>
                    {order.status === "Entregue" && (
                      <Button variant="default" className="flex-1">
                        Comprar Novamente
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="font-semibold">🍄 Shop Cogumelos</h1>
              <p className="text-sm text-muted-foreground">Compre pelo telefone 4002-8922</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2">
              
              
              <Button variant="outline" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  >
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Meus dados</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowMyOrders(true)}>Minhas compras</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-6 px-4">
        <div className="grid grid-cols-1 gap-6">
          {/* Products Section */}
          <div className="space-y-6">
            {/* Mobile Search */}
            <div className="relative md:hidden">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            <Tabs defaultValue="todos" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="cogumelo">
                  <Leaf className="h-4 w-4 mr-2" />
                  Cogumelos
                </TabsTrigger>
                <TabsTrigger value="kit">
                  <Package2 className="h-4 w-4 mr-2" />
                  Kits
                </TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedProduct(product)}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{product.name}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {getCategoryIcon(product.category)}
                            <span className="ml-1">{getCategoryLabel(product.category)}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video relative overflow-hidden rounded-md bg-muted">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">
                            R$ {product.price.toFixed(2)}
                          </p>
                          {product.unit && (
                            <p className="text-sm text-muted-foreground">por {product.unit}</p>
                          )}
                        </div>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          disabled={!product.inStock}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cogumelo" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.filter(p => p.category === "cogumelo").map((product) => (
                    <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedProduct(product)}>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video relative overflow-hidden rounded-md bg-muted">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">
                            R$ {product.price.toFixed(2)}
                          </p>
                          {product.unit && (
                            <p className="text-sm text-muted-foreground">por {product.unit}</p>
                          )}
                        </div>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="kit" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.filter(p => p.category === "kit").map((product) => (
                    <Card key={product.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video relative overflow-hidden rounded-md bg-muted">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">
                            R$ {product.price.toFixed(2)}
                          </p>
                          {product.unit && (
                            <p className="text-sm text-muted-foreground">por {product.unit}</p>
                          )}
                        </div>
                        <Button onClick={() => addToCart(product)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Políticas da Loja */}
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Política de Troca */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Política de Troca
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Prazo:</strong> Você tem até 7 dias corridos após o recebimento do produto para solicitar a troca.
              </p>
              <p>
                <strong className="text-foreground">Condições:</strong> O produto deve estar em sua embalagem original, sem sinais de uso, com todos os acessórios e etiquetas.
              </p>
              <p>
                <strong className="text-foreground">Como solicitar:</strong> Entre em contato através do e-mail contato@shopcogumelos.com.br ou WhatsApp 4002-8922.
              </p>
            </CardContent>
          </Card>

          {/* Política de Devolução */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Política de Devolução
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Prazo:</strong> Você tem até 7 dias corridos após o recebimento do produto para solicitar a devolução e reembolso total.
              </p>
              <p>
                <strong className="text-foreground">Reembolso:</strong> O valor será estornado em até 10 dias úteis após a confirmação do recebimento do produto em nossas instalações.
              </p>
              <p>
                <strong className="text-foreground">Produtos cultiváveis:</strong> Kits de cultivo devem estar lacrados e sem violação da embalagem para serem aceitos na devolução.
              </p>
              <p>
                <strong className="text-foreground">Produtos perecíveis:</strong> Cogumelos frescos não são aceitos para devolução por questões de higiene e segurança alimentar.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t bg-muted/50">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Formas de Pagamento */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Formas de Pagamento
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-background flex items-center justify-center border">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="5" width="20" height="14" rx="2"/>
                      <line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                  </div>
                  <span>Cartão de Crédito/Débito</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-background flex items-center justify-center border">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <span>PIX</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-background flex items-center justify-center border">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="9" y1="13" x2="15" y2="13"/>
                      <line x1="9" y1="17" x2="15" y2="17"/>
                    </svg>
                  </div>
                  <span>Boleto Bancário</span>
                </div>
              </div>
            </div>

            {/* Formas de Contato */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contato</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <a 
                  href="tel:40028922" 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>4002-8922</span>
                </a>
                <a 
                  href="mailto:atendimento@shopcogumelos.com" 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>atendimento@shopcogumelos.com</span>
                </a>
              </div>
            </div>

            {/* Política de Privacidade */}
            <div className="space-y-4">
              <h3 className="font-semibold">Informações</h3>
              <div className="space-y-2 text-sm">
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Política de Privacidade</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Termos de Uso</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Perguntas Frequentes</span>
                </a>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-4">
              <h3 className="font-semibold">Redes Sociais</h3>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-background border flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-background border flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-background border flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 rounded-full bg-background border flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Siga-nos nas redes sociais e fique por dentro das novidades e promoções!
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 Shop Cogumelos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Carrinho
            </SheetTitle>
            <SheetDescription>
              {cart.length === 0 ? "Seu carrinho está vazio" : `${cart.length} ${cart.length === 1 ? "item" : "itens"}`}
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-8 flex flex-col h-[calc(100vh-120px)]">
            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
                <div>
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Adicione produtos ao carrinho</p>
                </div>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              R$ {item.price.toFixed(2)} {item.unit && `/ ${item.unit}`}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="pt-4 space-y-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="text-2xl font-bold">
                      R$ {getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Finalizar Pedido
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Product Detail Dialog */}
      <ProductDetailPage 
        product={selectedProduct}
        open={selectedProduct !== null}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        onAddToCart={addToCart}
        relatedProducts={getRelatedProducts(selectedProduct)}
        cartItemCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={(open) => {
        setIsLoginModalOpen(open);
        if (!open) setIsCreatingAccount(false);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isCreatingAccount ? "Criar Nova Conta" : "Entrar ou Criar Conta"}</DialogTitle>
            <DialogDescription>
              {isCreatingAccount 
                ? "Preencha seus dados para criar uma conta." 
                : "Faça login para finalizar seu pedido ou crie uma nova conta."}
            </DialogDescription>
          </DialogHeader>
          
          {!isCreatingAccount ? (
            // Login Form
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button 
                  className="w-full" 
                  onClick={() => {
                    console.log("Login:", loginEmail, loginPassword);
                    setIsLoginModalOpen(false);
                    setCheckoutStep("address");
                    setIsCartOpen(false);
                  }}
                >
                  Entrar
                </Button>
                <Separator />
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsCreatingAccount(true)}
                >
                  Criar Conta
                </Button>
              </div>
            </div>
          ) : (
            // Signup Form
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="João"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Silva"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signupEmail">E-mail</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  placeholder="seu@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button 
                  className="w-full" 
                  onClick={() => {
                    console.log("Criar conta:", firstName, lastName, signupEmail);
                    setIsLoginModalOpen(false);
                    setCheckoutStep("address");
                    setIsCartOpen(false);
                    setIsCreatingAccount(false);
                  }}
                >
                  Avançar
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setIsCreatingAccount(false)}
                >
                  Voltar para Login
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Bot Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Botão do Chat */}
        {!isChatOpen && (
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}

        {/* Modal do Chat */}
        {isChatOpen && (
          <Card className="w-80 sm:w-96 shadow-2xl border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
              <CardTitle className="text-lg font-semibold">Chat de Suporte</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mensagens */}
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input de Mensagem */}
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendChatMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendChatMessage}
                    disabled={chatInput.trim() === ""}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}