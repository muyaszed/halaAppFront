import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const styles = StyleSheet.create({
  container: {
   paddingLeft: 20,
   paddingRight: 20,
  },
  input: {
      backgroundColor: 'white'
  },
  button: {
   
  },
  addButton: {
   
  },
  photoWrapper: {
   
  },
  photo: {
    
  }
});
export default class EditRestaurantForm extends Component {
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
      disabledEndTime: true,
      
    };
  }

  handlePress = () => {
    const { onEdit } = this.props;
    onEdit();
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
      disabledEndTime,
    } = this.state;

    const { onCancel } = this.props;
    
    return (
      <KeyboardAwareScrollView style={styles.container} extraScrollHeight={220}>

        <TextInput
          style={styles.input}
          underlineColor="#21c393"
          
          testID="restaurantNameInputText"
          label="Name"
          value={name}
          onChangeText={inputName => this.setState({
                name: inputName,
            })
          }
        />
        <TextInput
          style={styles.input}
          testID="restaurantLocationInputText"
          label={'Address'}
          value={address}
          onChangeText={inputLocation => this.setState({ address: inputLocation })}
          onFocus={() => this.setState({ displayAddress: true })}
        />
        <TextInput
          style={styles.input}
          label="City"
          value={city}
          onChangeText={inputLocation => this.setState({ city: inputLocation })}
        />
        <TextInput
          style={styles.input}
          label="Postcode"
          value={postcode}
          onChangeText={inputLocation => this.setState({ postcode: inputLocation })}
        />
        <TextInput
          style={styles.input}
          label="Country"
          value={country}
          onChangeText={inputLocation => this.setState({ country: inputLocation })}
        />
        <TextInput
          style={styles.input}
          testID="restaurantCategoryInputText"
          label="Select Category &#62;"
          value={category}
          onChangeText={inputCategory => this.setState({ category: inputCategory })}
          
          onFocus={() => {
            
            navigation.navigate('Category', { PrevScreen: 'Add' });
          }}
        />
        <TextInput
          style={styles.input}
          testID="restaurantCuisineInputText"
          label="Select Cuisine &#62;"
          value={cuisine}
          onChangeText={inputCuisine => this.setState({ cuisine: inputCuisine })}
          onFocus={() => navigation.navigate('Cuisine', { PrevScreen: 'Add' })}
        />
        <TextInput
          style={styles.input}
          testID="restaurantWebInputText"
          label="Website "
          value={web}
          onChangeText={inputWeb => this.setState({ web: inputWeb })}
        />
        <TextInput
          style={styles.input}
          testID="restaurantStartInputText"
          label="Select Operating time - Start &#62;"
          value={start}
          onChangeText={inputStart => this.setState({ start: inputStart })}
          onFocus={() => navigation.navigate('StartTime')}
        />
        <TextInput
          style={styles.input}
          disabled={disabledEndTime}
          testID="restaurantEndInputText"
          label="Select Operating time - End &#62;"
          value={end}
          onChangeText={inputEnd => this.setState({ end: inputEnd })}
          onFocus={() => navigation.navigate('EndTime')}
        />
        <TextInput
          style={styles.input}
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
          {photo && <Image style={styles.photo} source={{ uri: photo.uri }} />}
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
        <Button mode="contained" onPress={() => onCancel()}>
            Cancel
        </Button>
        <Button
          style={[styles.button, styles.addButton]}
          testID="addNewRestaurantButton"
          mode="contained"
          onPress={this.handlePress}
        >
          Edit
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}

EditRestaurantForm.propTypes = {
  onEdit: PropTypes.func.isRequired,
  clearForm: PropTypes.bool.isRequired,
};
