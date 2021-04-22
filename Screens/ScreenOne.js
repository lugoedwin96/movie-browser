import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, Text, StyleSheet, Button, TextInput} from 'react-native';

const ScreenOne = props => {

    const [title, setTitle] = useState(props.route.params.Title);
    const [year, setYear] = useState(props.route.params.Year);

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
          title: title
        });
    }, [props.navigation]);
    
    return (
        <SafeAreaView>
            <View>
                <Text>Title: {title}</Text>
                <Text>Year: {year}</Text>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({

});

export default ScreenOne;
