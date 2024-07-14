import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TradingViewWidgetMobile from './screens/MobileSingleChart';
import WebSingleChart from './screens/WebSingleChart';

const App = () => {
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {isMobile ? <TradingViewWidgetMobile /> : <WebSingleChart />}
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
