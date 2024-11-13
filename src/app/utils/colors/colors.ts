import { Appearance } from "react-native";

export var colors = {
  primary: "#1F2A44",
  secondary: "#555555",
  accent: "#4A90E2",
  neutral: "#666666",
  success: "#3A6351",
  danger: "#B00020",
  textPrimary: "#1A1A1A",
  textSecondary: "#4D4D4D",
  background: "#1C1C1C",
  background_reverse: "#F5F5F5",
  textOnPrimary: "#FFFFFF",
  icon: "#4A90E2",
  border: "#E0E0E0",
};
let isdark = true;

export  function togletheme() {
  isdark = !isdark;
  if (isdark) {
    colors = {
      primary: "#1F2A44",
      secondary: "#555555",
      accent: "#4A90E2",
      neutral: "#666666",
      success: "#3A6351",
      danger: "#B00020",
      textPrimary: "#1A1A1A",
      textSecondary: "#4D4D4D",
      background: "#1C1C1C",
      background_reverse: "#F5F5F5",
      textOnPrimary: "#FFFFFF",
      icon: "#4A90E2",
      border: "#E0E0E0",
    };
  } else {
    colors = {
      primary: "#1F2A44",
      secondary: "#555555",
      accent: "#4A90E2",
      neutral: "#666666",
      success: "#3A6351",
      danger: "#B00020",
      textPrimary: "#1A1A1A",
      textSecondary: "#4D4D4D",
      background: "#F5F5F5",
      background_reverse: "#1C1C1C",
      textOnPrimary: "#FFFFFF",
      icon: "#4A90E2",
      border: "#E0E0E0",
    };
  }
}
