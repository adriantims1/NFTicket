import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import App from "./navigators";
import theme from "./UITheme";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
//Redux
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
// import { PersistGate } from "redux-persist/integration/react";

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export default function () {
  let [fontsLoaded] = useFonts({
    "Nunito-Light": Nunito_300Light,
    "Nunito-Regular": Nunito_400Regular,
    "Nunito-Medium": Nunito_500Medium,
    "Nunito-Bold": Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar backgroundColor="#FDC521" />
      <NativeBaseProvider theme={theme} config={config}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <NavigationContainer>
                <App />
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </NativeBaseProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
