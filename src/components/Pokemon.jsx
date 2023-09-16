import { useEffect, useState } from "react";
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView,} from "react-native";
import axios from "axios";

const Pokemon = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [, setPokemonData] = useState();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 15; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));
  };

  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigation.navigate("Home", pokemonData);
  };

  return (
    <SafeAreaView style={{backgroundColor:'#000'}}>
      <ScrollView>
        {pokemons.map((pokemon, key) => (
          <View key={key}>
            <TouchableOpacity onPress={() => pokemonPickHandler(pokemon.data)}>
              <View style={styles.container}>
                <View style={styles.containerImage}>
                  <Image
                    style={styles.Image}
                    source={{ uri: pokemon.data.sprites.front_default }}
                  />
                </View>
                <View style={styles.textContainer}>
                  
                  <Text style={styles.Text}>Name:{pokemon.data.name} </Text>
                  <Text style={styles.Text}>
                    Type:
                    {pokemon.data.types.map((type, key) => (
                      <Text key={key}> {type.type.name} </Text>
                    ))}
                  </Text>
                </View>


                
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius:30,
    shadowRadius:5,
    shadowOpacity:0.6,
    shadowColor:'#f00'
  },
  containerImage: {
    height: 100,
    width: 100,
   
    borderRadius:30,

  },
  Image: {
    height: 100,
    width: 100,
  },
  textContainer: {
    height: 100,
    width: 150,
    paddingLeft: 10,
    paddingTop: 7,

  },
  Text:{
    fontWeight: 'bold',
    marginVertical: 10,

  }
});

export default Pokemon;