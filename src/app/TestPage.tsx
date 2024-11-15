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
  import colors from "./utils/colors/colors";
  
  
  export default function TestPage() {
    
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
          translucent={false}
        />
        <View style={styles.header}>
          <TouchableOpacity>
            <Link href={"/"}>
              <Icon name="arrow-back" size={30} color={colors.textOnPrimary} />
            </Link>
          </TouchableOpacity>
  
          <Text style={styles.headerText}>Teste de Senha</Text>
        </View>
  
        
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
   
  });
  