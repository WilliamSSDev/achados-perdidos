import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import Svg, {
  Circle,
  Path,
} from 'react-native-svg';

import { getItems } from '../services/itemService';


/* =========================================================
   ICONS
========================================================= */

const SearchIcon = ({
  size = 20,
  color = '#FFFFFF',
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Circle
      cx="11"
      cy="11"
      r="6.5"
      stroke={color}
      strokeWidth="1.8"
    />

    <Path
      d="M16 16L20 20"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Svg>
);


const LocationIcon = ({
  size = 14,
  color = '#A5ADBE',
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M20 10C20 15.5 12 21 12 21S4 15.5 4 10C4 5.582 7.582 2 12 2C16.418 2 20 5.582 20 10Z"
      stroke={color}
      strokeWidth="1.8"
    />

    <Circle
      cx="12"
      cy="10"
      r="2.5"
      stroke={color}
      strokeWidth="1.8"
    />
  </Svg>
);


const PlusIcon = ({
  size = 18,
  color = '#FFFFFF',
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Circle
      cx="12"
      cy="12"
      r="8"
      stroke={color}
      strokeWidth="1.8"
    />

    <Path
      d="M12 8V16M8 12H16"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Svg>
);


/* =========================================================
   HELPERS
========================================================= */

const normalizeStatus = (status) => {
  return String(status || '')
    .trim()
    .toUpperCase();
};


const isLostStatus = (status) => {
  const value = normalizeStatus(status);

  return (
    value === 'LOST' ||
    value === 'PERDIDO'
  );
};


const isFoundStatus = (status) => {
  const value = normalizeStatus(status);

  return (
    value === 'FOUND' ||
    value === 'ENCONTRADO'
  );
};


const isReturnedStatus = (status) => {
  const value = normalizeStatus(status);

  return (
    value === 'RETURNED' ||
    value === 'DEVOLVIDO'
  );
};


const getStatusLabel = (status) => {
  if (isLostStatus(status)) {
    return 'Perdido';
  }

  if (isFoundStatus(status)) {
    return 'Encontrado';
  }

  if (isReturnedStatus(status)) {
    return 'Devolvido';
  }

  return status || 'Desconhecido';
};


const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};


/* =========================================================
   ITEM CARD
========================================================= */

function ItemCard({
  item,
  onPress,
}) {
  const isLost = isLostStatus(item.status);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.itemCard,
        pressed && styles.itemCardPressed,
      ]}
      onPress={() => onPress?.(item)}
    >

      {item.imageUrl ? (
        <Image
          source={{
            uri: item.imageUrl,
          }}
          style={styles.itemImage}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.itemImage,
            styles.noImage,
          ]}
        >
          <Text style={styles.noImageText}>
            Sem foto
          </Text>
        </View>
      )}

      <View style={styles.itemInfo}>

        <View style={styles.itemTopRow}>

          <View
            style={[
              styles.statusBadge,
              isLost
                ? styles.lostBadge
                : styles.foundBadge,
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                isLost
                  ? styles.lostBadgeText
                  : styles.foundBadgeText,
              ]}
            >
              {getStatusLabel(item.status)}
            </Text>
          </View>

          <Text style={styles.itemDate}>
            {formatDate(item.registeredAt)}
          </Text>

        </View>

        <Text
          style={styles.itemTitle}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        {item.category ? (
          <Text
            style={styles.categoryText}
            numberOfLines={1}
          >
            {item.category}
          </Text>
        ) : null}

        <View style={styles.locationRow}>

          <LocationIcon />

          <Text
            style={styles.locationText}
            numberOfLines={1}
          >
            {item.location || 'Local não informado'}
          </Text>

        </View>

      </View>

    </Pressable>
  );
}


/* =========================================================
   SCREEN
========================================================= */

export default function LookupItemsScreen({
  token,
  onPublishItem,
  onItemPress,
}) {

  const [items, setItems] = useState([]);

  const [selectedFilter, setSelectedFilter] =
    useState('all');

  const [search, setSearch] =
    useState('');

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState('');


  /* =======================================================
     LOAD ITEMS FROM API
  ======================================================= */

  const loadItems = async () => {

    if (!token) {
      setErrorMessage(
        'Token de autenticação não encontrado.'
      );

      setIsLoading(false);

      return;
    }

    try {

      setIsLoading(true);
      setErrorMessage('');

      const data = await getItems(token);

      console.log(
        'Itens recebidos da API:',
        data
      );

      setItems(data);

    } catch (error) {

      console.error(
        'Erro ao buscar itens:',
        error
      );

      setErrorMessage(
        error.message ||
        'Não foi possível carregar os itens.'
      );

    } finally {

      setIsLoading(false);

    }
  };


  useEffect(() => {
    loadItems();
  }, [token]);


  /* =======================================================
     COUNTERS
  ======================================================= */

  const lostCount = useMemo(() => {
    return items.filter((item) =>
      isLostStatus(item.status)
    ).length;
  }, [items]);


  const foundCount = useMemo(() => {
    return items.filter((item) =>
      isFoundStatus(item.status)
    ).length;
  }, [items]);


  const returnedCount = useMemo(() => {
    return items.filter((item) =>
      isReturnedStatus(item.status)
    ).length;
  }, [items]);


  /* =======================================================
     FILTER + SEARCH
  ======================================================= */

  const filteredItems = useMemo(() => {

    const normalizedSearch =
      search.trim().toLowerCase();


    return items.filter((item) => {

      let matchesFilter = true;


      if (selectedFilter === 'lost') {
        matchesFilter =
          isLostStatus(item.status);
      }


      if (selectedFilter === 'found') {
        matchesFilter =
          isFoundStatus(item.status);
      }


      const title =
        item.title?.toLowerCase() || '';

      const description =
        item.description?.toLowerCase() || '';

      const category =
        item.category?.toLowerCase() || '';

      const location =
        item.location?.toLowerCase() || '';


      const matchesSearch =
        !normalizedSearch ||

        title.includes(normalizedSearch) ||

        description.includes(normalizedSearch) ||

        category.includes(normalizedSearch) ||

        location.includes(normalizedSearch);


      return (
        matchesFilter &&
        matchesSearch
      );

    });

  }, [
    items,
    selectedFilter,
    search,
  ]);


  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar style="light" />

      <View style={styles.phoneFrame}>

        <View style={styles.screen}>


          {/* ================= HEADER ================= */}

          <View style={styles.header}>

            <View style={styles.headerTop}>

              <View>

                <Text style={styles.greeting}>
                  Olá 👋
                </Text>

                <Text style={styles.headerTitle}>
                  Achados & Perdidos
                </Text>

              </View>

              <View
                style={styles.profileAvatar}
                accessible
                accessibilityLabel="Perfil de Maria Silva"
              >
                <Text style={styles.profileAvatarText}>
                  MS
                </Text>
              </View>

            </View>


            {/* SEARCH */}

            <View style={styles.searchBar}>

              <SearchIcon />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar itens perdidos ou encontrados..."
                placeholderTextColor="#D9E4FF"
                style={styles.searchInput}
              />

            </View>

          </View>


          {/* ================= CONTENT ================= */}

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >


            {/* FILTERS */}

            <View style={styles.filters}>

              <Pressable
                style={[
                  styles.filterButton,
                  selectedFilter === 'all' &&
                    styles.filterButtonActive,
                ]}
                onPress={() =>
                  setSelectedFilter('all')
                }
              >

                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === 'all' &&
                      styles.filterTextActive,
                  ]}
                >
                  Todos
                </Text>

              </Pressable>


              <Pressable
                style={[
                  styles.filterButton,
                  selectedFilter === 'lost' &&
                    styles.filterButtonActive,
                ]}
                onPress={() =>
                  setSelectedFilter('lost')
                }
              >

                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === 'lost' &&
                      styles.filterTextActive,
                  ]}
                >
                  Perdidos
                </Text>

              </Pressable>


              <Pressable
                style={[
                  styles.filterButton,
                  selectedFilter === 'found' &&
                    styles.filterButtonActive,
                ]}
                onPress={() =>
                  setSelectedFilter('found')
                }
              >

                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === 'found' &&
                      styles.filterTextActive,
                  ]}
                >
                  Encontrados
                </Text>

              </Pressable>

            </View>


            {/* ================= STATS ================= */}

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statsRow}
            >

              <View
                style={[
                  styles.statCard,
                  styles.lostCard,
                ]}
              >

                <Text style={styles.statEmoji}>
                  😢
                </Text>

                <View>

                  <Text
                    style={[
                      styles.statNumber,
                      styles.lostNumber,
                    ]}
                  >
                    {lostCount}
                  </Text>

                  <Text
                    style={[
                      styles.statLabel,
                      styles.lostLabel,
                    ]}
                  >
                    Perdidos
                  </Text>

                </View>

              </View>


              <View
                style={[
                  styles.statCard,
                  styles.foundCard,
                ]}
              >

                <Text style={styles.statEmoji}>
                  🎉
                </Text>

                <View>

                  <Text
                    style={[
                      styles.statNumber,
                      styles.foundNumber,
                    ]}
                  >
                    {foundCount}
                  </Text>

                  <Text
                    style={[
                      styles.statLabel,
                      styles.foundLabel,
                    ]}
                  >
                    Encontrados
                  </Text>

                </View>

              </View>


              <View
                style={[
                  styles.statCard,
                  styles.returnedCard,
                ]}
              >

                <Text style={styles.statEmoji}>
                  🤝
                </Text>

                <View>

                  <Text
                    style={[
                      styles.statNumber,
                      styles.returnedNumber,
                    ]}
                  >
                    {returnedCount}
                  </Text>

                  <Text
                    style={[
                      styles.statLabel,
                      styles.returnedLabel,
                    ]}
                  >
                    Devolvidos
                  </Text>

                </View>

              </View>

            </ScrollView>


            {/* ================= RECENT ITEMS ================= */}

            <Text style={styles.sectionTitle}>
              Anúncios recentes
            </Text>


            {isLoading ? (

              <View style={styles.loadingContainer}>

                <ActivityIndicator
                  size="large"
                  color="#2868F0"
                />

                <Text style={styles.loadingText}>
                  Carregando itens...
                </Text>

              </View>

            ) : errorMessage ? (

              <View style={styles.emptyState}>

                <Text style={styles.errorTitle}>
                  Erro ao carregar itens
                </Text>

                <Text style={styles.emptyStateText}>
                  {errorMessage}
                </Text>

                <Pressable
                  style={styles.retryButton}
                  onPress={loadItems}
                >

                  <Text style={styles.retryButtonText}>
                    Tentar novamente
                  </Text>

                </Pressable>

              </View>

            ) : filteredItems.length > 0 ? (

              filteredItems.map((item) => (

                <ItemCard
                  key={item.id}
                  item={item}
                  onPress={onItemPress}
                />

              ))

            ) : (

              <View style={styles.emptyState}>

                <Text style={styles.emptyStateTitle}>
                  Nenhum item encontrado
                </Text>

                <Text style={styles.emptyStateText}>
                  Tente buscar por outro nome ou localização.
                </Text>

              </View>

            )}


            <View style={styles.bottomSpacing} />

          </ScrollView>


          {/* ================= FLOATING BUTTON ================= */}

          <Pressable
            style={({ pressed }) => [
              styles.publishButton,
              pressed &&
                styles.publishButtonPressed,
            ]}
            onPress={onPublishItem}
          >

            <PlusIcon />

            <Text style={styles.publishButtonText}>
              Publicar item
            </Text>

          </Pressable>


        </View>

      </View>

    </SafeAreaView>
  );
}


/* =========================================================
   STYLES
========================================================= */

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
    backgroundColor: '#F0F4FF',
    borderRadius: 38,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.28,
    shadowRadius: 20,

    elevation: 10,
  },

  screen: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },


  /* HEADER */

  header: {
    backgroundColor: '#2857D6',
    paddingTop: 42,
    paddingHorizontal: 23,
    paddingBottom: 23,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#BBD1FF',
    borderWidth: 3,
    borderColor: '#DCE7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileAvatarText: {
    color: '#2857D6',
    fontSize: 12,
    fontWeight: '800',
  },

  greeting: {
    color: '#DDE7FF',
    fontSize: 14,
    fontWeight: '500',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '800',
  },


  /* SEARCH */

  searchBar: {
    height: 46,
    marginTop: 20,
    borderRadius: 16,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,

    backgroundColor:
      'rgba(255,255,255,0.12)',

    borderWidth: 1,
    borderColor:
      'rgba(255,255,255,0.30)',
  },

  searchInput: {
    flex: 1,
    height: 46,
    marginLeft: 11,

    color: '#FFFFFF',
    fontSize: 14,

    outlineStyle: 'none',
  },


  /* CONTENT */

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 23,
    paddingTop: 19,
  },


  /* FILTERS */

  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },

  filterButton: {
    height: 36,
    minWidth: 82,

    paddingHorizontal: 14,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },

  filterButtonActive: {
    backgroundColor: '#2868F0',
  },

  filterText: {
    color: '#1752D3',
    fontSize: 13,
    fontWeight: '500',
  },

  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },


  /* STATS */

  statsRow: {
    paddingTop: 1,
    paddingBottom: 17,
    gap: 9,
  },

  statCard: {
    width: 105,
    height: 66,

    borderRadius: 15,

    paddingHorizontal: 11,

    flexDirection: 'row',
    alignItems: 'center',
  },

  lostCard: {
    backgroundColor: '#FFF0BD',
  },

  foundCard: {
    backgroundColor: '#CEF4DD',
  },

  returnedCard: {
    backgroundColor: '#E7ECFF',
  },

  statEmoji: {
    fontSize: 20,
    marginRight: 9,
  },

  statNumber: {
    fontSize: 17,
    fontWeight: '800',
  },

  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },

  lostNumber: {
    color: '#A74413',
  },

  lostLabel: {
    color: '#B35D19',
  },

  foundNumber: {
    color: '#087548',
  },

  foundLabel: {
    color: '#168258',
  },

  returnedNumber: {
    color: '#1756D6',
  },

  returnedLabel: {
    color: '#275EDC',
  },


  /* SECTION */

  sectionTitle: {
    color: '#07152D',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 14,
  },


  /* ITEM CARD */

  itemCard: {
    minHeight: 107,

    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    marginBottom: 12,

    padding: 15,

    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#1D3158',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.025,
    shadowRadius: 8,

    elevation: 1,
  },

  itemCardPressed: {
    opacity: 0.85,
  },

  itemImage: {
    width: 77,
    height: 77,

    borderRadius: 15,

    backgroundColor: '#E6E9EF',
  },

  noImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  noImageText: {
    color: '#8995A8',
    fontSize: 10,
  },

  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },

  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 6,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 14,
  },

  lostBadge: {
    backgroundColor: '#FFF0BC',
  },

  foundBadge: {
    backgroundColor: '#D1F7DF',
  },

  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  lostBadgeText: {
    color: '#B95E00',
  },

  foundBadgeText: {
    color: '#07864E',
  },

  itemDate: {
    color: '#9CA6B9',
    fontSize: 11,
  },

  itemTitle: {
    color: '#07152D',
    fontSize: 14,
    fontWeight: '800',

    marginBottom: 2,
  },

  categoryText: {
    color: '#64748B',
    fontSize: 10,
    marginBottom: 4,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationText: {
    flex: 1,

    color: '#A0A9BA',
    fontSize: 11,

    marginLeft: 4,
  },


  /* LOADING */

  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#6A7A93',
    fontSize: 13,
  },


  /* EMPTY / ERROR */

  emptyState: {
    backgroundColor: '#FFFFFF',

    paddingVertical: 30,
    paddingHorizontal: 20,

    borderRadius: 20,

    alignItems: 'center',
  },

  emptyStateTitle: {
    color: '#14213A',
    fontSize: 15,
    fontWeight: '700',
  },

  errorTitle: {
    color: '#C43D3D',
    fontSize: 15,
    fontWeight: '700',
  },

  emptyStateText: {
    color: '#8B97AA',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },

  retryButton: {
    marginTop: 15,

    backgroundColor: '#2868F0',

    paddingVertical: 10,
    paddingHorizontal: 18,

    borderRadius: 12,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },


  /* FLOATING BUTTON */

  publishButton: {
    position: 'absolute',

    bottom: 25,
    right: 27,

    height: 54,

    paddingHorizontal: 21,

    borderRadius: 28,

    backgroundColor: '#2464EE',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#185BEA',

    shadowOffset: {
      width: 0,
      height: 7,
    },

    shadowOpacity: 0.3,
    shadowRadius: 12,

    elevation: 8,
  },

  publishButtonPressed: {
    opacity: 0.9,

    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
  },

  bottomSpacing: {
    height: 85,
  },

});