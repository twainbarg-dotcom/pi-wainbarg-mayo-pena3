import { Text } from "react-native";
import { View, Pressable, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { FlatList } from "react-native-web";

function NuevosPosts(props) {
    const [email, setEmail] = useState("")
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
            <Text>Nuevo posteo</Text>
            
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='Comentarios'
                secureTextEntry={false}
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
        padding: 20,
        marginTop: 10,

    },
    field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,

    },

    text: {

        backgroundColor: "white",

        margin: 10,

        padding: 15,

        borderRadius: 10,

        elevation: 4
    }
})

export default NuevosPosts