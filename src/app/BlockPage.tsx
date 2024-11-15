import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  BackHandler
} from "react-native";

import { useRouter } from "expo-router";
import {
  comparePasswordMaster,
} from "./service/database";
import CopyModal from "./components/CopyModal";
import colors from "./utils/colors/colors";
import { useBlock } from "./store/block";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PinLockScreen() {
  const [pin, setPin] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalErrorVisible, setModalErrorVisible] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const { free, setBlock } = useBlock();

  const handlePress = (digit: string) => {
    if (pin.length <= 5) {
      setPin(pin + digit);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp(); 
      return true; 
    });

    return () => backHandler.remove();
  }, []);

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  async function handleSubmit(pin: string) {
    if (pin.length < 6) {
      setModalVisible(true);
    } else {
      try {
        const verify = await comparePasswordMaster(pin);
        if (verify) {
          setBlock(true);
          router.push("/");
        } else {
          setModalErrorVisible(true);
          setPin("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

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
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}
        >
          <Icon
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={24}
            color={colors.background_reverse}
          />
        </TouchableOpacity>
        <Text style={styles.pinDisplay}>
          {isPasswordVisible ? pin : "•".repeat(pin.length)}
        </Text>

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
              onPress={() => handleSubmit(pin)}
            >
              <Text style={styles.keyText}>✔</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <CopyModal
        isCopyModalOpen={modalVisible}
        message="A senha deve ter 6 dígitos"
        onClose={() => setModalVisible(false)}
      />
      <CopyModal
        isCopyModalOpen={modalErrorVisible}
        message="Senha incorreta!"
        onClose={() => setModalErrorVisible(false)}
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
  iconButton: {
    position: "absolute",
    top: -10,
    right: 10,
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
