import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, PermissionsAndroid, Platform } from 'react-native';

export default function HomeScreen() {
  const [locationPermission, setLocationPermission] = useState(true); // Par défaut, on suppose que la permission est accordée

  useEffect(() => {
    // Fonction pour demander la permission de localisation
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION // Demande d'accès à la localisation
          );
          console.log('Permission demandée:', granted); // Ajoute un log pour voir la réponse de la permission

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Localisation autorisée');
            setLocationPermission(true); // Permission accordée
          } else {
            console.log('Localisation refusée');
            setLocationPermission(false); // Permission refusée
          }
        } catch (err) {
          console.warn('Erreur lors de la demande de permission:', err);
        }
      }
    };

    // Appelle la fonction pour demander la permission
    requestLocationPermission();
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />

        {/* Bouton Créer un salon */}
        <TouchableOpacity style={styles.imageButton}>
          <Image
            source={require('@/assets/images/create-room.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {/* Bouton Rejoindre un salon */}
        <TouchableOpacity style={styles.imageButton}>
          <Image
            source={require('@/assets/images/join-room.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {/* Bouton Profil */}
        <TouchableOpacity style={styles.imageButton}>
          <Image
            source={require('@/assets/images/profile.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 200,
    marginTop: 50,
    marginBottom: 50,
  },

  buttonImage: {
    width: 250,
    height: 125,
    resizeMode: 'contain',
  },

});
git