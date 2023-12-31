import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { database} from './Firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function App() {
  const apiKey = "AIzaSyC2RCOa6PiG990HjVY_BHr9ftPErtERWRw";
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  const signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const [enteredEmail, setEnteredEmail] = useState("test@m.dk");
  const [enteredPassword, setEnteredPassword] = useState("123456");
  const [userId, setUserId] = useState("");
  const [enteredText, setEnteredText] = useState("Type here");


  async function addDocument(){
    try{
      await addDoc(collection(database, userId),{
        text: enteredText
      }) 
    }catch(error){
      console.log("Error at addDocument " + error);
    }
  }
  
  
  async function login(){
    try{
      const response = await axios.post(url + apiKey, {
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true
      })
      console.log("Logged in " + response.data.localId)
      setUserId(response.data.localId)

    }catch(error){
      console.log("Not logged in " + error.response.data.error.errors[0].message)
    }
  }

  async function signUp(){
    try{
      const response = await axios.post(signUpUrl + apiKey, {
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true
      })
      alert("Signed up " + response.data.idToken)

    }catch(error){
      alert("Failed to signup " + error.response.data.error.errors[0].message)
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

      <TextInput 
        onChangeText={newText => setEnteredEmail(newText)}
        value={enteredEmail}
      />

      <TextInput 
        onChangeText={newText => setEnteredPassword(newText)}
        value={enteredPassword}
      />
      <Button
      title='Sign up'
      onPress={signUp}
      />


      <TextInput 
        onChangeText={newText => setEnteredText(newText)}
        value={enteredText}
      />
      <Button
      title='Add new document'
      onPress={addDocument}
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
