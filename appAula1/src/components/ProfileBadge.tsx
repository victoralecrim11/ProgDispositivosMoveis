import React from "react";
import { View, StyleSheet } from "react-native";

interface ProfileBadgeProps {
  initials: string;
  size?: number;
  color?: string;
}

const ProfileBadge = ({
  initials,
  size = 40,
  color = "#6200ee",
}: ProfileBadgeProps) => (
  <View
    style={[
      styles.badge,
      {
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: size / 2,
      },
    ]}
  >
    <View style={[styles.initialsPlaceholder, { borderRadius: size / 4 }]} />
  </View>
);

const styles = StyleSheet.create({
  badge: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  initialsPlaceholder: {
    width: "50%",
    height: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});

export default ProfileBadge;
