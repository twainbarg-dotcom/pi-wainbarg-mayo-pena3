import { Text, View, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { auth, db } from "../firebase/config";

function NuevosPosts(props) {
    const [comentarios, setComentarios] = useState("")
    function OnSubmit( comentarios) {
        db.collection('Posts').add({
            owner: auth.currentUser.email,
            content: comentarios,
            likes:[],
            createdAt: Date.now(),
        })
            .then()
            .catch(e => console.log(e))
        props.navigation.navigate("Home")
    }



    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Nuevo posteo</Text>
            
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='Escribi tu posteo'
                onChangeText={text => setComentarios(text)}
                value={comentarios} />


            <Pressable
                onPress={() => OnSubmit( comentarios)}>
                <Text style={styles.text}>Subir </Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: "#F4F5F7",
        padding: 24,
        justifyContent: "center",

    },

    field: {

        backgroundColor: "#FFFFFF",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E1E4E8",
        borderRadius: 16,
        marginVertical: 12,
        fontSize: 15,
        color: "#111827",

    },

    text: {

        backgroundColor: "#111827",
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 10,
        padding: 15,
        borderRadius: 14,
        fontWeight: "bold",
        fontSize: 15,
       

    }, 
    titulo: {

        fontSize: 26,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 8,

    }

});
export default NuevosPosts