import { Text } from "react-native";
import { View, Pressable } from "react-native-web";
import { auth, db} from "../firebase/config";
import Post from "../components/Post";
import { FlatList } from "react-native";
import { useState, useEffect } from "react";

function Profile(props) {
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
    
        }, []);
    return (
        <View>
            <text>{auth.currentUser.email}</text>
            <FlatList
                data={posteo}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <Post id={item.id} data= {item.data}/>}
            />
            
            <Pressable
                onPress={() => props.navigation.navigate('Login')}>
                <Text>Desloguearse </Text>
            </Pressable>
        </View>
    )
}

export default Profile