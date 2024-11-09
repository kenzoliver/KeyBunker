import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../../utils/colors/colors";
import CopyModal from "./CopyModal";
import { PasswordProps } from "../../utils/types/passwordType";



export default function PasswordCard({
  label,
  login,
  password,
}: PasswordProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleOptionVisibility = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = () => {
    Clipboard.setString(password);
    setModalVisible(true);
  };

  const handleEdit = () => {
    Alert.alert("Editar senha");
  };

  const handleDelete = () => {
    Alert.alert("Excluir senha");
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}></Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
          <Icon
            name="content-copy"
            size={20}
            color={colors.background_reverse}
          />
          <Text style={styles.copyButton}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleOptionVisibility}
          style={styles.iconButton}
        >
          <Icon name="more-vert" size={20} color={colors.background_reverse} />
        </TouchableOpacity>
      </View>
      {login && (
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle} />
          <Text style={styles.login}>{login}</Text>
        </View>
      )}
      <View style={styles.passwordContainer}>
        <Text style={styles.password}>
          {isPasswordVisible ? password : "••••••••"}
        </Text>
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}
        >
          <Icon
            name={isPasswordVisible ? "visibility-off" : "visibility"}
            size={20}
            color={colors.background_reverse}
          />
          <Text style={styles.toggleButton}></Text>
        </TouchableOpacity>
      </View>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={handleEdit} style={styles.dropdownItem}>
            <Icon name="edit" size={20} color={colors.textPrimary} style={styles.icon} />
            <Text style={styles.dropdownText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.dropdownItem}>
            <Icon name="delete" size={20} color={colors.textPrimary} style={styles.icon} />
            <Text style={styles.dropdownText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}

      <CopyModal
        isCopyModalOpen={modalVisible}
        message="Senha Copiada!"
        onClose={() => setModalVisible(false)}
      />
    </TouchableOpacity>
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
    color: colors.background_reverse,
    letterSpacing: 1.5,
    fontWeight: "500",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    color: colors.background_reverse,
  },
  copyButton: {
    color: colors.background_reverse,
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 5,
   
  },
  toggleButton: {
    color: colors.background_reverse,
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    padding: 10,
    width: 150,
    shadowColor: colors.background_reverse,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  dropdownText: {
    color: colors.background_reverse,
    fontSize: 16,
    marginLeft: 8, 
  },
  icon: {
    color: colors.background_reverse,
    marginRight: 8,
  },
});
