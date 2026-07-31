import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Checkout() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Confirmar compra?</Text>
      <Button
        title="Confirmar"
        onPress={() => {
          alert("Deseja realmente confirmar a compra?");
          router.replace("/");
        }}
      />

      <Button
        title="Voltar"
        onPress={() => {
          router.replace("/");
        }}
      />
    </View>
  );
}
