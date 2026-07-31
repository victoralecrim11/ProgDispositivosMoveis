import React from 'react';
import { View } from 'react-native';
import Card from './src/components/Card';
import ProfileBadge from './src/components/ProfileBadge';
import { globalStyles } from './src/GlobalStyles';

export default function App() {
  return (
    <View style={globalStyles.container}>
      <Card
        title="Design Responsivo"
        description="Layouts que se adaptam a diferentes telas"
        backgroundColor="#e3f2fd"
        borderColor="#90caf9"
      />

      <Card
        title="Performance"
        description="Otimização para dispositivos móveis"
        borderColor="#ffcc80"
      />

      <View style={globalStyles.profileContainer}>
        <ProfileBadge initials="MR" size={48} color="#4caf50" />
        <ProfileBadge initials="AB" color="#f44336" />
        <ProfileBadge initials="ZC" size={32} />
      </View>
    </View>
  );
}