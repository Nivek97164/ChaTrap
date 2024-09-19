import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import supabase from '../config/supabaseClient';

const HomeScreen = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour insérer un utilisateur
  const insertUser = async () => {
    try {
      const { data, error } = await supabase.from('users').insert([
        {
          pseudo: pseudo,
          email: email,
          password: password, // Assure-toi de ne jamais stocker les mots de passe en clair en production
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Utilisateur inséré avec succès:', data);
    } catch (error) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Bienvenue sur l'écran d'accueil</Text>

      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Insérer un utilisateur" onPress={insertUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default HomeScreen;
