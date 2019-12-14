import {Animated, Image, Text, View} from 'react-native';

import React from 'react';

class Article extends React.Component {
  render() {
    const {item, styles, position, pan} = this.props;
    return (
      <Animated.View key={item.id} style={position} {...pan}>
        <View style={styles.articleContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.Articleimage} source={item.uri} />
          </View>
          <View style={styles.textContainer}>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              asperiores quibusdam, sunt fuga reprehenderit laborum iure debitis
              sapiente! Quam doloribus nemo neque ipsam inventore rerum saepe
              ratione vel quia amet! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Delectus asperiores quibusdam, sunt fuga
              reprehenderit laborum iure debitis sapiente! Quam doloribus nemo
              neque ipsam inventore rerum saepe ratione vel quia amet! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Delectus
              asperiores quibusdam, sunt fuga reprehenderit laborum iure debitis
              sapiente! Quam doloribus nemo neque ipsam inventore rerum saepe
              ratione vel quia amet! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Delectus asperiores quibusdam, sunt fuga
              reprehenderit laborum iure debitis sapiente! Quam doloribus nemo
              neque ipsam inventore rerum saepe ratione vel quia amet! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Delectus
              asperiores quibusdam, sunt fuga reprehenderit laborum iure debitis
              sapiente! Quam doloribus nemo neque ipsam inventore rerum saepe
              ratione vel quia amet! Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}
export default Article;
