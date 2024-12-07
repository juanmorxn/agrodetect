import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/signin.png')} style={styles.background} />
      <Text style={styles.headerText}>Sign in</Text>
      <TextInput placeholder="Correo" style={styles.input} />
      <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatList')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.subText}>¿Olvidaste tu contraseña?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>¿No tienes una cuenta? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  background: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6c757d',
  },
  linkText: {
    color: '#28A745',
    marginTop: 10,
    textAlign: 'center',
  },
});
