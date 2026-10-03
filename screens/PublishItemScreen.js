import { useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createItem } from '../services/itemService';

const categories = ['ELECTRONICS', 'DOCUMENTS', 'ACCESSORIES', 'BAGS', 'CLOTHES', 'ANIMALS', 'KEYS', 'OTHER'];

export default function PublishItemScreen({ token, userId, localId, onBack, onCreated }) {
  const [status, setStatus] = useState('LOST');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('ELECTRONICS');
  const [location, setLocation] = useState('');
  const [registeredAt, setRegisteredAt] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!title.trim() || !location.trim() || !description.trim()) {
      setError('Preencha nome, local e descrição.');
      return;
    }
    if (!token || !userId || !localId) {
      setError('Usuário ou local não identificado para este cadastro.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const item = await createItem(token, { title: title.trim(), description: description.trim(), category, status, registeredAt: registeredAt.trim() || null, location: location.trim(), imageUrl: null, userId, localId });
      onCreated?.(item);
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível publicar o item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.phoneFrame}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.heading}><Pressable onPress={onBack}><Text style={styles.backText}>‹</Text></Pressable><View><Text style={styles.title}>Publicar item</Text><Text style={styles.subtitle}>Preencha as informações do item</Text></View></View>
          <View style={styles.segmented}><Pressable style={[styles.segment, status === 'LOST' && styles.segmentActive]} onPress={() => setStatus('LOST')}><Text style={styles.segmentText}>😢 Perdi algo</Text></Pressable><Pressable style={[styles.segment, status === 'FOUND' && styles.segmentActive]} onPress={() => setStatus('FOUND')}><Text style={styles.segmentText}>🎉 Encontrei algo</Text></Pressable></View>
          <Text style={styles.label}>Nome do item</Text><TextInput value={title} onChangeText={setTitle} placeholder="Ex: Carteira marrom de couro" placeholderTextColor="#8B97AA" style={styles.input} />
          <Text style={styles.label}>Categoria</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>{categories.map((value) => <Pressable key={value} style={[styles.category, category === value && styles.categoryActive]} onPress={() => setCategory(value)}><Text style={[styles.categoryText, category === value && styles.categoryTextActive]}>{value}</Text></Pressable>)}</ScrollView>
          <Text style={styles.label}>Local</Text><TextInput value={location} onChangeText={setLocation} placeholder="Ex: Shopping Ibirapuera, SP" placeholderTextColor="#8B97AA" style={styles.input} />
          <Text style={styles.label}>Data</Text><TextInput value={registeredAt} onChangeText={setRegisteredAt} placeholder="AAAA-MM-DDTHH:mm:ss" placeholderTextColor="#8B97AA" style={styles.input} />
          <Text style={styles.label}>Descrição</Text><TextInput value={description} onChangeText={setDescription} placeholder="Descreva o item..." placeholderTextColor="#8B97AA" multiline style={[styles.input, styles.description]} />
          {error && <Text style={styles.error}>{error}</Text>}
          <Pressable style={[styles.primaryButton, isSubmitting && styles.disabled]} onPress={submit} disabled={isSubmitting}>{isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.primaryButtonText}>Publicar item</Text>}</Pressable>
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
  segmented: { flexDirection: 'row', gap: 10, marginBottom: 22 },
  segment: { flex: 1, height: 46, borderRadius: 16, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  segmentActive: { backgroundColor: '#FFF0BD', borderWidth: 2, borderColor: '#FFCA28' },
  segmentText: { color: '#8B5B00', fontSize: 13 },
  label: { color: '#07152D', fontSize: 14, marginBottom: 8, marginTop: 6 },
  input: { height: 50, backgroundColor: '#F8FBFF', borderWidth: 1, borderColor: '#D4E2FF', borderRadius: 14, paddingHorizontal: 14, color: '#07152D', fontSize: 14, marginBottom: 12 },
  categoryRow: { gap: 8, paddingBottom: 8 },
  category: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 18, backgroundColor: '#FFFFFF' },
  categoryActive: { backgroundColor: '#2868F0' },
  categoryText: { color: '#2868F0', fontSize: 11 },
  categoryTextActive: { color: '#FFFFFF', fontWeight: '700' },
  description: { height: 110, textAlignVertical: 'top', paddingTop: 14 },
  error: { color: '#C43D3D', fontSize: 13, lineHeight: 18, marginBottom: 12 },
  primaryButton: { height: 54, borderRadius: 16, backgroundColor: '#0E5DE5', alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.7 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
