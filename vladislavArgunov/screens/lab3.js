import React, { useEffect, useMemo, useState, useRef } from "react";
import { View, TextInput, Text, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../ContextAPI/themeContext";
import { getStyles } from "./styles";

const Lab3 = () => {
  const { isDarkTheme } = useTheme();
  const styles = getStyles(isDarkTheme);

  const [link, setLink] = useState("");
  const [submittedLink, setSubmittedLink] = useState("");

  const renderCountQR = useRef(0);
  const renderCountMemoQR = useRef(0);

  const qrCode = (
    <QRCode
      value={submittedLink ? submittedLink : "https://www.google.com/"}
      size={228}
      color={"black"}
      backgroundColor={isDarkTheme ? "#c0c0c0" : "white"}
    />
  );

  const memoQR = useMemo(() => {
    renderCountMemoQR.current += 1;
    return (
      <QRCode
        value={submittedLink ? submittedLink : "https://www.google.com/"}
        size={228}
        color={"black"}
        backgroundColor={isDarkTheme ? "#c0c0c0" : "white"}
      />
    );
  }, [submittedLink, isDarkTheme]);

  renderCountQR.current += 1;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.content}>
          {qrCode}
          <Text>{renderCountQR.current}</Text>
        </View>
        <View style={styles.content}>
          {memoQR}
          <Text>{renderCountMemoQR.current}</Text>
        </View>
        <View style={styles.subContent}>
          <TextInput
            style={styles.input}
            onChangeText={setLink}
            value={link}
            placeholder={link ? link : "https://google.com/"}
          />
          <Button title="ОК" onPress={() => setSubmittedLink(link)} />
        </View>
      </View>
    </View>
  );
};

export default Lab3;
