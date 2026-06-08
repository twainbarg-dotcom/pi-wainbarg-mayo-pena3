import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View, Pressable, TextInput } from "react-native";

function Comentarios(props) {
    const [comentarios , setComentarios] = useState ("")
    const OnSubmit = () => {console.log (comentarios)}
    return (
        <View style={styles.container}>
            <Text>Comentarios</Text>
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='comentario'
                onChangeText={text => setComentarios(text)}
                value={comentarios} />
            
            <Pressable onPress={() => onSubmit()}>
                <Text style = {styles.text}> Subir comentarios </Text>
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
export default Comentarios