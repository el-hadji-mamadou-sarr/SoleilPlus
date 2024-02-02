import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { searchByRegion } from "./votreFichierDeRecherche"; // Assurez-vous de remplacer par le chemin correct
import { HomeScreen } from "../screens/Home.screen";

export const SearchResultBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
      const response = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${city}&type=municipality`
      );

      if (response.data.features.length > 0) {
        const regions = response.data.features.map(
          (feature) => feature.properties.label
        );
        setSearchResult(regions);
      } else {
        setSearchResult([]);
        Alert.alert('Aucun résultat trouvé');
      }
    }
}



  return (
    <View>
      <HomeScreen />
    </View>
  );
};
