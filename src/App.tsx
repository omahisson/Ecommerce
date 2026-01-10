import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { ProfileSelection } from "./components/ProfileSelection";
import { GasStationForm, GasStationFormData } from "./components/GasStationForm";
import { Dashboard } from "./components/Dashboard";
import { EcommercePage } from "./components/EcommercePage";
import { Toaster } from "sonner@2.0.3";

type Page = "login" | "profile-selection" | "register-station" | "dashboard" | "ecommerce";

interface GasStation {
  id: string;
  name: string;
  imageUrl: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("ecommerce");
  const [selectedProfile, setSelectedProfile] = useState<GasStation | null>(null);

  const handleLogin = () => {
    setCurrentPage("profile-selection");
  };

  const handleGoToEcommerce = () => {
    setCurrentPage("ecommerce");
  };

  const handleBackToLogin = () => {
    setCurrentPage("login");
  };

  const handleSelectProfile = (profile: GasStation) => {
    setSelectedProfile(profile);
    setCurrentPage("dashboard");
  };

  const handleRegisterStation = () => {
    setCurrentPage("register-station");
  };

  const handleSubmitRegistration = (data: GasStationFormData) => {
    console.log("Dados do posto cadastrado:", data);
    console.log("Endereço completo:", `${data.endereco.rua}, ${data.endereco.numero}${data.endereco.complemento ? `, ${data.endereco.complemento}` : ''} - ${data.endereco.bairro}, ${data.endereco.cidade}/${data.endereco.estado} - CEP: ${data.endereco.cep}`);
    // Aqui você pode salvar os dados e redirecionar
    setCurrentPage("profile-selection");
  };

  const handleCancelRegistration = () => {
    setCurrentPage("profile-selection");
  };

  return (
    <>
      {currentPage === "login" && (
        <LoginPage 
          onLogin={handleLogin} 
          onGoToEcommerce={handleGoToEcommerce}
        />
      )}
      {currentPage === "profile-selection" && (
        <ProfileSelection 
          onSelectProfile={handleSelectProfile}
          onRegisterStation={handleRegisterStation}
        />
      )}
      {currentPage === "register-station" && (
        <GasStationForm
          onSubmit={handleSubmitRegistration}
          onCancel={handleCancelRegistration}
        />
      )}
      {currentPage === "dashboard" && selectedProfile && (
        <Dashboard gasStation={selectedProfile} />
      )}
      {currentPage === "ecommerce" && (
        <EcommercePage onBackToLogin={handleBackToLogin} />
      )}
      <Toaster position="top-right" />
    </>
  );
}