import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  Plus, 
  Minus, 
  ShoppingCart,
  Star,
  Facebook,
  Instagram,
  Twitter,
  Link2,
  Fuel,
  ShoppingBag,
  Wrench,
  ArrowLeft,
  MapPin,
  Truck,
  Loader2,
  Leaf,
  Package2,
  AlertTriangle,
  User
} from "lucide-react";
import { toast } from "sonner@2.0.3";

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

interface ProductDetailPageProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  relatedProducts?: Product[];
  cartItemCount?: number;
  onOpenCart?: () => void;
}

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    author: "João Silva",
    rating: 5,
    date: "15/12/2025",
    comment: "Excelente produto! Qualidade superior e entrega rápida. Recomendo!",
    verified: true
  },
  {
    id: "2",
    author: "Maria Santos",
    rating: 4,
    date: "10/12/2025",
    comment: "Muito bom, atendeu minhas expectativas. O preço está justo.",
    verified: true
  },
  {
    id: "3",
    author: "Carlos Oliveira",
    rating: 5,
    date: "05/12/2025",
    comment: "Produto de primeira linha. Já é a segunda vez que compro e sempre com qualidade impecável!",
    verified: true
  }
];

const getProductReviews = (productId: string) => {
  const reviews: Record<string, any[]> = {
    "11": [
      {
        id: "1",
        author: "Dr. Fernando Lima",
        rating: 5,
        date: "20/12/2025",
        comment: "Excelente para pesquisa etnobotânica! Material bem preservado e devidamente selado. Recomendo para fins educacionais.",
        verified: true
      },
      {
        id: "2",
        author: "Bióloga Ana Paula",
        rating: 5,
        date: "15/12/2025",
        comment: "Produto de alta qualidade para estudos. Embalagem impecável e muito bem vedada a vácuo.",
        verified: true
      },
      {
        id: "3",
        author: "Pesquisador Marcos",
        rating: 4,
        date: "10/12/2025",
        comment: "Ótimo para análises em laboratório. Chegou bem conservado.",
        verified: true
      }
    ],
    "12": [
      {
        id: "1",
        author: "Chef Rodrigo Santos",
        rating: 5,
        date: "18/12/2025",
        comment: "Sabor incrível! Uso em pratos gourmet e meus clientes adoram. A textura após reidratação é perfeita!",
        verified: true
      },
      {
        id: "2",
        author: "Nutricionista Laura",
        rating: 5,
        date: "12/12/2025",
        comment: "Excelente cogumelo medicinal! Recomendo aos meus pacientes. Propriedades nootrópicas notáveis e sabor agradável.",
        verified: true
      },
      {
        id: "3",
        author: "Paulo Henrique",
        rating: 5,
        date: "08/12/2025",
        comment: "Compro regularmente! Ajuda na concentração e foco. Além disso, é delicioso em receitas asiáticas. Produto de primeira!",
        verified: true
      }
    ],
    "13": [
      {
        id: "1",
        author: "Dra. Márcia Terapeuta",
        rating: 5,
        date: "22/12/2025",
        comment: "Uso Reishi há anos e este é de excelente qualidade! Notável melhora no sono e na disposição. Embalagem perfeita que preserva todas as propriedades.",
        verified: true
      },
      {
        id: "2",
        author: "Roberto Wellness",
        rating: 5,
        date: "19/12/2025",
        comment: "O Rei dos Cogumelos! Faço chá diariamente e sinto muita diferença no meu sistema imunológico e energia. Produto autêntico e de primeira linha!",
        verified: true
      },
      {
        id: "3",
        author: "Carla Naturista",
        rating: 5,
        date: "16/12/2025",
        comment: "Maravilhoso! Reduz meu estresse e ansiedade notavelmente. Já indiquei para várias amigas. Vale muito a pena investir na saúde!",
        verified: true
      }
    ],
    "14": [
      {
        id: "1",
        author: "Prof. Eduardo Micologia",
        rating: 5,
        date: "25/12/2025",
        comment: "Kit perfeito para uso educacional! Substrato 100% colonizado chegou em condições impecáveis. Frutificou em 14 dias conforme prometido. Excelente para projetos de pesquisa!",
        verified: true
      },
      {
        id: "2",
        author: "Estudante de Biologia",
        rating: 5,
        date: "20/12/2025",
        comment: "Meu primeiro kit de cultivo e foi surpreendente! Manual muito claro, processo fácil de seguir. Consegui 3 fluxos de colheita. Recomendo muito para quem está começando!",
        verified: true
      },
      {
        id: "3",
        author: "Pesquisador Lucas",
        rating: 5,
        date: "17/12/2025",
        comment: "Qualidade excepcional! Zero contaminação, substrato muito bem preparado. Perfeito para estudos de micologia. Já encomendei mais kits!",
        verified: true
      }
    ],
    "15": [
      {
        id: "1",
        author: "Chef Marina Gourmet",
        rating: 5,
        date: "23/12/2025",
        comment: "Incrível! Colhi cogumelos fresquíssimos em 10 dias. O sabor é incomparável ao desidratado. Uso nos meus pratos premium e os clientes adoram. Kit muito bem preparado!",
        verified: true
      },
      {
        id: "2",
        author: "André Saúde Natural",
        rating: 5,
        date: "18/12/2025",
        comment: "Melhor investimento que fiz! Cultivar minha própria Juba de Leão para uso medicinal foi transformador. Já tive 4 colheitas e continuando. Qualidade superior!",
        verified: true
      },
      {
        id: "3",
        author: "Biohacker Renato",
        rating: 5,
        date: "15/12/2025",
        comment: "Kit nootrópico perfeito! Fácil de cultivar mesmo sem experiência. Os cogumelos frescos realmente fazem diferença na concentração. Suporte técnico excelente!",
        verified: true
      }
    ],
    "16": [
      {
        id: "1",
        author: "Terapeuta Holística Silvia",
        rating: 5,
        date: "28/12/2025",
        comment: "Cultivar meu próprio Reishi é um sonho realizado! Os conks ficaram lindos com brilho vermelho característico. Qualidade medicinal superior. Vale cada centavo!",
        verified: true
      },
      {
        id: "2",
        author: "Herbalist Pedro",
        rating: 5,
        date: "21/12/2025",
        comment: "Kit premium de verdade! Substrato especializado fez toda diferença. Processo demorado mas extremamente gratificante. Faço extratos e tinturas. Potência incrível!",
        verified: true
      },
      {
        id: "3",
        author: "Médico Integrativo Dr. Carlos",
        rating: 5,
        date: "19/12/2025",
        comment: "Recomendo aos meus pacientes! Cultivar Reishi em casa garante máxima qualidade dos compostos bioativos. Manual muito completo. Vídeos tutoriais ajudam muito!",
        verified: true
      }
    ]
  };
  return reviews[productId] || mockReviews;
};

export function ProductDetailPage({ 
  product, 
  open, 
  onOpenChange, 
  onAddToCart,
  relatedProducts = [],
  cartItemCount = 0,
  onOpenCart
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<{
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    sedex: { days: number; price: number };
    pac: { days: number; price: number };
  } | null>(null);

  if (!open || !product) return null;

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
        return "Kit";
      default:
        return "";
    }
  };

  const getDetailedDescription = (product: Product) => {
    const descriptions: Record<string, string> = {
      "1": "Nossa Gasolina Comum passa por rigorosos controles de qualidade, garantindo máxima performance para o seu veículo. Produzida com tecnologia de ponta, oferece excelente rendimento e proteção ao motor. Ideal para o uso diário, proporcionando economia e eficiência.",
      "2": "A Gasolina Aditivada premium conta com aditivos exclusivos que limpam e protegem o motor. Desenvolvida para oferecer máxima potência e desempenho, reduz o acúmulo de resíduos e aumenta a vida útil do motor. Perfeita para quem busca o melhor para seu veículo.",
      "3": "Etanol de altíssima pureza, produzido com matéria-prima selecionada. Oferece excelente rendimento e é uma opção sustentável e econômica. Ideal para motores flex, proporciona ótimo desempenho em qualquer condição.",
      "4": "Diesel S10 de baixo teor de enxofre, desenvolvido para motores modernos. Oferece máxima eficiência energética e reduz significativamente as emissões poluentes. Atende às mais rigorosas normas ambientais.",
      "5": "Óleo sintético premium 5W30, desenvolvido com tecnologia avançada para proteção máxima do motor. Mantém a viscosidade ideal em todas as temperaturas, reduz o atrito e aumenta a vida útil do motor. Ideal para carros modernos e de alto desempenho.",
      "6": "Filtro de ar universal de alta eficiência, capaz de reter até 99% das impurezas. Protege o motor contra sujeira e partículas, garantindo melhor combustão e desempenho. Fácil instalação e longa durabilidade.",
      "7": "Água desmineralizada especialmente tratada para sistemas de arrefecimento. Previne corrosão, ferrugem e formação de depósitos. Mantém a temperatura ideal do motor e prolonga a vida útil do radiador.",
      "8": "Lavagem externa completa utilizando produtos premium e técnicas profissionais. Remove toda sujeira, poeira e resíduos da estrada. Seu carro ficará brilhando como novo, com proteção para a pintura.",
      "9": "Serviço completo que inclui lavagem externa, limpeza interna detalhada e aspiração minuciosa. Todos os cantos e detalhes do seu veículo são cuidadosamente limpos. Produto de qualidade profissional garantido.",
      "10": "Serviço completo de troca de óleo utilizando produtos de primeira linha. Inclui substituição do filtro de óleo e verificação completa do motor. Realizado por profissionais qualificados, garantindo máxima qualidade.",
      "11": "🧠 Conhecimento e curiosidade científica\n\nO interesse em psilocybe cubensis comprar está diretamente ligado à busca por conhecimento. Cada etapa do cultivo e da observação desse fungo representa uma oportunidade de aprendizado sobre biologia, ecologia e genética. Pesquisadores analisam a interação entre o fungo e o ambiente, coletando dados que auxiliam no desenvolvimento de técnicas laboratoriais e métodos de identificação micológica.\n\nAlém disso, o Psilocybe cubensis desperta curiosidade em áreas interdisciplinares, como a biotecnologia e a engenharia de materiais. Estudos recentes indicam que os fungos possuem propriedades estruturais e adaptativas que podem inspirar novos produtos e soluções ecológicas. Esse potencial coloca o Psilocybe cubensis como um dos organismos mais versáteis do reino Fungi.",
      "12": "🍄 Cogumelo Medicinal e Gastronômico\n\nO cogumelo Hericium erinaceus é considerado uma iguaria em certas regiões por conta de seu sabor único e exclusivo, sendo muito apreciados por chefs da alta gastronomia. Hericium erinaceus, também conhecido popularmente como juba de leão, é um cogumelo nativo da América do Norte, da Europa e da Ásia e cultivado em todo o mundo.\n\nTem sido utilizado há milênios como um alimento medicinal, na medicina tradicional chinesa e outras práticas médicas ancestrais. Devido à presença de polissacarídeos únicos e outros nutrientes, o cogumelo nutritivo tem um vasto número de benefícios para a saúde. É o único cogumelo nootrópico conhecido.\n\nOs dois benefícios mais conhecidos associados ao seu consumo são a capacidade potencial de prevenir ou proteger a propagação das doenças neurodegenerativas e do câncer. Também pode ajudar a melhorar a saúde cardíaca, proteger de problemas inflamatórios digestivos, reduzir a inflamação, aliviar o estresse oxidativo, melhorar a saúde mental, aumentar a imunidade e prevenir a diabetes.\n\nÉ um dos cogumelos alimentícios mais apreciados em todo o mundo. Cogumelos desidratados, selados a vácuo com sílica para inibir absorção de umidade.",
      "13": "🌟 O Cogumelo da Longevidade e Vitalidade\n\nO Ganoderma lucidum, popularmente conhecido como Reishi ou Lingzhi, é um dos cogumelos medicinais mais reverenciados e pesquisados no mundo. Com mais de 4.000 anos de uso documentado na medicina tradicional chinesa, o Reishi é conhecido como o \"Cogumelo da Imortalidade\" e o \"Rei dos Cogumelos\" devido aos seus extraordinários benefícios para a saúde.\n\nCultivado em condições controladas para garantir máxima potência, nosso Ganoderma lucidum contém compostos bioativos únicos, incluindo polissacarídeos, triterpenos, peptídeos e outros nutrientes essenciais que promovem o bem-estar geral.\n\n💪 Benefícios Tradicionais e Científicos:\n\nO Reishi é celebrado por suas propriedades adaptogênicas, que ajudam o corpo a se adaptar ao estresse físico e mental. Tradicionalmente utilizado para promover longevidade e vitalidade, este cogumelo tem sido estudado por suas potenciais propriedades imunomoduladoras, antioxidantes e anti-inflamatórias.\n\nPesquisas modernas indicam que o Ganoderma lucidum pode auxiliar na regulação do sistema imunológico, na melhora da qualidade do sono, no suporte à saúde cardiovascular, na redução da fadiga e no equilíbrio emocional. Seus triterpenos únicos contribuem para o suporte do fígado e para a resposta natural do corpo ao estresse oxidativo.\n\nCogumelos desidratados de alta qualidade, cuidadosamente selados a vácuo com sílica gel para preservar todos os compostos ativos e garantir máxima frescor e potência.",
      "14": "🌱 Kit de Cultivo Caseiro FÁCIL - Psilocybe Cubensis\n\nDescubra o fascinante mundo da micologia com nosso Kit de Cultivo FÁCIL de 1 litro para Psilocybe cubensis! Este kit completo foi desenvolvido para facilitar o cultivo caseiro e a observação científica desta espécie de cogumelo, ideal para fins educacionais e de pesquisa etnobotânica.\n\n📦 O Que Está Incluído:\n\nNosso kit vem completo com substrato colonizado de alta qualidade, saco de cultivo com filtro de ar, manual detalhado de instruções passo a passo, e todos os materiais necessários para um cultivo bem-sucedido em ambiente doméstico. O substrato já vem totalmente colonizado e pronto para frutificação, economizando semanas do processo de cultivo.\n\n🔬 Para Pesquisa e Educação:\n\nEste kit é perfeito para estudantes, pesquisadores e entusiastas da micologia que desejam observar o ciclo de vida completo dos fungos. Acompanhe a formação dos primórdios, o desenvolvimento dos corpos frutíferos e aprenda sobre as condições ideais de temperatura, umidade e ventilação necessárias para o cultivo de cogumelos.\n\nTodos os kits são produzidos em condições controladas de laboratório, garantindo contaminação zero e máxima taxa de sucesso. Ideal para projetos educacionais, documentação fotográfica e estudos de biologia fúngica.",
      "15": "🦁 Kit de Cultivo Caseiro FÁCIL - Juba de Leão (Hericium Erinaceus)\n\nCultive em casa o extraordinário cogumelo Juba de Leão com nosso kit completo de 1 litro! Hericium erinaceus é um dos cogumelos mais fascinantes do reino fungi, conhecido tanto por suas propriedades medicinais quanto por seu sabor excepcional na alta gastronomia.\n\n🍄 Kit Completo Pronto para Frutificar:\n\nNosso kit inclui substrato premium 100% colonizado, saco de cultivo com filtro de micropartículas, guia ilustrado de cultivo, e suporte técnico online. O substrato já passou por todo o processo de incubaç��o, estando pronto para produzir seus primeiros cogumelos em apenas 7-14 dias após a ativação.\n\n🧠 Cultivo do Cogumelo Nootrópico:\n\nO Hericium erinaceus é o único cogumelo com propriedades nootrópicas comprovadas, sendo amplamente estudado por suas potenciais aplicações em neurociência. Ao cultivar seu próprio Juba de Leão, você terá acesso a cogumelos frescos e de altíssima qualidade, muito superiores aos desidratados disponíveis comercialmente.\n\n👨‍🍳 Da Medicina à Gastronomia:\n\nAlém dos benefícios medicinais, a Juba de Leão é considerada uma iguaria culinária premium. Seu sabor único, frequentemente comparado a frutos do mar, faz com que seja muito valorizada por chefs renomados. Com este kit, você poderá colher cogumelos frescos para uso medicinal ou criar pratos gourmet extraordinários.\n\nCultivo 100% orgânico, livre de pesticidas e químicos. Cada kit pode produzir múltiplas colheitas ao longo de 2-3 meses com os cuidados adequados.",
      "16": "👑 Kit de Cultivo Caseiro FÁCIL - Reishi (Ganoderma Lucidum)\n\nCultive o legendário \"Cogumelo da Imortalidade\" em sua própria casa! Nosso Kit de Cultivo FÁCIL de 1 litro para Ganoderma lucidum oferece a oportunidade única de cultivar um dos cogumelos medicinais mais reverenciados da história, com mais de 4.000 anos de uso na medicina tradicional chinesa.\n\n🏺 O Rei dos Cogumelos em Seu Lar:\n\nEste kit premium vem com substrato especializado completamente colonizado, saco de cultivo profissional, manual completo de instruções, e acesso a vídeos tutoriais exclusivos. O Reishi é um cogumelo de crescimento mais lento que outros, mas o resultado final é extremamente gratificante, produzindo corpos frutíferos com o característico brilho laca-vermelho.\n\n⚕️ Medicina Tradicional Milenar:\n\nO Ganoderma lucidum tem sido utilizado há milênios como um remédio adaptogênico para promover longevidade, fortalecer o sistema imunológico e equilibrar as energias do corpo. Cultivar seu próprio Reishi garante a máxima potência dos compostos bioativos, incluindo triterpenos, polissacarídeos e ganodéricos únicos.\n\n🔬 Cultivo Científico e Observação:\n\nO processo de cultivo do Reishi é uma experiência educacional fascinante, permitindo observar o desenvolvimento único deste cogumelo, desde os primórdios até a formação completa dos conks (corpos frutíferos). É perfeito para projetos de pesquisa, documentação científica e estudos sobre compostos medicinais fúngicos.\n\n💎 Produção Contínua de Qualidade Premium:\n\nCada kit pode produzir 2-4 colheitas ao longo de 3-4 meses. Os cogumelos podem ser colhidos e processados para criar extratos, tinturas, chás medicinais ou pó de esporos. Cultivo orgânico certificado, livre de contaminantes e produzido em ambiente laboratorial estéril."
    };
    return descriptions[product.id] || product.description;
  };

  const getTechnicalDetails = (product: Product) => {
    const details: Record<string, { label: string; value: string }[]> = {
      "1": [
        { label: "Tipo", value: "Gasolina Comum" },
        { label: "Octanagem", value: "87 RON" },
        { label: "Conformidade", value: "ANP" },
        { label: "Densidade", value: "0.74 g/cm³" }
      ],
      "2": [
        { label: "Tipo", value: "Gasolina Premium" },
        { label: "Octanagem", value: "95 RON" },
        { label: "Aditivos", value: "Detergentes premium" },
        { label: "Conformidade", value: "ANP Premium" }
      ],
      "3": [
        { label: "Tipo", value: "Etanol Hidratado" },
        { label: "Pureza", value: ">99%" },
        { label: "Conformidade", value: "ANP" },
        { label: "Origem", value: "Cana-de-açúcar" }
      ],
      "4": [
        { label: "Tipo", value: "Diesel S10" },
        { label: "Teor de Enxofre", value: "10 ppm" },
        { label: "Conformidade", value: "ANP S10" },
        { label: "Cetanagem", value: "48 CN" }
      ],
      "5": [
        { label: "Viscosidade", value: "5W-30" },
        { label: "Tipo", value: "Sintético" },
        { label: "Volume", value: "1 Litro" },
        { label: "Norma", value: "API SN/ILSAC GF-5" }
      ],
      "6": [
        { label: "Tipo", value: "Filtro de Ar" },
        { label: "Aplicação", value: "Universal" },
        { label: "Material", value: "Papel celulose" },
        { label: "Eficiência", value: "99%" }
      ],
      "7": [
        { label: "Tipo", value: "Água Desmineralizada" },
        { label: "Volume", value: "1 Litro" },
        { label: "pH", value: "6.5 - 7.5" },
        { label: "Pureza", value: "Alta" }
      ],
      "8": [
        { label: "Duração", value: "30 minutos" },
        { label: "Área", value: "Externa" },
        { label: "Produtos", value: "Premium" },
        { label: "Garantia", value: "7 dias" }
      ],
      "9": [
        { label: "Duração", value: "60 minutos" },
        { label: "Área", value: "Externa + Interna" },
        { label: "Inclui", value: "Aspiração completa" },
        { label: "Garantia", value: "15 dias" }
      ],
      "10": [
        { label: "Duração", value: "45 minutos" },
        { label: "Inclui", value: "Óleo + Filtro" },
        { label: "Tipo de Óleo", value: "A escolher" },
        { label: "Garantia", value: "30 dias" }
      ],
      "11": [
        { label: "Espécie", value: "Psilocybe Cubensis" },
        { label: "Embalagem", value: "Selada a vácuo" },
        { label: "Finalidade", value: "Estudo etnobotânico" },
        { label: "Conservação", value: "Local fresco e seco" },
        { label: "Validade", value: "6 meses" },
        { label: "Peso", value: "Por grama" }
      ],
      "12": [
        { label: "Espécie", value: "Hericium Erinaceus" },
        { label: "Embalagem", value: "Selada a vácuo" },
        { label: "Finalidade", value: "Alimentação e Medicina" },
        { label: "Conservação", value: "Local fresco e seco" },
        { label: "Validade", value: "12 meses" },
        { label: "Peso", value: "Por grama" }
      ],
      "13": [
        { label: "Espécie", value: "Ganoderma Lucidum" },
        { label: "Nome Popular", value: "Reishi / Lingzhi" },
        { label: "Embalagem", value: "Selada a vácuo com sílica" },
        { label: "Finalidade", value: "Medicina e Bem-estar" },
        { label: "Conservação", value: "Local fresco e seco" },
        { label: "Validade", value: "18 meses" },
        { label: "Peso", value: "Por grama" }
      ],
      "14": [
        { label: "Espécie", value: "Psilocybe Cubensis" },
        { label: "Volume do Kit", value: "1 Litro" },
        { label: "Tipo de Substrato", value: "100% Colonizado" },
        { label: "Tempo de Frutificação", value: "10-21 dias" },
        { label: "Número de Colheitas", value: "2-3 fluxos" },
        { label: "Dificuldade", value: "Fácil" },
        { label: "Finalidade", value: "Educação e Pesquisa" }
      ],
      "15": [
        { label: "Espécie", value: "Hericium Erinaceus" },
        { label: "Volume do Kit", value: "1 Litro" },
        { label: "Tipo de Substrato", value: "Premium Colonizado" },
        { label: "Tempo de Frutificação", value: "7-14 dias" },
        { label: "Número de Colheitas", value: "3-5 fluxos" },
        { label: "Dificuldade", value: "Muito Fácil" },
        { label: "Finalidade", value: "Alimentação e Medicina" }
      ],
      "16": [
        { label: "Espécie", value: "Ganoderma Lucidum" },
        { label: "Volume do Kit", value: "1 Litro" },
        { label: "Tipo de Substrato", value: "Especializado" },
        { label: "Tempo de Frutificação", value: "30-45 dias" },
        { label: "Número de Colheitas", value: "2-4 fluxos" },
        { label: "Dificuldade", value: "Moderada" },
        { label: "Finalidade", value: "Medicina Tradicional" }
      ]
    };
    return details[product.id] || [];
  };

  const averageRating = getProductReviews(product.id).reduce((acc, review) => acc + review.rating, 0) / getProductReviews(product.id).length;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Confira ${product.name} no PostoNET E-commerce!`;
    
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
        break;
      case "instagram":
        toast.info("Copie o link e compartilhe no Instagram!");
        break;
      case "link":
        navigator.clipboard.writeText(url);
        toast.success("Link copiado para a área de transferência!");
        break;
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast.success(`${quantity} ${quantity === 1 ? "item adicionado" : "itens adicionados"} ao carrinho!`);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const handleCalculateShipping = async () => {
    if (cep.length === 8) {
      setIsLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setShippingInfo({
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
            sedex: { days: 5, price: 15.00 },
            pac: { days: 7, price: 10.00 }
          });
        } else {
          toast.error("CEP inválido!");
        }
      } catch (error) {
        toast.error("Erro ao buscar informações de frete!");
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold">Detalhes do Produto</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {onOpenCart && (
              <Button variant="outline" className="relative" onClick={onOpenCart}>
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Meus dados</DropdownMenuItem>
                <DropdownMenuItem>Minhas compras</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      {/* Content */}
      <div className="container py-8 px-4">
        {/* FUNIL AIDA */}
        <div className="space-y-8">
          {/* Aviso Legal - Apenas para Cogumelos */}
          {product.category === "cogumelo" && (
            <Card className="border-yellow-500/50 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
                  <AlertTriangle className="h-5 w-5" />
                  Avisos Legais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>Este produto não é destinado ao consumo humano, animal ou para qualquer uso fitoterápico ou medicinal.</p>
                <p>Qualquer forma de manipulação, processamento, extração ou isolamento das substâncias contidas neste material pode ser caracterizada como crime, conforme previsto na Lei nº 11.343/2006 (Lei de Drogas).</p>
              </CardContent>
            </Card>
          )}

          {/* ATENÇÃO - Elemento Imagem */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* INTERESSE - Título do Produto */}
              <div className="space-y-2">
                <Badge variant="outline" className="mb-2">
                  {getCategoryIcon(product.category)}
                  <span className="ml-1">{getCategoryLabel(product.category)}</span>
                </Badge>
                <h2 className="text-3xl font-bold">{product.name}</h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {averageRating.toFixed(1)} ({getProductReviews(product.id).length} avaliações)
                  </span>
                </div>
              </div>

              {/* DESEJO - Descrição Curta */}
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Preço */}
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-3xl font-bold">
                  R$ {product.price.toFixed(2)}
                  {product.unit && (
                    <span className="text-base font-normal text-muted-foreground ml-2">
                      / {product.unit}
                    </span>
                  )}
                </p>
              </div>

              {/* AÇÃO - Botão Comprar */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>

                {!product.inStock && (
                  <p className="text-sm text-destructive">Produto indisponível no momento</p>
                )}
              </div>

              {/* Informações de Frete */}
              <div className="pt-4 border-t space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Informações de Frete
                </h3>
                
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite seu CEP"
                      value={cep}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 8) {
                          setCep(value);
                        }
                      }}
                      onBlur={handleCalculateShipping}
                      maxLength={8}
                      className="flex-1"
                    />
                    <Button 
                      variant="outline"
                      onClick={handleCalculateShipping}
                      disabled={isLoadingCep || cep.length !== 8}
                    >
                      {isLoadingCep ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Calcular"
                      )}
                    </Button>
                  </div>

                  {shippingInfo && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <p>{shippingInfo.street}</p>
                          <p>{shippingInfo.neighborhood} - {shippingInfo.city}/{shippingInfo.state}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              SEDEX
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-1">
                            <p className="text-lg font-bold">R$ {shippingInfo.sedex.price.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">
                              Entrega em até {shippingInfo.sedex.days} dias úteis
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              PAC
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-1">
                            <p className="text-lg font-bold">R$ {shippingInfo.pac.price.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">
                              Entrega em até {shippingInfo.pac.days} dias úteis
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botões de Compartilhamento */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Compartilhar:</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleShare("instagram")}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleShare("link")}
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Descrição Detalhada */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Descrição Detalhada</h3>
            <p className="text-muted-foreground leading-relaxed">
              {getDetailedDescription(product)}
            </p>
          </div>

          <Separator className="my-8" />

          {/* Detalhes Técnicos */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Detalhes Técnicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getTechnicalDetails(product).map((detail, index) => (
                <div key={index} className="flex justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">{detail.label}:</span>
                  <span className="text-muted-foreground">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Avaliações dos Compradores */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Avaliações dos Compradores</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{averageRating.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-4">
              {getProductReviews(product.id).map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{review.author}</CardTitle>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Compra Verificada
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Produtos Relacionados */}
          {relatedProducts.length > 0 && (
            <>
              <Separator className="my-8" />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Produtos Relacionados</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.slice(0, 4).map((relatedProduct) => (
                    <Card key={relatedProduct.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader className="p-3">
                        <div className="aspect-square relative overflow-hidden rounded-md bg-muted mb-2">
                          <img 
                            src={relatedProduct.imageUrl} 
                            alt={relatedProduct.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardTitle className="text-sm line-clamp-2">{relatedProduct.name}</CardTitle>
                      </CardHeader>
                      <CardFooter className="p-3 pt-0">
                        <div className="w-full">
                          <p className="font-bold mb-2">
                            R$ {relatedProduct.price.toFixed(2)}
                          </p>
                          <Button size="sm" className="w-full">
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}