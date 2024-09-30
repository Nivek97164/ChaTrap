import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import SlimeButton from './SlimeButton';

const CreerSalonForm = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<string>('1');
  const [duration, setDuration] = useState<string>('1'); // Durée en chiffres

  const handleSubmit = () => {
    // Logique pour gérer l'envoi du formulaire
    console.log(`Nombre de joueurs: ${numberOfPlayers}, Durée: ${duration}`);
  };

  const [chatCount, setChatCount] = useState(0);
  const [sourisCount, setSourisCount] = useState(0);

  const handleInputChange = (text: string) => {
    setNumberOfPlayers

    const entree = parseInt(text); // Convertir le texte en nombre

    var nombre2chat = Math.ceil(entree/5);
    var nombre2souris = entree - nombre2chat;

    if (!isNaN(nombre2chat) && nombre2chat >= 0) { // Vérifie que c'est un nombre valide
      setChatCount(nombre2chat); // Met à jour le nombre de répétitions
      setSourisCount(nombre2souris);
    } else {
      setChatCount(0); // Si le texte n'est pas un nombre valide, mettre à 0
      setSourisCount(nombre2souris);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Saisissez le nombre de joueurs</Text>
        <TextInput
            style={styles.input}
            onChangeText={handleInputChange}
            keyboardType="numeric" // Affiche le clavier numérique
        />
        <View style={styles.preview}>
            <View  style={styles.emoji}>
                {Array.from({ length: chatCount}, (_, index) => (
                    <Text key={index}>
                    🐱
                    </Text>
                ))}
            </View>
            <Text>
                →
            </Text>
            <View style={styles.emoji}>
                {Array.from({ length: sourisCount}, (_, index) => (
                    <Text key={index}>
                        🐭
                    </Text>
                ))}
            </View>
      </View>

        <Text style={styles.label}>Durée de la partie (en min)</Text>
        <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric" // Affiche le clavier numérique
        />

      <SlimeButton
        colorType='Marron'
        text={'Créer \nla salle'}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  input: {
    color: 'white',
    height: 50,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fond clair pour meilleure visibilité
  },
  preview:{
    display: 'flex',
    flexDirection: 'row',
    height: 70
  },
  emoji:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 140,
  }
});

export default CreerSalonForm;