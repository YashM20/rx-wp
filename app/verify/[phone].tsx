import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaskInput from 'react-native-mask-input';

const Page = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const router = useRouter();
  const { signIn } = useAuth();

  const verifyCode = async () => {
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter a valid code');
      return;
    }

    setLoading(true);
    try {
      // In a real app, you would verify the code here
      // For now, we'll just simulate successful verification
      await signIn(phone);
      router.replace('/(tabs)/chats');
    } catch (err) {
      Alert.alert('Error', 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
      behavior="padding">
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ fontSize: 18, padding: 10 }}>Verifying code...</Text>
        </View>
      )}

      <View style={styles.container}>
        <Text style={styles.description}>
          Enter the 6-digit code sent to your phone number {phone}
        </Text>

        <MaskInput
          value={code}
          keyboardType="numeric"
          autoFocus
          placeholder="------"
          onChangeText={(masked, unmasked) => {
            setCode(masked);
          }}
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, code.length === 6 ? styles.enabled : null]}
          onPress={verifyCode}>
          <Text style={[styles.buttonText, code.length === 6 ? styles.enabled : null]}>Verify</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 36,
    padding: 10,
    textAlign: 'center',
    letterSpacing: 20,
    borderRadius: 10,
  },
  loading: {
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
