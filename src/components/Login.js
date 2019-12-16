import Animated, {Easing} from 'react-native-reanimated';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {State, TapGestureHandler} from 'react-native-gesture-handler';

import React from 'react';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const {
  Value,
  event,
  set,
  block,
  cond,
  eq,
  Clock,
  startClock,
  stopClock,
  debug,
  concat,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
} = Animated;
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            ),
          ]),
      },
    ]);
    this.closeChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
            ),
          ]),
      },
    ]);
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.backgroundY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-SCREEN_HEIGHT / 3, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputOpacity = this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: this.backgroundY}],
          }}>
          <Image
            source={require('../../assets/avrn.jpeg')}
            style={styles.backgroundImage}
          />
        </Animated.View>
        <View style={styles.buttonContainer}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={styles.text}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: '#2e71dc',
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={{...styles.text, color: 'white'}}>
                SIGN IN WITH FACEBOOK
              </Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              height: SCREEN_HEIGHT / 3,
              top: null,
              opacity: this.textInputOpacity,
              zIndex: this.textInputZIndex,
              transform: [{translateY: this.textInputY}],
              justifyContent: 'center',
            }}>
            <TapGestureHandler onHandlerStateChange={this.closeChange}>
              <Animated.View style={styles.close}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{rotate: concat(this.rotateCross, 'deg')}],
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="EMAIL"
              style={styles.textInput}
              placeholderTextColor="#000"
            />
            <TextInput
              placeholder="PASSWORD"
              style={styles.textInput}
              placeholderTextColor="#000"
            />
            <Animated.View style={styles.button}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}> SUBMIT</Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'absolute',
  },
  backgroundImage: {
    height: null,
    width: null,
    flex: 1,
  },
  buttonContainer: {
    height: SCREEN_HEIGHT / 3,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 35,
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputContainer: {
    height: SCREEN_HEIGHT / 3,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 20,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  close: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: SCREEN_WIDTH / 2 - 20,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
});

export default LoginScreen;
