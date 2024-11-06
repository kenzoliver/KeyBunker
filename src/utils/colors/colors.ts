import { Appearance } from "react-native";

const colors = {
    primary: "#0D1B2A",       // Cor principal: azul-marinho escuro para segurança
    secondary: "#1B263B",     // Cor secundária: azul-escuro para detalhes
    accent: "#F0A500",        // Cor de destaque: amarelo para chamar atenção em botões importantes
    neutral: "#1F4287",       // Cor neutra: azul médio para componentes secundários
    success: "#3AA76D",       // Cor de sucesso: verde para confirmações
    danger: "#FF4F4F",        // Cor de erro: vermelho para mensagens de erro
    background: Appearance.getColorScheme() === "dark" ? "#1A1A1A" : "#FFFFFF",
    textPrimary: "#FFFFFF",   // Cor do texto principal: branco para contraste em fundo escuro
    textSecondary: "#D4D4D4"  // Cor do texto secundário: cinza claro para textos menos proeminentes
  };
  
  export default colors;