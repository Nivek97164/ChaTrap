import React from 'react';
import CreerSalonForm from '@/components/CreerSalon';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';

export default function CreerSalon() {
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
                <CreerSalonForm/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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