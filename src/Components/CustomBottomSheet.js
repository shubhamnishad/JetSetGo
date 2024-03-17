import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  View,
  StyleSheet,
  Modal,
} from 'react-native';

const CustomBottomSheet = ({visible, onDismiss, children}) => {
  const panY = useRef(
    new Animated.Value(Dimensions.get('screen').height),
  ).current;
  const resetPositionAnim = useRef(
    Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }),
  ).current;
  const closeAnim = useRef(
    Animated.timing(panY, {
      toValue: Dimensions.get('screen').height,
      duration: 500,
      useNativeDriver: true,
    }),
  ).current;

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: panY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return closeAnim.start(() => onDismiss());
        }
        return resetPositionAnim.start();
      },
    }),
  ).current;

  const [translateY] = useState(
    panY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    }),
  );

  useEffect(() => {
    if (visible) {
      resetPositionAnim.start();
    }
  }, [visible]);

  const handleDismiss = () => {
    closeAnim.start(() => onDismiss());
  };

  return (
    <Modal
      animated
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={() => handleDismiss()}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, {translateY}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
