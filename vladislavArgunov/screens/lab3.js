import React, { useEffect, useMemo, useState } from "react";
import { View, TextInput } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../ContextAPI/themeContext";
import { getStyles } from "./styles";

const Lab3 = () => {
  const { isDarkTheme } = useTheme();
  const styles = getStyles(isDarkTheme);

  const [link, setLink] = useState("");

  useEffect(() => {
    console.log(isDarkTheme);
    console.log(styles.qr);
  }, [isDarkTheme]);

  const memoQR = useMemo(() => {
    return (
      <QRCode
        value={link ? link : "https://www.google.com/"}
        size={228}
        color={"black"}
        backgroundColor={isDarkTheme? "#c0c0c0":"white"}
      />
    );
  }, [link, isDarkTheme]);

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
