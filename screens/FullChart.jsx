import React, { useEffect, useRef, memo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const TradingViewWidget = () => {
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
          "autosize": true,
          "symbol": "AMEX:SPY",
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {Platform.OS === 'web' ? (
          <iframe
            title="TradingView Widget"
            srcDoc={widgetHTML}
            style={styles.iframe}
            scrolling="no"
          ></iframe>
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{ html: widgetHTML }}
            style={styles.webview}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
});

export default memo(TradingViewWidget);
