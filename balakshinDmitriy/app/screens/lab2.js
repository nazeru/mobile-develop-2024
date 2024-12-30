import React from 'react';
import { View } from 'react-native';
import Launches from '../components/list';
import LaunchesMemo from '../components/useMemoList';
import "../../global.css";

function Lab2Screen() {
  return(
    <View className="flex-1 flex-col justify-center">
      <Launches className="h-[300]"></Launches>
      <LaunchesMemo></LaunchesMemo>
    </View>
  )
}

export default Lab2Screen;