import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../utils/colors/colors";
import { PasswordProps } from "../utils/types/passwordType";
import PasswordCard from "./components/PasswordCard";
import Search from "./components/Search";
import Icon from "react-native-vector-icons/MaterialIcons";
import CreateModalPassword from "./components/CreatePassword";
import Drawer from "./components/Drawer";
import { usePasswordDatabase } from "../db/usePasswordatabase";

export default function Home() {
  const [passwords, setPasswords] = useState<PasswordProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const passwordDatabase = usePasswordDatabase();

  const getPasswords = async (): Promise<any> => {
    try {
      const passwords = await passwordDatabase.get();
      console.log(passwords);
    } catch (error) {
      console.error("Erro ao buscar senhas", error);
    }
  };
  useEffect(() => {
    getPasswords();
  });

  const handlePress = () => {
    setDrawerVisible(true);
  };

  const modalCreatePasswordOpen = () => {
    setModalVisible(true);
  };

  const initialPasswordCardItems = [
    { label: "Google", passkey: "securePass123!" },
    {
      login: "jane.smith@outlook.com",
      label: "LinkedIn",
      passkey: "LinkedIn2023*",
    },
    { label: "Netflix", passkey: "MovieNight007" },
    {
      login: "emily.carter@yahoo.com",
      label: "Amazon",
      passkey: "Prime4Life!",
    },
    { label: "Apple ID", passkey: "iPhoneX2024" },
    {
      login: "gaming.pro@twitch.tv",
      label: "Twitch",
      passkey: "StreamKing42",
    },
    { label: "Twitter", passkey: "TweetingBirds99" },
    {
      login: "robert.klein@company.com",
      label: "Work Email",
      passkey: "CorpSecure22#",
    },
    { label: "Spotify", passkey: "MusicLover#2023" },
    {
      login: "travel.addict@domain.com",
      label: "Airbnb",
      passkey: "Travel2023!",
    },
    { label: "Strava", passkey: "Running123!" },
    { label: "Uber Eats", passkey: "Food4Life" },
    {
      login: "john.doe@xyzbank.com",
      label: "Bank Account",
      passkey: "SafeBanking123!",
    },
    { label: "GitHub", passkey: "CodeSecure#2023" },
    {
      login: "foodie@grubhub.com",
      label: "Grubhub",
      passkey: "DeliciousFood99",
    },
    { label: "PayPal", passkey: "Pay4Goods2023$" },
    {
      login: "laura.photog@mail.com",
      label: "Flickr",
      passkey: "Photography123!",
    },
    { label: "Dropbox", passkey: "SecureStorage2023" },
    { login: "reader@ebooks.com", label: "Kindle", passkey: "Books4Life!" },
    { label: "Pinterest", passkey: "PinItNow22" },
    {
      login: "designer@dribbble.com",
      label: "Dribbble",
      passkey: "ArtisticDesign@2023",
    },
    { label: "Discord", passkey: "ChatSecure99" },
    {
      login: "work.project@slack.com",
      label: "Slack",
      passkey: "TeamWork2023!",
    },
    { label: "Skype", passkey: "VideoCall2023!" },
    {
      login: "admin@webserver.com",
      label: "Server Access",
      passkey: "AdminAccess#42",
    },
    { label: "Pinterest", passkey: "CreativePins33!" },
  ];

  const passwordFilter = (name: string) => {
    if (name === "") {
      setPasswords(initialPasswordCardItems);
    }
    const filteredPasswords = initialPasswordCardItems.filter((item) =>
      item.label.toLowerCase().startsWith(name.toLowerCase())
    );
    setPasswords(filteredPasswords);
  };

  useEffect(() => {
    setPasswords(initialPasswordCardItems);
  }, []);

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

        {passwords.map((passwordCard, idx) => (
          <PasswordCard
            key={idx}
            login={passwordCard.login || undefined}
            label={passwordCard.label}
            passkey={passwordCard.passkey}
          />
        ))}
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
    backgroundColor: colors.background_reverse,
  },
  buttonText: {
    color: colors.background,
    fontWeight: "bold",
    textAlign: "center",
  },
});
