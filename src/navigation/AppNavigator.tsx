import React, { useEffect } from 'react';
import { View, ActivityIndicator, I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useAppSelector, useAppDispatch } from '../store';
import { restoreToken } from '../store/slices/authSlice';
import { loadTheme, loadLanguage } from '../store/slices/settingsSlice';
import { getToken } from '../utils/storage';
import { useTheme } from '../hooks/useTheme';
import i18n from '../i18n';

export const AppNavigator = () => {
    const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isRestoring, setIsRestoring] = React.useState(true);
    const { theme, isDark } = useTheme();

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken('userToken');
            if (token) {
                // You would typically validate the token here or fetch user profile
                dispatch(restoreToken({ token, user: { name: 'Returned User', email: 'user@example.com' } }));
            }
            setIsRestoring(false);
        };

        // Load preferences
        console.log('Current RTL Status:', I18nManager.isRTL);
        dispatch(loadTheme()); // Load theme preference
        dispatch(loadLanguage()).then((action) => {
            if (loadLanguage.fulfilled.match(action) && action.payload) {
                i18n.changeLanguage(action.payload);
            }
        });

        checkToken();
    }, [dispatch]);

    if (isRestoring || isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        )
    }

    const navigationTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: theme.colors.background,
            card: theme.colors.surface,
            text: theme.colors.textPrimary,
            border: theme.colors.border,
            primary: theme.colors.primary,
        }
    };

    return (
        <NavigationContainer theme={navigationTheme}>
            <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={theme.colors.background} />
            {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};
