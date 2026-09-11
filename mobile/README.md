# Nurse GO — app mobile

App nativo (Expo / React Native) de estudo de enfermagem: trilha
gamificada de fisiologia e anatomia dos sistemas cardiovascular e
respiratório, com roleta, Show do Milhão da Saúde e casos de emergência.

## Rodar agora, no seu celular

```bash
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** (Android/iOS) — não precisa de
conta de desenvolvedor para isso. Todo o progresso fica salvo no
aparelho (AsyncStorage); nada depende de backend para funcionar.

## Estrutura

```
src/
  data/        banco de questões, casos de emergência, constantes de jogo
  lib/         regras puras (engine), storage (AsyncStorage), supabase/cloud
  hooks/       useNurseGo — motor de estado do app (telas, XP, energia, trilha)
  components/  UI nativa (NurseGo, Wheel, Icon, Bar)
App.tsx        carrega fontes e inicia o app
```

## Conta na nuvem (opcional)

Sem nenhuma variável de ambiente, o app funciona 100% local. Para
ligar login, progresso sincronizado e ranking semanal:

1. Crie um projeto gratuito em https://supabase.com
2. Rode `../supabase/schema.sql` no SQL Editor do projeto
3. Copie `.env.example` para `.env` e preencha `EXPO_PUBLIC_SUPABASE_URL`
   e `EXPO_PUBLIC_SUPABASE_ANON_KEY`
4. Em Authentication > Providers, habilite **Email** (link mágico)
5. Em Authentication > URL Configuration > Redirect URLs, adicione
   `nursego://auth/callback` — esse é o endereço que o app usa quando já
   está instalado de verdade (build EAS, veja abaixo)

A tela **Perfil** ganhou uma seção "Conta na nuvem" (aparece só quando
as variáveis acima existem): digita o e-mail, manda o link mágico,
abre o e-mail no celular e toca no link.

**Testando pelo Expo Go:** o app ainda não tem um esquema `nursego://`
de verdade — só passa a existir depois do primeiro build (EAS dev
client ou standalone). Enquanto isso, o Expo Go usa uma URL dinâmica
tipo `exp://192.168.x.x:8081/--/auth/callback`, que muda a cada sessão.
Pra testar o login já, adicione **também** `exp://**` nos Redirect URLs
do Supabase (aceita wildcard) — ou simplesmente deixe pra testar depois
que existir um build de dev client.

Login com Google fica para uma v2 — precisa de `expo-auth-session` e
esquema nativo registrado nas lojas.

## Publicar nas lojas (EAS)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android   # gera .aab para a Play Store
eas build --platform ios       # gera .ipa para a App Store / TestFlight
eas submit --platform android  # envia direto à Play Console
eas submit --platform ios      # envia direto ao App Store Connect
```

Precisa de:
- conta Expo (gratuita)
- Google Play Console (US$ 25, pagamento único) para Android
- Apple Developer Program (US$ 99/ano) para iOS

## Pendências antes de produção

Ver `../README.md` na raiz do repositório para a lista completa
(conteúdo por revisar, arte, monetização real, testes).
