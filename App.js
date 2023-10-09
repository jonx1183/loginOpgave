import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const apiKey = "AIzaSyC2RCOa6PiG990HjVY_BHr9ftPErtERWRw";
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  const [enteredEmail, setEnteredEmail] = useState("test@m.dk");
  const [enteredPassword, setEnteredPassword] = useState("123456");


  async function login(){
    try{
      const response = await axios.post(url + apiKey, {
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true
      })
      alert("Logged in " + response.data.idToken)

    }catch(error){
      alert("Not logged in " + error.response.data.error.errors[0].message)
    }
  }


  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput 
        onChangeText={newText => setEnteredEmail(newText)}
        value={enteredEmail}
      />

      <TextInput 
        onChangeText={newText => setEnteredPassword(newText)}
        value={enteredPassword}
      />
      <Button
      title='Log in'
      onPress={login}
      />
      
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
