import React, { useState, useEffect } from "react";
import { Image, View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";

export default function App() {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const [usuarios, setUsuarios] = useState([]); // estado da lista
  const [carregando, setCarregando] = useState(true); // estado de loading

  // useEffect roda quando o componente "monta"
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=10");
        const lista = await res.json();

        const detalhes = await Promise.all(
          lista.results.map(async (item) => { // <- aqui
            const resDetalhe = await fetch(item.url);
            const dadosDetalhe = await resDetalhe.json();
            return { ...item, ...dadosDetalhe };
          })
        );

        setUsuarios(detalhes);
        setCarregando(false);
      } catch (erro) {
        console.error("Erro:", erro);
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);


  if (carregando) {
    // enquanto espera resposta da API
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Pokemons</Text>

      <FlatList
        data={usuarios} // agora vem da API
        keyExtractor={(item) => item.name.toString()} // id da API é número, convertemos pra string
        renderItem={({ item }) => (
          <View style={[styles.item, { flexDirection: "row", alignItems: "center" }]}>
            {/* Imagem */}
            <Image
              source={{ uri: item.sprites.front_default }}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />

            {/* Nome e tipo */}
            <View>
              <Text style={styles.texto}>{capitalize(item.name)}</Text>
              <Text style={styles.email}>
                {item.types.map((t) => t.type.name).join(", ")}
              </Text>

            </View>
          </View>

        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  texto: {
    fontSize: 18,
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
});
