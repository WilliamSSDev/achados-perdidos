import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ItemDetailScreen({ item, onBack, onContact }) {
  if (!item) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.phoneFrame}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable style={styles.backButton} onPress={onBack}><Text style={styles.backText}>‹</Text></Pressable>
          {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.heroImage} resizeMode="cover" /> : <View style={[styles.heroImage, styles.imageFallback]}><Text style={styles.fallbackText}>Sem foto</Text></View>}
          <Text style={styles.status}>{item.status || 'Encontrado'}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.infoRow}><View style={styles.infoCard}><Text style={styles.caption}>Categoria</Text><Text style={styles.value}>{item.category || 'Não informada'}</Text></View><View style={styles.infoCard}><Text style={styles.caption}>Data</Text><Text style={styles.value}>{item.registeredAt ? new Date(item.registeredAt).toLocaleDateString('pt-BR') : 'Não informada'}</Text></View></View>
          <View style={styles.infoCard}><Text style={styles.caption}>Local</Text><Text style={styles.value}>{item.location || 'Não informado'}</Text></View>
          <View style={styles.description}><Text style={styles.sectionTitle}>Descrição</Text><Text style={styles.descriptionText}>{item.description || 'Sem descrição disponível.'}</Text></View>
          <Pressable style={styles.primaryButton} onPress={onContact}><Text style={styles.primaryButtonText}>Entrar em contato</Text></Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#020918', alignItems: 'center', justifyContent: 'center' },
  phoneFrame: { width: 390, maxWidth: '95%', height: 844, maxHeight: '95%', backgroundColor: '#F0F4FF', borderRadius: 38, overflow: 'hidden' },
  content: { padding: 20, paddingTop: 42, paddingBottom: 32 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  backText: { color: '#0E5DE5', fontSize: 30, lineHeight: 32 },
  heroImage: { width: '100%', height: 220, borderRadius: 20, backgroundColor: '#DCE5F7' },
  imageFallback: { alignItems: 'center', justifyContent: 'center' },
  fallbackText: { color: '#70809B' },
  status: { alignSelf: 'flex-start', marginTop: -16, marginLeft: 12, paddingHorizontal: 11, paddingVertical: 5, borderRadius: 14, backgroundColor: '#D1F7DF', color: '#07864E', fontSize: 12, fontWeight: '700' },
  title: { color: '#07152D', fontSize: 24, fontWeight: '800', marginTop: 18, marginBottom: 16 },
  infoRow: { flexDirection: 'row', gap: 12 },
  infoCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 15, marginBottom: 14 },
  caption: { color: '#8B97AA', fontSize: 12, marginBottom: 4 },
  value: { color: '#07152D', fontSize: 14 },
  description: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 20 },
  sectionTitle: { color: '#07152D', fontSize: 14, fontWeight: '700', marginBottom: 10 },
  descriptionText: { color: '#41516D', fontSize: 15, lineHeight: 23 },
  primaryButton: { height: 54, borderRadius: 16, backgroundColor: '#0E5DE5', alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
