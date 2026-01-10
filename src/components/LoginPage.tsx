import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface LoginPageProps {
  onLogin: () => void;
  onGoToEcommerce: () => void;
}

export function LoginPage({ onLogin, onGoToEcommerce }: LoginPageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center">Acesse sua conta no PostoNET</CardTitle>
          <CardDescription className="text-center">
            Digite suas credenciais para continuar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Button type="button" variant="ghost" className="text-primary">
              Esqueci minha senha
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  ou
                </span>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={onGoToEcommerce}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Acessar E-commerce
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}