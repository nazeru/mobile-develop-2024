import React, { useMemo, useState } from "react";
import { View, TextInput } from "react-native";
import QRCode from "react-native-qrcode-svg";
import styles from "./styles";

const Lab3 = () => {
  const [link, setLink] = useState("");

  const memoQR = useMemo(() => {
    return (
      <QRCode value={link ? link : "https://www.google.com/"} size={228} />
    );
  }, [link]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.content}>{memoQR}</View>
        <View style={styles.subContent}>
          <TextInput
            style={styles.input}
            onChangeText={setLink}
            value={link}
            placeholder={link ? link : "https://google.com/"}
          />
        </View>
      </View>
    </View>
  );
};

export default Lab3;
