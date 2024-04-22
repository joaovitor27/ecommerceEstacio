"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Auth_tsx_1 = require("../../services/firebase/Auth.tsx");
function Signup(_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState(''), name = _b[0], setName = _b[1];
    var _c = react_1.default.useState(''), email = _c[0], setEmail = _c[1];
    var _d = react_1.default.useState(''), password = _d[0], setPassword = _d[1];
    var _e = react_1.default.useState(''), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = react_1.default.useState(''), passwordError = _f[0], setPasswordError = _f[1];
    var _g = react_1.default.useState(''), confirmPasswordError = _g[0], setConfirmPasswordError = _g[1];
    var handleNameChange = function (text) {
        setName(text);
    };
    var handleEmailChange = function (text) {
        setEmail(text);
    };
    var handlePasswordChange = function (text) {
        setPassword(text);
        setPasswordError(text.length < 6 ? 'A senha deve ter no mínimo 6 caracteres.' : '');
        setConfirmPasswordError(confirmPassword !== text ? 'As senhas não coincidem.' : '');
    };
    var handleConfirmPasswordChange = function (text) {
        setConfirmPassword(text);
        setConfirmPasswordError(password !== text ? 'As senhas não coincidem.' : '');
    };
    var handleSignup = function () {
        if (password.length < 6 || password !== confirmPassword) {
            return;
        }
        (0, Auth_tsx_1.registerUser)(email, password).then(function () {
            navigation.navigate('Login');
        }).catch(function (error) {
            console.log('Erro ao cadastrar usuário:', error);
        });
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Cadastre-se</react_native_1.Text>
      <react_native_1.TextInput style={styles.input} placeholder="Nome" onChangeText={handleNameChange} value={name} placeholderTextColor="#727373"/>
      <react_native_1.TextInput style={styles.input} placeholder="Email" onChangeText={handleEmailChange} value={email} placeholderTextColor="#727373" keyboardType="email-address"/>
      <react_native_1.TextInput style={[styles.input, passwordError ? styles.inputError : null]} placeholder="Senha" onChangeText={handlePasswordChange} value={password} placeholderTextColor="#727373" secureTextEntry/>
      {passwordError ? <react_native_1.Text style={styles.errorMessage}>{passwordError}</react_native_1.Text> : null}
      <react_native_1.TextInput style={[styles.input, confirmPasswordError ? styles.inputError : null]} placeholder="Confirmar Senha" onChangeText={handleConfirmPasswordChange} value={confirmPassword} placeholderTextColor="#727373" secureTextEntry/>
      {confirmPasswordError ? <react_native_1.Text style={styles.errorMessage}>{confirmPasswordError}</react_native_1.Text> : null}
      <react_native_1.TouchableOpacity style={styles.button} onPress={handleSignup} disabled={!!(passwordError || confirmPasswordError)}>
        <react_native_1.Text style={styles.buttonText}>Cadastrar</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
}
exports.default = Signup;
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
