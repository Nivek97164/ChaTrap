import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

interface SlimeButtonProps {
  text: string;
  colorType: 'Rouge'|'Beige'|'Marron';
  onPress: () => void;
}

const backgroundImages = {
  Rouge: require('@/assets/images/BoutonRouge.png'),
  Beige: require('@/assets/images/BoutonBeige.png'),
  Marron: require('@/assets/images/BoutonMarron.png')
};

SplashScreen.preventAutoHideAsync();

const SlimeButton: React.FC<SlimeButtonProps> = ({ text, colorType, onPress }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        BlankPlace: require('../assets/fonts/BlankPlace.otf'),
      });
      setLoaded(true);
      SplashScreen.hideAsync();
    }

    loadFonts();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <ImageBackground source={backgroundImages[colorType]} style={styles.backgroundImage}>
        <Text style={styles.textWithShadow}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  textWithShadow: {
    fontFamily: 'BlankPlace',  // Utilisation de la police personnalisée
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default SlimeButton;