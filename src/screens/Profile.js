import { View, Pressable, StyleSheet, Text, FlatList} from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import { useState, useEffect } from "react";

function Profile(props) {
    const [posteo, setPosteo] = useState([]);
    const [nombre, setNombre] = useState("")
    function logout() {
    auth.signOut()
        .then(() => {
            props.navigation.navigate("Login");
        })
        .catch(error => {
            console.log(error);
            alert("No se pudo cerrar sesión");
        });

}
    useEffect(() => {

        db.collection("Posts").where('owner', '==', auth.currentUser.email).onSnapshot(docs => {

            let posteo = [];

            docs.forEach(doc => {

                posteo.push({

                    id: doc.id,

                    data: doc.data()

                });

            });

            setPosteo(posteo);

        });
    }, []);
    useEffect(() => {


        db.collection("users").where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach(doc => {
                    setNombre(doc.data().name);
                 });
        });
}, []);



return (
    <View style={styles.container}>
        <View style= {styles.info}>
            <Text style= {styles.email}>{auth.currentUser.email}</Text>
            <Text style={styles.nombre}>{nombre}</Text>
        </View>
        
        <FlatList
            data={posteo}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Post id={item.id} data={item.data} />}
        />

        <Pressable
            onPress={() => logout()} style= {styles.boton}>
            <Text style={styles.textoBoton}>Desloguearse </Text>
        </Pressable>
    </View>
)
}
const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: "#F4F5F7",
        padding: 20,

    },

    info: {

        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 18,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        

    },

    nombre: {

        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 6,

    },

    email: {

        fontSize: 14,
        color: "#6B7280",

    },

    titulo: {

        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 12,

    },

    boton: {

        backgroundColor: "#111827",
        padding: 15,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 10,

    },

    textoBoton: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 15,

    },

});
export default Profile