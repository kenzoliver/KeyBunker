import { Appearance } from "react-native";

const colors = {
    primary: "#333333",      
    secondary: "#555555",    
    accent: "#4A90E2",       
    neutral: "#666666",      
    success: "#3A6351",       
    danger: "#B00020",        
    textPrimary: "#1A1A1A", 
    textSecondary: "#4D4D4D", 
    background: Appearance.getColorScheme() === "dark" ? "#1C1C1C" : "#F5F5F5", 
    background_reverse: Appearance.getColorScheme() === "dark" ? "#F5F5F5" : "#1C1C1C", 
    textOnPrimary: "#FFFFFF",
    icon: "#4A90E2",          
    border: "#E0E0E0"       
};

export default colors;
