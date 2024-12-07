import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/biemvenido.png')} style={styles.background} />

      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>BIENVENIDO</Text>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
        </View>

    

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')} // Navega a la pantalla de inicio de sesión
        >
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the start (left)
    padding: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -450,
  },
  welcomeText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase', // Makes the text uppercase
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: 0, // Space between the text and logo
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left', // Align text to the left
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
