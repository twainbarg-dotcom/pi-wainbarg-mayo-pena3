import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View, Pressable, TextInput } from "react-native";
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
            .then((response) => {
                props.navigation.navigate('HomeMenu');
            })
            .catch(error => {
                console.log(error)
                if (error.code === 'auth/internal-error') {
                    alert('Credenciales no validas')
                }
                
            })
    }
    return (
        <View style={styles.container}>
            <Text>Datos para login</Text>
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
                onPress={() => props.navigation.navigate('Register')}>
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


export default Login