import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image, ListView, ScrollView, Row} from 'react-native';
import Flag from 'react-native-flags';
import { getCountryFlags } from '../countryFlags.js';

const DetailsPage = props => {
    
    const [poster, setPoster] = useState(props.route.params.poster);
    const [imdbID, setImdbID] = useState(props.route.params.imdbID);
    const [title, setTitle] = useState(props.route.params.title)
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(() => {
        setImdbID(props.route.params.imdbID);
        fetch(`http://www.omdbapi.com/?8&apikey=e7325d78&i=${imdbID}&type=movie`)
        .then(response => response.json() )
        .then((res) => {
            setMovieDetails(
                {
                    Title: res.Title,
                    Actors: res.Actors,
                    Country: res.Country,
                    Language: res.Language,
                    Genre: res.Genre,
                    Released: res.Released
                }
            )
        })
        .catch((error) => { console.log(error) })
    }, [])

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
          title: title
        });
    }, [props.navigation]);
    
    return (
        <SafeAreaView>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}>{movieDetails.Title}</Text>
                <Image
                    style={styles.movieImage}
                    source={{
                        uri: poster
                    }}
                />
                <Text style={styles.actorsText}>{movieDetails.Actors}</Text>
                <Text style={styles.countryText}>
                    <Flag
                        code={getCountryFlags(movieDetails.Country)}
                        size={32}
                    />
                    <Text>{movieDetails.Country}</Text>
                </Text>
                <Text style={styles.languageText}>{movieDetails.Language}</Text>
                <Text style={styles.genreText}>{movieDetails.Genre}</Text>
                <Text style={styles.releasedText}>{movieDetails.Released}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    movieImage: {
      width: 250,
      height: 500,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    actorsText: {
        marginTop: 15,
        fontSize: 13, 
        textAlign: 'center' 
    },
    countryText: {
        marginTop: 15,
        fontSize: 13, 
        textAlign: 'center' 
    },
    languageText: {
        marginTop: 15,
        fontSize: 13, 
        textAlign: 'center' 
    }, 
    genreText: {
        marginTop: 15,
        fontSize: 13, 
        textAlign: 'center' 
    },
    releasedText: {
        marginTop: 15,
        fontSize: 13, 
        textAlign: 'center',
        fontWeight: 'bold',        
        marginBottom: 25
    }
  });
  

export default DetailsPage;
