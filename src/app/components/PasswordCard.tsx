import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  Alert,
} from "react-native";
import colors from "../../utils/colors/colors";

export type PasswordProps = {
  id?: number;
  login?: string;
  label: string;
  password: string;
};

export default function PasswordCard({
  label,
  login,
  password,
}: any) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = () => {
    Alert.alert("Senha copiada!");
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.box} >
          <Text style={styles.label}>Label :</Text>
          {label}
        </View>
        <TouchableOpacity onPress={copyToClipboard}>
          <Text style={styles.copyButton}>Copiar</Text>
        </TouchableOpacity>
      </View>
      {login && <Text style={styles.login}>Login/Username: {login}</Text>}
      <View style={styles.passwordContainer}>
        <Text style={styles.password}>
          {isPasswordVisible ? password : "••••••••"}
        </Text>
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Text style={styles.toggleButton}>
            {isPasswordVisible ? "Ocultar" : "Mostrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.danger,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  box:{
   flex: 1,

  },
  label: {
    display: "flex",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  login: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  password: {
    fontSize: 16,
    color: colors.success,
    letterSpacing: 1.5,
  },
  copyButton: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  toggleButton: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
});
