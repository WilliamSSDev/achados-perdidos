import { useState } from 'react';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LookupItemsScreen from './screens/lookupItemsScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import ContactScreen from './screens/ContactScreen';
import PublishItemScreen from './screens/PublishItemScreen';

export default function App() {
  const [screen, setScreen] = useState('register');
  const [token, setToken] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  if (screen === 'register') {
    return (
      <RegisterScreen
        onLogin={() => setScreen('login')}
      />
    );
  }

  if (screen === 'lookup') {
    return (
      <LookupItemsScreen
        token={token}
        onPublishItem={() => setScreen('publish')}
        onItemPress={(item) => {
          setSelectedItem(item);
          setScreen('detail');
        }}
      />
    );
  }

  if (screen === 'detail') {
    return (
      <ItemDetailScreen
        item={selectedItem}
        onBack={() => setScreen('lookup')}
        onContact={() => setScreen('contact')}
      />
    );
  }

  if (screen === 'contact') {
    return (
      <ContactScreen
        item={selectedItem}
        onBack={() => setScreen('detail')}
      />
    );
  }

  if (screen === 'publish') {
    return (
      <PublishItemScreen
        token={token}
        onBack={() => setScreen('lookup')}
        onCreated={() => setScreen('lookup')}
      />
    );
  }

  return (
    <LoginScreen
      onCreateAccount={() => setScreen('register')}
      onLoginSuccess={(receivedToken) => {
        setToken(receivedToken);
        setScreen('lookup');
      }}
    />
  );
}