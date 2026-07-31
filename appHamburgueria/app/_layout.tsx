import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tela Inicial" }} />
      <Stack.Screen name="lista" options={{ title: "Lista Hamburguer" }} />
      <Stack.Screen name="pizzas" options={{ title: "Lista Pizzas" }} />
      <Stack.Screen name="bebidas" options={{ title: "Lista Bebidas" }} />
      <Stack.Screen name="doces" options={{ title: "Lista Doces" }} />
      <Stack.Screen name="outros" options={{ title: "Outros Itens" }} />
      <Stack.Screen
        name="produto/[id]"
        options={{ title: "Detalhe Sanduiche" }}
      />
      <Stack.Screen name="pizzas/[id]" options={{ title: "Detalhe Pizza" }} />
      <Stack.Screen name="bebidas/[id]" options={{ title: "Detalhe Bebida" }} />
      <Stack.Screen name="doces/[id]" options={{ title: "Detalhe Doce" }} />
      <Stack.Screen name="outros/[id]" options={{ title: "Detalhe Item" }} />
    </Stack>
  );
}
