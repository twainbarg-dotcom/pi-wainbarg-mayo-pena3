import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import Comentarios from "../components/Comentarios";
import Post from "../components/Post";
import Profile from "./Profile";

function Home(props) {
    const [posteo, setPosteo] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        db.collection("Posts").orderBy('createdAt', 'desc').onSnapshot(docs => {

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

    }, []);
    return (
        <View style={styles.flatlist}>
            <Text style={styles.home}>Inicio</Text>
            <FlatList
                data={posteo}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Post id={item.id} data={item.data} navigation={props.navigation} />} />
        </View>

    )
}

const styles = StyleSheet.create({

    flatlist: {
        width: "100%",
        flex: 1,
        backgroundColor: "#F4F5F7",
        paddingTop: 16,

    },
    home: {

        fontSize: 28,
        fontWeight: "bold",
        color: "#111827",
        marginHorizontal: 20,
        marginBottom: 10,

    }

});

export default Home