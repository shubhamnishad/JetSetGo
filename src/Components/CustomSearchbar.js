import React, {useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const CustomSearchbar = ({onSearch, search, setSearch, placeholder}) => {
  const searchRef = useRef();

  return (
    <View>
      <TextInput
        placeholderTextColor={'#000000'}
        placeholder={placeholder}
        value={search}
        ref={searchRef}
        onChangeText={txt => {
          onSearch(txt);
          setSearch(txt);
        }}
        style={styles.searchInput}
      />
    </View>
  );
};

export default CustomSearchbar;

const styles = StyleSheet.create({
  searchInput: {
    width: '95%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#8e8e8e',
    borderRadius: 10,
    marginTop: 50,
    paddingLeft: 20,
    color: '#000000',
    backgroundColor: '#ECF4FF',
  },
});
