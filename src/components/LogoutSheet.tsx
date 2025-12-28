import React, { useMemo, forwardRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

type LogoutSheetProps = {
  onLogout: () => void;
  title: string;
};

export const LogoutSheet = forwardRef<any, LogoutSheetProps>(({ onLogout, title }, ref: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <RBSheet
        ref={ref}
        height={200}
        openDuration={250}
        customStyles={{
            container: {
                ...styles.sheetContainer,
                backgroundColor: theme.colors.surface
            }
        }}
    >
         <View style={styles.logoutSheetContent}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <Text style={styles.logoutMessage}>{t('logoutMessage')}</Text>
            
            <View style={styles.logoutButtons}>
                <TouchableOpacity style={[styles.sheetButton, styles.cancelButton]} onPress={() => ref.current?.close()}>
                    <Text style={[styles.sheetButtonText, { color: theme.colors.textPrimary }]}>{t('cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sheetButton, styles.confirmButton]} onPress={onLogout}>
                    <Text style={[styles.sheetButtonText, { color: 'white' }]}>{t('logout')}</Text>
                </TouchableOpacity>
            </View>
         </View>
    </RBSheet>
  );
});

const getStyles = (theme: any) => StyleSheet.create({
  sheetContainer: {
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
  },
  sheetTitle: {
      ...theme.typography.subheader,
      color: theme.colors.textPrimary,
  },
  logoutSheetContent: {
      flex: 1,
      padding: theme.spacing.l,
      alignItems: 'center',
      justifyContent: 'center',
  },
  logoutMessage: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xl,
      textAlign: 'center',
  },
  logoutButtons: {
      flexDirection: 'row',
      gap: theme.spacing.m,
  },
  sheetButton: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: theme.borderRadius.m,
      borderWidth: 1,
      borderColor: theme.colors.border,
  },
  cancelButton: {
      backgroundColor: theme.colors.surface,
  },
  confirmButton: {
      backgroundColor: theme.colors.error,
      borderColor: theme.colors.error,
  },
  sheetButtonText: {
      ...theme.typography.button,
  },
});
