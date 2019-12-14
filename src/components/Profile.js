import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
IMAGE_MAX_HEIGHT = 80;
IMAGE_MIN_HEIGHT = 40;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    };
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const profileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [IMAGE_MAX_HEIGHT, IMAGE_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const headerZIndex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - IMAGE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT + 5,
      ],
      extrapolate: 'clamp',
    });
    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + IMAGE_MIN_HEIGHT + 25,
      ],
      outputRange: [-20, -20, -20, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.header, {height: headerHeight, zIndex: headerZIndex}]}>
          <Animated.View
            style={{position: 'absolute', bottom: headerTitleBottom}}>
            <Text style={styles.headerTitle}>Sakshya Arora</Text>
          </Animated.View>
        </Animated.View>
        <ScrollView
          style={{flex: 1}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}>
          <Animated.View
            style={[
              styles.imageContainer,
              {
                height: profileImageHeight,
                width: profileImageHeight,
                marginTop: profileImageMarginTop,
              },
            ]}>
            <Image
              style={styles.profileImage}
              source={require('../../assets/abc.jpg')}
            />
          </Animated.View>
          <Animated.View>
            <Text style={styles.userName}>Sakshya Arora</Text>
          </Animated.View>
          <View style={{height: 1000}}></View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    backgroundColor: 'lightblue',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    borderRadius: IMAGE_MAX_HEIGHT / 2,
    marginLeft: 10,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
  },
  profileImage: {
    flex: 1,
    height: null,
    width: null,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});

export default Profile;
