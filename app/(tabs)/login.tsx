import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import supabase from '../config/supabaseClient';
import SlimeButton from '@/components/SlimeButton';

const HomeScreen = () => {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour insérer un utilisateur
  const insertUser = async () => {
    try {
      const { data, error } = await supabase.from('users').insert([
        {
          pseudo: pseudo,
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
                      <Image
                    source={require('@/assets/images/background.jpg')}
                    style={styles.background}
                />
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                />

      <TextInput
        style={styles.input}
        placeholder="Robert"
        value={pseudo}
        onChangeText={setPseudo}
      />

      <TextInput
        style={styles.input}
        placeholder="azerty95"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <SlimeButton
      colorType="Marron"
      onPress={insertUser}
      text={"Créer\n le profil"}
      >

      </SlimeButton>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '60%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    color: 'white',
  },
  logo: {
    display: 'flex',
    width: 350,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',    
    marginTop: 50,
    marginBottom: 50,
  },

background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -100
},
});

export default HomeScreen;
