import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import colors from "../utils/colors/colors";
import PassworCard from "./components/PasswordCard";

export default function Home() {
  const handlePress = () => {
    console.log("Botão pressionado!");
  };

  const initialPasswordCardItems = [
    {
      login: "Carlos Silva",
      label: "Facebook",
      password: "19:24",
    },
    {
      login: "Instagram",
      label: "Jean",
      password: "19:24",
    },
    {
      label: "Oliver",
      password: "19:24",
    },
    {
      login: "Carlos Silva",
      label: "Danillo",
      password: "19:24",
    },
    
  ];

  const [passwordCards] = useState(initialPasswordCardItems);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="light-content"
        translucent={false}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Key Bunker</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Nova Senha</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {passwordCards.map((passwordCard, idx) => (
          <PassworCard
            key={idx}
            login={passwordCard.login}
            label={passwordCard.label}
            password={passwordCard.password}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    marginTop: '2rem',
    alignItems: "center",
  },
  contentText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.accent,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
