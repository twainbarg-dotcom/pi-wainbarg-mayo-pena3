import { Text } from "react-native";
import { View, Pressable, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { FlatList } from "react-native-web";
import Comentarios from "../components/Comentarios";
import Post from "../components/Post";
import Profile from "./Profile";

function Home(props) {
    const [posteo, setPosteo] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        db.collection("Posts").onSnapshot(docs => {

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
        console.log(auth.currentUser)

    }, []);
    return (
        <View>

            <FlatList
                data={posteo}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <Post id={item.id} data= {item.data}/>}
            />
        </View>

    )
}

export default Home