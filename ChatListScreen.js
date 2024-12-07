import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';

export default function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  // Función para crear un nuevo chat
  const createChat = () => {
    const newChat = { id: Date.now().toString(), name: `Chat ${chats.length + 1}` };
    setChats([...chats, newChat]);
  };

  // Función para eliminar un chat por id
  const deleteChat = (chatId) => {
    setChats(chats.filter(chat => chat.id !== chatId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Chats</Text>
      </View>

      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            {/* Navegar al chat */}
            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Chat', { chatName: item.name })}>
              <Text style={styles.chatText}>{item.name}</Text>
            </TouchableOpacity>

            {/* Botón para eliminar el chat */}
            <TouchableOpacity onPress={() => deleteChat(item.id)}>
              <Image source={require('./assets/delete.png')} style={styles.chatIcon} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

      {/* Botón para agregar un nuevo chat */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={createChat} style={styles.addButton}>
          <Image source={require('./assets/agregar.png')} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between', // Ensure the add button is at the bottom
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatIcon: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  chatText: {
    fontSize: 18,
  },
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 20, // Adjust spacing from the bottom
  },
  addButton: {
    backgroundColor: '#ffffff', // Example color
    borderRadius: 50,
    padding: 10,
    width: 60, // Adjust size
    height: 60, // Adjust size
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 60,
    height: 60,
  },
});
