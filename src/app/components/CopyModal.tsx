import React, { useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import colors from "../../utils/colors/colors";

type CopyModalProps = {
  isCopyModalOpen: boolean;
  onClose: () => void;
};

export default function CopyModal({ isCopyModalOpen, onClose }: CopyModalProps) {
  useEffect(() => {
    if (isCopyModalOpen) {
      setTimeout(() => {
        onClose();
      }, 1000); 
    }
  }, [isCopyModalOpen, onClose]);

  return (
    <Modal
      visible={isCopyModalOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>Senha copiada!</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 100,
    alignItems: "center",
  },
  alertBox: {
    width: 200,
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: colors.background_reverse,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  alertText: {
    color: colors.background_reverse,
    fontSize: 16,
    fontWeight: "bold",
  },
});
