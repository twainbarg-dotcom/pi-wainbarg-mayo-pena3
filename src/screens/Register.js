import { Text } from "react-native";
import { View, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { auth, db } from "../firebase/config";
function Register(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    function OnSubmit(email, pass, name) {
        if (email === "" || pass === "" || name === "") {
            alert("Completá todos los campos");
            return;
        }
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                return db.collection("users").add({
                    owner: response.user.email,
                    name: name,
                    createdAt: Date.now()
                });
            })
            .then(() => {
               return auth.signOut();
            })
            .then(() => {
               props.navigation.navigate("Login");
            })

            .catch(error => {
                console.log(error);
                alert(error.message);
            });



    }


    return (
        <View style={styles.pres}>
            <Text style= {styles.titulo}>Datos para registrarse</Text>
            <TextInput style={styles.field}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={email} />
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='Nombre'
                onChangeText={text => setName(text)}
                value={name} />
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password} />
            <Pressable onPress={() => OnSubmit(email, password, name)}>
                <Text style={styles.text}> Registrarme </Text>
            </Pressable>
            <Pressable
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.text}>Ya tengo cuenta </Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({

    pres: {

        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#F4F5F7",

    },

    field: {

        backgroundColor: "#FFFFFF",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E1E4E8",
        borderRadius: 14,
        marginVertical: 10,
        fontSize: 15,
        color: "#111827",

    },

    text: {

        backgroundColor: "#111827",
        color: "#FFFFFF",
        textAlign: "center",
        marginVertical: 8,
        padding: 15,
        borderRadius: 14,
        fontWeight: "bold",
        fontSize: 15,

    },
    titulo: {

        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#111827",

    },


});
export default Register