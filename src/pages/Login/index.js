"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var Auth_tsx_1 = require("../../services/firebase/Auth.tsx");
function Login(_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState(''), email = _b[0], setEmail = _b[1];
    var _c = react_1.default.useState(''), password = _c[0], setPassword = _c[1];
    var _d = react_1.default.useState(false), showPassword = _d[0], setShowPassword = _d[1];
    var _e = react_1.default.useState(''), emailError = _e[0], setEmailError = _e[1];
    var _f = react_1.default.useState(''), passwordError = _f[0], setPasswordError = _f[1];
    if ((0, Auth_tsx_1.getCurrentUser)()) {
        navigation.navigate('Tab');
    }
    var handleEmailChange = function (text) {
        setEmail(text);
        setEmailError(text.includes('@') ? '' : 'Por favor, insira um email válido.');
    };
    var handlePasswordChange = function (text) {
        setPassword(text);
        setPasswordError(text ? '' : 'Por favor, insira sua senha.');
        setPasswordError(text.length < 6 ? 'A senha deve ter no mínimo 6 caracteres.' : '');
    };
    var handleLogin = function () {
        setEmailError(email.includes('@') ? '' : 'Por favor, insira um email válido.');
        setPasswordError(password ? '' : 'Por favor, insira sua senha.');
        if (!email.includes('@') || !password) {
            return;
        }
        (0, Auth_tsx_1.login)(email, password).then(function () {
            navigation.navigate('Tab');
        }).catch(function (error) {
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
        });
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Faça Login</react_native_1.Text>
      <react_native_1.TextInput aria-label="Email" style={[styles.input, emailError ? styles.inputError : null]} placeholder="Email" placeholderTextColor={'#727373'} onChangeText={handleEmailChange} value={email} keyboardType="email-address"/>
      {emailError ? <react_native_1.Text style={styles.errorMessage}>{emailError}</react_native_1.Text> : null}
      <react_native_1.View style={styles.inputContainer}>
        <react_native_1.TextInput style={[styles.passwordInput, passwordError ? styles.inputError : null]} placeholder="Senha" placeholderTextColor={'#727373'} onChangeText={handlePasswordChange} value={password} secureTextEntry={!showPassword}/>
        <react_native_1.TouchableOpacity onPress={function () { return setShowPassword(!showPassword); }} style={styles.eyeIcon}>
          <FontAwesome_1.default name={showPassword ? 'eye-slash' : 'eye'} size={20} style={[passwordError ? styles.iconError : styles.icon]}/>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
      {passwordError ? <react_native_1.Text style={[styles.errorMessage, styles.errorAlignment]}>{passwordError}</react_native_1.Text> : null}
      <react_native_1.TouchableOpacity style={passwordError || emailError ? styles.buttonDisable : styles.button} onPress={handleLogin} disabled={!!(passwordError || emailError)}>
        <react_native_1.Text style={styles.buttonText}>Login</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
}
exports.default = Login;
var styles = react_native_1.StyleSheet.create({
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
        color: '#000000',
    },
    passwordInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#727373',
        color: '#000000',
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
        transform: [{ translateY: -10 }],
    },
    errorAlignment: {
        marginLeft: 10,
    },
});
