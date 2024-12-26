import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";

const factorial = (n) => {
  if(n <= 1)
    return 1;
  return n * factorial(n-1);
};

const calcPermutations = (arr) => {
  let result = factorial(arr.reduce((a, b) => a + b, 0));
  for(const k of arr)
    result /= factorial(k);
  return result;
};

const permutate = (text, seqNumber) => {
  let result = "";
  for(const i in text) {
    const [chars, counts] = charsCounts(text);
    for(const j in chars) {
      counts[j]--;
      let amount = calcPermutations(counts);
      if(amount > seqNumber) {
        result += chars[j];
        text = text.replace(chars[j], '');
        break;
      }
      else {
        seqNumber -= amount;
        counts[j]++;
      }
    }
  }

  return result;
};

const charsCounts = (text) => {
  const chars = [];
  const counts = [];
  for(const c of text) {
    let idx = chars.indexOf(c);
    if(idx < 0) {
      idx = chars.push(c) - 1;
      counts.push(0);
    }
    counts[idx]++;
  }
  return [chars, counts];
};

function OutputText({ text }) {
  return (
    <ScrollView style={styles.output}>
      <Text style={styles.outputText}>{text}</Text>
    </ScrollView>
  );
}

export default function Lab3() {
  const [inputText, setInputText] = useState("");
  const [visible, setVisible] = useState(true);

  const outputText = useMemo(() => {
    console.log(inputText);
    const arr = [];
    let n = calcPermutations(charsCounts(inputText)[1]);
    for(let i = 0; i < n; i++)
      arr.push(permutate(inputText, i));
    return arr.join(' ');
  }, [inputText]);

  const onChangeText = (value) => {
    setInputText(value);
  };
  const toggleVisible = (value) => {
    setVisible(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="XXXXXXX"
        maxLength={7}
      />
      <Switch
        onValueChange={toggleVisible}
        value={visible}
      />
      { visible && inputText != '' && <OutputText text={outputText} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    textAlign: 'center'
  },
  output: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 10
  },
  outputText: {
    textAlign: 'center'
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});