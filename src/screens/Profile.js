import { Text } from "react-native";
import { View, Pressable } from "react-native-web";

function Profile(props) {
    return (
        <View>
            
            <Pressable
                onPress={() => props.navigation.navigate('Login')}>
                <Text>Desloguearse </Text>
            </Pressable>
        </View>
    )
}

export default Profile