import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { PasswordProps } from "../utils/types/passwordType";
import { updatePassword } from "@/service/database";
import { useSimpleStore } from "@/store/password";
import colors from "@/utils/colors/colors";


type CreateModalPasswordProps = {
  isUpdateModalOpen: boolean;
  data: PasswordProps;
  onClose: () => void;
};

export default function UpdateModalPassword({
  isUpdateModalOpen,
  onClose,
  data,
}: CreateModalPasswordProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordProps>();
  const { value, setValue } = useSimpleStore();
  useEffect(() => {
    reset(data);
  }, [isUpdateModalOpen, reset, value]);

  const handleSave = (data: PasswordProps) => {
    setValue();
    updatePassword(data);
    onClose();
  };

  return (
    <Modal visible={isUpdateModalOpen} animationType="fade" transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edite sua Senha</Text>

          <Controller
            name="label"
            control={control}
            defaultValue=""
            rules={{ required: "A etiqueta é obrigatória" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Etiqueta"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.label && (
            <Text style={styles.errorText}>{errors.label?.message}</Text>
          )}

          <Controller
            name="login"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Login (opcional)"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.login && (
            <Text style={styles.errorText}>{errors.login.message}</Text>
          )}
          <Controller
            name="passkey"
            control={control}
            defaultValue=""
            rules={{
              required: "A senha é obrigatória",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.passkey && (
            <Text style={styles.errorText}>{errors.passkey?.message}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(handleSave)}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: colors.textOnPrimary,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  sugested: {
    color: colors.accent,
    textAlign: "right",
  },
});
