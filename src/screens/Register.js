import { Text } from "react-native";
import { View, Pressable, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { auth, db } from "../firebase/config";
function Register(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    function OnSubmit(email, pass) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                props.navigation.navigate('Login');
            })
            .catch(error => {
                console.log(error)



            })
        db.collection('users').add({
            owner: auth.currentUser.email,
            description: {name},
            createdAt: Date.now(),
        })
            .then()
            .catch(e => console.log(e))

    }

    return (
        <View style={styles.pres}>
            <Text>Datos para registrarse</Text>
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
            <Pressable onPress={() => OnSubmit(email, password)}>
                <Text style={styles.text}> Login </Text>
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
export default Register