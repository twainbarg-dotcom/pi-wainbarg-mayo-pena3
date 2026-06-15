import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View, Pressable, TextInput } from "react-native";

import { auth, db } from "../firebase/config";
import firebase from "firebase";

function Comentarios(props) {
    const [comentario , setComentario] = useState ("")
     function onSubmit() {
        db.collection('Posts')
            .doc(props.id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    comentario: comentario,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                setComentario("")
            })
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='comentario'
                onChangeText={text => setComentario(text)}
                value={comentario} />
            
            <Pressable onPress={() => onSubmit()}>
                <Text style = {styles.text}> Subir comentario </Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({

    container: {

        backgroundColor: "#FFFFFF",
        padding: 14,
        borderRadius: 18,
        marginTop: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        

    },

    field: {

        backgroundColor: "#F9FAFB",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E1E4E8",
        borderRadius: 14,
        marginBottom: 10,
        fontSize: 15,
        color: "#111827",

    },

    text: {

        backgroundColor: "#111827",
        color: "#FFFFFF",
        textAlign: "center",
        padding: 14,
        borderRadius: 14,
        fontWeight: "bold",
        fontSize: 15,

    }

});
export default Comentarios