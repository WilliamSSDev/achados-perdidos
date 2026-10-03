import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const quickMessages = ['Olá! Vi seu anúncio e acho que é meu item.', 'Podemos combinar um local para entrega?', 'Tenho mais informações sobre o item.'];

export default function ContactScreen({ item, onBack }) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const sendMessage = () => {
    if (message.trim()) setSent(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.phoneFrame}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.heading}><Pressable onPress={onBack}><Text style={styles.backText}>‹</Text></Pressable><View><Text style={styles.title}>Entrar em contato</Text><Text style={styles.subtitle}>Envie uma mensagem ao anunciante</Text></View></View>
          <View style={styles.personCard}><View style={styles.avatar}><Text style={styles.avatarText}>AS</Text></View><View><Text style={styles.personName}>Ana Beatriz Silva</Text><Text style={styles.personRole}>Anunciante do item</Text><Text style={styles.online}>● Online agora</Text></View></View>
          <View style={styles.itemCard}><Text style={styles.caption}>Sobre o item</Text><Text style={styles.itemTitle}>{item?.title || 'Item anunciado'}</Text></View>
          <Text style={styles.sectionTitle}>Mensagens rápidas</Text>
          {quickMessages.map((quickMessage) => <Pressable key={quickMessage} style={styles.quickMessage} onPress={() => { setMessage(quickMessage); setSent(false); }}><Text style={styles.quickText}>{quickMessage}</Text></Pressable>)}
          <Text style={styles.sectionTitle}>Sua mensagem</Text>
          <TextInput value={message} onChangeText={(value) => { setMessage(value); setSent(false); }} placeholder="Digite sua mensagem..." placeholderTextColor="#8B97AA" multiline style={styles.messageInput} />
          {sent && <Text style={styles.success}>Mensagem preparada. O envio real precisa de um endpoint de mensagens no backend.</Text>}
          <Pressable style={[styles.primaryButton, !message.trim() && styles.disabled]} onPress={sendMessage} disabled={!message.trim()}><Text style={styles.primaryButtonText}>Enviar mensagem</Text></Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#020918', alignItems: 'center', justifyContent: 'center' },
  phoneFrame: { width: 390, maxWidth: '95%', height: 844, maxHeight: '95%', backgroundColor: '#F0F4FF', borderRadius: 38, overflow: 'hidden' },
  content: { padding: 20, paddingTop: 42, paddingBottom: 32 },
  heading: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24 },
  backText: { color: '#0E5DE5', fontSize: 30, lineHeight: 30, marginRight: 22 },
  title: { color: '#07152D', fontSize: 20, fontWeight: '800' },
  subtitle: { color: '#6A7A93', fontSize: 13, marginTop: 3 },
  personCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#F2B6B3', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  avatarText: { color: '#8E3543', fontWeight: '800' },
  personName: { color: '#07152D', fontSize: 16, fontWeight: '800' },
  personRole: { color: '#6A7A93', marginTop: 4 },
  online: { color: '#20B866', fontSize: 12, marginTop: 5 },
  itemCard: { borderWidth: 1, borderColor: '#D4E2FF', borderRadius: 20, padding: 18, marginBottom: 22 },
  caption: { color: '#8B97AA', fontSize: 12 },
  itemTitle: { color: '#07152D', fontSize: 15, fontWeight: '700', marginTop: 4 },
  sectionTitle: { color: '#07152D', fontSize: 14, marginBottom: 12, marginTop: 2 },
  quickMessage: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D4E2FF', borderRadius: 15, padding: 13, marginBottom: 8 },
  quickText: { color: '#41516D', fontSize: 14 },
  messageInput: { minHeight: 120, backgroundColor: '#F8FBFF', borderWidth: 1, borderColor: '#D4E2FF', borderRadius: 15, padding: 15, color: '#07152D', fontSize: 14, textAlignVertical: 'top', marginBottom: 14 },
  success: { color: '#16834A', fontSize: 12, lineHeight: 17, marginBottom: 12 },
  primaryButton: { height: 54, borderRadius: 16, backgroundColor: '#0E5DE5', alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.5 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
