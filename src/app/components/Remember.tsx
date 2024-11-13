import { insertPasswords } from "@/service/database";
import { useSimpleStore } from "@/store/password";
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

import { colors } from "@/utils/colors/colors";
import { router } from "expo-router";

type RememberProps = {
  isRememberModalOpen: boolean;
  onClose: () => void;
};

export default function Remember({
  isRememberModalOpen,
  onClose,
}: RememberProps) {
  return (
    <Modal
      visible={isRememberModalOpen}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Você ainda não definiu a senha de acesso!
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={()=> {router.push("/SetMasterKey");}}
            >
              <Text style={styles.buttonText}>Criar agora</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Agora não</Text>
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
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    height: "40%",
    width: "100%",
    padding: 50,
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 100,
    textAlign: "center",
    color: colors.background_reverse,
  },
  
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: colors.background_reverse,
    alignItems: 'center',
    justifyContent: "center",
    width: 120,
    height: 50,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: colors.background,
    fontWeight: "bold",
  },

});
