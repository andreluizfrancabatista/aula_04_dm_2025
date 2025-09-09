import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Ícones do Expo (Material Design)

export default function App() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState([]);

  const adicionarTarefa = () => {
    if (tarefa.trim() === "") return;
    setLista([...lista, { id: Date.now().toString(), nome: tarefa }]);
    setTarefa("");
  };

  const removerTarefa = (id) => {
    setLista(lista.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📋 Lista de Tarefas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa..."
        value={tarefa}
        onChangeText={setTarefa}
      />
      <Button title="Adicionar" onPress={adicionarTarefa} />

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>✅ {item.nome}</Text>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
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
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    backgroundColor: "#e0ffe0",
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row", // Coloca texto e ícone lado a lado
    justifyContent: "space-between", // Espaço entre eles
    alignItems: "center",
  },
  texto: {
    fontSize: 18,
  },
});
