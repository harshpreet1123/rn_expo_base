import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAppDispatch, useAppSelector } from '../store';
import { login } from '../store/slices/authSlice';
import { useTheme } from '../hooks/useTheme';

export const LoginScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (values: any) => {
    dispatch(login({ email: values.email }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Ionicons name="cube-outline" size={64} color={theme.colors.primary} />
            </View>
            <Text style={styles.title}>{t('welcome')}</Text>
            <Text style={styles.subtitle}>{t('loginSubtitle')}</Text>
          </View>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
              <View style={styles.form}>
                <Input
                  label={t('email')}
                  placeholder={t('enterEmail')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                  leftIcon="mail-outline"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <Input
                  label={t('password')}
                  placeholder={t('enterPassword')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  error={touched.password && errors.password ? errors.password : undefined}
                  leftIcon="lock-closed-outline"
                  secureTextEntry
                />

                <View style={styles.forgotPassword}>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPasswordText}>{t('forgotPassword')}</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title={t('signIn')}
                    onPress={() => handleSubmit()}
                    loading={isLoading}
                    style={styles.button}
                />

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>{t('or')}</Text>
                    <View style={styles.dividerLine} />
                </View>
                
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                        <Ionicons name="logo-google" size={24} color={theme.colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                        <Ionicons name="logo-apple" size={24} color={theme.colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
                        <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                    </TouchableOpacity>
                </View>
              
                <Text style={styles.footerText}>
                    {t('dontHaveAccount')} <Text style={styles.signUpText} onPress={() => navigation.navigate('Signup')}>{t('signUp')}</Text>
                </Text>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.l,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.m,
    ...theme.shadows.medium,
  },
  title: {
    ...theme.typography.header,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  forgotPassword: {
      alignItems: 'flex-end',
      marginBottom: theme.spacing.m,
  },
  forgotPasswordText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      fontWeight: '600',
  },
  button: {
    marginBottom: theme.spacing.l,
    ...theme.shadows.low,
  },
  divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.l,
  },
  dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
  },
  dividerText: {
      marginHorizontal: theme.spacing.m,
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.l,
    gap: theme.spacing.l, // Space evenly
  },
  socialButton: {
      width: 56,
      height: 56,
      borderRadius: 28, // Round
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
  },
  footerText: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
  signUpText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
  }
});
