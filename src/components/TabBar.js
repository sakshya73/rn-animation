import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {Easing} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

class FloatingIcon extends React.Component {
  buttonSize = new Animated.Value(1);
  buttonAngle = new Animated.Value(0);
  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.elastic(2),
      }),
      Animated.timing(this.buttonAngle, {
        toValue: this.buttonAngle._value === 0 ? 1 : 0,
        duration: 100,
        easing: Easing.bounce,
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
      }),
    ]).start();
  };
  render() {
    const sizeStyle = {
      transform: [{scale: this.buttonSize}],
    };
    const angle = this.buttonAngle.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });
    const IconOneX = this.buttonAngle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -70],
    });
    const IconOneY = this.buttonAngle.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, -70],
    });
    const IconTwoX = this.buttonAngle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    });
    const IconTwoY = this.buttonAngle.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, -100],
    });
    const IconThreeX = this.buttonAngle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 70],
    });
    const IconThreeY = this.buttonAngle.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, -70],
    });
    const borderWidth = this.buttonAngle.interpolate({
      inputRange: [0, 1],
      outputRange: [3, 10],
    });
    return (
      <View style={styles.mainContainer}>
        <Animated.View
          style={[styles.iconContainer, {top: IconOneY, left: IconOneX}]}>
          <MaterialCommunityIcons name="camera" size={20} color="white" />
        </Animated.View>
        <Animated.View
          style={[styles.iconContainer, {top: IconTwoY, left: IconTwoX}]}>
          <MaterialCommunityIcons name="delete" size={20} color="white" />
        </Animated.View>
        <Animated.View
          style={[styles.iconContainer, {top: IconThreeY, left: IconThreeX}]}>
          <MaterialCommunityIcons name="account-edit" size={20} color="white" />
        </Animated.View>
        <Animated.View style={[styles.container, sizeStyle, {borderWidth}]}>
          <TouchableWithoutFeedback onPress={() => this.handlePress()}>
            <Animated.View style={{transform: [{rotate: angle}]}}>
              <MaterialCommunityIcons name="plus" size={20} color="white" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}
class Screen1 extends React.Component {
  render() {
    return (
      <View style={styles.flexCenter}>
        <Text>Screen1!</Text>
      </View>
    );
  }
}
class Screen2 extends React.Component {
  render() {
    return (
      <View style={styles.flexCenter}>
        <Text>Screen2!</Text>
      </View>
    );
  }
}
class Screen3 extends React.Component {
  render() {
    return (
      <View style={styles.flexCenter}>
        <Text>Screen3!</Text>
      </View>
    );
  }
}
class Screen4 extends React.Component {
  render() {
    return (
      <View style={styles.flexCenter}>
        <Text>Screen4!</Text>
      </View>
    );
  }
}
const TabNavigator = createBottomTabNavigator(
  {
    Screen1: {
      screen: Screen1,
      navigationOptions: {
        tabBarIcon: (
          <MaterialCommunityIcons
            name="home-outline"
            size={20}
            color="#BBBBBB"
          />
        ),
      },
    },
    Screen2: {
      screen: Screen2,
      navigationOptions: {
        tabBarIcon: <AntDesign name="search1" size={20} color="#BBBBBB" />,
      },
    },
    Screen3: {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: () => <FloatingIcon />,
      },
    },
    Screen4: {
      screen: Screen3,
      navigationOptions: {
        tabBarIcon: (
          <MaterialCommunityIcons
            name="heart-outline"
            size={20}
            color="#BBBBBB"
          />
        ),
      },
    },
    Screen5: {
      screen: Screen4,
      navigationOptions: {
        tabBarIcon: (
          <MaterialIcons name="person-outline" size={20} color="#BBBBBB" />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  },
);
const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d5d5d5',
  },
  // My icon
  mainContainer: {
    shadowColor: '#999999',
    shadowOpacity: 0.5,
    shadowOffset: {height: 10},
  },
  container: {
    backgroundColor: '#717EB0',
    height: 50,
    width: 50,
    position: 'relative',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  iconContainer: {
    height: 50,
    backgroundColor: '#717EB0',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: 50,
    borderRadius: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default createAppContainer(TabNavigator);
