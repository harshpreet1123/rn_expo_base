import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

import { useAppDispatch, useAppSelector } from '../store';
import { setThemeMode } from '../store/slices/settingsSlice';

export const SettingsScreen = () => {
    const dispatch = useAppDispatch();
    const isDark = useAppSelector((state) => state.settings.themeMode === 'dark');
    
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const SettingSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>{title}</Text>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );

    const SettingItem = ({ 
        label, 
        icon, 
        isSwitch = false, 
        value = false, 
        onValueChange,
        onPress
    }: {
        label: string,
        icon: any,
        isSwitch?: boolean,
        value?: boolean,
        onValueChange?: (val: boolean) => void,
        onPress?: () => void
    }) => (
        <TouchableOpacity 
            style={styles.item} 
            activeOpacity={isSwitch ? 1 : 0.7}
            onPress={isSwitch ? undefined : onPress}
        >
            <View style={styles.iconContainer}>
                 <Ionicons name={icon} size={20} color={theme.colors.textPrimary} />
            </View>
            <Text style={styles.itemLabel}>{label}</Text>
            {isSwitch ? (
                <Switch
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                    thumbColor={theme.colors.surface}
                    ios_backgroundColor={theme.colors.border}
                    onValueChange={onValueChange}
                    value={value}
                />
            ) : (
                 <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} />
            )}
        </TouchableOpacity>
    );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>Settings</Text>

        <SettingSection title="Preferences">
            <SettingItem 
                label="Push Notifications" 
                icon="notifications-outline" 
                isSwitch 
                value={notificationsEnabled} 
                onValueChange={setNotificationsEnabled} 
            />
            <View style={styles.separator} />
            <SettingItem 
                label="Email Updates" 
                icon="mail-outline" 
                isSwitch 
                value={emailUpdates} 
                onValueChange={setEmailUpdates} 
            />
            <View style={styles.separator} />
            <SettingItem 
                label="Dark Mode" 
                icon="moon-outline" 
                isSwitch 
                value={isDark} 
                onValueChange={(val) => dispatch(setThemeMode(val ? 'dark' : 'light'))} 
            />
        </SettingSection>

        <SettingSection title="Account">
            <SettingItem label="Change Password" icon="lock-closed-outline" />
            <View style={styles.separator} />
            <SettingItem label="Privacy Settings" icon="eye-off-outline" />
            <View style={styles.separator} />
            <SettingItem label="Data Usage" icon="cellular-outline" />
        </SettingSection>

        <SettingSection title="About">
            <SettingItem label="Terms of Service" icon="document-text-outline" />
            <View style={styles.separator} />
            <SettingItem label="Privacy Policy" icon="shield-outline" />
        </SettingSection>

      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.m,
  },
  headerTitle: {
      ...theme.typography.header,
      marginBottom: theme.spacing.l,
      color: theme.colors.textPrimary,
  },
  section: {
      marginBottom: theme.spacing.l,
  },
  sectionHeader: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      fontWeight: '600',
      marginBottom: theme.spacing.s,
      textTransform: 'uppercase',
      marginLeft: theme.spacing.xs,
  },
  sectionContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.l,
      ...theme.shadows.low,
      overflow: 'hidden',
  },
  item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.m,
  },
  iconContainer: {
      marginRight: theme.spacing.m,
  },
  itemLabel: {
      flex: 1,
      ...theme.typography.body,
      color: theme.colors.textPrimary,
  },
  separator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginLeft: 50, // Indent separator to align with text
  }
});
