import { StyleSheet, Text, View } from "react-native";
import { useTextStore } from "../store/TextStore";
import { observer } from "mobx-react-lite";

const Lab4b = observer(() => {
  const store = useTextStore();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {store.text === "" ? "(пусто)" : store.text}
      </Text>
    </View>
  );
});
export default Lab4b;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
