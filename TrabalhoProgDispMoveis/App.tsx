import { NativeRouter } from "react-router-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navegacao } from "./app/index";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeRouter>
        <Navegacao />
      </NativeRouter>
    </SafeAreaProvider>
  );
}
