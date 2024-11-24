import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  Modal,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [likes, setLikes] = useState([0, 0, 0]);
  const [likedPosts, setLikedPosts] = useState([false, false, false]);
  const [comments, setComments] = useState([
    [
      { id: 1, username: "Andri", text: "wah keren", liked: false },
      { id: 2, username: "jaaaa", text: "keren", liked: false },
    ],
    [
      { id: 3, username: "wi_la", text: "pemandangan bagus", liked: false },
    ],
    [],
  ]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleLike = (index) => {
    const newLikes = [...likes];
    const newLikedPosts = [...likedPosts];

    if (newLikedPosts[index]) {
      newLikes[index] -= 1;
      newLikedPosts[index] = false;
    } else {
      newLikes[index] += 1;
      newLikedPosts[index] = true;
    }

    setLikes(newLikes);
    setLikedPosts(newLikedPosts);
  };

  const handleShare = async (link) => {
    try {
      await Share.share({
        message: `Lihat postingan ini: ${link}`,
      });
    } catch (error) {
      Alert.alert("Gagal Membagikan", error.message);
    }
  };

  const openCommentModal = (index) => {
    setCurrentPostIndex(index);
    setIsModalVisible(true);
  };

  const closeCommentModal = () => {
    setIsModalVisible(false);
    setNewComment("");
  };

  const addComment = () => {
    if (newComment.trim() === "") return;

    const updatedComments = [...comments];
    updatedComments[currentPostIndex].push({
      id: Math.random().toString(),
      username: "Anda",
      text: newComment,
      liked: false,
    });

    setComments(updatedComments);
    setNewComment("");
  };

  const handleLikeComment = (postIndex, commentIndex) => {
    const updatedComments = [...comments];
    const comment = updatedComments[postIndex][commentIndex];
    comment.liked = !comment.liked;
    setComments(updatedComments);
  };

  const posts = [
    {
      id: 1,
      image: "https://i.ytimg.com/vi/6XGkOTnTKcQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCgj5JY5NFEWVmDmNmcrnjK2ZWBmg",
      caption: "Kartun masa keciku",
      link: "https://example.com/post/1",
    },
    {
      id: 2,
      image: "https://media.istockphoto.com/id/614429556/id/vektor/lanskap-rumput-hijau-dengan-anak-anak-kartun-lucu-bermain.jpg?s=170667a&w=0&k=20&c=bM__auJOJV0mepgueE75aoLqMq-AbC3nddcsDmfgFEI=",
      caption: "Taman kanak kanak",
      link: "https://example.com/post/2",
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6Ca4nyvZ_Y-or1kw2gknajpwMuvcbBDnsQ&s",
      caption: "View indah",
      link: "https://example.com/post/3",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {posts.map((post, index) => (
        <View key={post.id} style={styles.post}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <Text style={styles.caption}>{post.caption}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleLike(index)} style={styles.actionButton}>
              <Ionicons
                name={likedPosts[index] ? "heart" : "heart-outline"}
                size={24}
                color={likedPosts[index] ? "tomato" : "gray"}
              />
              <Text style={styles.actionText}>{likes[index]} Suka</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openCommentModal(index)} style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="gray" />
              <Text style={styles.actionText}>
                {comments[index].length} Komentar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleShare(post.link)} style={styles.actionButton}>
              <Ionicons name="share-outline" size={24} color="gray" />
              <Text style={styles.actionText}>Bagikan</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCommentModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Komentar</Text>
            {currentPostIndex !== null && (
              <FlatList
                data={comments[currentPostIndex]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.commentItem}>
                    <Text style={styles.commentText}>
                      <Text style={styles.commentUsername}>{item.username}</Text>{" "}
                      {item.text}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleLikeComment(currentPostIndex, index)
                      }
                    >
                      <Ionicons
                        name={item.liked ? "heart" : "heart-outline"}
                        size={18}
                        color={item.liked ? "tomato" : "gray"}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                ListEmptyComponent={<Text>Tidak ada komentar.</Text>}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Tulis komentar..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <View style={styles.modalButtons}>
              <Button title="Tambah" onPress={addComment} />
              <Button title="Tutup" color="red" onPress={closeCommentModal} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  caption: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    marginTop: 5,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentText: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
