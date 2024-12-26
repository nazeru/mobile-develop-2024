import { StyleSheet, TextInput, View } from "react-native";
import { useTextStore } from "../store/TextStore";
import { observer } from "mobx-react-lite";

const Lab4a = observer(() => {
  const store = useTextStore();
  const onChangeText = (value) => {
    store.setText(value);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        onChangeText={onChangeText}
        placeholder="Введите текст"
        multiline={true}
      />
    </View>
  );
});
export default Lab4a;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
  },
});
