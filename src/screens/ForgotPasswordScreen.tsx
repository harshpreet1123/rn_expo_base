import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useTheme } from '../hooks/useTheme';

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const handleReset = (values: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(t('emailSent'), t('emailSentMessage'));
      navigation.navigate('Login');
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{t('forgotPassword')}</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>{t('emailSentMessage')}</Text>
          </View>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleReset}
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

                <Button
                  title={t('sendInstructions')}
                  onPress={() => handleSubmit()}
                  loading={loading}
                  style={styles.button}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 16,
  },
});
