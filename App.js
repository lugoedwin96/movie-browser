import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json')
    .then(response => response.json() )
    .then((data) => { setData(data.title) })
    .catch((error) => { console.log(error) })
    .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
    {isLoading ? <Text>Is loading ...</Text> : <Text>This is the a + {data}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
