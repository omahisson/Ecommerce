import { useState } from "react";
import { Users, Fuel, ShoppingBag, CreditCard, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import { EmployeesPage } from "./EmployeesPage";
import { FuelsPage } from "./FuelsPage";
import { ProductsPage } from "./ProductsPage";
import { PDVPage } from "./PDVPage";
import { ReportsPage } from "./ReportsPage";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface DashboardProps {
  gasStation: GasStation;
}

type ActivePage = "dashboard" | "employees" | "fuel" | "products" | "pdv";

const mockGasStations: GasStation[] = [
  {
    id: "1",
    name: "Posto Shell Centro",
    imageUrl: "https://images.unsplash.com/photo-1693585197677-1bfca300d8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXMlMjBzdGF0aW9uJTIwZnVlbCUyMHB1bXB8ZW58MXx8fHwxNzU4NDY3MTU0fDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "2", 
    name: "Posto Ipiranga Vila",
    imageUrl: "https://images.unsplash.com/photo-1693585197677-1bfca300d8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXMlMjBzdGF0aW9uJTIwZnVlbCUyMHB1bXB8ZW58MXx8fHwxNzU4NDY3MTU0fDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "3",
    name: "Posto BR Rodovia",
    imageUrl: "https://images.unsplash.com/photo-1693585197677-1bfca300d8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXMlMjBzdGF0aW9uJTIwZnVlbCUyMHB1bXB8ZW58MXx8fHwxNzU4NDY3MTU0fDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "4",
    name: "Posto Texaco Norte",
    imageUrl: "https://images.unsplash.com/photo-1693585197677-1bfca300d8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXMlMjBzdGF0aW9uJTIwZnVlbCUyMHB1bXB8ZW58MXx8fHwxNzU4NDY3MTU0fDA&ixlib=rb-4.1.0&q=80&w=400"
  }
];

const menuItems = [
  {
    title: "Home",
    icon: Home,
    page: "dashboard" as ActivePage,
  },
  {
    title: "Empregados",
    icon: Users,
    page: "employees" as ActivePage,
  },
  {
    title: "Combustíveis",
    icon: Fuel,
    page: "fuel" as ActivePage,
  },
  {
    title: "Produtos e Serviços",
    icon: ShoppingBag,
    page: "products" as ActivePage,
  },
  {
    title: "PDV",
    icon: CreditCard,
    page: "pdv" as ActivePage,
  },
];

export function Dashboard({ gasStation }: DashboardProps) {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "employees":
        return <EmployeesPage gasStation={gasStation} gasStations={mockGasStations} />;
      case "fuel":
        return <FuelsPage gasStation={gasStation} />;
      case "products":
        return <ProductsPage gasStation={gasStation} />;
      case "pdv":
        return <PDVPage gasStation={gasStation} />;
      default:
        return <ReportsPage gasStation={gasStation} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{gasStation.name}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        isActive={activePage === item.page}
                      >
                        <button 
                          onClick={() => setActivePage(item.page)}
                          className="flex items-center gap-3 w-full"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1>Dashboard - {gasStation.name}</h1>
          </div>
          
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
}