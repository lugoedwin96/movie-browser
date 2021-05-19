import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, Button, Alert, FlatList, TouchableWithoutFeedback, ScrollView} from 'react-native';
import DetailsPage from './Screens/DetailsPage';
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const [hasTooManyResults, setHasTooManyResults] = useState(false);
  const [viewItems, setViewItems] = useState(false);
  const [moreItemsToView, setMoreItemsToView] = useState(false);


    useEffect(() => {
      if (viewItems && moreItemsToView) {
        fetch(`http://www.omdbapi.com/?i=tt12345678&apikey=e7325d78&page=${page}&s=${query}&type=movie`)
        .then(response => response.json())
        .then((res) => {
          if (res.Error) {
            Alert.alert(
              'Error...'
           )  
          } else {
            setData(data => [...data, ...res.Search]);
          }
        })
        .catch((error) => { console.log(error) })
        .finally(() => {
          setViewItems(false);
          setMoreItemsToView(false);
        });
      }
    }, [page, moreItemsToView]);

    function newSearchDb() {
      if (query) {
      fetch(`http://www.omdbapi.com/?i=tt12345678&apikey=e7325d78&page=${page}&s=${query}&type=movie`)
      .then(response => response.json())
      .then((data) => {
        if(data.Error) {
          Alert.alert(
            'Error...'
         )
        } else {
          setHasTooManyResults(false);
          setTotalMovies(data.totalResults);
          setPage(1);
          setData(data.Search);
        }
      })
      .catch((error) => { console.log(error) })
    }
    }

    function viewNextSetOfMovies() {
      setViewItems(true);
      if (totalMovies > data.length) {
        setMoreItemsToView(true);
        setPage(page + 1);
      }
    }

  function setLoadMoreButton() {
    if ((parseInt(totalMovies, 10) === data.length) && (data.length > 0)) {
      return;
    } else {
        if (hasTooManyResults) {
          setData([]);
          return <Text>Too Many Results... Refine Your Search</Text>
        } else {
          if (data.length === 0) {
            return;
          }
          return <Button title="Load More Movies" style={styles.loadMore} onPress={() => viewNextSetOfMovies()} />
        }
      }
    }


  return (
    <ScrollView>
    <View style={{  }}>
      <Text style={styles.homeTitle}>Movie Browser</Text>
      <View style={{  }}>
        <TextInput placeholder="Search..." value={query} onChangeText={(query) => setQuery(query)} style={{   }} />
        <Button style={styles.submitButton} title="Search Movie" onPress={() => newSearchDb() } />
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <>
                <Card style={styles.card_style}>
                  <Card.Title title={item.Title} subtitle={`${item.Type} ${item.Year}`} />
                  <Card.Cover source={{ uri: item.Poster }} />
                  <Card.Actions>
                    <Button
                      title="More Info"
                      onPress={() =>
                        navigation.navigate("Details" , { 
                          title: item.Title, 
                          poster: item.Poster, 
                          imdbID: item.imdbID 
                        })}  
                    />
                  </Card.Actions>
                </Card>
              </>
            </TouchableWithoutFeedback>
          )}
        />
        {setLoadMoreButton()}
      </View>
    </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsPage} />
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
  card_style: {
    marginTop: 15,
    marginBottom: 15
  },
  homeTitle: {
    textAlign: 'center',
    marginBottom: 0,
    fontSize: 50
  },
  loadMore: {
    position: 'absolute',
    bottom:0,
  },
  submitButton: {
    marginTop: 15
  }
});
