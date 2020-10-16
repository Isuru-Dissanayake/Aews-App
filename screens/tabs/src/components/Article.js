import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Linking, TouchableNativeFeedback, Modal, TouchableHighlight, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class Article extends React.Component {   
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  render() {
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      content,
      url
    } = this.props.article;
    const { noteStyle, featuredTitleStyle } = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';

    return (
      <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalTitle}>
            {title}
          </Text>
          <Image
            style={styles.modalImage}
            source={{uri: urlToImage || defaultImg}}
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={noteStyle}>{time}</Text>
          </View>
          <Text style={styles.modalContent}>
            {content}
          </Text>
          <TouchableNativeFeedback onPress={() => Linking.openURL(url)}>
            <Text style={{color: '#b2bec3', margin: 5,fontFamily: 'ProductSans-Italic',}}>Read more....</Text>
          </TouchableNativeFeedback>
          <TouchableHighlight
            style={styles.closeButton}
            onPress={() => this.setState({ modalVisible: false})}
          >
            <Text style={styles.textStyle}>Back</Text>
          </TouchableHighlight>
        </View>
      </Modal>
      <TouchableNativeFeedback
        useForeground
        onPress={() => this.setState({ modalVisible: true})}
      >
        <Card containerStyle={styles.boxCon} >
          <Card.Image
            source={{uri: urlToImage || defaultImg}}
            style = {{ borderRadius: 10 }}
          />
          <Text style={styles.titleStyle}>
            {title}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={noteStyle}>{time}</Text>
          </View>
        </Card>
      </TouchableNativeFeedback>
      </View>
    );
  }
}



const styles = {
  noteStyle: {
    marginTop: 5,
    fontFamily: 'ProductSans-Italic',
    color: '#b2bec3',
    fontSize: 10
  },
  titleStyle: {
    marginTop: 8,
    fontSize: 18,
    fontFamily: 'ProductSans-Bold'
  },
  boxCon: {
    marginHorizontal: 10,
    
    borderColor: '#FFFFFF',
    elevation: 0,
    borderRadius: 10
   },
  centeredView: {
    flex: 1,
    margin: 22,
  },
  modalImage:{
    borderRadius: 10,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  modalTitle: {
    margin: 10,
    fontSize: 18,
    fontFamily: 'ProductSans-Bold'
  },
  modalContent: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'ProductSans-Regular'
  },
  
  closeButton: {
    backgroundColor: "#000",
    width: '30%',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    elevation: 2,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  textStyle: {
    color: "white",
    fontFamily: 'ProductSans-Bold',
    textAlign: "center"
  },
};
