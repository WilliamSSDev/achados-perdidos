import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { registerUser } from '../services/authService';

const MailIcon = ({ size = 18, color = '#B3B9C3' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3.75 6.75C3.75 5.645 4.645 4.75 5.75 4.75H18.25C19.355 4.75 20.25 5.645 20.25 6.75V17.25C20.25 18.355 19.355 19.25 18.25 19.25H5.75C4.645 19.25 3.75 18.355 3.75 17.25V6.75Z" stroke={color} strokeWidth="1.8" />
    <Path d="M4.5 6.5L12 12.75L19.5 6.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const UserIcon = ({ size = 18, color = '#B3B9C3' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 12C14.209 12 16 10.209 16 8C16 5.791 14.209 4 12 4C9.791 4 8 5.791 8 8C8 10.209 9.791 12 12 12Z" stroke={color} strokeWidth="1.8" />
    <Path d="M4.5 20C5.277 16.637 7.827 14.5 12 14.5C16.173 14.5 18.723 16.637 19.5 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const LockIcon = ({ size = 18, color = '#B3B9C3' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7.5 10.5V8.25C7.5 6.179 9.179 4.5 11.25 4.5H12.75C14.821 4.5 16.5 6.179 16.5 8.25V10.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M6.75 10.5H17.25C18.078 10.5 18.75 11.172 18.75 12V17.25C18.75 18.078 18.078 18.75 17.25 18.75H6.75C5.922 18.75 5.25 18.078 5.25 17.25V12C5.25 11.172 5.922 10.5 6.75 10.5Z" stroke={color} strokeWidth="1.8" />
  </Svg>
);

const PhoneIcon = ({ size = 18, color = '#B3B9C3' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6.5 4.75L9 4L10.5 8L8.25 9.5C9.213 11.632 10.868 13.287 13 14.25L14.5 12L18.5 13.5L17.75 16C17.5 16.833 16.75 17.5 15.75 17.5C9.675 17.5 5.5 13.325 5.5 7.25C5.5 6.25 6.167 5.5 6.5 4.75Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CityIcon = ({ size = 18, color = '#B3B9C3' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 10C20 15.5 12 21 12 21S4 15.5 4 10C4 5.582 7.582 2 12 2C16.418 2 20 5.582 20 10Z" stroke={color} strokeWidth="1.8" />
    <Path d="M12 12.5C13.381 12.5 14.5 11.381 14.5 10C14.5 8.619 13.381 7.5 12 7.5C10.619 7.5 9.5 8.619 9.5 10C9.5 11.381 10.619 12.5 12 12.5Z" stroke={color} strokeWidth="1.8" />
  </Svg>
);

export default function RegisterScreen({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', phoneString: '', city: '', password: '', confirmPassword: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('error');

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const showError = (message) => {
    setStatusType('error');
    setStatusMessage(message);
  };

  const handleRegister = async () => {
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phoneString = form.phoneString.trim();
    const city = form.city.trim();

    if (!name || !email || !phoneString || !city || !form.password || !form.confirmPassword) return showError('Preencha todos os campos.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return showError('Digite um e-mail válido.');
    if (form.password.length < 8) return showError('A senha deve ter pelo menos 8 caracteres.');
    if (form.password !== form.confirmPassword) return showError('As senhas não conferem.');
    if (!acceptedTerms) return showError('Aceite os Termos de Uso e a Política de Privacidade.');

    setIsSubmitting(true);
    setStatusMessage('');
    try {
        await registerUser({
            email,
            name,
            password: form.password,
            phoneString,
            role: 'USER',
            city
        });

        Alert.alert(
            'Conta criada',
            'Seu cadastro foi realizado com sucesso.',
            [
            {
                text: 'OK',
                onPress: () => onLogin(),
            },
            ]
        );

        onLogin();

        } catch (error) {
        showError(error.message || 'Tente novamente mais tarde.');
        } finally {
        setIsSubmitting(false);
        }
  };

  const renderInput = ({ field, label, placeholder, icon, ...inputProps }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrap, focusedField === field && styles.inputWrapFocused]}>
        <View style={styles.inputIconWrap}>{icon}</View>
        <TextInput
          value={form[field]}
          onChangeText={(value) => updateField(field, value)}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          placeholderTextColor="#909DB7"
          style={[styles.input, styles.inputWebReset]}
          {...inputProps}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.phoneFrame}>
        <KeyboardAvoidingView style={styles.registerScreen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.topBar}>
              <Pressable onPress={onLogin} accessibilityRole="button"><Text style={styles.backArrow}>‹</Text></Pressable>
              <View><Text style={styles.pageTitle}>Criar conta</Text><Text style={styles.pageSubtitle}>Preencha seus dados para começar</Text></View>
            </View>
            {renderInput({ field: 'name', label: 'Nome completo', placeholder: 'Maria Silva', icon: <UserIcon />, autoCapitalize: 'words' })}
            {renderInput({ field: 'email', label: 'E-mail', placeholder: 'maria@email.com', icon: <MailIcon />, keyboardType: 'email-address', autoCapitalize: 'none', autoCorrect: false })}
            {renderInput({ field: 'phoneString', label: 'Telefone', placeholder: '(11) 99999-9999', icon: <PhoneIcon />, keyboardType: 'phone-pad' })}
            {renderInput({ field: 'city', label: 'Cidade', placeholder: 'São Paulo, SP', icon: <CityIcon />, autoCapitalize: 'words' })}
            {renderInput({ field: 'password', label: 'Senha', placeholder: 'Mínimo 8 caracteres', icon: <LockIcon />, secureTextEntry: true })}
            {renderInput({ field: 'confirmPassword', label: 'Confirmar senha', placeholder: 'Repita a senha', icon: <LockIcon />, secureTextEntry: true })}
            <Pressable style={styles.termsRow} onPress={() => setAcceptedTerms((current) => !current)} accessibilityRole="checkbox" accessibilityState={{ checked: acceptedTerms }}>
              <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>{acceptedTerms && <Text style={styles.checkboxMark}>✓</Text>}</View>
              <Text style={styles.termsText}>Concordo com os <Text style={styles.termsLink}>Termos de Uso</Text> e a <Text style={styles.termsLink}>Política de Privacidade</Text></Text>
            </Pressable>
            {statusMessage && <Text style={[styles.statusMessage, statusType === 'success' && styles.successMessage]}>{statusMessage}</Text>}
            <Pressable style={[styles.primaryButton, isSubmitting && styles.primaryButtonDisabled]} onPress={handleRegister} disabled={isSubmitting}>
              {isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Cadastrar</Text>}
            </Pressable>
            <Text style={styles.loginText}>Já tem uma conta? <Text style={styles.signupLink} onPress={onLogin}>Entrar</Text></Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#020918', alignItems: 'center', justifyContent: 'center' },
  phoneFrame: { width: 390, maxWidth: '95%', height: 844, maxHeight: '95%', backgroundColor: '#F4F7FB', borderRadius: 38, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.28, shadowRadius: 20, elevation: 10 },
  registerScreen: { flex: 1, backgroundColor: '#F0F4FF' },
  scrollContent: { paddingTop: 42, paddingHorizontal: 38, paddingBottom: 32 },
  topBar: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 26 },
  backArrow: { color: '#1D63F0', fontSize: 34, lineHeight: 30, marginRight: 22, marginTop: -3 },
  pageTitle: { color: '#0B1730', fontSize: 20, fontWeight: '700', lineHeight: 24 },
  pageSubtitle: { color: '#6A7A93', fontSize: 13, marginTop: 2 },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 15, color: '#1D2B42', fontWeight: '700', marginBottom: 8 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FBFF', borderRadius: 14, height: 54, paddingHorizontal: 14, borderWidth: 1, borderColor: '#D6DDEA' },
  inputWrapFocused: { borderColor: '#2A63E5', shadowColor: '#2A63E5', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.16, shadowRadius: 3, elevation: 1 },
  inputIconWrap: { marginRight: 10, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, height: 54, color: '#1D2B42', fontSize: 16 },
  inputWebReset: { outlineStyle: 'none' },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 4, marginBottom: 24 },
  checkbox: { width: 20, height: 20, borderRadius: 3, borderWidth: 1, borderColor: '#AAB7CC', alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 1 },
  checkboxChecked: { backgroundColor: '#2A63E5', borderColor: '#2A63E5' },
  checkboxMark: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', lineHeight: 17 },
  termsText: { flex: 1, color: '#6A7A93', fontSize: 12, lineHeight: 18 },
  termsLink: { color: '#2A63E5' },
  statusMessage: { color: '#C43D3D', fontSize: 13, lineHeight: 18, marginTop: -12, marginBottom: 14, textAlign: 'center' },
  successMessage: { color: '#16834A' },
  primaryButton: { backgroundColor: '#0E5DE5', height: 58, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#0E5DE5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 12, elevation: 5 },
  primaryButtonDisabled: { opacity: 0.7 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 18 },
  loginText: { color: '#6A7A93', fontSize: 15, textAlign: 'center', marginTop: 28 },
  signupLink: { color: '#0E5DE5', fontWeight: '800' },
});
