import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import {registerUser} from '../../services/firebase/Auth.tsx';

interface SignupProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Signup({navigation}: SignupProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(text.length < 6 ? 'A senha deve ter no mínimo 6 caracteres.' : '');
    setConfirmPasswordError(confirmPassword !== text ? 'As senhas não coincidem.' : '');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(password !== text ? 'As senhas não coincidem.' : '');
  };

  const handleSignup = () => {
    if (password.length < 6 || password !== confirmPassword) {
      return;
    }

    registerUser(email, password).then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.log('Erro ao cadastrar usuário:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre-se</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={handleNameChange}
        value={name}
        placeholderTextColor="#727373"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        placeholderTextColor="#727373"
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, passwordError ? styles.inputError : null]}
        placeholder="Senha"
        onChangeText={handlePasswordChange}
        value={password}
        placeholderTextColor="#727373"
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
      <TextInput
        style={[styles.input, confirmPasswordError ? styles.inputError : null]}
        placeholder="Confirmar Senha"
        onChangeText={handleConfirmPasswordChange}
        value={confirmPassword}
        placeholderTextColor="#727373"
        secureTextEntry
      />
      {confirmPasswordError ? <Text style={styles.errorMessage}>{confirmPasswordError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={!!(passwordError || confirmPasswordError)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#008080',
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#727373',
    marginBottom: 10,
    width: '80%',
    height: 50,
  },
  button: {
    backgroundColor: '#008080',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    width: '80%',
    textAlign: 'left',
  },
  inputError: {
    borderColor: 'red',
  },
});
