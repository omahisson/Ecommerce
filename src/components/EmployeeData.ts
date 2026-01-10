// Tipos de dados para funcionários
export interface Employee {
  id: string;
  name: string;
  surname: string;
  cpf: string;
  position: string;
  station: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  permissions: string[];
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  stations: string[];
}

// Mock data centralizado - em produção viria da API
export const mockEmployees: Employee[] = [
  { id: "1", name: "Pedro", surname: "Oliveira", cpf: "123.456.789-00", position: "Frentista", station: "Posto Shell Centro" },
  { id: "2", name: "Lucia", surname: "Fernandes", cpf: "987.654.321-00", position: "Caixa", station: "Posto Shell Centro" },
  { id: "3", name: "Roberto", surname: "Almeida", cpf: "456.789.123-00", position: "Frentista", station: "Posto Shell Centro" },
  { id: "4", name: "Ana", surname: "Costa", cpf: "321.654.987-00", position: "Gerente", station: "Posto Shell Centro" },
  { id: "5", name: "Carlos", surname: "Lima", cpf: "789.123.456-00", position: "Supervisor", station: "Posto Shell Centro" },
  { id: "6", name: "Marina", surname: "Santos", cpf: "147.258.369-00", position: "Frentista", station: "Posto BR Rodovia" },
  { id: "7", name: "João", surname: "Silva", cpf: "258.369.147-00", position: "Caixa", station: "Posto BR Rodovia" },
  { id: "8", name: "Fernanda", surname: "Rodrigues", cpf: "369.147.258-00", position: "Frentista", station: "Posto Ipiranga Vila" },
  { id: "9", name: "Paulo", surname: "Mendes", cpf: "741.852.963-00", position: "Supervisor", station: "Posto Ipiranga Vila" },
  { id: "10", name: "Carla", surname: "Pereira", cpf: "852.963.741-00", position: "Caixa", station: "Posto Texaco Norte" }
];

export const mockAdmins: Admin[] = [
  { id: "1", name: "João Silva", email: "joao@postonet.com", permissions: ["postos", "gerentes", "funcionarios"] },
  { id: "2", name: "Maria Santos", email: "maria@postonet.com", permissions: ["postos", "produtos"] }
];

export const mockManagers: Manager[] = [
  { id: "1", name: "Carlos Lima", email: "carlos@shell.com", phone: "(11) 99999-9999", stations: ["Posto Shell Centro"] },
  { id: "2", name: "Ana Costa", email: "ana@ipiranga.com", phone: "(11) 88888-8888", stations: ["Posto Ipiranga Vila", "Posto BR Rodovia"] }
];

// Função utilitária para buscar funcionários por estação
export const getEmployeesByStation = (stationName: string): Employee[] => {
  return mockEmployees.filter(employee => employee.station === stationName);
};

// Função utilitária para buscar funcionário por ID
export const getEmployeeById = (id: string): Employee | undefined => {
  return mockEmployees.find(employee => employee.id === id);
};