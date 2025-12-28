
# Expo + React Native Professional Starter

A production-ready, scalable, and beautifully designed React Native template using Expo. Built for performance, developer experience, and maintainability.

## 🚀 Features

- **Core Stack**: React Native (latest), Expo SDK 54, TypeScript.
- **Navigation**: React Navigation 7 (Stack & Bottom Tabs) with isolated navigators.
- **Internationalization (i18n)**:
  - Built-in support for **English, Spanish, German, Hindi, Punjabi, Japanese, Korean**.
  - Auto-language detection using `expo-localization`.
  - Dynamic language switching with instant UI updates.
  - Modular translation files (`.json`) in `src/i18n/locales`.
- **State Management**: Redux Toolkit + RTK Query configured.
- **Styling**:
  - **Custom Theme System**: Microsoft Flat UI inspired, supporting **Dark Mode** & **Light Mode**.
  - **Figma-like Tokens**: Clean color palette (Slate), consistent spacing, and Inter typography.
  - **Hooks**: `useTheme` hook for dynamic styling.
  - **Safe Area**: Handling of safe areas and navigation bar insets.
- **Authentication**: Pre-built Login, Signup, and Forgot Password flows with Formik & Yup validation.
- **Storage**: Secure storage using `expo-secure-store`.
- **Fonts**: Pre-integrated Google Fonts (Inter).
- **Splash Screen**: Programmatic control via `expo-splash-screen`.
- **Components**: Reusable, polished components:
  - `Button`, `Input`
  - `ProfileMenuItem`, `LanguageSheet`, `LogoutSheet` (using **react-native-raw-bottom-sheet**)

## 📂 Project Structure

```bash
src/
├── components/   # Reusable UI components (Button, Input, Sheets, etc.)
├── constants/    # App-wide constants
├── hooks/        # Custom hooks (useTheme, etc.)
├── i18n/         # Internationalization setup and locales
│   ├── locales/  # JSON translation files (en, es, de, etc.)
│   └── index.ts  # i18n initialization
├── navigation/   # Navigation setup (AuthNavigator, MainNavigator, AppNavigator)
├── screens/      # Application screens (Login, Home, Profile, etc.)
├── services/     # API services (RTK Query baseApi)
├── store/        # Redux setup (Slices, Store configuration)
├── theme/        # Design tokens (Colors, Spacing, Typography)
├── types/        # TypeScript Definitions
└── utils/        # Utility functions (Storage helpers)
```

## 🛠 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start the Project**
    ```bash
    npx expo start -c
    ```

## 🎨 Customization Guide

### 1. Theming & Colors
The theme is centralized in `src/theme/theme.ts`. To customize the brand colors:
-   Open `src/theme/theme.ts`.
-   Update `colors.primary`, `colors.surface`, etc.
-   The dark mode logic is handled in `src/hooks/useTheme.ts`. You can customize dark mode overrides there.

### 2. Internationalization (i18n)
-   **Add a Language**:
    1.  Create `src/i18n/locales/[lang].json`.
    2.  Import it in `src/i18n/index.ts` and add it to the `resources` object.
    3.  Add the language option to the `LANGUAGES` array in `src/screens/ProfileScreen.tsx`.
-   **Use Translations**:
    ```tsx
    import { useTranslation } from 'react-i18next';
    
    const MyComponent = () => {
      const { t } = useTranslation();
      return <Text>{t('welcome')}</Text>;
    };
    ```

### 3. Adding New Screens
1.  Create your screen component in `src/screens/`.
2.  Use the `useTheme` hook for styling:
    ```tsx
    import { useTheme } from '../hooks/useTheme';

    const MyScreen = () => {
      const { theme, isDark } = useTheme();
      const styles = getStyles(theme);
      // ...
    };
    
    const getStyles = (theme) => StyleSheet.create({ ... });
    ```
3.  Add the screen to `src/navigation/MainNavigator.tsx` or `src/navigation/AuthNavigator.tsx`.

## 📦 Key Libraries Used
-   `@react-navigation/*`: For routing.
-   `@reduxjs/toolkit` & `react-redux`: For state.
-   `i18next` & `react-i18next`: For translations.
-   `formik` & `yup`: For forms.
-   `react-native-raw-bottom-sheet`: For modal interactions.
-   `expo-secure-store`: For storing tokens securely.
-   `expo-font` & `@expo-google-fonts/inter`: For typography.

## 📱 Navigation Structure
-   **AuthNavigator**: Login -> Signup / Forgot Password.
-   **MainNavigator** (Protected): Home | Explore | Activity | Profile.
-   **AppNavigator**: Root navigator switching between Auth and Main based on authentication state.

## 📄 License
MIT
