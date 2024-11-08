import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import colors from '../utils/colors/colors';

export default function PinLockScreen() {
  const [pin, setPin] = useState<string>('');
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const correctPin = '1234';


  const handlePress = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit); 
    }
  };


  const handleDelete = () => {
    setPin(pin.slice(0, -1)); 
  };

 
  const handleSubmit = () => {
    if (pin === correctPin) {
      setIsLocked(false); 
    } else {
      alert('PIN incorreto!');
      setPin(''); 
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>Tela de Bloqueio</Text>
      </View>

      {isLocked ? (
        <View style={styles.pinContainer}>
          <Text style={styles.pinDisplay}>{pin.padEnd(4, '•')}</Text>

          <View style={styles.keypad}>
            {[1, 2, 3].map((row, i) => (
              <View key={i} style={styles.keypadRow}>
                {[1, 2, 3].map((digit) => {
                  const buttonDigit = (i * 3 + digit) > 9 ? '' : (i * 3 + digit).toString();
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
              <TouchableOpacity style={styles.key} onPress={() => handlePress('0')}>
                <Text style={styles.keyText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.key} onPress={handleSubmit}>
                <Text style={styles.keyText}>✔</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.unlockMessage}>
          <Text style={styles.unlockText}>Tela Desbloqueada!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingBottom: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textOnPrimary,
  },
  pinContainer: {
    width: '80%',
    alignItems: 'center',
  },
  pinDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 40,
  },
  keypad: {
    alignItems: 'center',
  },
  keypadRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  key: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  keyText: {
    fontSize: 24,
    color: colors.textOnPrimary,
    fontWeight: 'bold',
  },
  unlockMessage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
