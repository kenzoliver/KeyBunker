import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "./utils/colors/colors";
import { PasswordProps } from "./utils/types/passwordType";
import PasswordCard from "./components/PasswordCard";
import Search from "./components/Search";
import Icon from "react-native-vector-icons/MaterialIcons";
import CreateModalPassword from "./components/CreatePassword";
import Drawer from "./components/Drawer";
import { fetchAllPasswords, initializeTables } from "./service/database";

export default function Home() {
  const [passwords, setPasswords] = useState<PasswordProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    async function setupDatabase() {
      const passwords = await fetchAllPasswords();
      console.log(passwords);
      setPasswords(passwords);
    }

    setupDatabase();
  }, [modalVisible]);

  const handlePress = () => {
    setDrawerVisible(true);
  };

  const modalCreatePasswordOpen = () => {
    setModalVisible(true);
  };

  const passwordFilter = (name: string) => {
    if (name === "") {
      setPasswords(passwords);
    }
    const filteredPasswords = passwords.filter((item) =>
      item.label.toLowerCase().startsWith(name.toLowerCase())
    );
    setPasswords(filteredPasswords);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="light-content"
        translucent={false}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Key Bunker</Text>
        <TouchableOpacity onPress={handlePress}>
          <Icon name="menu" size={30} color={colors.textOnPrimary} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Search passwordFilter={passwordFilter} />

        <TouchableOpacity
          style={styles.button}
          onPress={modalCreatePasswordOpen}
        >
          <Text style={styles.buttonText}>Adicionar Senha</Text>
        </TouchableOpacity>
        {passwords && passwords.length > 0 ? (
          passwords.map((passwordCard) => (
            <PasswordCard
              key={passwordCard.id}
              id={passwordCard.id}
              login={passwordCard.login || undefined}
              label={passwordCard.label}
              passkey={passwordCard.passkey}
            />
          ))
        ) : (
          <View style={styles.notfoundcontainer}>
            <Text style={styles.messageText}>
              Ainda Não há, nenhuma senha, crie uma!
            </Text>
          </View>
        )}
      </ScrollView>
      <CreateModalPassword
        isCreateModalOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <Drawer
        isDrawerOpen={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
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
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textOnPrimary,
  },
  content: {
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  contentText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.textOnPrimary,
    fontWeight: "bold",
    textAlign: "center",
  },
  notfoundcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  messageText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.background_reverse,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
