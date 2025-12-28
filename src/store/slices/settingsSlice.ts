import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getString, saveString, STORAGE_KEYS } from '../../utils/preferences';

export const loadTheme = createAsyncThunk(
  'settings/loadTheme',
  async () => {
    const theme = await getString(STORAGE_KEYS.THEME);
    if (theme === 'light' || theme === 'dark' || theme === 'system') {
      return theme;
    }
    return 'system';
  }
);

export const updateTheme = createAsyncThunk(
  'settings/updateTheme',
  async (theme: 'light' | 'dark' | 'system') => {
    await saveString(STORAGE_KEYS.THEME, theme);
    return theme;
  }
);

export const loadLanguage = createAsyncThunk(
  'settings/loadLanguage',
  async () => {
    const language = await getString(STORAGE_KEYS.LANGUAGE);
    return language; // Return null if not found
  }
);

export const updateLanguage = createAsyncThunk(
  'settings/updateLanguage',
  async (language: string) => {
    await saveString(STORAGE_KEYS.LANGUAGE, language);
    return language;
  }
);

interface SettingsState {
  themeMode: 'light' | 'dark' | 'system';
  language: string | null;
}

const initialState: SettingsState = {
  themeMode: 'system',
  language: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.themeMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTheme.fulfilled, (state, action) => {
      state.themeMode = action.payload;
    });
    builder.addCase(updateTheme.fulfilled, (state, action) => {
      state.themeMode = action.payload;
    });
    builder.addCase(loadLanguage.fulfilled, (state, action) => {
      if (action.payload) {
        state.language = action.payload;
      }
    });
    builder.addCase(updateLanguage.fulfilled, (state, action) => {
      state.language = action.payload;
    });
  },
});

export const { setThemeMode } = settingsSlice.actions;
export default settingsSlice.reducer;
