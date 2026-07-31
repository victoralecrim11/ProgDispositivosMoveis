import React from "react";
import { StyleSheet, View } from "react-native";

interface CardProps {
  title?: string;
  description?: string ;
  backgroundColor?: string;
  borderColor?: string;
}

const Card = ({
  title,
  description,
  backgroundColor = "#f0f0f0",
  borderColor = "#CCC",
}: CardProps) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
          borderColor
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[styles.titlePlaceholder, styles.textPlaceholder]}
        ></View>
      </View>
      <View
        style={[styles.descriptionPlaceholder, styles.textPlaceholder]}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: { marginBottom: 12 },
  textPlaceholder: {
    backgroundColor: "#b9ddf4",
    height: 16,
    borderRadius: 4,
  },
  titlePlaceholder: {
    width: 300,
  },
  descriptionPlaceholder: {
    width: 300,
  },
});
export default Card;
