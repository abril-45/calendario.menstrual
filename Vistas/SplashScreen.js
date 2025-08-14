import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/imagenes/loguito.png')} // ajustá el path si es necesario
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}
