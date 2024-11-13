import {
  Clipboard,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


import Slider from "@react-native-community/slider";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import CopyModal from "./components/CopyModal";
import { colors } from "./utils/colors/colors";

export default function GeneratorPassword() {
  const [password, setPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [
    passwordLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialChars,
  ]);

  const generatePassword = () => {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+";
    let chars = "";

    if (includeUppercase) chars += upperChars;
    if (includeLowercase) chars += lowerChars;
    if (includeNumbers) chars += numbers;
    if (includeSpecialChars) chars += specialChars;

    if (!chars) {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    Clipboard.setString(password);
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

        <Text style={styles.headerText}>Gerar Senha</Text>
      </View>

      <View style={styles.passwordArea}>
        <Text style={styles.input}>{password}</Text>
        <TouchableOpacity
          onPress={copyToClipboard}
          style={styles.clipboardButton}
        >
          <Icon
            name="content-copy"
            size={24}
            color={colors.background_reverse}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.controlBox}>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>
            Tamanho da Senha: {passwordLength}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={4}
            maximumValue={30}
            step={1}
            value={passwordLength}
            onValueChange={(value) => setPasswordLength(value)}
            minimumTrackTintColor={colors.success}
            maximumTrackTintColor={colors.danger}
            thumbTintColor={colors.primary}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Incluir Maiúsculas</Text>
          <Switch
            value={includeUppercase}
            onValueChange={setIncludeUppercase}
            thumbColor={includeSpecialChars ?  colors.primary :colors.accent }
            trackColor={{ false: colors.background_reverse, true: colors.accent }}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Incluir Minúsculas</Text>
          <Switch
            value={includeLowercase}
            onValueChange={setIncludeLowercase}
            thumbColor={includeSpecialChars ?  colors.primary :colors.accent }
            trackColor={{ false: colors.background_reverse, true: colors.accent }}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Incluir Números</Text>
          <Switch
            value={includeNumbers}
            onValueChange={setIncludeNumbers}
            thumbColor={includeSpecialChars ? colors.primary :colors.accent }
            trackColor={{ false: colors.background_reverse, true: colors.accent }}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Incluir Caracteres Especiais</Text>
          <Switch
            value={includeSpecialChars}
            onValueChange={setIncludeSpecialChars}
            thumbColor={includeSpecialChars ?  colors.primary :colors.accent }
            trackColor={{ false: colors.background_reverse, true: colors.accent }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.generateButton}
        onPress={generatePassword}
      >
        <Text style={styles.generateButtonText}>Gerar Nova Senha</Text>
      </TouchableOpacity>
      <CopyModal
        isCopyModalOpen={modalVisible}
        message="Senha Copiada!"
        onClose={() => setModalVisible(false)}
      />
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
  passwordArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  input: {
    width: "70%",
    height: 40,
    backgroundColor: colors.background,
    borderColor: colors.background_reverse,
    borderWidth: 1,
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    color: colors.background_reverse,
  },
  clipboardButton: {
    position: "absolute",
    left: "87%",
    padding: 5,
    backgroundColor: colors.background,
    borderRadius: 5,
  },
  controlBox: {
    width: "100%",
    backgroundColor: colors.background,
    padding: 10,
    marginVertical: 10,
    borderColor: colors.background_reverse,
    borderWidth: 1,
  },
  sliderContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.background_reverse,
  },
  slider: {
    width: "90%",
    height: 50,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    padding: 8,
    color: colors.background_reverse,
  },
  generateButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 80,
  },
  generateButtonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    fontSize:15,
    fontWeight: "bold",
    color: colors.background_reverse,
  },
});
