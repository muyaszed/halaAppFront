import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationEvents } from 'react-navigation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'relative',
    top: 20,
    marginBottom: 20,
  },
  addButton: {
    marginBottom: 50,
  },
  hideLocation: {
    display: 'none',
  },
  displayLocation: {
    display: 'flex',
  },
  photoWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  photo: {
    width: 300,
    height: 200,
    position: 'relative',
    top: 20,
    marginBottom: 20,
  }
});
export default class NewRestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      postcode: '',
      country: '',
      category: '',
      cuisine: '',
      web: '',
      start: '',
      end: '',
      desc: '',
      photo: null,
      displayAddress: false,
      disabledEndTime: true,
      displayPhoto: false,
    };
  }

  handlePress = () => {
    const {
      name,
      address,
      city,
      postcode,
      country,
      category,
      cuisine,
      web,
      start,
      end,
      desc,
      photo,
    } = this.state;
    const { onAdd } = this.props;
    const form = new FormData();
    const data = {
      name,
      address,
      city,
      postcode,
      country,
      category,
      cuisine,
      web,
      start,
      end,
      desc,
    };

    if( photo ) {
      form.append('cover', {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri.replace('file://', ''),
      });
    }
    

    for (let key in data) {
      form.append(key, data[key]);
    }

    onAdd(form).then((res) => {
      const { navigation } = this.props;
      
      if (!res) {
        
        this.setState({
          name: '',
          address: '',
          city: '',
          postcode: '',
          country: '',
          category: '',
          cuisine: '',
          web: '',
          start: '',
          end: '',
          desc: '',
          photo: {},
        });
        navigation.setParams({
          Category: '',
          Cuisine: '',
          StartTime: '',
          EndTime: '',
        });
      }
    });
  };

  handleAddPicture = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({ displayPhoto: true, photo: response });
      }
    });
  };

  render() {
    const {
      name,
      address,
      city,
      postcode,
      country,
      category,
      cuisine,
      web,
      desc,
      photo,
      start,
      end,
      displayAddress,
      disabledEndTime,
      displayPhoto,
    } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView style={styles.container} extraScrollHeight={220}>
        <NavigationEvents
          onDidFocus={() => {
            
            const item = navigation.getParam('pressedItem');
            
              if (navigation.getParam('PrevScreen') === 'Category') {
                this.setState({
                  category: navigation.getParam('Category'),
                });
              }

              if (navigation.getParam('PrevScreen') === 'Cuisine') {
                this.setState({
                  cuisine: navigation.getParam('Cuisine'),
                });
              }

              if (navigation.getParam('PrevScreen') === 'StartTime') {
                this.setState({
                  start: navigation.getParam('StartTime'),
                });
                
                if (
                  navigation.getParam('StartTime') !== '24 hours'
                  && navigation.getParam('StartTime') !== undefined
                ) {
                  
                  this.setState({
                    disabledEndTime: false,
                    end: navigation.getParam('EndTime'),
                  });
                } else if (navigation.getParam('StartTime') === '24 hours') {
                  
                  this.setState({
                    disabledEndTime: true,
                    end: '',
                  });
                }
              }
              if (navigation.getParam('PrevScreen') === 'EndTime') {
                  this.setState({
                    end: navigation.getParam('EndTime'),
                  });
              }
                
              
              
  
             
            

            
          }}
        />
        <TextInput
          underlineColor="#21c393"
          mode="outlined"
          testID="restaurantNameInputText"
          label="Name"
          value={name}
          onChangeText={inputName => this.setState({
            name: inputName,
          })
          }
        />
        <TextInput
          mode="outlined"
          testID="restaurantLocationInputText"
          label={displayAddress ? 'Address' : 'Location'}
          value={address}
          onChangeText={inputLocation => this.setState({ address: inputLocation })}
          onFocus={() => this.setState({ displayAddress: true })}
        />
        <TextInput
          style={displayAddress ? styles.showLocation : styles.hideLocation}
          mode="outlined"
          label="City"
          value={city}
          onChangeText={inputLocation => this.setState({ city: inputLocation })}
        />
        <TextInput
          style={displayAddress ? styles.showLocation : styles.hideLocation}
          mode="outlined"
          label="Postcode"
          value={postcode}
          onChangeText={inputLocation => this.setState({ postcode: inputLocation })}
        />
        <TextInput
          style={displayAddress ? styles.showLocation : styles.hideLocation}
          mode="outlined"
          label="Country"
          value={country}
          onChangeText={inputLocation => this.setState({ country: inputLocation })}
        />
        <TextInput
          mode="outlined"
          testID="restaurantCategoryInputText"
          label="Select Category &#62;"
          value={category}
          onChangeText={inputCategory => this.setState({ category: inputCategory })}
          
          onFocus={() => {
            
            navigation.navigate('Category', { PrevScreen: 'Add' });
          }}
        />
        <TextInput
          mode="outlined"
          testID="restaurantCuisineInputText"
          label="Select Cuisine &#62;"
          value={cuisine}
          onChangeText={inputCuisine => this.setState({ cuisine: inputCuisine })}
          onFocus={() => navigation.navigate('Cuisine', { PrevScreen: 'Add' })}
        />
        <TextInput
          mode="outlined"
          testID="restaurantWebInputText"
          label="Website "
          value={web}
          onChangeText={inputWeb => this.setState({ web: inputWeb })}
        />
        <TextInput
          mode="outlined"
          testID="restaurantStartInputText"
          label="Select Operating time - Start &#62;"
          value={start}
          onChangeText={inputStart => this.setState({ start: inputStart })}
          onFocus={() => navigation.navigate('StartTime')}
        />
        <TextInput
          mode="outlined"
          disabled={disabledEndTime}
          testID="restaurantEndInputText"
          label="Select Operating time - End &#62;"
          value={end}
          onChangeText={inputEnd => this.setState({ end: inputEnd })}
          onFocus={() => navigation.navigate('EndTime')}
        />
        <TextInput
          mode="outlined"
          testID="restaurantDescInputText"
          label="Description"
          value={desc}
          multiline
          numberOfLines={10}
          onChangeText={inputDesc => this.setState({ desc: inputDesc })}
        />
        <View
          style={styles.photoWrapper}
        >
          {displayPhoto && <Image style={styles.photo} source={{ uri: photo.uri }} />}
        </View>
        <Button
          style={styles.button}
          testID="addNewRestaurantPictureButton"
          mode="contained"
          icon="add-a-photo"
          onPress={this.handleAddPicture}
        >
          Picture
        </Button>
        <Button
          style={[styles.button, styles.addButton]}
          testID="addNewRestaurantButton"
          mode="contained"
          onPress={this.handlePress}
        >
          Add
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}

NewRestaurantForm.propTypes = {
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  clearForm: PropTypes.bool.isRequired,
};
