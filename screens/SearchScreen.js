import React from "react";
import { View, TextInput, StyleSheet, FlatList, Text } from "react-native";

const recentSearches = ["#Drakor", "@vazar", "Top 1 trending"];

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Cari..." />
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
