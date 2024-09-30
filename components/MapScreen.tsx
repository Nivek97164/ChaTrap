import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';

// Fonction pour calculer la distance entre deux points avec la formule de Haversine
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance en km
  return distance;
};

// Emplacements clés simulés à Paris
const parisLocations = [
  { id: 1, name: "Mickey", coords: { latitude: 48.8584, longitude: 2.2945 } },
  { id: 2, name: "Rémi", coords: { latitude: 48.8606, longitude: 2.3376 } },
  { id: 3, name: "Minnie", coords: { latitude: 48.852968, longitude: 2.349902 } },
  { id: 4, name: "Joseph", coords: { latitude: 48.8738, longitude: 2.295 } },
  { id: 5, name: "Stewart", coords: { latitude: 48.8867, longitude: 2.3431 } },
];

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [heading, setHeading] = useState<number>(0); // Orientation de l'appareil
  const [nearestLocation, setNearestLocation] = useState<{ id: number, name: string, coords: { latitude: number, longitude: number } } | null>(null);
  const [distance, setDistance] = useState<number | null>(null); // Distance au point le plus proche

  // Fonction pour déterminer le point le plus proche
  const findNearestLocation = () => {
    if (!location) return;

    let closest = null;
    let minDistance = Infinity;

    parisLocations.forEach(point => {
      const dist = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        point.coords.latitude,
        point.coords.longitude
      );
      if (dist < minDistance) {
        minDistance = dist;
        closest = point;
      }
    });

    setNearestLocation(closest);
    setDistance(minDistance);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    fetchLocation();
  }, []);

  // Récupérer la direction de l'appareil avec la boussole
  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      if (angle < 0) {
        angle += 360;
      }
      setHeading(angle);
    });

    return () => subscription.remove();
  }, []);

  // Vérifier la position toutes les X secondes et mettre à jour le point le plus proche
  useEffect(() => {
    const interval = setInterval(() => {
      Location.getCurrentPositionAsync({}).then(currentLocation => {
        setLocation(currentLocation);
        findNearestLocation(); // Mettre à jour le point le plus proche
      });
    }, 5000); // 5 secondes d'intervalle

    return () => clearInterval(interval);
  }, [location]);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
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
          rotation={heading}
          title="You are here"
        >
          <View style={styles.marker}>
            <View style={[styles.marker, { transform: [{ rotate: `${heading}deg` }] }]} />
          </View>
        </Marker>

        {/* Marquer tous les points de Paris */}
        {parisLocations.map((point) => (
          <Marker
            key={point.id}
            coordinate={point.coords}
            title={point.name}
          />
        ))}

        {/* Mettre en évidence le point le plus proche */}
        {nearestLocation && (
          <Marker
            coordinate={nearestLocation.coords}
            pinColor="green" // Couleur différente pour le point le plus proche
            title={`Souris la plus proche : ${nearestLocation.name} (${(distance?.toFixed(2))}m)`}
          />
        )}
      </MapView>

      {/* Affichage de la distance */}
      {distance && (
        <Text style={styles.distanceText}>Souris la plus proche : {nearestLocation?.name} - {(distance.toFixed(2)*1000)}m</Text>
      )}
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
  distanceText: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default MapScreen;
