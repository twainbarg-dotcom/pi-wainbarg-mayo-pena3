import { View, Text } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

import firebase from "firebase";

function Post(props) {
    const likes = props.data.likes || [];
    const emailUsuario = auth.currentUser.email;
    const yaDioLike = likes.includes(emailUsuario);
   
    function Like() {
        db.collection('Posts')
                .doc(props.id)
                .update({
                    likes: yaDioLike
                    ? firebase.firestore.FieldValue.arrayRemove(emailUsuario)
                    : firebase.firestore.FieldValue.arrayUnion(emailUsuario) 

                })
        .catch(error => {
                console.log(error);
                alert("No se pudo actualizar el like");
            });
    
        

    }
    return (
        <View style={styles.container} >
            <Text>{props.data.owner}</Text>
            <Text style= {styles.publicacion}>{props.data.content}</Text>
            <Text style= {styles.conteo}>La publicacion tiene {likes.length} likes</Text>
            <Pressable
                onPress={() => Like()} style= {styles.likes}>
                <Text style={styles.like}>{yaDioLike ? "Sacar like" : "Me gusta"} </Text>
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('ComentarPosteo', { id: props.id })} style={styles.likes}>
                <Text style={styles.like}>Comentar</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({

  like: {

    fontWeight: "bold",

  },
  publicacion:{
    marginBottom: 10,
    backgroundColor: "pink",
    display:"flex",
    alignItems: "center",
    

  },
  likes:{
    backgroundColor: "grey",
    width: 100,
    alignItems: "center",
    justifyContent:"center"
  },
  container: {
    display:"flex",
    justifyContent:"center",
    textAlign:"center",
    backgroundColor:"white",
    width: 300,
    margin: 50,
    padding: 20,
    height: 200
  }

});
export default Post