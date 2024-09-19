import { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import supabase from '../config/supabaseClient';

const HomeScreen = () => {
  
  // Fonction pour insérer un utilisateur
  const insertUser = async () => {
    const { data, error } = await supabase.from('users').insert([
      {
        pseudo: 'TonPseudo',
        email: 'tonemail@example.com',
        password: 'tonmotdepasse',
      },
    ]);

    if (error) {
      console.error('Erreur lors de l\' insertion de l\'utilisateur:', error);
    } else {
      console.log('Utilisateur inséré avec succès:', data);
    }
  };

  // Fonction pour récupérer des utilisateurs
  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } else {
      console.log('Utilisateurs récupérés:', data);
    }
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId: number) => {
    const { data, error } = await supabase.from('users').delete().eq('id', userId);

    if (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    } else {
      console.log('Utilisateur supprimé avec succès:', data);
    }
  };

  useEffect(() => {
    // Appeler la fonction de récupération des utilisateurs au chargement de l'écran
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bienvenue sur l'écran d'accueil</Text>
      <Text>Vérifiez la console pour l'état de la connexion Supabase</Text>

      {/* Bouton pour insérer un utilisateur */}
      <Button title="Insérer un utilisateur" onPress={insertUser} />

      {/* Bouton pour supprimer un utilisateur */}
      <Button title="Supprimer un utilisateur" onPress={() => deleteUser(1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
