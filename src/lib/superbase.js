import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const superbaseUrl = process.env.EXPO_PUBLIC_SUPERBASE_URL;
const superbaseAnonKey = process.env.EXPO_PUBLIC_SUPERBASE_ANON_KEY;

if (!superbaseUrl || !superbaseAnonKey) {
    throw new Error(
        'Superbase URL and Anon Key must be set in the environment variables.'
    );
}

export const superbase = createClient(superbaseUrl, superbaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        persistSession: true,
        autoRefreshToken: true,
    },
});