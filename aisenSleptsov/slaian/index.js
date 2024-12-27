import { registerRootComponent } from "expo";

import ThemedApp from "./theme"; // Подключаем ThemedApp вместо App

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(ThemedApp);
