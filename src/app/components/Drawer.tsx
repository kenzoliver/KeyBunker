import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../../utils/colors/colors";
import { Link } from "expo-router";

type DrawerProps = {
  isDrawerOpen: boolean;
  onClose: () => void;
};

export default function Drawer({ isDrawerOpen, onClose }: DrawerProps) {
  const openGithubRepo = () => {
    Linking.openURL("https://github.com/kenzoliver/KeyBunker");
  };

  return (
    <Modal visible={isDrawerOpen} animationType="none" transparent={true}>
      <TouchableOpacity
        onPress={() => onClose()}
        style={styles.modalBackground}
      >
        <View style={styles.modalContainer}>
          <View>
            <Link href={"/generatorPasswords"} style={styles.menuItem}>
              <Icon
                name="vpn-key"
                size={24}
                color={colors.background_reverse}
              />

              <Text style={styles.menuItemText}>Gerar Senha</Text>
            </Link>

            <Link href={"/SetMasterKey"} style={styles.menuItem}>
              <Icon name="lock" size={24} color={colors.background_reverse} />
              <Text style={styles.menuItemText}>Redefinir Senha Master</Text>
            </Link>
          </View>

          {/* Freeze */}
          {/* <View style={styles.switchContainer}>
            <Icon
              name="nights-stay"
              size={24}
              color={colors.background_reverse}
            />
            <Switch
              trackColor={{
                false: colors.background_reverse,
                true: colors.background,
              }}
              thumbColor={colors.accent}
              value={false}
              onValueChange={() => {}}
            />
            <Icon name="wb-sunny" size={24} color={colors.background_reverse} />
          </View> */}

          <View style={styles.githubContainer}>
            <TouchableOpacity onPress={openGithubRepo} style={styles.menuItem}>
              <Icon name="code" size={24} color={colors.background_reverse} />
              <Text style={styles.link}>Acesse o Repositório no GitHub</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "65%",
    height: "100%",
    backgroundColor: colors.background,
    paddingTop: 50,
  },

  menuItem: {
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.background_reverse,
  },
  menuItemText: {
    paddingBottom: 10,
    fontSize: 20,
    color: colors.background_reverse,
  },
  link: {
    fontSize: 13,
    color: colors.accent,
    marginLeft: 10,
  },
  githubContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  switchContainer: {
    gap: 5,
    width: "85%",
    position: "absolute",
    bottom: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.background_reverse,
    marginHorizontal: 20,
  },
});
