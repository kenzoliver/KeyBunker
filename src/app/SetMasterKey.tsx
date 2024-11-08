import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../utils/colors/colors";
import { useForm, Controller } from "react-hook-form";
import { Link } from "expo-router";
import { UpdateMasterKey } from "../utils/types/PasswordUpdate";
import CopyModal from "./components/CopyModal";

export default function UpdatePassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdateMasterKey>();
  const watchPassword = watch("password");
  const [confirmation, setModalVisible] = useState(false);

  const onSubmit = (data: UpdateMasterKey) => {
    console.log("Nova senha:", data.password);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="light-content"
        translucent={false}
      />
      <View style={styles.header}>
        <TouchableOpacity>
          <Link href={"/home"}>
            <Icon name="arrow-back" size={30} color={colors.textOnPrimary} />
          </Link>
        </TouchableOpacity>
        <Text style={styles.headerText}>Atualizar Senha</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Atualize sua senha</Text>

        <Controller
          control={control}
          name="password"
          rules={{
            required: "A senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite a nova senha"
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              secureTextEntry={true}
              placeholderTextColor={colors.background_reverse}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "A confirmação de senha é obrigatória",
            validate: (value) =>
              value === watchPassword || "As senhas não coincidem",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Confirme a nova senha"
              value={value}
              onChangeText={(text) => {
                onChange(text);
              }}
              secureTextEntry={true}
              placeholderTextColor={colors.background_reverse}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Atualizar Senha</Text>
        </TouchableOpacity>
        <CopyModal
          isCopyModalOpen={confirmation}
          message="Senha Atualizada!"
          onClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.primary,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textOnPrimary,
    marginLeft: 20,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    gap: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.background_reverse,
  },
  input: {
    height: 40,
    borderColor: colors.background_reverse,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 15,
    borderRadius: 10,
    color: colors.background_reverse,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.background_reverse,
  },
  buttonText: {
    color: colors.background,
    fontWeight: "bold",
    textAlign: "center",
  },
});
