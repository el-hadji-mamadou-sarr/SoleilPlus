import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { searchByRegion } from "./votreFichierDeRecherche"; // Assurez-vous de remplacer par le chemin correct
import { HomeScreen } from "../screens/Home.screen";

export const SearchResultBox = () => {
  return (
    <View>
      <HomeScreen />
    </View>
  );
};
