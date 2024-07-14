import React, { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const TradingViewWidgetMobile = () => {
  const [tickers, setTickers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [addSound, setAddSound] = useState();
  const [deleteSound, setDeleteSound] = useState();
  const [soundsEnabled, setSoundsEnabled] = useState(true);

  useEffect(() => {
    const loadSounds = async () => {
      const { sound: add } = await Audio.Sound.createAsync(
        require('../assets/sound/add_sound.mp3')
      );
      const { sound: del } = await Audio.Sound.createAsync(
        require('../assets/sound/delete_sound.mp3')
      );
      setAddSound(add);
      setDeleteSound(del);
    };
    loadSounds();
    return () => {
      if (addSound) {
        addSound.unloadAsync();
      }
      if (deleteSound) {
        deleteSound.unloadAsync();
      }
    };
  }, []);

  const playAddSound = async () => {
    if (soundsEnabled) {
      await addSound.playAsync();
    }
  };

  const playDeleteSound = async () => {
    if (soundsEnabled) {
      await deleteSound.playAsync();
    }
  };

  const addTickers = () => {
    if (inputValue.trim() !== '') {
      const newTickers = inputValue
        .split(',')
        .map(ticker => ticker.trim().toUpperCase())
        .filter(ticker => ticker !== '' && !tickers.includes(ticker));
      setTickers([...tickers, ...newTickers]);
      setInputValue('');
      playAddSound();
    }
  };

  const handleInputChange = (text) => {
    const upperCaseText = text.toUpperCase();
    setInputValue(upperCaseText);
  };

  const removeTicker = (ticker) => {
    setTickers(tickers.filter((item) => item !== ticker));
    playDeleteSound();
  };

  const renderWebView = (ticker) => {
    const widgetHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div id="tradingview_advanced_chart"></div>
          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js">
          {
            "width": "100%",
            "height": "300",
            "symbol": "${ticker}",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "3",
            "locale": "en",
            "hide_top_toolbar": true,
            "hide_legend": true,
            "range": "1D",
            "allow_symbol_change": false,
            "save_image": false,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
          }
          </script>
        </body>
      </html>
    `;
    return (
      <Swipeable
        key={ticker}
        renderRightActions={() => (
          <View style={styles.deleteBox}>
            <Ionicons name="trash" size={24} color="white" />
          </View>
        )}
        onSwipeableRightOpen={() => removeTicker(ticker)}
      >
        <View style={styles.container}>
          <Text style={styles.tickerTitle}>{ticker}</Text>
          <View style={styles.webviewContainer}>
            <WebView
              originWhitelist={['*']}
              source={{ html: widgetHTML }}
              style={styles.webview}
            />
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter ticker symbols (e.g., SPY,QQQ,AAPL)"
            value={inputValue}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTickers}>
            <Ionicons name="add-circle" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Tickers</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.soundButton} onPress={() => setSoundsEnabled(!soundsEnabled)}>
          <Ionicons name={soundsEnabled ? "volume-high" : "volume-mute"} size={24} color="white" />
          <Text style={styles.soundButtonText}>{soundsEnabled ? "Disable" : "Enable"} Sounds</Text>
        </TouchableOpacity>
        {tickers.map((ticker) => renderWebView(ticker))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#433D8B',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#433D8B',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 60,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  soundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 40,
  },
  soundButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  container: {
    height: 350,
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
    marginTop: 10,
    alignItems: 'center',
  },
  webviewContainer: {
    height: 310,
    width: '100%',
  },
  webview: {
    flex: 1,
    backgroundColor: 'black',
  },
  tickerTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default memo(TradingViewWidgetMobile);
