import { useEffect, useState } from "react" ;
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "../firebase/config";
import Comentarios from "../components/Comentarios";

function ComentarPosteo(props){
    const  id = props.route.params 

    const [comentarios, setComentarios] = useState([])
    const [loading, setLoading] = useState(true)


 useEffect(() => {
     db.collection('Posts').onSnapshot(docs => {
            docs.forEach(doc => {
                if (doc.id == id && doc.data().comentarios) {
                    setComentarios(doc.data().comentarios)
                }
            })
            setLoading(false)

})
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Comentarios del posteo</Text>
            <FlatList
            data={comentarios}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({item}) => (
                <View style ={styles.comentario}>
                    <Text style={styles.owner}>{item.owner}</Text>
                    <Text>{item.comentario}</Text>

                </View>

            )}

    />
    
        <Comentarios id ={id} />
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white"
    },
    titulo: {
        fontWeight: "bold",
        marginBottom: 10
    },
    comentario: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6
    },
    owner: {
        fontWeight: "bold"
    }
});

export default ComentarPosteo

