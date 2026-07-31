import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function Loja() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text>Loja</Text>
      <Button
        title="Ver produto"
        onPress={() => router.push('/produto')}
      />
      <Button
        title="Já tenho conta, ir pro dashboard"
        onPress={() => router.replace('/dashBoard')}
      />
    </View>
  );
};