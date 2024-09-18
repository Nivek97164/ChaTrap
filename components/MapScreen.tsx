import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors'; // Pour obtenir la direction de l'appareil

/* MapView : Affichage carte sur Google Maps / Marker : Afficher Marker */
/* expo-location : API d'Expo pour accéder aux services de loc sur téléphone */

/* Création d'un type de données location */
interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}
/* Création composant fonctionnel MapScreen */
const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [heading, setHeading] = useState<number>(0); // Orientation de l'appareil

  /* Fonction asynchrone exécutée une seule fois */ 
  useEffect(() => {
    const fetchLocation = async () => {
      /* Demande de permission pour localisation */
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      /* Récupération de position */
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    fetchLocation();
  }, []);

  /* Obtenir la direction de l'appareil avec la boussole */
  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI); // Calcul angle entre axe x et le vecteur (x,y)
      if (angle < 0) {
        angle += 360;
      }
      setHeading(angle); // Mettre à jour l'angle en degrés
    });

    // Nettoyer l'abonnement lorsque le composant est démonté
    return () => subscription.remove();
  }, []);

  /* Permission denied */
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  /* Attente de récupération de la localisation */
  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  /*console.log(location.coords.latitude);
  console.log(location.coords.longitude);*/

  /* Affichage de la carte */
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true} // Afficher le point bleu natif de la carte
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marquer la position avec orientation */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          rotation={heading} // faire pivoter le marker en fonction de l'orientation
          title="You are here"
        >
          {/* Style du marker */}
          <View style={styles.marker}>
              <View style={[styles.marker, { transform: [{ rotate: `${heading}deg` }] }]} />
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*arrow: {
    width: 10,
    height: 10,
    backgroundColor: 'green', // Point bleu
    borderRadius: 5,
  },*/
});

export default MapScreen;
