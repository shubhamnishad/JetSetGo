import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import CustomDropdown from '../Components/CustomDropdown';
import {fetchData} from '../Service/Api';
import {colors} from '../Utils/Constants';

const HomeScreen = props => {
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  const dispatch = useDispatch();
  const data = useSelector(state => state.airlineData.originalData);

  const extractedOrigin = [...new Set(data.map(item => item.origin))];
  const extractedDestination = [...new Set(data.map(item => item.destination))];

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleSelectedOrigin = value => {
    setSelectedOrigin(value);
  };

  const handleSelectedDestination = value => {
    setSelectedDestination(value);
  };

  const swapPlace = () => {
    setSelectedDestination(selectedOrigin);
    setSelectedOrigin(selectedDestination);
  };

  const renderSearchFlight = () => {
    console.log('selected', selectedOrigin, selectedDestination);
    if (selectedOrigin !== '' && selectedDestination !== '') {
      if (selectedOrigin === selectedDestination) {
        ToastAndroid.show(
          'Origin and destination cannot be the same!',
          ToastAndroid.SHORT,
        );
      } else {
        props.navigation.navigate('Result', {
          origin: selectedOrigin,
          destination: selectedDestination,
          searchFlight: true,
        });
      }
    } else {
      ToastAndroid.show(
        'Please select Origin and Destination !',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground
          style={styles.bannerImage}
          source={require('../Assets/banner.jpg')}></ImageBackground>
      </View>
      <View style={styles.bannerTextWrapper}>
        <Text style={styles.bannerText}>Jet Set Go</Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.swapContainer}>
          <View style={styles.cityContainer}>
            <CustomDropdown
              dataSet={extractedOrigin}
              defaultLabel={'Select Origin'}
              onValueChange={handleSelectedOrigin}
              selected={selectedOrigin}
              wrapperStyle={{marginVertical: 6}}
            />
            <CustomDropdown
              dataSet={extractedDestination}
              defaultLabel={'Select Destination'}
              onValueChange={handleSelectedDestination}
              selected={selectedDestination}
              wrapperStyle={{marginVertical: 6}}
            />
          </View>
          <View style={styles.swapLogo}>
            <TouchableOpacity onPress={() => swapPlace()}>
              <Icon name="swap-vertical-circle" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => renderSearchFlight()}>
          <LinearGradient
            colors={['#A0C5FF', '#5396FF', '#2076FF']}
            style={styles.searchFlight}>
            <Text style={[styles.buttonText, styles.searchFlightText]}>
              Search Flights
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Result', {exploreFlight: true})
          }>
          <LinearGradient
            colors={['#0062FF', '#003FAA', '#00085B']}
            style={styles.exploreFlight}>
            <Text style={styles.buttonText}>Explore Flights</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dodgerBlue,
  },
  banner: {
    flex: 0.75,
    borderBottomLeftRadius: 160,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerTextWrapper: {
    alignSelf: 'center',
    padding: 5,
  },
  bannerText: {
    fontSize: 30,
    color: 'white',
    letterSpacing: 2,
  },
  cityContainer: {
    width: '80%',
    paddingLeft: 10,
    height: '100%',
    justifyContent: 'center',
  },
  swapContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 160,
  },
  swapLogo: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchFlight: {
    width: '85%',
    height: 60,
    borderRadius: 8,
    borderBottomLeftRadius: 50,
    backgroundColor: colors.grey,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreFlight: {
    width: '85%',
    height: 60,
    borderRadius: 8,
    borderTopRightRadius: 50,
    backgroundColor: colors.grey,
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    letterSpacing: 1.5,
  },
  searchFlightText: {
    color: '#ECF4FF',
  },
});
