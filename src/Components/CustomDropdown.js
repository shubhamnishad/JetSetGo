import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const CustomDropdown = ({
  dataSet,
  defaultLabel,
  onValueChange,
  wrapperStyle,
  selected,
}) => {
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(dataSet);
  const searchRef = useRef();

  const onSearch = search => {
    if (search !== '') {
      let tempData = dataSet.filter(item => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(dataSet);
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={[styles.wrapper, wrapperStyle]}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight: '600', color: 'white'}}>
          {selected == '' ? defaultLabel : selected}
        </Text>
        {clicked ? (
          <Icon name="up" size={30} color="white" />
        ) : (
          <Icon name="down" size={30} color="white" />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View style={styles.clickedContainer}>
          <TextInput
            placeholderTextColor={'#000000'}
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={styles.searchInput}
          />

          <ScrollView>
            {search !== ''
              ? data.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.flatTouch}
                    onPress={() => {
                      onValueChange(item);
                      setClicked(!clicked);
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text style={{fontWeight: '600', color: '#000000'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))
              : dataSet.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.flatTouch}
                    onPress={() => {
                      onValueChange(item);
                      setClicked(!clicked);
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text style={{fontWeight: '600', color: '#000000'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: 'white',
  },
  clickedContainer: {
    elevation: 5,
    marginTop: 60,
    height: 300,
    width: 300,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 100,
    alignSelf: 'center',
  },
  searchInput: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: '#8e8e8e',
    borderRadius: 7,
    marginTop: 20,
    paddingLeft: 20,
    color: '#000000',
  },
  flatTouch: {
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#8e8e8e',
  },
});
