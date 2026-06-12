import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

import firebase from "firebase";






function Post(props) {
    const [like, setLike] = useState("Like")
    const [CantLike, setCant] = useState(0)
    function Like() {
        if (like == "Like") {
            db.collection('Posts')
                .doc(props.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
                })
                .then(() => {
                    setLike("Sacar like")
                    setCant( CantLike + 1) 

                })
        }
        else{
            db.collection('Posts')
                .doc(props.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
                })
                .then(() => {
                    setLike("Like")
                    setCant(CantLike - 1) 

                })
        }

    }
    return (
        <View style={styles.container} >
            <Text>{props.data.owner}</Text>
            <Text style= {styles.publicacion}>{props.data.content}</Text>
            <Text style= {styles.conteo}>La publicacion tiene {CantLike} likes</Text>
            <Pressable
                onPress={() => Like()} style= {styles.likes}>
                <Text style={styles.like}>{like} </Text>
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