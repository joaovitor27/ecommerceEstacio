import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routers/types-router.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {login} from '../../services/firebase/Auth.tsx';

interface LoginProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

export default function Login({navigation}: LoginProps) {
  const [email, setEmail] = React.useState('joao@gmail.com');
  const [password, setPassword] = React.useState('12345678');
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(text.includes('@') ? '' : 'Por favor, insira um email válido.');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(text ? '' : 'Por favor, insira sua senha.');
    setPasswordError(text.length < 6 ? 'A senha deve ter no mínimo 6 caracteres.' : '')
  };

  const handleLogin = () => {
    setEmailError(email.includes('@') ? '' : 'Por favor, insira um email válido.');
    setPasswordError(password ? '' : 'Por favor, insira sua senha.');

    if (!email.includes('@') || !password) {
      return;
    }

    login(email, password).then(() => {
      navigation.navigate('Tab');
    }).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        setEmailError('Usuário não encontrado.');
      }
      if (error.code === 'auth/wrong-password') {
        setPasswordError('Senha incorreta.');
      }

      if (error.code === 'auth/invalid-email') {
        setEmailError('Email inválido.');
      }

      if (error.code === 'auth/too-many-requests') {
        setEmailError('Muitas tentativas. Tente novamente mais tarde.');
      }

      if (error.code === 'auth/user-disabled') {
        setEmailError('Usuário desabilitado.');
      }

      if (error.code === 'auth/invalid-credential') {
        setEmailError('Credenciais inválidas.');
        setPasswordError('Credenciais inválidas.');
      }

      console.error(error);
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça Login</Text>
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.passwordInput, passwordError ? styles.inputError : null]}
          placeholder="Senha"
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} style={[passwordError ? styles.iconError : styles.icon]}/>
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={[styles.errorMessage, styles.errorAlignment]}>{passwordError}</Text> : null}
      <TouchableOpacity style={passwordError || emailError ? styles.buttonDisable : styles.button} onPress={handleLogin} disabled={!!(passwordError || emailError) }>
        <Text style={styles.buttonText}>Login</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#727373',
    marginBottom: 1,
    marginTop: 10,
    width: '80%',
    height: 50,
    color: '#696969',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#727373',
    color: '#696969',
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
  buttonDisable: {
    backgroundColor: '#ccc',
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
  icon: {
    color: '#008080',
  },
    iconError: {
    color: 'red',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
  errorAlignment: {
    marginLeft: 10,
  },
});
