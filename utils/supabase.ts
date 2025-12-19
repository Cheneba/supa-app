import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js';
import { AppState } from "react-native";
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPERBASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPERBASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

AppState.addEventListener('change', (nextAppState) => {
    if(nextAppState === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
})