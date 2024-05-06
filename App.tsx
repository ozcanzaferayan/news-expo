import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NewsScreen from "./src/screens/NewsScreen";

const App = () => {
  return (
    <SafeAreaProvider>
      <NewsScreen />
    </SafeAreaProvider>
  );
};

export default App;
