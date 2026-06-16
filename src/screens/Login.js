import { useState, useEffect } from 'react';
import { View, Pressable, TextInput, Text, StyleSheet } from "react-native";
import { auth } from "../firebase/config";



function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => auth.onAuthStateChanged(user => {
        if (user){
            props.navigation.navigate("HomeMenu")
        }
    }), [])



    function OnSubmit(email, pass) {
        if (!email.includes("@")) {

            alert("Email mal formateado")

            return

        }

        if (pass.length < 6) {

            alert("La password debe tener una longitud mínima de 6 caracteres")

            return

        }
        auth.signInWithEmailAndPassword(email, pass)
            .catch(error => {
                console.log(error)
                if (error.code === 'auth/internal-error') {
                    alert('Credenciales no validas')
                }
                
            })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Datos para login</Text>
            <TextInput style={styles.field}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={email} />
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password} />

            <Pressable
                onPress={() => props.navigation.replace('Register')}>
                <Text style={styles.text}>No tengo cuenta </Text>
            </Pressable>
            <Pressable
                onPress={() => OnSubmit(email, password)}>
                <Text style={styles.text}>Login </Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({

    container: {

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
        color: "#111827" }

});


export default Login