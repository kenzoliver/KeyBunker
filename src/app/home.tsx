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

export default function Home() {
  const [passwords, setPasswords] = useState<PasswordProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);



  const handlePress = () => {
    setDrawerVisible(true);
  };

  const modalCreatePasswordOpen = () => {
    setModalVisible(true);
  };

  const initialPasswordCardItems = [
    { label: "Google", password: "securePass123!" },
    {
      login: "jane.smith@outlook.com",
      label: "LinkedIn",
      password: "LinkedIn2023*",
    },
    { label: "Netflix", password: "MovieNight007" },
    {
      login: "emily.carter@yahoo.com",
      label: "Amazon",
      password: "Prime4Life!",
    },
    { label: "Apple ID", password: "iPhoneX2024" },
    {
      login: "gaming.pro@twitch.tv",
      label: "Twitch",
      password: "StreamKing42",
    },
    { label: "Twitter", password: "TweetingBirds99" },
    {
      login: "robert.klein@company.com",
      label: "Work Email",
      password: "CorpSecure22#",
    },
    { label: "Spotify", password: "MusicLover#2023" },
    {
      login: "travel.addict@domain.com",
      label: "Airbnb",
      password: "Travel2023!",
    },
    { label: "Strava", password: "Running123!" },
    { label: "Uber Eats", password: "Food4Life" },
    {
      login: "john.doe@xyzbank.com",
      label: "Bank Account",
      password: "SafeBanking123!",
    },
    { label: "GitHub", password: "CodeSecure#2023" },
    {
      login: "foodie@grubhub.com",
      label: "Grubhub",
      password: "DeliciousFood99",
    },
    { label: "PayPal", password: "Pay4Goods2023$" },
    {
      login: "laura.photog@mail.com",
      label: "Flickr",
      password: "Photography123!",
    },
    { label: "Dropbox", password: "SecureStorage2023" },
    { login: "reader@ebooks.com", label: "Kindle", password: "Books4Life!" },
    { label: "Pinterest", password: "PinItNow22" },
    {
      login: "designer@dribbble.com",
      label: "Dribbble",
      password: "ArtisticDesign@2023",
    },
    { label: "Discord", password: "ChatSecure99" },
    {
      login: "work.project@slack.com",
      label: "Slack",
      password: "TeamWork2023!",
    },
    { label: "Skype", password: "VideoCall2023!" },
    {
      login: "admin@webserver.com",
      label: "Server Access",
      password: "AdminAccess#42",
    },
    { label: "Pinterest", password: "CreativePins33!" },
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
            password={passwordCard.password}
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
