import React, { useMemo, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, I18nManager, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useAppDispatch } from '../store';
import { logout } from '../store/slices/authSlice';
import { ProfileMenuItem } from '../components/ProfileMenuItem';
import { LogoutSheet } from '../components/LogoutSheet';
import { RootStackParamList, MainTabParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const ProfileScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const logoutSheetRef = useRef<any>(null);

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
              icon="settings-outline"
              label={t('settings')}
              onPress={() => navigation.navigate('Settings')}
              showChevron
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
