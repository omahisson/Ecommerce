import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Clock, User, DollarSign } from "lucide-react";
import { getEmployeesByStation } from "./EmployeeData";

interface ShiftOpenFormProps {
  onOpenShift: (shiftData: ShiftData) => void;
  gasStationName: string;
}

export interface ShiftData {
  operator: string;
  operatorId: string;
  shiftType: string;
  initialCash: number;
  openTime: string;
}

export function ShiftOpenForm({ onOpenShift, gasStationName }: ShiftOpenFormProps) {
  const [selectedOperator, setSelectedOperator] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [initialCash, setInitialCash] = useState("");

  // Obter funcionários da estação atual
  const stationEmployees = getEmployeesByStation(gasStationName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOperator || !shiftType || !initialCash) {
      return;
    }

    const selectedEmployee = stationEmployees.find(emp => emp.id === selectedOperator);
    if (!selectedEmployee) return;

    const shiftData: ShiftData = {
      operator: `${selectedEmployee.name} ${selectedEmployee.surname}`,
      operatorId: selectedEmployee.id,
      shiftType,
      initialCash: parseFloat(initialCash),
      openTime: new Date().toLocaleString('pt-BR')
    };

    onOpenShift(shiftData);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Clock className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle>Abertura de Turno</CardTitle>
          <CardDescription>
            Informe os dados necessários para iniciar o turno
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="operator">Operador</Label>
              <Select value={selectedOperator} onValueChange={setSelectedOperator} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o funcionário" />
                </SelectTrigger>
                <SelectContent>
                  {stationEmployees.length > 0 ? (
                    stationEmployees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        <div className="flex items-center gap-2">
                          <span>{employee.name} {employee.surname}</span>
                          <span className="text-xs text-muted-foreground">({employee.position})</span>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-employees" disabled>
                      Nenhum funcionário cadastrado
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shiftType">Turno</Label>
              <Select value={shiftType} onValueChange={setShiftType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o turno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matutino">Matutino (06:00 - 14:00)</SelectItem>
                  <SelectItem value="vespertino">Vespertino (14:00 - 22:00)</SelectItem>
                  <SelectItem value="noturno">Noturno (22:00 - 06:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialCash">Valor Inicial em Caixa</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="initialCash"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={initialCash}
                  onChange={(e) => setInitialCash(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Abrir Turno
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}