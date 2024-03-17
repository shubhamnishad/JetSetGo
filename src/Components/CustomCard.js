import React from 'react';
import {View, StyleSheet} from 'react-native';

const CustomCard = props => {
  return (
    <View style={[styles.cardContainer, props.style]}>{props.children}</View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    minHeight: 200,
    borderRadius: 7,
    alignSelf: 'center',
    backgroundColor: '#ECF4FF',
    borderBottomRightRadius: 50,
  },
});
