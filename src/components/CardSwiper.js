import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import React, {Component} from 'react';

import Article from './Article';

const articleList = [
  {id: '1', uri: require('../../assets/avrn.jpeg')},
  {id: '2', uri: require('../../assets/captain.jpeg')},
  {id: '3', uri: require('../../assets/cat.jpeg')},
  {id: '4', uri: require('../../assets/iron.jpeg')},
  {id: '5', uri: require('../../assets/spidey.jpeg')},
  {id: '6', uri: require('../../assets/thanos.jpeg')},
  {id: '7', uri: require('../../assets/thor.jpeg')},
];
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class CardSwiper extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.swipedPosition = new Animated.ValueXY({x: 0, y: -SCREEN_HEIGHT});
    this.state = {
      currentIndex: 0,
    };
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0 && this.state.currentIndex > 0) {
          this.swipedPosition.setValue({
            x: 0,
            y: -SCREEN_HEIGHT + gestureState.dy,
          });
        } else {
          this.position.setValue({y: gestureState.dy, x: 0});
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (
          this.state.currentIndex > 0 &&
          gestureState.dy > 50 &&
          gestureState.vy > 0.7
        ) {
          Animated.timing(this.swipedPosition, {
            toValue: {x: 0, y: 0},
            duration: 400,
          }).start(() => {
            this.setState({currentIndex: this.state.currentIndex - 1}),
              this.swipedPosition.setValue({x: 0, y: -SCREEN_HEIGHT});
          });
        } else if (-gestureState.dy > 50 && -gestureState.vy > 0.7) {
          Animated.timing(this.position, {
            toValue: {x: 0, y: -SCREEN_HEIGHT},
            duration: 400,
          }).start(() => {
            this.setState({
              currentIndex: this.state.currentIndex + 1,
            });
            this.position.setValue({x: 0, y: 0});
          });
        } else {
          Animated.parallel([
            Animated.spring(this.position, {
              toValue: {x: 0, y: 0},
            }),
            Animated.spring(this.swipedPosition, {
              toValue: {x: 0, y: -SCREEN_HEIGHT},
            }),
          ]).start();
        }
      },
    });
  }
  renderArticles = () => {
    return articleList
      .map((item, i) => {
        if (i == this.state.currentIndex - 1) {
          return (
            <Article
              item={item}
              styles={styles}
              position={this.swipedPosition.getLayout()}
              pan={this.PanResponder.panHandlers}
            />
          );
        } else if (i < this.state.currentIndex) {
          return null;
        } else if (this.state.currentIndex === i) {
          return (
            <Article
              item={item}
              styles={styles}
              position={this.position.getLayout()}
              pan={this.PanResponder.panHandlers}
            />
          );
        } else {
          return <Article styles={styles} item={item} />;
        }
      })
      .reverse();
  };

  render() {
    return <View style={styles.container}>{this.renderArticles()}</View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleContainer: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    height: 200,
    backgroundColor: 'black',
  },
  Articleimage: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: 'center',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
