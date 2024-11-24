import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: "https://i.pinimg.com/736x/f7/09/6f/f7096fa2b9c5941e1ff89f20b55465b9.jpg" }}
      />
      <Text style={styles.username}>Suci Suryani</Text>
      <View style={styles.buttons}>
        <Button title="Edit Profil" onPress={() => {}} />
        <Button title="Pengaturan" onPress={() => {}} />
        <Button title="Logout" onPress={() => {}} color="red"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttons: {
    width: "80%",
    justifyContent: "space-between",
    height: 150,
  },
});
