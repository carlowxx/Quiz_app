import { useCallback, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from "@expo-google-fonts/bricolage-grotesque";
import {
  PublicSans_400Regular,
  PublicSans_500Medium,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
} from "@expo-google-fonts/public-sans";
import { NurseGo } from "./src/components/NurseGo";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [loaded] = useFonts({
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
  });

  const [hidden, setHidden] = useState(false);
  const onLayout = useCallback(() => {
    if (loaded && !hidden) {
      setHidden(true);
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, hidden]);

  if (!loaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <StatusBar style="light" />
      <NurseGo />
    </View>
  );
}
