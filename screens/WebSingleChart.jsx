import React, { useEffect, useRef, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TradingViewWidgetWEB = ({ symbol, title }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "350",
        "symbol": "${symbol}",
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
        "support_host": "https://www.tradingview.com",
        "overrides": {
          "paneProperties.legendProperties.showLegend": true,
          "mainSeriesProperties.style": 1,
          "mainSeriesProperties.showPriceLine": true,
          "scalesProperties.textColor": "#AAA",
          "scalesProperties.fontSize": 10
        }
      }`;
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <View style={styles.widgetContainer}>
      <Text style={styles.widgetTitle}>{title}</Text>
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 2,
    padding: 20,
    backgroundColor: 'black',
  },
    backgroundGradient: {
    flex: 1,
    
  },
  widgetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  widgetContainer: {
    backgroundColor: 'black',
    flexBasis: '32%',
    marginHorizontal: 4,
    marginBottom: 5,
    height: 400,
    width: 4000,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 1,
  },
  widgetTitle: {
    fontSize: 20,
    color: 'red',
    marginBottom: 10,
  },
});


const App = () => {
  return (
    <View style={styles.appContainer}>
      <View style={styles.widgetsRow}>
        <TradingViewWidgetWEB symbol="AMEX:SPY" title="SPY" />
        <TradingViewWidgetWEB symbol="NASDAQ:QQQ" title="QQQ" />
        <TradingViewWidgetWEB symbol="BINANCE:BTCUSDT" title="BTC" />
        <TradingViewWidgetWEB symbol="AMEX:IWN" title="IWN" />
        <TradingViewWidgetWEB symbol="AMEX:XLE" title="XLE" />
        <TradingViewWidgetWEB symbol="AMEX:DIA" title="DIA" />
      </View>
    </View>

  );
};

export default memo(App);







