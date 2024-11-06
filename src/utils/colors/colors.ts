import { Appearance } from "react-native";

const colors = {
    primary: "#333333",       // Cinza escuro como cor principal para uma identidade sólida e discreta
    secondary: "#555555",     // Cinza médio para destacar informações secundárias
    accent: "#4A90E2",        // Azul sutil como cor de destaque para ícones e botões importantes
    neutral: "#666666",       // Cinza escuro para componentes secundários e barras de fundo
    success: "#3A6351",       // Verde suave para mensagens de sucesso
    danger: "#B00020",        // Vermelho moderado para mensagens de erro
    textPrimary: "#1A1A1A",   // Cinza quase preto para textos principais, garantindo boa legibilidade
    textSecondary: "#4D4D4D", // Cinza suave para textos secundários, mais discreto
    background: Appearance.getColorScheme() === "dark" ? "#1C1C1C" : "#F5F5F5", 
    background_reverse: Appearance.getColorScheme() === "dark" ? "#F5F5F5" : "#1C1C1C", 
    textOnPrimary: "#FFFFFF", // Branco para contrastar com botões ou fundos de cor primária
    icon: "#4A90E2",          // Azul sutil para ícones, mantendo um toque de cor sem perder a seriedade
    border: "#E0E0E0"         // Cinza claro para bordas e divisórias sutis, com um tom mais discreto
};

export default colors;
