import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import CustomBottomSheet from '../Components/CustomBottomSheet';
import CustomCard from '../Components/CustomCard';
import CustomSearchbar from '../Components/CustomSearchbar';
import Loader from '../Components/CustomLoader';
import {colors} from '../Utils/Constants';

const options = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: 'UTC',
};

const ResultScreen = props => {
  const {origin, destination, searchFlight, exploreFlight} = props.route.params;
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState('');
  const [sortValue, setSortValue] = useState('lth');
  const [isLoading, setIsLoading] = useState(true);

  const apiData = useSelector(state => state.airlineData.originalData);

  const filteredData = useMemo(() => {
    let tempData = apiData.slice();
    if (searchFlight) {
      tempData = tempData.filter(
        item =>
          item.origin.toLowerCase() === origin.toLowerCase() &&
          item.destination.toLowerCase() === destination.toLowerCase(),
      );
    }

    if (search) {
      tempData = tempData.filter(item =>
        item.airline.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (sortValue === 'lth') {
      tempData.sort((a, b) => a.price - b.price);
    } else {
      tempData.sort((a, b) => b.price - a.price);
    }
    return tempData;
  }, [
    apiData,
    origin,
    destination,
    searchFlight,
    exploreFlight,
    search,
    sortValue,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [sort]);

  const onSearch = useCallback(searchText => {
    setSearch(searchText);
  }, []);

  const renderItem = ({item, index}) => {
    const time1 = new Date(item.departureTime);
    const time2 = new Date(item.arrivalTime);
    const formattedDateOrigin = time1.toLocaleString('en-US', options);
    const formattedDateArrival = time2.toLocaleString('en-US', options);
    return (
      <View
        style={[styles.searchResultConatiner, index === 0 && {marginTop: 50}]}>
        <CustomCard>
          <View style={styles.flightHeader}>
            <View style={styles.flightName}>
              <Text style={styles.airlineFont}>{item.airline}</Text>
              <Text style={styles.flightFont}>{item.aircraft}</Text>
            </View>
            <View style={styles.flightPrice}>
              <Text style={styles.priceFont}>
                {'\u20B9'}
                {item.price}
              </Text>
            </View>
          </View>

          <View style={styles.wrapper1}>
            <View style={{padding: 10}}>
              <View>
                <Text style={{color: colors.darkseagreen}}>{item.origin}</Text>
              </View>
              <View>
                <Text style={styles.departArriveTime}>
                  {formattedDateOrigin}
                </Text>
              </View>
            </View>

            <View style={styles.wrapper2} />
            <View>
              <Text style={styles.duration}>
                {item.duration.replace(/\bminutes\b/g, 'min')}
              </Text>
            </View>
            <View style={styles.wrapper3} />
            <View style={{padding: 10}}>
              <View>
                <Text style={{color: colors.darksalmon}}>
                  {item.destination}
                </Text>
              </View>
              <View>
                <Text style={styles.departArriveTime}>
                  {formattedDateArrival}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.seatsAvailable}>
            <Text style={styles.seatsFont}>
              Seats Available: {item.seatsAvailable}
            </Text>
          </View>
        </CustomCard>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground
          style={styles.bannerImage}
          source={require('../Assets/plane.png')}></ImageBackground>
      </View>
      <View style={styles.actionHeader}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back-ios" size={28} color={colors.blackRussian} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSort(true)}>
          <Icon name="filter-list-alt" size={28} color={colors.blackRussian} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <CustomSearchbar
          search={search}
          setSearch={setSearch}
          onSearch={onSearch}
          placeholder={'Search Airlines...'}
        />
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.noData}>No Data Found !</Text>
          }
          initialNumToRender={6}
          maxToRenderPerBatch={7}
          windowSize={10}
        />
      )}

      <CustomBottomSheet visible={sort}>
        <TouchableOpacity
          style={{alignSelf: 'center', marginVertical: 15}}
          onPress={() => setSort(false)}>
          <AntDesignIcon
            name="closecircleo"
            size={30}
            color={colors.blackRussian}
          />
        </TouchableOpacity>

        <CustomCard>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.sortByFont}>Sort by</Text>
          </View>
          <View>
            <Text style={styles.sortByPriceFont}>Price</Text>
          </View>
          <View style={styles.priceWrapper}>
            <TouchableOpacity onPress={() => setSortValue('lth')}>
              <View style={styles.rowPriceContainer}>
                <View
                  style={[
                    styles.circle,
                    sortValue === 'lth' && styles.activeSort,
                  ]}></View>

                <View>
                  <Text style={styles.lowFont}>Low to High</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortValue('htl')}>
              <View style={styles.rowPriceContainer}>
                <View
                  style={[
                    styles.circle,
                    sortValue === 'htl' && styles.activeSort,
                  ]}></View>
                <View>
                  <Text style={styles.highFont}>High to Low</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </CustomCard>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dodgerBlue,
  },
  banner: {
    height: 120,
    width: '100%',
    borderBottomLeftRadius: 160,
    overflow: 'hidden',
    backgroundColor: colors.paleCornflowerBlue,
    position: 'absolute',
  },
  bannerImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'cover',
    opacity: 0.3,
    marginLeft: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
    zIndex: 100,
  },
  searchResultConatiner: {
    marginVertical: 20,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginVertical: 2,
  },
  flightName: {
    marginHorizontal: 10,
  },
  flightPrice: {
    marginHorizontal: 10,
  },
  airlineFont: {
    fontSize: 20,
    color: colors.black,
    letterSpacing: 1,
  },
  flightFont: {
    fontSize: 14,
    opacity: 0.6,
    color: colors.black,
  },
  priceFont: {
    fontWeight: '800',
    fontSize: 20,
    color: colors.black,
  },
  seatsFont: {
    fontWeight: '400',
    fontSize: 17,
    color: colors.black,
  },
  searchContainer: {
    paddingHorizontal: 5,
    marginTop: 30,
    height: 80,
  },
  sortByFont: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.6,
  },
  sortByPriceFont: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 20,
    paddingTop: 15,
    opacity: 0.8,
  },
  circle: {
    height: 17,
    width: 17,
    borderRadius: 217 / 2,
    borderWidth: 2,
  },
  rowPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  lowFont: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.6,
    paddingLeft: 10,
  },
  highFont: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.6,
    paddingLeft: 10,
  },
  priceWrapper: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activeSort: {
    backgroundColor: colors.sapphire,
  },
  wrapper1: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  wrapper2: {
    width: 70,
    height: 1,
    backgroundColor: colors.black,
  },
  wrapper3: {
    width: 70,
    height: 1,
    backgroundColor: colors.black,
  },
  departArriveTime: {
    color: colors.black,
    opacity: 0.4,
    fontSize: 13,
  },
  duration: {
    width: 50,
    textAlign: 'center',
    color: colors.black,
    padding: 0.2,
    opacity: 0.4,
    fontSize: 12,
    fontWeight: '700',
  },
  seatsAvailable: {
    marginLeft: 10,
    marginTop: 20,
  },
  noData: {
    alignSelf: 'center',
    alignContent: 'center',
    color: colors.aliceBlue,
    marginTop: 100,
    fontSize: 20,
  },
});
