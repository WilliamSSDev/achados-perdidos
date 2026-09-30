import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const MailIcon = ({ size = 18, color = '#2A63E5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3.75 6.75C3.75 5.64543 4.64543 4.75 5.75 4.75H18.25C19.3546 4.75 20.25 5.64543 20.25 6.75V17.25C20.25 18.3546 19.3546 19.25 18.25 19.25H5.75C4.64543 19.25 3.75 18.3546 3.75 17.25V6.75Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.5 6.5L12 12.75L19.5 6.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockIcon = ({ size = 18, color = '#2A63E5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.5 10.5V8.25C7.5 6.17893 9.17893 4.5 11.25 4.5H12.75C14.8211 4.5 16.5 6.17893 16.5 8.25V10.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.75 10.5H17.25C18.0784 10.5 18.75 11.1716 18.75 12V17.25C18.75 18.0784 18.0784 18.75 17.25 18.75H6.75C5.92157 18.75 5.25 18.0784 5.25 17.25V12C5.25 11.1716 5.92157 10.5 6.75 10.5Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 14.25V16.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Svg>
);

const LocationIcon = ({ size = 42, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 32" fill="none">
    <Path
      d="M12 15C10.343 15 9 13.657 9 12C9 10.343 10.343 9 12 9C13.657 9 15 10.343 15 12C15 13.657 13.657 15 12 15ZM12 7C9.239 7 7 9.238 7 12C7 14.762 9.239 17 12 17C14.761 17 17 14.762 17 12C17 9.238 14.761 7 12 7ZM12 29C10.337 29.009 2 16.181 2 12C2 6.478 6.477 2 12 2C17.523 2 22 6.478 22 12C22 16.125 13.637 29.009 12 29ZM12 0C5.373 0 0 5.373 0 12C0 17.018 10.005 32.011 12 32C13.964 32.011 24 16.95 24 12C24 5.373 18.627 0 12 0Z"
      fill={color}
    />
  </Svg>
);

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.phoneFrame}>
        <View style={styles.headerSection}>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>9:41</Text>
            <View style={styles.statusIcons}>
              <View style={styles.statusDot} />
              <View style={styles.statusDot} />
              <View style={styles.statusDot} />
            </View>
          </View>

          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <LocationIcon />
            </View>
          </View>

          <Text style={styles.appName}>Achados & Perdidos</Text>
          <Text style={styles.subtitle}>Conectando pessoas a seus pertences</Text>
        </View>

        <View style={styles.bodySection}>
          <Text style={styles.welcomeTitle}>Bem-vindo de volta</Text>
          <Text style={styles.welcomeSubtitle}>Faça login para continuar</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputWrap}>
              <View style={styles.inputIconWrap}>
                <MailIcon size={18} color="#B3B9C3" />
              </View>
              <TextInput
                placeholder="seu@email.com"
                placeholderTextColor="#909DB7"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrap}>
              <View style={styles.inputIconWrap}>
                <LockIcon size={18} color="#B3B9C3" />
              </View>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#909DB7"
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>

          <Text style={styles.forgotPassword}>Esqueci a senha?</Text>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </Pressable>

          <Text style={styles.signupText}>
            Não tem uma conta? <Text style={styles.signupLink}>Criar conta</Text>
          </Text>

          <View style={styles.dotsRow}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020918',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: 390,
    maxWidth: '95%',
    height: 844,
    maxHeight: '95%',
    backgroundColor: '#F4F7FB',
    borderRadius: 38,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.28,
    shadowRadius: 20,
    elevation: 10,
  },
  headerSection: {
    backgroundColor: '#2150CA',
    paddingTop: 18,
    paddingBottom: 28,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  timeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  timeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 0.5,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
  },
  logoWrap: {
    width: 104,
    height: 104,
    borderRadius: 26,
    backgroundColor: '#2253CF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#4E77DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPin: {
    fontSize: 28,
    fontFamily: 'Nunito, sans-serif',
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 34,
    fontFamily: 'Nunito, sans-serif',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#D7E8FF',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
  },
  bodySection: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    paddingTop: 26,
    paddingHorizontal: 24,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B2A41',
    marginBottom: 6,
    fontFamily: 'Nunito, sans-serif',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6A7A93',
    marginBottom: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    color: '#1D2B42',
    fontWeight: '700',
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D6DDEA',
  },
  inputIconWrap: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 54,
    color: '#1D2B42',
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 6,
    marginBottom: 18,
    color: '#1D63F0',
    fontWeight: '700',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#0E5DE5',
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0E5DE5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  signupText: {
    marginTop: 22,
    textAlign: 'center',
    color: '#54657F',
    fontSize: 16,
  },
  signupLink: {
    color: '#0E5DE5',
    fontWeight: '800',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    gap: 8,
  },
  dotActive: {
    width: 26,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#0E5DE5',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B8C5D9',
  },
});
