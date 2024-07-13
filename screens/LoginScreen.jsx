import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../redux/slicers/authSlice';
import {jwtDecode} from 'jwt-decode';


const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Attempting login with username:', username);
    dispatch(loginThunk({ username, password }));

    setTimeout(() => {
      const tokenForDecode = sessionStorage.getItem('accessToken');
      if (tokenForDecode) {
        const decodedToken = jwtDecode(tokenForDecode);
        console.log('Decoded Token:', decodedToken);
        
        // Extract specific data
        const userNickname = decodedToken.user_nickname;
        console.log('User Nickname saved to sessionStorage:', userNickname);
        sessionStorage.setItem('userNickname', userNickname);

      } else {
        console.error('No token found in sessionStorage');
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error.message}</Text>}
      <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>  
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});



