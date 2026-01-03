# React Native Expo Base Template

A professional, feature-rich starter template for building high-quality mobile applications with React Native and Expo. This template mirrors the robustness of our Flutter architecture, tailored for the React ecosystem.

## 🚀 Features

*   **Robust Authentication**: Pre-configured Redux Slices for Login, Signup, and auto-login flows.
*   **Networking**: Modern **RTK Query** setup with:
    *   Auto-injected Auth Headers.
    *   Environment variable support (`.env`).
    *   Caching and automatic re-fetching.
*   **Navigation**: 
    *   React Navigation v7 (Stack & Tabs).
    *   **Type-Safe Navigation**: Fully typed screens and route parameters using TypeScript.
*   **Internationalization (i18n)**:
    *   Powered by `i18next` and `expo-localization`.
    *   Full support for **English, Spanish, Arabic**.
    *   **RTL Support**: Automatic layout handling.
*   **Theming**:
    *   Dynamic **Light/Dark mode** support.
    *   Redux-managed, persisted user preference.
*   **State Management**: Scalable architecture using **Redux Toolkit**.
*   **Secure & Local Storage**:
    *   `AsyncStorage` for non-sensitive settings (Theme, Language).
    *   `Expo SecureStore` for sensitive data (Auth Tokens).
    *   Unified `StorageKeys` constants.

## 🛠 Tech Stack

*   **Framework**: React Native (Expo SDK 54+)
*   **Language**: TypeScript
*   **State Management**: Redux Toolkit (RTK)
*   **Networking**: RTK Query
*   **Navigation**: React Navigation v7
*   **Forms**: Formik + Yup
*   **Storage**: Expo SecureStore + AsyncStorage
*   **Icons**: Ionicons

## 📂 Project Structure

The project structure is designed to be intuitive and scalable.

```
src/
├── components/          # Reusable UI components (Buttons, Inputs)
├── constants/           # Global constants (StorageKeys, Colors)
├── hooks/               # Custom React Hooks
├── i18n/                # Localization resources (JSON files)
├── navigation/          # React Navigation setup (Stacks, Tabs)
├── screens/             # Application screens (Pages)
├── services/            # Infrastructure services
│   └── baseApi.ts       # RTK Query API definition with Auth Interceptor
├── store/               # Redux Store & Slices
│   └── slices/          # Feature slices (Auth, Settings)
├── theme/               # Design System & Theme Config
└── utils/               # Utility functions (Storage wrappers)
```

## ⚡ Getting Started

### 1. Requirements

*   Node.js (LTS)
*   Expo CLI (`npx expo`)
*   iOS Simulator or Android Emulator

### 2. Setup

Install dependencies:

```bash
npm install
```

### 3. Environment Config

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

### 4. Run the App

```bash
npx expo start
```
*   Press `a` for Android.
*   Press `i` for iOS.

## 📖 Development Guide

### How to Add a New Page

1.  Create the screen component in `src/screens/MyNewScreen.tsx`.
2.  Define the props type using `NativeStackScreenProps` or `BottomTabScreenProps`:
    ```tsx
    import { NativeStackScreenProps } from '@react-navigation/native-stack';
    import { RootStackParamList } from '../navigation/types';

    type Props = NativeStackScreenProps<RootStackParamList, 'MyNewScreen'>;

    export const MyNewScreen = ({ navigation }: Props) => { ... }
    ```
3.  Add the route name to `src/navigation/types.ts`:
    ```typescript
    export type RootStackParamList = {
      // ...
      MyNewScreen: undefined;
    };
    ```
4.  Add it to the navigator (e.g., `src/navigation/MainNavigator.tsx`).

### How to Add/Edit Translations

1.  Open `src/i18n/locales/en.json`.
2.  Add your new key-value pair.
3.  Add the same key to `es.json` and `ar.json`.
4.  Use it in code:
    ```tsx
    const { t } = useTranslation();
    <Text>{t('myNewKey')}</Text>
    ```

### Networking (RTK Query)

The `baseApi.ts` is already set up.

1.  Add endpoints to `src/services/baseApi.ts`:
    ```typescript
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    ```
2.  Auto-generated hooks will be available:
    ```typescript
    const { data, isLoading } = useGetUsersQuery();
    ```

## 🧹 Maintenance

*   **Linting**: Run `npm run lint` to check for issues (if configured).
*   **Types**: Ensure strict typing is maintained in `types.ts` for all navigation routes.
