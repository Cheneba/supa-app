import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';


const InitialLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false)

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('supabase.auth.onAuthStateChange', event, session);
      setSession(session)
      setInitialized(true)
    })

    return () => {
      data.subscription.unsubscribe();
    }
  }, [])

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if(session && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (!session) {
      router.replace('/')
    }

  }, [initialized, session])
  
  return <Slot/>
}

export default InitialLayout;