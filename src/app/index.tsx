import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import colors from "../utils/colors/colors";

import { useRouter } from "expo-router";

export default function PinLockScreen() {
  const [pin, setPin] = useState<string>("");
  const router = useRouter();
  const correctPin = "123456";

  const handlePress = (digit: string) => {
    setPin(pin + digit);
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin === correctPin) {
      router.push("/home");
    } else {
      alert("PIN incorreto!");
      setPin("");
    }
  };

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
            <TouchableOpacity style={styles.key} onPress={handleSubmit}>
              <Text style={styles.keyText}>✔</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    marginBottom: 40,
  },
  keypad: {
    alignItems: "center",
  },
  keypadRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  key: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  keyText: {
    fontSize: 24,
    color: colors.textOnPrimary,
    fontWeight: "bold",
  },
  unlockMessage: {
    justifyContent: "center",
    alignItems: "center",
  },
  unlockText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
});
