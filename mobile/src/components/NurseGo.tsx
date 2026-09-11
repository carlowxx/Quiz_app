// Nurse GO — app nativo (Expo / React Native). Porta fiel das telas de
// Nurse GO.dc.html, consumindo o view-model de useNurseGo().

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

import { Icon } from "./Icon";
import { Bar } from "./Bar";
import { Wheel } from "./Wheel";
import { useNurseGo } from "@/hooks/useNurseGo";

const FT = "BricolageGrotesque_800ExtraBold" as const;
const FT7 = "BricolageGrotesque_700Bold" as const;
const FB = "PublicSans_400Regular" as const;
const FB6 = "PublicSans_600SemiBold" as const;
const FB7 = "PublicSans_700Bold" as const;

const sombra = (color: string, y = 5) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: y },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: y,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VM = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Acoes = any;
interface Props {
  vm: VM;
  acoes: Acoes;
}

export function NurseGo() {
  const { vm, acoes } = useNurseGo();
  if (!vm.pronto) return <View style={{ flex: 1, backgroundColor: "#0A2540" }} />;

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F8F9" }}>
      {vm.tela === "boas" && <TelaBoas vm={vm} acoes={acoes} />}
      {vm.tela === "tutorial" && <TelaTutorial vm={vm} acoes={acoes} />}
      {vm.tela === "mapa" && <TelaMapa vm={vm} acoes={acoes} />}
      {vm.tela === "roleta" && <TelaRoleta vm={vm} acoes={acoes} />}
      {vm.tela === "avatar" && <TelaAvatar vm={vm} acoes={acoes} />}
      {vm.tela === "energia" && <TelaEnergia vm={vm} acoes={acoes} />}
      {vm.tela === "bau" && <TelaBau vm={vm} acoes={acoes} />}
      {vm.tela === "quiz" && <TelaQuiz vm={vm} acoes={acoes} />}
      {vm.tela === "fim" && <TelaFim vm={vm} acoes={acoes} />}
      {vm.tela === "perfil" && <TelaPerfil vm={vm} acoes={acoes} />}
      {vm.tela === "revisao" && <TelaRevisao vm={vm} acoes={acoes} />}
      {vm.tela === "loja" && <TelaLoja vm={vm} acoes={acoes} />}
    </View>
  );
}

function BotaoVoltar({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,.22)",
        backgroundColor: "rgba(255,255,255,.08)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon name="ChevronLeft" size={17} color="#fff" />
    </Pressable>
  );
}

// ───────────────────────── Boas-vindas ─────────────────────────
function TelaBoas({ vm, acoes }: Props) {
  return (
    <LinearGradient colors={["#0A2540", "#124E77", "#05A67A"]} locations={[0, 0.55, 1]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 26 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: "#05A67A",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: FT, color: "#fff", fontSize: 16 }}>N</Text>
          </View>
          <Text style={{ fontFamily: FT, fontSize: 21, color: "#fff" }}>
            Nurse<Text style={{ color: "#7BE3C0" }}>GO</Text>
          </Text>
        </View>

        <Text style={{ marginTop: 26, fontFamily: FT, fontSize: 32, lineHeight: 36, color: "#fff" }}>
          Fisiologia e anatomia, um passo por dia.
        </Text>
        <Text style={{ marginTop: 12, fontSize: 15, lineHeight: 22, color: "rgba(255,255,255,.75)", maxWidth: 320 }}>
          Trilha de lições curtas sobre os sistemas cardiovascular e respiratório. Antes de começar, um teste rápido
          define de onde você parte.
        </Text>

        <View style={{ marginTop: 28 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: "rgba(255,255,255,.55)" }}>
            Como quer ser chamado
          </Text>
          <TextInput
            value={vm.nomeInput}
            onChangeText={acoes.setNome}
            placeholder="Seu nome"
            placeholderTextColor="rgba(255,255,255,.5)"
            style={{
              marginTop: 9,
              padding: 15,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,.22)",
              backgroundColor: "rgba(255,255,255,.10)",
              color: "#fff",
              fontSize: 16,
              fontFamily: FB6,
            }}
          />
        </View>

        <Pressable
          onPress={acoes.comecarNivel}
          style={{ marginTop: 18, padding: 17, borderRadius: 18, backgroundColor: "#fff", alignItems: "center" }}
        >
          <Text style={{ fontFamily: FT, fontSize: 16.5, color: "#0A2540" }}>Começar</Text>
        </Pressable>
        <Pressable onPress={acoes.pularNivel} style={{ marginTop: 12, alignItems: "center" }}>
          <Text style={{ color: "rgba(255,255,255,.6)", fontSize: 13, fontFamily: FB6, textDecorationLine: "underline" }}>
            Ir direto para a trilha, sem teste
          </Text>
        </Pressable>
        <Text style={{ marginTop: 24, fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 18 }}>
          Tour rápido do app, depois 6 questões de nivelamento · cerca de 3 minutos
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ───────────────────────── Tutorial ─────────────────────────
function TelaTutorial({ vm, acoes }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F8F9" }}>
      <View style={{ padding: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
          {vm.tutBarras.map((ativo: boolean, i: number) => (
            <View key={i} style={{ flex: 1, height: 5, borderRadius: 99, backgroundColor: ativo ? "#05A67A" : "#DCE6EA" }} />
          ))}
        </View>
        <Pressable onPress={acoes.pularTutorial}>
          <Text style={{ color: "#5A7383", fontSize: 12.5, fontFamily: FB7 }}>Pular</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 40,
            backgroundColor: vm.tutBg,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={vm.tutIcone} size={64} color={vm.tutCor} />
        </View>
        <Text style={{ marginTop: 26, fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: FB7, color: vm.tutCorTexto }}>
          {vm.tutTag}
        </Text>
        <Text style={{ marginTop: 7, fontFamily: FT, fontSize: 28, lineHeight: 32, color: "#0A2540" }}>{vm.tutTitulo}</Text>
        <Text style={{ marginTop: 12, fontSize: 15, lineHeight: 24, color: "#41586A" }}>{vm.tutTexto}</Text>
      </View>

      <View style={{ padding: 20, flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={acoes.tutVoltar}
          disabled={vm.tutNoInicio}
          style={{
            width: 56,
            paddingVertical: 15,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#DCE6EA",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            opacity: vm.tutNoInicio ? 0.4 : 1,
          }}
        >
          <Icon name="ChevronLeft" size={16} color="#5A7383" />
        </Pressable>
        <Pressable
          onPress={acoes.tutAvancar}
          style={[{ flex: 1, padding: 16, borderRadius: 16, backgroundColor: "#0A2540", alignItems: "center" }, sombra("#061A2E")]}
        >
          <Text style={{ fontFamily: FT, fontSize: 15.5, color: "#fff" }}>{vm.tutBotao}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ───────────────────────── Mapa / trilha ─────────────────────────
function TelaMapa({ vm, acoes }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F5F8F9" }}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#0A2540" }}>
        <View style={{ paddingHorizontal: 18, paddingVertical: 13, flexDirection: "row", alignItems: "center", gap: 13, flexWrap: "wrap" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Icon name="Sparkles" size={16} color="#7BE3C0" />
            <Text style={{ fontFamily: FT7, fontSize: 15, color: "#fff" }}>{vm.xpTxt}</Text>
            <Text style={{ fontSize: 11.5, color: "rgba(255,255,255,.6)" }}>XP</Text>
          </View>
          <Pressable onPress={acoes.irLoja} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Icon name="Coins" size={16} color="#F2C24A" />
            <Text style={{ fontFamily: FT7, fontSize: 15, color: "#F2C24A" }}>{vm.moedasTxt}</Text>
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Icon name="Flame" size={16} color="#F2994A" />
            <Text style={{ fontFamily: FT7, fontSize: 15, color: "#F2994A" }}>{vm.streakTxt}</Text>
          </View>
          <Pressable onPress={acoes.verEnergia} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon name="Zap" size={16} color="#F2C24A" />
            <Text style={{ fontFamily: FT7, fontSize: 15, color: "#F2C24A" }}>{vm.energiaTxt}</Text>
          </Pressable>
          <View
            style={{
              marginLeft: "auto",
              backgroundColor: "#7BE3C0",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 99,
            }}
          >
            <Text style={{ fontSize: 11, fontFamily: FB7, textTransform: "uppercase", color: "#0A2540" }}>{vm.nivelTxt}</Text>
          </View>
        </View>
        {vm.mostrarBoost && (
          <LinearGradient colors={["#F2994A", "#F2C24A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <View style={{ paddingHorizontal: 18, paddingVertical: 7, flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Icon name="Sparkles" size={14} color="#3A1D00" />
              <Text style={{ fontSize: 12, fontFamily: FB7, color: "#3A1D00" }}>{vm.boostTxt}</Text>
            </View>
          </LinearGradient>
        )}
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={{ padding: 16, flexDirection: "row", gap: 12 }}>
          <View
            style={{
              width: 86,
              borderRadius: 18,
              backgroundColor: "#E9F1F4",
              borderWidth: 1,
              borderColor: "#BFD0D8",
              borderStyle: "dashed",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              padding: 8,
            }}
          >
            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: "#CFDDE4" }} />
            <Text style={{ fontSize: 9, textAlign: "center", color: "#5A7383" }}>mascote{"\n"}86×110</Text>
          </View>
          <View style={[{ flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#DCE6EA", borderRadius: 18, padding: 14 }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                <Icon name="Target" size={16} color="#1B6FD1" />
                <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540" }}>Meta da semana</Text>
              </View>
              <Text style={{ fontSize: 12, color: "#5A7383", fontFamily: FB6 }}>{vm.metaTxt}</Text>
            </View>
            <View style={{ marginTop: 9 }}>
              <Bar pct={vm.metaPctNum} fill="#1B6FD1" />
            </View>
            <Text style={{ marginTop: 8, fontSize: 12, color: "#5A7383", lineHeight: 17 }}>{vm.metaSub}</Text>
          </View>
        </View>

        {vm.trilha.map((u: VM, ui: number) => (
          <View key={ui}>
            <LinearGradient
              colors={[u.cor, u.cor2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ marginHorizontal: 16, marginTop: 20, borderRadius: 20, padding: 16, flexDirection: "row", alignItems: "center", gap: 12, overflow: "hidden" }}
            >
              <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: "rgba(255,255,255,.2)", alignItems: "center", justifyContent: "center" }}>
                <Icon name={u.icone} size={22} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: "rgba(255,255,255,.75)" }}>{u.tag}</Text>
                <Text style={{ fontFamily: FT, fontSize: 18, color: "#fff", marginTop: 2 }}>{u.nome}</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,255,255,.22)", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99 }}>
                <Text style={{ fontFamily: FT7, fontSize: 12.5, color: "#fff" }}>{u.progresso}</Text>
              </View>
            </LinearGradient>

            <View style={{ alignItems: "center", paddingVertical: 14, marginHorizontal: 10, borderRadius: 24, backgroundColor: u.bgMapa }}>
              {u.nos.map((n: VM) => (
                <View key={n.key} style={{ alignItems: "center", width: "100%" }}>
                  <View style={{ alignItems: "center", gap: 7, paddingVertical: 7 }}>
                    {n.dots.map((d: { dx: number; cor: string }, k: number) => (
                      <View key={k} style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: d.cor, transform: [{ translateX: d.dx }] }} />
                    ))}
                  </View>
                  <View style={{ alignItems: "center", gap: 7, transform: [{ translateX: n.dx }], width: 176 }}>
                    <Pressable
                      onPress={n.click}
                      disabled={n.locked}
                      style={[
                        {
                          width: n.size,
                          height: n.size,
                          borderRadius: n.raio,
                          backgroundColor: n.bg,
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        sombra(n.sombra, 6),
                      ]}
                    >
                      {n.temIcone ? (
                        <Icon name={n.icone} size={n.iconPx} color={n.fg} />
                      ) : n.temNumero ? (
                        <Text style={{ fontFamily: FT, fontSize: 22, color: n.fg }}>{n.numero}</Text>
                      ) : null}
                    </Pressable>
                    <Text style={{ fontSize: 11.5, fontFamily: FB6, color: n.labelCor, textAlign: "center", maxWidth: 170 }}>{n.rotulo}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#DCE6EA",
          flexDirection: "row",
          paddingTop: 9,
          paddingBottom: Platform.OS === "ios" ? 28 : 12,
          paddingHorizontal: 10,
        }}
      >
        <Pressable onPress={acoes.irMapa} style={{ flex: 1, backgroundColor: "#EAF7F2", borderRadius: 14, paddingVertical: 9, alignItems: "center", gap: 4 }}>
          <Icon name="Map" size={21} color="#05A67A" />
          <Text style={{ fontSize: 11, fontFamily: FB7, color: "#04724F" }}>Trilha</Text>
        </Pressable>
        <Pressable onPress={acoes.irRevisao} style={{ flex: 1, alignItems: "center", gap: 4, paddingVertical: 9 }}>
          <Icon name="RotateCcw" size={21} color="#5A7383" />
          <Text style={{ fontSize: 11, fontFamily: FB7, color: "#5A7383" }}>Revisão</Text>
        </Pressable>
        <Pressable onPress={acoes.irPerfil} style={{ flex: 1, alignItems: "center", gap: 4, paddingVertical: 9 }}>
          <Icon name="UserRound" size={21} color="#5A7383" />
          <Text style={{ fontSize: 11, fontFamily: FB7, color: "#5A7383" }}>Perfil</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ───────────────────────── Roleta ─────────────────────────
function TelaRoleta({ vm, acoes }: Props) {
  const rot = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(rot, {
      toValue: vm.wheelDeg,
      duration: 4200,
      useNativeDriver: true,
    }).start();
  }, [vm.wheelDeg, rot]);

  return (
    <LinearGradient colors={["#0A2540", "#0E3A5E", "#0A2540"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 18, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <BotaoVoltar onPress={acoes.irMapa} />
          <Text style={{ fontFamily: FT7, fontSize: 16, color: "#fff" }}>Roleta da trilha</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, paddingBottom: 34 }}>
          <Wheel rotation={rot} segmentos={vm.segmentos} />
          <View style={{ marginTop: 28, alignItems: "center", minHeight: 62 }}>
            <Text style={{ fontFamily: FT, fontSize: 22, color: "#fff" }}>{vm.roletaTitulo}</Text>
            <Text style={{ marginTop: 6, fontSize: 13.5, color: "rgba(255,255,255,.66)", textAlign: "center", maxWidth: 290, lineHeight: 19 }}>
              {vm.roletaSub}
            </Text>
          </View>
          <Pressable
            onPress={() => (vm.sorteado ? acoes.acaoRoleta() : acoes.girar())}
            disabled={vm.girando}
            style={{ marginTop: 20, width: "100%", padding: 17, borderRadius: 18, backgroundColor: "#fff", alignItems: "center", opacity: vm.girando ? 0.5 : 1 }}
          >
            <Text style={{ fontFamily: FT, fontSize: 16.5, color: "#0A2540" }}>{vm.roletaBotao}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ───────────────────────── Avatar ─────────────────────────
function TelaAvatar({ vm, acoes }: Props) {
  const escolherFoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permissão necessária", "Autorize o acesso às fotos para escolher um avatar.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });
    if (!res.canceled && res.assets[0]) acoes.setFoto(res.assets[0].uri);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F8F9" }}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#0A2540" }}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <BotaoVoltar onPress={acoes.irPerfil} />
            <Text style={{ fontFamily: FT7, fontSize: 17, color: "#fff" }}>Seu avatar</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <LinearGradient
                colors={vm.avPreviewCores}
                style={{ width: 112, height: 112, borderRadius: 36, alignItems: "center", justifyContent: "center" }}
              >
                <Icon name={vm.avPreviewIcone} size={50} color="#fff" />
              </LinearGradient>
              <View
                style={{
                  marginLeft: -18,
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: vm.petAtual.cor,
                  borderWidth: 3,
                  borderColor: "#0A2540",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={vm.petAtual.icone} size={22} color="#fff" />
              </View>
            </View>
            <Text style={{ marginTop: 8, fontSize: 11.5, color: "rgba(255,255,255,.65)" }}>
              {vm.nivelJogadorNome} · nível {vm.nivelJogadorNum}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540" }}>Cor</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
          {vm.avCores.map((c: VM) => (
            <Pressable
              key={c.id}
              onPress={() => acoes.escolherCor(c.id)}
              style={{ width: "15%", aspectRatio: 1, borderRadius: 16, overflow: "hidden", borderWidth: 3, borderColor: c.sel ? "#0A2540" : "transparent" }}
            >
              <LinearGradient colors={c.cores} style={{ flex: 1 }} />
            </Pressable>
          ))}
        </View>

        <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540", marginTop: 22 }}>Símbolo</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
          {vm.avSimbolos.map((i: VM) => (
            <Pressable
              key={i.id}
              onPress={() => acoes.escolherSimbolo(i.id)}
              style={{
                width: "15%",
                aspectRatio: 1,
                borderRadius: 16,
                backgroundColor: i.sel ? "#0A2540" : "#fff",
                borderWidth: 2,
                borderColor: i.sel ? "#0A2540" : "#DCE6EA",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={i.icone} size={22} color={i.sel ? "#fff" : "#5A7383"} />
            </Pressable>
          ))}
        </View>

        <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540", marginTop: 22 }}>Ou use uma foto</Text>
        <Pressable
          onPress={escolherFoto}
          style={{ marginTop: 10, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#BFD0D8", borderStyle: "dashed", borderRadius: 16, padding: 14 }}
        >
          {vm.foto ? (
            <Image source={{ uri: vm.foto }} style={{ width: 38, height: 38, borderRadius: 13 }} />
          ) : (
            <View style={{ width: 38, height: 38, borderRadius: 13, backgroundColor: "rgba(90,115,131,.12)", alignItems: "center", justifyContent: "center" }}>
              <Icon name="UserRound" size={19} color="#5A7383" />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FB7, fontSize: 13.5, color: "#0A2540" }}>{vm.fotoTitulo}</Text>
            <Text style={{ fontSize: 11.5, color: "#5A7383", marginTop: 1 }}>A foto substitui o avatar montado</Text>
          </View>
        </Pressable>
        {vm.temFoto && (
          <Pressable
            onPress={acoes.removerFoto}
            style={{ marginTop: 10, padding: 13, borderRadius: 14, borderWidth: 1, borderColor: "#DCE6EA", backgroundColor: "#fff", alignItems: "center" }}
          >
            <Text style={{ color: "#C2415A", fontFamily: FB7, fontSize: 12.5 }}>Remover foto e usar o avatar</Text>
          </Pressable>
        )}

        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6, marginTop: 26 }}>
          <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540" }}>Seu bichinho</Text>
          <Text style={{ fontSize: 12, color: "#5A7383" }}>desbloqueia subindo de nível</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
          {vm.petsGrid.map((pet: VM) => (
            <Pressable
              key={pet.id}
              onPress={pet.click}
              disabled={!pet.desbloqueado}
              style={{
                width: "22%",
                aspectRatio: 1,
                borderRadius: 16,
                backgroundColor: pet.desbloqueado ? "#fff" : "#F1F5F6",
                borderWidth: 2,
                borderColor: pet.selecionado ? "#0A2540" : "#DCE6EA",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Icon name={pet.desbloqueado ? pet.icone : "Lock"} size={20} color={pet.desbloqueado ? pet.cor : "#B4C4CC"} />
              <Text style={{ fontSize: 9, fontFamily: FB6, color: pet.desbloqueado ? "#5A7383" : "#B4C4CC" }} numberOfLines={1}>
                {pet.desbloqueado ? pet.nome : "Nv. " + pet.nivelMinimo}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 26 }}>
          <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540", flex: 1 }}>Guarda-roupa</Text>
          <Pressable onPress={acoes.irLoja} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Icon name="ShoppingBag" size={14} color="#1B6FD1" />
            <Text style={{ fontSize: 12.5, fontFamily: FB7, color: "#1B6FD1" }}>Ir à loja</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 10 }}>
          {vm.guardaRoupa.map((item: VM) => (
            <Pressable
              key={item.id}
              onPress={item.click}
              style={{
                width: "22%",
                aspectRatio: 1,
                borderRadius: 16,
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: item.equipado ? "#0A2540" : "#DCE6EA",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={item.icone} size={20} color={item.cor === "#F5F8F9" ? "#B4C4CC" : item.cor} />
            </Pressable>
          ))}
          {vm.guardaRoupa.length === 0 && (
            <Text style={{ fontSize: 12.5, color: "#5A7383", padding: 4 }}>
              Nenhuma roupa ainda — ganhe na roleta ou compre na loja.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// ───────────────────────── Loja ─────────────────────────
function TelaLoja({ vm, acoes }: Props) {
  const porSlot = (slot: string) => vm.loja.filter((i: VM) => i.slot === slot);
  const secoes: [string, string][] = [
    ["jaleco", "Jalecos"],
    ["chapeu", "Chapéus e toucas"],
    ["acessorio", "Acessórios"],
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#F5F8F9" }}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#0A2540" }}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <BotaoVoltar onPress={acoes.irAvatar} />
            <Text style={{ fontFamily: FT7, fontSize: 17, color: "#fff", flex: 1 }}>Loja</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,.12)", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99 }}>
              <Icon name="Coins" size={14} color="#F2C24A" />
              <Text style={{ color: "#F2C24A", fontFamily: FT7, fontSize: 13 }}>{vm.moedasTxt}</Text>
            </View>
          </View>
          <Text style={{ marginTop: 8, fontSize: 12.5, color: "rgba(255,255,255,.6)", lineHeight: 18 }}>
            Ganhe moedas jogando lições e rodadas. Itens marcados "só na roleta" não são vendidos — só saem de prêmio.
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {secoes.map(([slot, titulo]) => (
          <View key={slot} style={{ marginBottom: 22 }}>
            <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540", marginBottom: 10 }}>{titulo}</Text>
            <View style={{ gap: 8 }}>
              {porSlot(slot).map((item: VM) => (
                <View
                  key={item.id}
                  style={{ flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: item.equipado ? "#0A2540" : "#DCE6EA", borderRadius: 16, padding: 13 }}
                >
                  <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: item.cor === "#F5F8F9" ? "#EEF3F5" : item.cor, alignItems: "center", justifyContent: "center" }}>
                    <Icon name={item.icone} size={20} color={item.cor === "#F5F8F9" ? "#8FA3AE" : "#fff"} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: FB7, fontSize: 13.5, color: "#0A2540" }}>{item.nome}</Text>
                    <Text style={{ fontSize: 11, fontFamily: FB6, color: item.raridadeCor, marginTop: 1 }}>{item.raridadeTxt}</Text>
                  </View>
                  {item.possuido ? (
                    <View style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: item.equipado ? "#0A2540" : "#EEF3F5" }}>
                      <Text style={{ fontSize: 12, fontFamily: FB7, color: item.equipado ? "#fff" : "#5A7383" }}>
                        {item.equipado ? "Equipado" : "Equipar"}
                      </Text>
                    </View>
                  ) : item.soRoleta ? (
                    <View style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: "#F1F5F6" }}>
                      <Text style={{ fontSize: 11, fontFamily: FB6, color: "#8FA3AE" }}>Só na roleta</Text>
                    </View>
                  ) : (
                    <Pressable
                      onPress={item.click}
                      disabled={!item.podeComprar}
                      style={{ flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: item.podeComprar ? "#05A67A" : "#EEF3F5" }}
                    >
                      <Icon name="Coins" size={13} color={item.podeComprar ? "#fff" : "#8FA3AE"} />
                      <Text style={{ fontSize: 12, fontFamily: FB7, color: item.podeComprar ? "#fff" : "#8FA3AE" }}>{item.preco}</Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ───────────────────────── Energia / paywall ─────────────────────────
function TelaEnergia({ vm, acoes }: Props) {
  return (
    <LinearGradient colors={["#0A2540", "#123A5C", "#0A2540"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 52, height: 52, borderRadius: 18, backgroundColor: "rgba(242,153,74,.2)", alignItems: "center", justifyContent: "center" }}>
            <Icon name="Zap" size={26} color="#F2994A" />
          </View>
          <View>
            <Text style={{ fontFamily: FT, fontSize: 22, color: "#fff" }}>{vm.energiaTitulo}</Text>
            <Text style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>Próxima recarga em {vm.recargaTxt}</Text>
          </View>
        </View>
        <Text style={{ marginTop: 14, fontSize: 14.5, lineHeight: 21, color: "rgba(255,255,255,.75)" }}>
          Cada lição consome 1 energia e cada caso de emergência consome 2. Você recupera 1 a cada {vm.energiaMin} minutos,
          até {vm.energiaMax}.
        </Text>

        <LinearGradient colors={["#05A67A", "#1B6FD1"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ marginTop: 24, borderRadius: 22, padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Icon name="Sparkles" size={14} color="rgba(255,255,255,.85)" />
            <Text style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: "rgba(255,255,255,.8)" }}>Nurse GO Plus</Text>
          </View>
          <Text style={{ fontFamily: FT, fontSize: 21, color: "#fff", marginTop: 6 }}>Energia ilimitada</Text>
          <View style={{ marginTop: 8, gap: 6 }}>
            <Text style={{ fontSize: 13.5, color: "rgba(255,255,255,.88)" }}>Estude sem pausa, sem esperar recarga</Text>
            <Text style={{ fontSize: 13.5, color: "rgba(255,255,255,.88)" }}>Boost de XP permanente de 2x</Text>
            <Text style={{ fontSize: 13.5, color: "rgba(255,255,255,.88)" }}>Casos de emergência liberados no seu ritmo</Text>
          </View>
          <Pressable onPress={acoes.assinar} style={{ marginTop: 16, padding: 15, borderRadius: 16, backgroundColor: "#fff", alignItems: "center" }}>
            <Text style={{ fontFamily: FT, fontSize: 15.5, color: "#0A2540" }}>Assinar por R$ 14,90/mês</Text>
          </Pressable>
          <Text style={{ marginTop: 9, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.7)" }}>
            Simulação: nenhum pagamento é processado nesta versão.
          </Text>
        </LinearGradient>

        <Pressable onPress={acoes.irMapa} style={{ marginTop: 14, padding: 15, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,.25)", backgroundColor: "rgba(255,255,255,.08)", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontFamily: FB7, fontSize: 14 }}>Esperar a recarga</Text>
        </Pressable>
        <Pressable onPress={acoes.irRevisao} style={{ marginTop: 10, alignItems: "center" }}>
          <Text style={{ color: "rgba(255,255,255,.6)", fontSize: 13, fontFamily: FB6, textDecorationLine: "underline" }}>
            Revisar erros enquanto isso (não gasta energia)
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ───────────────────────── Baú ─────────────────────────
function TelaBau({ vm, acoes }: Props) {
  return (
    <LinearGradient colors={["#0A2540", "#124E77", "#0A2540"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 22, padding: 26 }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: FB7, color: "rgba(255,255,255,.5)" }}>{vm.bauTag}</Text>
        <Pressable
          onPress={acoes.abrirBau}
          disabled={vm.bauAberto}
          style={[
            {
              width: 134,
              height: 134,
              borderRadius: 34,
              backgroundColor: vm.bauAberto ? (vm.bauEhItem ? vm.bauItemCor : "#7BE3C0") : "#F2C24A",
              alignItems: "center",
              justifyContent: "center",
            },
            sombra("rgba(0,0,0,.28)", 12),
          ]}
        >
          <Icon name={vm.bauAberto ? (vm.bauEhItem ? vm.bauItemIcone : "Sparkles") : "Gift"} size={58} color={vm.bauAberto && vm.bauEhItem ? "#fff" : "#0A2540"} />
        </Pressable>
        <Text style={{ fontFamily: FT, fontSize: 25, color: "#fff", textAlign: "center" }}>{vm.bauTitulo}</Text>
        {vm.bauAberto && vm.bauEhItem && (
          <Text style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: vm.bauItemCor }}>
            {vm.bauItemRaridadeTxt}
          </Text>
        )}
        <Text style={{ fontSize: 14, lineHeight: 21, color: "rgba(255,255,255,.72)", textAlign: "center", maxWidth: 290 }}>{vm.bauTexto}</Text>
        <Pressable onPress={acoes.irMapa} style={{ width: "100%", padding: 16, borderRadius: 18, backgroundColor: "#fff", alignItems: "center" }}>
          <Text style={{ fontFamily: FT, fontSize: 16, color: "#0A2540" }}>Voltar à trilha</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ───────────────────────── Quiz ─────────────────────────
function TelaQuiz({ vm, acoes }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F5F8F9" }}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#0A2540" }}>
        <View style={{ padding: 14, paddingBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Pressable
              onPress={acoes.sairQuiz}
              style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: "rgba(255,255,255,.22)", backgroundColor: "rgba(255,255,255,.08)", alignItems: "center", justifyContent: "center" }}
            >
              <Icon name="X" size={14} color="#fff" />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.55)", fontFamily: FB6 }}>
                {vm.tituloQuiz}
              </Text>
              <View style={{ marginTop: 6 }}>
                <Bar pct={vm.progPctNum} height={6} track="rgba(255,255,255,.16)" fill="#05A67A" />
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 10.5, color: "rgba(255,255,255,.55)", fontFamily: FB6 }}>XP</Text>
              <Text style={{ fontFamily: FT7, fontSize: 16, color: "#fff" }}>{vm.xpRodada}</Text>
            </View>
          </View>
          {vm.temTimer && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 9, marginTop: 12 }}>
              <Icon name="Timer" size={15} color={vm.corTempo} />
              <View style={{ flex: 1 }}>
                <Bar pct={vm.tempoPctNum} height={6} track="rgba(255,255,255,.14)" fill={vm.corTempo} />
              </View>
              <Text style={{ fontFamily: FT7, fontSize: 13.5, color: vm.corTempo, minWidth: 32, textAlign: "right" }}>{vm.tempoTxt}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {vm.modoMilhao && (
          <LinearGradient colors={["#0A2540", "#274B6B"]} style={{ margin: 16, marginBottom: 0, borderRadius: 20, padding: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Icon name="Trophy" size={16} color="#F2C24A" />
              <Text style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: "rgba(255,255,255,.7)" }}>Valendo agora</Text>
              <Text style={{ marginLeft: "auto", fontFamily: FT, fontSize: 16, color: "#F2C24A" }}>{vm.premioAtual} XP</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4, marginTop: 11 }}>
              {vm.escada.map((d: VM, i: number) => (
                <View key={i} style={{ flex: 1, height: 26, borderRadius: 7, backgroundColor: d.bg, borderWidth: 1, borderColor: d.bd, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 9, fontFamily: FT7, color: d.fg }}>{d.n}</Text>
                </View>
              ))}
            </View>
            <Text style={{ marginTop: 9, fontSize: 11.5, color: "rgba(255,255,255,.65)", lineHeight: 16 }}>{vm.escadaNota}</Text>
          </LinearGradient>
        )}

        {vm.modoMilhao && (
          <View style={{ flexDirection: "row", gap: 8, margin: 16, marginBottom: 0 }}>
            <Pressable
              onPress={acoes.usarCartas}
              disabled={vm.cartasTravada}
              style={{ flex: 1, alignItems: "center", gap: 5, padding: 11, borderRadius: 15, borderWidth: 2, borderColor: "#DCE6EA", backgroundColor: "#fff", opacity: vm.cartasTravada ? 0.45 : 1 }}
            >
              <Icon name="ListChecks" size={19} color="#1B6FD1" />
              <Text style={{ fontSize: 11, fontFamily: FB7, color: "#1B6FD1" }}>Cartas</Text>
            </Pressable>
            <Pressable
              onPress={acoes.usarPlateia}
              disabled={vm.plateiaTravada}
              style={{ flex: 1, alignItems: "center", gap: 5, padding: 11, borderRadius: 15, borderWidth: 2, borderColor: "#DCE6EA", backgroundColor: "#fff", opacity: vm.plateiaTravada ? 0.45 : 1 }}
            >
              <Icon name="UserRound" size={19} color="#05A67A" />
              <Text style={{ fontSize: 11, fontFamily: FB7, color: "#05A67A" }}>Plateia</Text>
            </Pressable>
            <Pressable
              onPress={acoes.pararMilhao}
              disabled={vm.pararTravado}
              style={{ flex: 1, alignItems: "center", gap: 5, padding: 11, borderRadius: 15, borderWidth: 2, borderColor: "#F6DDBF", backgroundColor: "#FFF6EC", opacity: vm.pararTravado ? 0.45 : 1 }}
            >
              <Icon name="Gift" size={19} color="#B96A16" />
              <Text style={{ fontSize: 11, fontFamily: FB7, color: "#B96A16" }}>Parar</Text>
            </Pressable>
          </View>
        )}

        {vm.modoCaso && (
          <LinearGradient colors={["#C2415A", "#E8735C"]} style={{ margin: 16, marginBottom: 0, borderRadius: 20, padding: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Icon name="HeartPulse" size={16} color="#fff" />
              <Text style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: "rgba(255,255,255,.85)" }}>Vida do paciente</Text>
              <Text style={{ marginLeft: "auto", fontFamily: FT, fontSize: 14, color: "#fff" }}>{vm.vidasTxt}</Text>
            </View>
            <View style={{ marginTop: 9 }}>
              <Bar pct={vm.vidasPctNum} height={10} track="rgba(0,0,0,.22)" fill="#fff" />
            </View>
            <Text style={{ marginTop: 11, fontSize: 13.5, lineHeight: 19, color: "rgba(255,255,255,.92)" }}>{vm.vinheta}</Text>
          </LinearGradient>
        )}

        <View style={{ padding: 16 }}>
          <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#DCE6EA", borderRadius: 22, padding: 18 }}>
            <View style={{ flexDirection: "row", gap: 7, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, backgroundColor: vm.chipBg }}>
                <Text style={{ fontSize: 10.5, fontFamily: FB7, textTransform: "uppercase", color: vm.chipFg }}>{vm.chipTxt}</Text>
              </View>
              <Text style={{ fontSize: 11.5, color: "#5A7383", fontFamily: FB6 }}>{vm.subChip}</Text>
            </View>
            <Text style={{ fontFamily: FT7, fontSize: 20, lineHeight: 26, color: "#0A2540" }}>{vm.enunciado}</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, gap: 10 }}>
          {vm.alternativas.map((a: VM) => (
            <Pressable
              key={a.key}
              onPress={a.click}
              style={[
                { flexDirection: "row", alignItems: "flex-start", gap: 12, padding: 14, borderRadius: 16, borderWidth: 2, borderColor: a.bd, backgroundColor: a.bg },
                sombra(a.sombra, 4),
              ]}
            >
              <View style={{ width: 24, height: 24, borderRadius: 8, backgroundColor: a.tagBg, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: FT7, fontSize: 12, color: a.tagFg }}>{a.letra}</Text>
              </View>
              <Text style={{ flex: 1, fontSize: 14.5, lineHeight: 20, fontFamily: FB6, color: a.fg }}>{a.txt}</Text>
              {a.temPct && (
                <View style={{ alignItems: "flex-end", gap: 4 }}>
                  <Text style={{ fontSize: 11, fontFamily: FT7, color: "#05A67A" }}>{a.pct}%</Text>
                  <View style={{ width: 44 }}>
                    <Bar pct={a.pct} height={5} fill="#05A67A" />
                  </View>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {vm.mostrarDica && (
          <View style={{ margin: 20, marginTop: 14, padding: 14, borderRadius: 16, backgroundColor: "#EAF3FC", borderWidth: 1, borderColor: "#C7DEF6" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Icon name="Lightbulb" size={14} color="#1B6FD1" />
              <Text style={{ fontSize: 10.5, fontFamily: FB7, letterSpacing: 1, textTransform: "uppercase", color: "#1B6FD1" }}>Dica do professor</Text>
            </View>
            <Text style={{ marginTop: 6, fontSize: 13.5, lineHeight: 19, color: "#0A2540" }}>{vm.textoDica}</Text>
          </View>
        )}

        {vm.mostrarFeedback && (
          <View style={{ margin: 20, marginTop: 16, padding: 16, borderRadius: 18, backgroundColor: vm.fbBg, borderWidth: 1, borderColor: vm.fbBd }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: vm.fbCor, alignItems: "center", justifyContent: "center" }}>
                <Icon name={vm.fbIcone} size={14} color="#fff" />
              </View>
              <Text style={{ fontFamily: FT, fontSize: 15, color: vm.fbCor }}>{vm.fbTitulo}</Text>
              <Text style={{ marginLeft: "auto", fontFamily: FT7, fontSize: 14, color: vm.fbCor }}>{vm.fbGanho}</Text>
            </View>
            {vm.temExplicacao && <Text style={{ marginTop: 9, fontSize: 13.5, lineHeight: 20, color: "#0A2540" }}>{vm.explicacao}</Text>}
          </View>
        )}
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#F5F8F9" }}>
        <View style={{ padding: 20, paddingTop: 10, flexDirection: "row", gap: 10 }}>
          {vm.temDica && (
            <Pressable
              onPress={acoes.pedirDica}
              disabled={vm.dicaTravada}
              style={{ flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 16, paddingVertical: 15, borderRadius: 16, borderWidth: 2, borderColor: "#C7DEF6", backgroundColor: "#fff", opacity: vm.dicaTravada ? 0.45 : 1 }}
            >
              <Icon name="Lightbulb" size={16} color="#1B6FD1" />
              <Text style={{ fontFamily: FB7, fontSize: 13.5, color: "#1B6FD1" }}>{vm.dicasRestantes}</Text>
            </Pressable>
          )}
          <Pressable
            onPress={acoes.avancar}
            disabled={vm.avancarTravado}
            style={[{ flex: 1, padding: 15, borderRadius: 16, backgroundColor: vm.avancarBg, alignItems: "center", opacity: vm.respondeu ? 1 : 0.7 }, sombra(vm.avancarSombra)]}
          >
            <Text style={{ fontFamily: FT, fontSize: 15.5, color: "#fff" }}>{vm.avancarTxt}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

// ───────────────────────── Fim de rodada ─────────────────────────
function TelaFim({ vm, acoes }: Props) {
  return (
    <LinearGradient
      colors={vm.fimObito ? ["#3A0F1B", "#6E2233", "#8C2E3F"] : ["#0A2540", "#0E3A5E", "#05704F"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 14 }}>
          <View
            style={{
              width: 78,
              height: 96,
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,.13)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,.35)",
              borderStyle: "dashed",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: "rgba(255,255,255,.22)" }} />
            <Text style={{ fontSize: 8, textAlign: "center", color: "rgba(255,255,255,.72)" }}>
              {vm.fimObito ? "mascote luto" : "mascote comemora"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.55)", fontFamily: FB7 }}>{vm.fimTag}</Text>
            <Text style={{ fontFamily: FT, fontSize: 36, color: "#fff", marginTop: 6 }}>{vm.fimTitulo}</Text>
          </View>
        </View>
        <Text style={{ fontSize: 15, color: "rgba(255,255,255,.78)", lineHeight: 22, marginTop: 12, maxWidth: 320 }}>{vm.fimTexto}</Text>
        <View style={{ marginTop: 16 }}>
          <Bar pct={vm.fimBarraPct} height={8} track="rgba(255,255,255,.16)" fill="#7BE3C0" />
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 18 }}>
          <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,.10)", borderWidth: 1, borderColor: "rgba(255,255,255,.16)", borderRadius: 16, padding: 14 }}>
            <Text style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontFamily: FB6 }}>Acertos</Text>
            <Text style={{ fontFamily: FT7, fontSize: 21, color: "#fff", marginTop: 3 }}>{vm.acertosTxt}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,.10)", borderWidth: 1, borderColor: "rgba(255,255,255,.16)", borderRadius: 16, padding: 14 }}>
            <Text style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontFamily: FB6 }}>XP ganho</Text>
            <Text style={{ fontFamily: FT7, fontSize: 21, color: "#fff", marginTop: 3 }}>{vm.xpRodada}</Text>
          </View>
        </View>

        {vm.novasConquistas.length > 0 && (
          <View style={{ marginTop: 12, gap: 8 }}>
            {vm.novasConquistas.map((c: VM, i: number) => (
              <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(242,153,74,.16)", borderWidth: 1, borderColor: "rgba(242,153,74,.4)", borderRadius: 16, padding: 13 }}>
                <View style={{ width: 34, height: 34, borderRadius: 11, backgroundColor: "#F2994A", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={c.icone} size={18} color="#0A2540" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: "#F2994A" }}>Conquista desbloqueada</Text>
                  <Text style={{ fontFamily: FT7, fontSize: 14.5, color: "#fff", marginTop: 1 }}>{c.nome}</Text>
                </View>
                <Text style={{ fontFamily: FB7, fontSize: 13, color: "#F2994A" }}>+{c.xp}</Text>
              </View>
            ))}
          </View>
        )}

        <Pressable onPress={acoes.irMapa} style={{ marginTop: 22, padding: 17, borderRadius: 18, backgroundColor: "#fff", alignItems: "center" }}>
          <Text style={{ fontFamily: FT, fontSize: 16, color: "#0A2540" }}>Voltar à trilha</Text>
        </Pressable>
        <Pressable onPress={acoes.irRevisao} style={{ marginTop: 14, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,.25)", backgroundColor: "rgba(255,255,255,.08)", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontFamily: FB7, fontSize: 13.5 }}>Revisar os erros</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ───────────────────────── Perfil ─────────────────────────
function TelaPerfil({ vm, acoes }: Props) {
  const [instituicao, setInstituicao] = useState(vm.instituicao);
  const [curso, setCurso] = useState(vm.curso);
  const [editandoNome, setEditandoNome] = useState(false);
  const [nomeTmp, setNomeTmp] = useState(vm.nomeJogador);
  const [emailTmp, setEmailTmp] = useState("");

  const confirmarReiniciar = () => {
    Alert.alert(
      "Refazer o nivelamento?",
      "Isso apaga seu progresso e refaz o nivelamento.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar e refazer", style: "destructive", onPress: acoes.reiniciar },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F8F9" }}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#0A2540" }}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <BotaoVoltar onPress={acoes.irMapa} />
            <Text style={{ fontFamily: FT7, fontSize: 17, color: "#fff" }}>Perfil</Text>
            <Pressable
              onPress={() => {
                setNomeTmp(vm.nomeJogador);
                setEditandoNome(true);
              }}
              style={{ marginLeft: "auto", backgroundColor: "rgba(255,255,255,.12)", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99 }}
            >
              <Text style={{ color: "#fff", fontSize: 11.5, fontFamily: FB6 }}>Trocar nome</Text>
            </Pressable>
          </View>

          {editandoNome && (
            <View style={{ marginTop: 10, flexDirection: "row", gap: 8 }}>
              <TextInput
                value={nomeTmp}
                onChangeText={setNomeTmp}
                autoFocus
                maxLength={20}
                style={{ flex: 1, backgroundColor: "rgba(255,255,255,.12)", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, color: "#fff", fontFamily: FB6 }}
                placeholder="Como quer aparecer no ranking"
                placeholderTextColor="rgba(255,255,255,.5)"
              />
              <Pressable
                onPress={() => {
                  acoes.definirNome(nomeTmp);
                  setEditandoNome(false);
                }}
                style={{ backgroundColor: "#05A67A", borderRadius: 12, paddingHorizontal: 14, alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ color: "#fff", fontFamily: FB7 }}>OK</Text>
              </Pressable>
            </View>
          )}

          <View style={{ flexDirection: "row", alignItems: "center", gap: 14, marginTop: 16 }}>
            <Pressable onPress={acoes.irAvatar} style={{ width: 78, height: 78, borderRadius: 26, overflow: "hidden" }}>
              {vm.foto ? (
                <Image source={{ uri: vm.foto }} style={{ width: "100%", height: "100%" }} />
              ) : (
                <LinearGradient colors={vm.avatarCores} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <Icon name={vm.avPreviewIcone} size={34} color="#fff" />
                </LinearGradient>
              )}
              <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingVertical: 3, backgroundColor: "rgba(10,37,64,.7)", alignItems: "center" }}>
                <Text style={{ fontSize: 9, fontFamily: FB7, color: "#fff" }}>editar</Text>
              </View>
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ fontFamily: FT, fontSize: 20, color: "#fff" }}>{vm.nomeJogador}</Text>
              <Text style={{ fontSize: 12.5, color: "rgba(255,255,255,.62)", marginTop: 3 }}>{vm.subtituloPerfil}</Text>
              <View style={{ marginTop: 8, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, backgroundColor: vm.planoBg }}>
                <Text style={{ fontSize: 11, fontFamily: FB7, color: vm.planoFg }}>{vm.planoTxt}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
            {[
              ["XP", vm.xpTxt],
              ["Ofensiva", vm.streakTxt],
              ["Lições", vm.licoesTxt],
            ].map(([label, val]) => (
              <View key={label} style={{ flex: 1, backgroundColor: "rgba(255,255,255,.10)", borderWidth: 1, borderColor: "rgba(255,255,255,.16)", borderRadius: 14, padding: 11 }}>
                <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontFamily: FB6 }}>{label}</Text>
                <Text style={{ fontFamily: FT7, fontSize: 17, color: "#fff", marginTop: 3 }}>{val}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#DCE6EA", borderRadius: 18, padding: 16, marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Icon name="BookOpen" size={16} color="#1B6FD1" />
            <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540" }}>Formação</Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 12 }}>
            {vm.situacoes.map((x: VM) => (
              <Pressable
                key={x.nome}
                onPress={() => acoes.escolherSituacao(x.nome)}
                style={{ paddingHorizontal: 13, paddingVertical: 8, borderRadius: 99, borderWidth: 1.5, borderColor: x.sel ? "#1B6FD1" : "#DCE6EA", backgroundColor: x.sel ? "#EAF3FC" : "#fff" }}
              >
                <Text style={{ fontSize: 12.5, fontFamily: FB7, color: x.sel ? "#1B6FD1" : "#5A7383" }}>{x.nome}</Text>
              </Pressable>
            ))}
          </View>
          <View style={{ marginTop: 14, gap: 9 }}>
            <View>
              <Text style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: "#5A7383" }}>Instituição</Text>
              <TextInput
                value={instituicao}
                onChangeText={setInstituicao}
                onBlur={() => acoes.setInstituicao(instituicao)}
                placeholder="Onde você estuda ou trabalha"
                style={{ marginTop: 5, padding: 12, borderRadius: 13, borderWidth: 1, borderColor: "#DCE6EA", backgroundColor: "#F8FBFC", color: "#0A2540", fontFamily: FB6 }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", fontFamily: FB7, color: "#5A7383" }}>Curso e período</Text>
              <TextInput
                value={curso}
                onChangeText={setCurso}
                onBlur={() => acoes.setCurso(curso)}
                placeholder="Ex.: Enfermagem, 4º período"
                style={{ marginTop: 5, padding: 12, borderRadius: 13, borderWidth: 1, borderColor: "#DCE6EA", backgroundColor: "#F8FBFC", color: "#0A2540", fontFamily: FB6 }}
              />
            </View>
          </View>
        </View>

        {vm.nuvemAtiva && (
          <View style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#DCE6EA", borderRadius: 18, padding: 16, marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Icon name="Sparkles" size={16} color="#05A67A" />
              <Text style={{ fontFamily: FT7, fontSize: 14, color: "#0A2540" }}>Conta na nuvem</Text>
            </View>
            {vm.emailNuvem ? (
              <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 13, color: "#0A2540", fontFamily: FB6 }}>Logado como {vm.emailNuvem}</Text>
                <Text style={{ fontSize: 11.5, color: "#5A7383", marginTop: 3 }}>Progresso sincronizado — vale nos seus outros aparelhos.</Text>
                <Pressable
                  onPress={acoes.sairNuvem}
                  style={{ marginTop: 10, alignSelf: "flex-start", paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, borderWidth: 1, borderColor: "#DCE6EA" }}
                >
                  <Text style={{ fontSize: 12.5, fontFamily: FB7, color: "#C2415A" }}>Sair</Text>
                </Pressable>
              </View>
            ) : (
              <View style={{ marginTop: 12 }}>
                <Text style={{ fontSize: 11.5, color: "#5A7383", marginBottom: 8 }}>
                  Entre com seu e-mail para levar o progresso pra outro aparelho e entrar no ranking semanal.
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TextInput
                    value={emailTmp}
                    onChangeText={setEmailTmp}
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 12, borderRadius: 13, borderWidth: 1, borderColor: "#DCE6EA", backgroundColor: "#F8FBFC", color: "#0A2540", fontFamily: FB6 }}
                  />
                  <Pressable
                    onPress={() => acoes.entrarNuvem(emailTmp)}
                    disabled={vm.statusNuvem === "enviando"}
                    style={{ backgroundColor: "#05A67A", borderRadius: 13, paddingHorizontal: 16, alignItems: "center", justifyContent: "center", opacity: vm.statusNuvem === "enviando" ? 0.6 : 1 }}
                  >
                    <Text style={{ color: "#fff", fontFamily: FB7, fontSize: 12.5 }}>Enviar link</Text>
                  </Pressable>
                </View>
                {vm.statusNuvem === "enviado" && (
                  <Text style={{ fontSize: 11.5, color: "#05A67A", marginTop: 8 }}>Link enviado — abra seu e-mail no celular e toque nele.</Text>
                )}
                {vm.statusNuvem === "erro" && (
                  <Text style={{ fontSize: 11.5, color: "#C2415A", marginTop: 8 }}>Não deu pra enviar. Confira o e-mail e tente de novo.</Text>
                )}
              </View>
            )}
          </View>
        )}

        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
          <Text style={{ fontFamily: FT7, fontSize: 15, color: "#0A2540" }}>Conquistas</Text>
          <Text style={{ color: "#5A7383", fontSize: 13, fontFamily: FB6 }}>{vm.conquistasTxt}</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 9 }}>
          {vm.conquistas.map((c: VM, i: number) => (
            <View key={i} style={{ width: "48%", flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: c.bg, borderWidth: 1, borderColor: c.bd, borderRadius: 16, padding: 12 }}>
              <View style={{ width: 34, height: 34, borderRadius: 12, backgroundColor: c.iconBg, alignItems: "center", justifyContent: "center" }}>
                <Icon name={c.icone} size={18} color={c.iconFg} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: FB7, fontSize: 12.5, color: c.txtCor }}>{c.nome}</Text>
                <Text style={{ fontSize: 10.5, color: "#8FA3AE", marginTop: 2 }}>{c.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={{ fontFamily: FT7, fontSize: 15, color: "#0A2540", marginTop: 24, marginBottom: 10 }}>Melhores rodadas</Text>
        <View style={{ gap: 8 }}>
          {vm.ranking.map((r: VM, i: number) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 13, backgroundColor: r.bg, borderWidth: 1, borderColor: r.bd, borderRadius: 16, padding: 13 }}>
              <View style={{ width: 28, height: 28, borderRadius: 9, backgroundColor: r.medBg, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: FT7, fontSize: 13, color: r.medFg }}>{r.pos}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontFamily: FB7, fontSize: 14, color: "#0A2540" }}>{r.nome}</Text>
                <Text style={{ fontSize: 11.5, color: "#5A7383", marginTop: 1 }}>{r.detalhe}</Text>
              </View>
              <Text style={{ fontFamily: FT7, fontSize: 16, color: "#05A67A" }}>{r.pontos}</Text>
            </View>
          ))}
          {vm.rankingVazio && (
            <Text style={{ textAlign: "center", padding: 32, color: "#5A7383", fontSize: 13.5, lineHeight: 19 }}>Nenhuma rodada concluída ainda.</Text>
          )}
        </View>

        <Pressable
          onPress={acoes.verTutorial}
          style={{ marginTop: 22, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: "#DCE6EA", backgroundColor: "#fff" }}
        >
          <Icon name="BookOpen" size={16} color="#1B6FD1" />
          <Text style={{ color: "#1B6FD1", fontFamily: FB7, fontSize: 13.5 }}>Rever o tutorial</Text>
        </Pressable>
        <Pressable
          onPress={confirmarReiniciar}
          style={{ marginTop: 10, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: "#DCE6EA", backgroundColor: "#fff", alignItems: "center" }}
        >
          <Text style={{ color: "#C2415A", fontFamily: FB7, fontSize: 13 }}>Refazer o teste de nivelamento</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

// ───────────────────────── Revisão ─────────────────────────
function TelaRevisao({ vm, acoes }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#F5F8F9" }}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#0A2540" }}>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <BotaoVoltar onPress={acoes.irMapa} />
            <Text style={{ fontFamily: FT7, fontSize: 17, color: "#fff" }}>Revisão dos erros</Text>
            <Pressable onPress={acoes.limparErros} style={{ marginLeft: "auto", backgroundColor: "rgba(255,255,255,.12)", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99 }}>
              <Text style={{ color: "#fff", fontSize: 11.5, fontFamily: FB6 }}>Limpar</Text>
            </Pressable>
          </View>
          <Text style={{ marginTop: 10, fontSize: 12.5, color: "rgba(255,255,255,.6)", lineHeight: 18 }}>{vm.revisaoResumo}</Text>
        </View>
      </SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 10 }}>
        {vm.erros.map((e: VM, i: number) => (
          <View key={i} style={{ backgroundColor: "#fff", borderWidth: 1, borderColor: "#DCE6EA", borderRadius: 18, padding: 15 }}>
            <Text style={{ fontSize: 10.5, fontFamily: FB7, letterSpacing: 1, textTransform: "uppercase", color: e.cor }}>{e.tema}</Text>
            <Text style={{ marginTop: 7, fontFamily: FT7, fontSize: 15, lineHeight: 20, color: "#0A2540" }}>{e.q}</Text>
            <View style={{ marginTop: 10, flexDirection: "row", gap: 8 }}>
              <Text style={{ fontSize: 10.5, fontFamily: FB7, color: "#C2415A" }}>SUA</Text>
              <Text style={{ flex: 1, fontSize: 13, lineHeight: 19, color: "#5A7383", textDecorationLine: "line-through" }}>{e.sua}</Text>
            </View>
            <View style={{ marginTop: 5, flexDirection: "row", gap: 8 }}>
              <Text style={{ fontSize: 10.5, fontFamily: FB7, color: "#05A67A" }}>OK</Text>
              <Text style={{ flex: 1, fontSize: 13, lineHeight: 19, color: "#0A2540", fontFamily: FB6 }}>{e.certa}</Text>
            </View>
            <View style={{ marginTop: 11, paddingTop: 11, borderTopWidth: 1, borderTopColor: "#DCE6EA", borderStyle: "dashed" }}>
              <Text style={{ fontSize: 12.5, lineHeight: 19, color: "#5A7383" }}>{e.exp}</Text>
            </View>
          </View>
        ))}
        {vm.revisaoVazia && (
          <Text style={{ textAlign: "center", padding: 40, color: "#5A7383", fontSize: 13.5, lineHeight: 19 }}>
            Sem erros guardados.{"\n"}Eles aparecem aqui assim que surgirem.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
