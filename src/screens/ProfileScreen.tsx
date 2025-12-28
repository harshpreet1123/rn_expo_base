import React, { useMemo, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, I18nManager, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/slices/authSlice';
import { setThemeMode, updateTheme, updateLanguage } from '../store/slices/settingsSlice';
import { ProfileMenuItem } from '../components/ProfileMenuItem';
import { LanguageSheet } from '../components/LanguageSheet';
import { LogoutSheet } from '../components/LogoutSheet';

export const ProfileScreen = () => {
  const { theme, isDark } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const languageSheetRef = useRef<any>(null);
  const logoutSheetRef = useRef<any>(null);

  const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
  ];

  const currentLanguageLabel = LANGUAGES.find(l => l.code === i18n.language)?.label || 'English';

  // Settings Toggles
  const handleThemeChange = (value: boolean) => {
    dispatch(updateTheme(value ? 'dark' : 'light'));
  };

  const changeLanguage = async (langCode: string) => {
    i18n.changeLanguage(langCode);
    dispatch(updateLanguage(langCode));
    languageSheetRef.current?.close();

    const isRTL = langCode === 'ar';
    if (isRTL !== I18nManager.isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      Alert.alert(
        t('restartRequired'), // Make sure to add this key or just use English for now if simple
        "This change requires an app restart to take full effect.",
        [
          {
            text: "Restart Now",
            onPress: async () => {
              try {
                await Updates.reloadAsync();
              } catch {
                // Fallback for dev client if updates not available
                Alert.alert("Please restart the app manually.");
              }
            }
          },
          { text: "Later", style: "cancel" }
        ]
      );
    }
  };

  const confirmLogout = () => {
    logoutSheetRef.current?.close();
    dispatch(logout());
  };

  const handleLogout = () => {
    logoutSheetRef.current?.open();
  };



  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color={theme.colors.surface} />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuContainer}>
            <ProfileMenuItem
              icon="moon-outline"
              label={t('darkMode')}
              isSwitch
              switchValue={isDark}
              onSwitchChange={handleThemeChange}
            />
            <View style={styles.divider} />
            <ProfileMenuItem
              icon="language-outline"
              label={t('language')}
              value={currentLanguageLabel}
              onPress={() => languageSheetRef.current?.open()}
            />
          </View>
        </View>

        <View style={[styles.section, { marginTop: theme.spacing.l }]}>
          <View style={styles.menuContainer}>
            <ProfileMenuItem
              icon="log-out-outline"
              label={t('logout')}
              onPress={handleLogout}
              color={theme.colors.error}
            />
          </View>
        </View>

        <LanguageSheet
          ref={languageSheetRef}
          languages={LANGUAGES}
          currentLanguage={i18n.language}
          onLanguageChange={changeLanguage}
        />

        <LogoutSheet
          ref={logoutSheetRef}
          title={t('logout')}
          onLogout={confirmLogout}
        />


      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.l,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.m,
    ...theme.shadows.medium,
  },
  name: {
    ...theme.typography.subheader,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    ...theme.typography.caption,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  section: {
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.s,
    marginBottom: theme.spacing.s,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    overflow: 'hidden',
    ...theme.shadows.low,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginLeft: 68, // Icon width + margin + padding
  },
});
