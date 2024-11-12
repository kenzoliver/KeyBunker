import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import colors from "./utils/colors/colors";

import { useRouter } from "expo-router";
import { comparePasswordMaster, initializeTables } from "./service/database";
import CopyModal from "./components/CopyModal";

export default function PinLockScreen() {
  const [pin, setPin] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const handlePress = (digit: string) => {
    if (pin.length <= 5) {
      setPin(pin + digit);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  async function handleSubmit(pin: string) {
    if (pin.length < 6) {
      setModalVisible(true)
    }
    else {
      try {
        const verify = await comparePasswordMaster(pin);
        if (verify) {
          router.push("/home");
        }
      } catch (error) {
        router.push("/home");
      }
    }
  }
  useEffect(() => {
    async function startbd() {
      await initializeTables();
    }
    startbd();
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="light-content"
        translucent={false}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Digite sua Senha:</Text>
      </View>

      <View style={styles.pinContainer}>
        <Text style={styles.pinDisplay}>{pin.padEnd(6, "•")}</Text>

        <View style={styles.keypad}>
          {[1, 2, 3].map((row, i) => (
            <View key={i} style={styles.keypadRow}>
              {[1, 2, 3].map((digit) => {
                const buttonDigit =
                  i * 3 + digit > 9 ? "" : (i * 3 + digit).toString();
                if (!buttonDigit) return null;
                return (
                  <TouchableOpacity
                    key={buttonDigit}
                    style={styles.key}
                    onPress={() => handlePress(buttonDigit)}
                  >
                    <Text style={styles.keyText}>{buttonDigit}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          <View style={styles.keypadRow}>
            <TouchableOpacity style={styles.key} onPress={handleDelete}>
              <Text style={styles.keyText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => handlePress("0")}
            >
              <Text style={styles.keyText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.key}
              onPress={() => {
                handleSubmit(pin);
              }}
            >
              <Text style={styles.keyText}>✔</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CopyModal
      isCopyModalOpen = {modalVisible}
      message="A senha deve ter 6 dígitos"
      onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingBottom: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.background_reverse,
  },
  pinContainer: {
    width: "80%",
    alignItems: "center",
  },
  pinDisplay: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.background_reverse,
    marginBottom: 20,
  },
  keypad: {
    alignItems: "center",
  },
  keypadRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  key: {
    width: 80,
    height: 80,
    backgroundColor: colors.background_reverse,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  keyText: {
    fontSize: 24,
    color: colors.background,
    fontWeight: "bold",
  },
});
