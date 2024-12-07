import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

export default function ChatScreen({ route }) {
  const { chatName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Cargar mensajes almacenados
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem(`chat-${chatName}`);
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      } catch (error) {
        console.error('Error loading messages', error);
      }
    };

    loadMessages();
  }, [chatName]);

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(`chat-${chatName}`, JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages', error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessages = [...messages, { id: Date.now().toString(), content: message }];
      setMessages(newMessages);
      saveMessages(newMessages);
      setMessage('');
    }
  };

  const handleImagePick = (type) => {
    const options = {
      mediaType: type,
      includeBase64: false,
    };

    const callback = (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        // Aquí puedes manejar la imagen subida (ej., agregarla a los mensajes)
        console.log(response.uri); // Maneja la URI de la imagen aquí
      }
    };

    if (type === 'photo') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{chatName}</Text>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

      <TextInput
        style={styles.input}
        placeholder="Escribe un mensaje..."
        value={message}
        onChangeText={setMessage}
      />

      <Button title="Enviar" onPress={handleSendMessage} />
      <Button title="Subir Imagen" onPress={() => handleImagePick('photo')} />
      <Button title="Tomar Foto" onPress={() => handleImagePick('camera')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageContainer: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  messageText: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to upload photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the storage');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

useEffect(() => {
  requestStoragePermission();
}, []);