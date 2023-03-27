import React from "react";
import {Text, View, Button} from 'react-native';

//navigation passed through props

const HomeScreen = ({navigation}) =>{
    return(
        <View>
            <Text>Hello How are you</Text>
            <Button title='Go to user login' onPress={() => navigation.navigate('UserLogin')}/>
        </View>
    )
}


export default HomeScreen;