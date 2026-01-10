import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface ProfileSelectionProps {
  onSelectProfile: (profile: GasStation) => void;
  onRegisterStation: () => void;
}

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

export function ProfileSelection({ onSelectProfile, onRegisterStation }: ProfileSelectionProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            Escolha o posto que deseja acessar
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {mockGasStations.map((station) => (
            <div 
              key={station.id}
              className="cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => onSelectProfile(station)}
            >
              <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md">
                <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src={station.imageUrl}
                    alt={station.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm">{station.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => onRegisterStation()}>
            Cadastrar novo posto
          </Button>
        </div>
      </div>
    </div>
  );
}