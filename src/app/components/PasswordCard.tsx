import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
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
}: PasswordProps) {
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
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}></Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
          <Icon name="content-copy" size={20} color={colors.primary} />
          <Text style={styles.copyButton}></Text>
        </TouchableOpacity>
      </View>
      {login && (
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}/>
          <Text style={styles.login}>{login}</Text>
        </View>
      )}
      <View style={styles.passwordContainer}>
        <Text style={styles.password}>
          {isPasswordVisible ? password : "••••••••"}
        </Text>
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
          <Icon name={isPasswordVisible ? "visibility-off" : "visibility"} size={20} color={colors.primary} />
          <Text style={styles.toggleButton}>
     
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.background, 
    shadowColor: colors.background_reverse,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary, 
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  loginTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary, 
  },
  login: {
    fontSize: 14,
    color: colors.background_reverse, 
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.neutral, 
  },
  password: {
    fontSize: 18,
    color: colors.primary, 
    letterSpacing: 1.5,
    fontWeight: "500",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButton: {
    color: colors.background_reverse, 
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  toggleButton: {
    color: colors.background_reverse, 
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
  },
});