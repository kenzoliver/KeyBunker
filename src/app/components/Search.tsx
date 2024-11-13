import { colors } from "@/utils/colors/colors";
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";


export default function Search({ passwordFilter }: any) {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => passwordFilter(text)}
        style={styles.input}
        placeholder="Pesquisar..."
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.background_reverse,
    color: colors.background_reverse,
    borderRadius: 25,
    paddingLeft: 20,
    fontSize: 16,
    backgroundColor: colors.background,
  },
});
