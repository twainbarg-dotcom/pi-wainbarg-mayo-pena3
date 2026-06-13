import { Text } from "react-native";
import { View, Pressable } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import { FlatList } from "react-native";
import { useState, useEffect } from "react";

function Profile(props) {
    const [posteo, setPosteo] = useState([]);

    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("")

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
            console.log(posteo)

            setLoading(false);

        });
        console.log(props)
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
    <View>
        <Text>{auth.currentUser.email}</Text>
        <Text>{nombre}</Text>
        <FlatList
            data={posteo}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Post id={item.id} data={item.data} />}
        />

        <Pressable
            onPress={() => props.navigation.navigate('Login')}>
            <Text>Desloguearse </Text>
        </Pressable>
    </View>
)
}

export default Profile