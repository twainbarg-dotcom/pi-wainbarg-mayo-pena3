import { View, Text } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

import firebase from "firebase";

function Post(props) {
   
    function Like() {
       if (props.data.likes.includes(auth.currentUser.email)) {
        db.collection('Posts')
                .doc(props.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)                
                })
                .catch(error => console.log(error));
               
            } else {
              db.collection("Posts")
                .doc(props.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
                })
                .catch(error => console.log(error));

        }
        

    
        

    }
    return (
        <View style={styles.container} >
            <Text style= {styles.nombre}>{props.data.owner}</Text>
            <Text style= {styles.publicacion}>{props.data.content}</Text>
            <Text style= {styles.conteo}>La publicacion tiene {props.data.likes.length} likes</Text>
            <Pressable
                onPress={() => Like()} style= {styles.likes}>
                <Text style={styles.like}>{props.data.likes.includes(auth.currentUser.email) ? "Sacar like" : "Me gusta"} </Text>
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('ComentarPosteo', { id: props.id })} style={styles.likes}>
                <Text style={styles.like}>Comentar</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({

  container: {

    backgroundColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
    marginVertical: 14,
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    

  },

  publicacion: {
    fontSize: 16,
    color: "#1F2937",
    marginVertical: 14,
    lineHeight: 22,

  },

  conteo: {

    color: "#6B7280",
    marginBottom: 12,
    fontSize: 14,

  },

  likes: {

    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,

  },

  like: {

    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,

  },
  nombre: { 
    fontWeight: "bold",
     color: "#111827",
      fontSize: 15 
    }

});
export default Post