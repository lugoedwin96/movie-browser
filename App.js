import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, TextInput, Button } from 'react-native';
import ScreenOne from './Screens/ScreenOne';
import ScreenTwo from './Screens/ScreenTwo';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState('back to');
  const [page, setPage] = useState('1');

  // want to view more items? = true/false (if false then leave it as it is to view the current items)
  // is there any more items to view? = true/false (if false then get rid of the button to view more items)
    // if both true then send request, add to the array to view and display the items from the next page
  

  // useEffect(() => {
    function newSearchDb() {
      fetch(`http://www.omdbapi.com/?i=tt12345678&apikey=e7325d78&page=${page}&s=${query}&type=movie`)
      .then(response => response.json())
      .then((data) => {
        console.log(data.Search);
        console.log(data);
        setData(data.Search);
      })
      .catch((error) => { console.log(error) })
      .finally(() => setLoading(false));
    }
    // }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <View style={{ height:60 }}>
        <TextInput placeholder="Search..." value={query} onChangeText={(query) => setQuery(query)} style={{ flex:1, backgroundColor: '#ededed' }} />
        <Button title="submit" onPress={() => newSearchDb() } />
      </View>

      {isLoading ?
      <Text>Is loading...</Text> :
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={() =>
              navigation.navigate("Details" , { Year: item.Year, Title: item.Title })} >
              <Text key={item.imdbID}>{item.Title}</Text>
              
            </TouchableWithoutFeedback>
          )}
        />
      </View>}
    </View>
  );
}

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={ScreenOne} />
    </Stack.Navigator>
  </NavigationContainer>
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
