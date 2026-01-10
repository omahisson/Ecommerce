import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { UserPlus, Shield, Users, User } from "lucide-react";
import { AdminForm } from "./AdminForm";
import { ManagerForm } from "./ManagerForm";
import { EmployeeForm } from "./EmployeeForm";
import { mockAdmins, mockManagers, mockEmployees } from "./EmployeeData";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

interface EmployeesPageProps {
  gasStation: GasStation;
  gasStations: GasStation[];
}

type FormType = "admin" | "manager" | "employee" | null;

export function EmployeesPage({ gasStation, gasStations }: EmployeesPageProps) {
  const [activeForm, setActiveForm] = useState<FormType>(null);

  const handleSubmitAdmin = (data: any) => {
    console.log("Admin cadastrado:", data);
    setActiveForm(null);
  };

  const handleSubmitManager = (data: any) => {
    console.log("Gerente cadastrado:", data);
    setActiveForm(null);
  };

  const handleSubmitEmployee = (data: any) => {
    console.log("Funcionário cadastrado:", data);
    setActiveForm(null);
  };

  if (activeForm === "admin") {
    return (
      <AdminForm
        gasStations={gasStations}
        onSubmit={handleSubmitAdmin}
        onCancel={() => setActiveForm(null)}
      />
    );
  }

  if (activeForm === "manager") {
    return (
      <ManagerForm
        gasStations={gasStations}
        onSubmit={handleSubmitManager}
        onCancel={() => setActiveForm(null)}
      />
    );
  }

  if (activeForm === "employee") {
    return (
      <EmployeeForm
        gasStations={gasStations}
        onSubmit={handleSubmitEmployee}
        onCancel={() => setActiveForm(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2>Gerenciamento de Empregados</h2>
        <p className="text-muted-foreground">Gerencie administradores, gerentes e funcionários</p>
      </div>

      {/* Administradores */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Administradores</CardTitle>
          </div>
          <Button
            size="sm"
            onClick={() => setActiveForm("admin")}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Cadastrar Administrador
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAdmins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{admin.name}</p>
                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                </div>
                <div className="flex gap-1">
                  {admin.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gerentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>Gerentes</CardTitle>
          </div>
          <Button
            size="sm"
            onClick={() => setActiveForm("manager")}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Cadastrar Gerente
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockManagers.map((manager) => (
              <div key={manager.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{manager.name}</p>
                  <p className="text-sm text-muted-foreground">{manager.email}</p>
                  <p className="text-sm text-muted-foreground">{manager.phone}</p>
                </div>
                <div className="flex flex-col gap-1">
                  {manager.stations.map((station) => (
                    <Badge key={station} variant="outline" className="text-xs">
                      {station}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Funcionários */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Funcionários</CardTitle>
          </div>
          <Button
            size="sm"
            onClick={() => setActiveForm("employee")}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Cadastrar Funcionário
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{employee.name} {employee.surname}</p>
                  <p className="text-sm text-muted-foreground">CPF: {employee.cpf}</p>
                  <p className="text-sm text-muted-foreground">{employee.station}</p>
                </div>
                <Badge variant="outline">
                  {employee.position}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}