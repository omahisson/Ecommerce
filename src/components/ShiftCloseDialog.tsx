import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { DollarSign, Clock, User } from "lucide-react";
import { ShiftData } from "./ShiftOpenForm";

interface ShiftCloseDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmClose: (finalCash: number) => void;
  shiftData: ShiftData;
}

export function ShiftCloseDialog({ open, onClose, onConfirmClose, shiftData }: ShiftCloseDialogProps) {
  const [finalCash, setFinalCash] = useState("");

  const handleConfirm = () => {
    if (!finalCash) return;
    onConfirmClose(parseFloat(finalCash));
  };

  const mockSalesData = {
    totalSales: 2450.80,
    totalTransactions: 28,
    cardPayments: 1890.30,
    cashPayments: 560.50
  };

  const expectedCash = shiftData.initialCash + mockSalesData.cashPayments;
  const difference = parseFloat(finalCash) - expectedCash;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Fechamento de Turno</DialogTitle>
          <DialogDescription>
            Confira os dados do turno e informe o valor final em caixa
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Dados do Turno */}
          <Card>
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Operador: {shiftData.operator}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Turno: {shiftData.shiftType} • Início: {shiftData.openTime}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Resumo de Vendas */}
          <Card>
            <CardContent className="pt-4 space-y-2">
              <h4>Resumo de Vendas</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total de Vendas:</span>
                  <p className="font-medium">R$ {mockSalesData.totalSales.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Transações:</span>
                  <p className="font-medium">{mockSalesData.totalTransactions}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cartão:</span>
                  <p className="font-medium">R$ {mockSalesData.cardPayments.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Dinheiro:</span>
                  <p className="font-medium">R$ {mockSalesData.cashPayments.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conferência de Caixa */}
          <Card>
            <CardContent className="pt-4 space-y-3">
              <h4>Conferência de Caixa</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor Inicial:</span>
                  <span>R$ {shiftData.initialCash.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entradas em Dinheiro:</span>
                  <span>R$ {mockSalesData.cashPayments.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Valor Esperado:</span>
                  <span>R$ {expectedCash.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="finalCash">Valor Final em Caixa</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="finalCash"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    value={finalCash}
                    onChange={(e) => setFinalCash(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {finalCash && (
                  <div className={`text-sm ${difference === 0 ? 'text-green-600' : difference > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {difference === 0 && "✓ Caixa conferido"}
                    {difference > 0 && `Sobra: R$ ${difference.toFixed(2)}`}
                    {difference < 0 && `Falta: R$ ${Math.abs(difference).toFixed(2)}`}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!finalCash}>
            Fechar Turno
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}