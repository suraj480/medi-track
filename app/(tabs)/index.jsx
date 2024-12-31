import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';
export default function HomeScreen() {
  return (
    <View>
      <Text>
        Home screen
      </Text>
      <Redirect href={'login'} />
    </View>
  );
}

