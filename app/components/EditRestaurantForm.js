import React, { Component } from 'react';
import { View, StyleSheet, Image, Picker, TouchableWithoutFeedback } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import { TextInput, Button, Portal, Modal } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const styles = StyleSheet.create({
  container: {
   paddingLeft: 10,
   paddingRight: 10,
  },
  input: {
      backgroundColor: 'white',
      marginBottom: 5,
  },
  button: {
   marginBottom: 5,
  },
  addButton: {
   
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
    marginBottom: 40,
  },
  pickerWrapper: {

  },
  picker: {
    backgroundColor: 'white',
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
      newPhoto: false,
      showCategoryModal: false,
      showCuisineModal: false,
      showStartModal: false,
      showEndModal: false,
      modalButtonLabel: 'CANCEL',
    };
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      name: item.name,
      address: item.address,
      city: item.city,
      postcode: item.postcode,
      country: item.country,
      category: item.category,
      cuisine: item.cuisine,
      web: item.web,
      start: item.start,
      end: item.end,
      desc: item.desc,
      photo: item.cover_uri,
      disabledEndTime: item.start === '24 hours',
    })
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
      newPhoto,
    } = this.state;
    const { onEdit } = this.props;
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
    if ( photo && newPhoto ) {
      form.append('cover', {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri.replace('file://', ''),
      });
    }
    

    for (let key in data) {
      form.append(key, data[key]);
    }
    onEdit(form);
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
        this.setState({ newPhoto: true, photo: response });
      }
    });
  };

  cancelEdit = () => {
    const { onCancel } = this.props;
    this.setState({ newPhoto: false });
    onCancel();
  }

  hideModal = () => {
    const { start, end } = this.state;
    console.log(end);
    this.setState({
      showCategoryModal: false,
      showCuisineModal: false,
      showStartModal: false,
      showEndModal: false,
      disabledEndTime: start === '24 hours',
    });

    if (start === '24 hours') {
      this.setState({ end: '' });
    }
  }

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
      newPhoto,
      showCategoryModal,
      showCuisineModal,
      showStartModal,
      showEndModal,
      modalButtonLabel,
    } = this.state;
    
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
        <TouchableWithoutFeedback onPress={() => this.setState({ showCategoryModal: true })}>
          <View>
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                testID="restaurantCategoryInputText"
                label="Select Category &#62;"
                value={category}
                onChangeText={inputCategory => this.setState({ category: inputCategory })}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.setState({ showCuisineModal: true })}>
          <View>
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                testID="restaurantCuisineInputText"
                label="Select Cuisine &#62;"
                value={cuisine}
                onChangeText={inputCuisine => this.setState({ cuisine: inputCuisine })}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        
        <TextInput
          style={styles.input}
          testID="restaurantWebInputText"
          label="Website "
          value={web}
          onChangeText={inputWeb => this.setState({ web: inputWeb })}
        />
        <TouchableWithoutFeedback onPress={() => this.setState({ showStartModal: true })}>
          <View>
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                testID="restaurantStartInputText"
                label="Select Operating time - Start &#62;"
                value={start}
                onChangeText={inputStart => this.setState({ start: inputStart })}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.setState({ showEndModal: !disabledEndTime })}>
          <View>
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                disabled={disabledEndTime}
                testID="restaurantEndInputText"
                label="Select Operating time - End &#62;"
                value={end}
                onChangeText={inputEnd => this.setState({ end: inputEnd })}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        
        
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
          {photo && <Image style={styles.photo} source={{ uri: newPhoto ? photo.uri : photo }} />}
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
        <Button style={styles.button} mode="contained" onPress={() => this.cancelEdit()}>
            Cancel
        </Button>
        <Button
          style={[styles.button, styles.addButton]}
          testID="editNewRestaurantButton"
          mode="contained"
          onPress={this.handlePress}
        >
          Edit
        </Button>

        <Portal>
          <Modal visible={showCategoryModal} onDismiss={this.hideModal}>
            <Picker
              selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  category: itemValue,
                  modalButtonLabel: "OK",
                })
              }>
              <Picker.Item label="Restaurant" value="Restuarant" />
              <Picker.Item label="Cafe" value="Cafe" />
              <Picker.Item label="Food Stall" value="Food Stall" />
              <Picker.Item label="Food Truck" value="Food Truck" />
            </Picker>
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.hideModal}
            >
            
            {modalButtonLabel}
            
            </Button>
          
          </Modal>

          <Modal visible={showCuisineModal} onDismiss={this.hideModal}>
            <Picker
              selectedValue={cuisine}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  cuisine: itemValue,
                  modalButtonLabel: "OK",
                })
              }>
              <Picker.Item label="Ainu" value="Ainu" />
              <Picker.Item label="Albanian" value="Albanian" />
              <Picker.Item label="Argentina" value="Argentina" />
              <Picker.Item label="Andhra" value="Andhra" />
              <Picker.Item label="Anglo-Indian" value="Anglo" />
              <Picker.Item label="Arab" value="Arab" />
              <Picker.Item label="Armenian" value="Armenian" />
              <Picker.Item label="Assyrian" value="Assyrian" />
              <Picker.Item label="Awadhi" value="Awadhi" />
              <Picker.Item label="Azerbaijani" value="Azerbaijani" />
              <Picker.Item label="Balochi" value="Balochi" />
              <Picker.Item label="Belarusian" value="Belarusian" />
              <Picker.Item label="Bangladeshi" value="Bangladeshi" />
              <Picker.Item label="Bengali" value="Bengali" />
              <Picker.Item label="Berber" value="Berber" />
              <Picker.Item label="Buddhist" value="Buddhist" />
              <Picker.Item label="Bulgarian" value="Bulgarian" />
              <Picker.Item label="Cajun" value="Cajun" />
              <Picker.Item label="Chechen" value="Chechen" />
              <Picker.Item label="Chinese cuisine" value="Chinese" />
              <Picker.Item label="Chinese Islamic" value="Chinese" />
              <Picker.Item label="Circassian" value="Circassian" />
              <Picker.Item label="Crimean Tatar" value="Crimean" />
              <Picker.Item label="Danish" value="Danish" />
              <Picker.Item label="Estonian" value="Estonian" />
              <Picker.Item label="French" value="French" />
              <Picker.Item label="Filipino" value="Filipino" />
              <Picker.Item label="Georgian" value="Georgian" />
              <Picker.Item label="Goan" value="Goan" />
              <Picker.Item label="Goan Catholic" value="Goan" />
              <Picker.Item label="Greek" value="Greek" />
              <Picker.Item label="Gujarati" value="Gujarati" />
              <Picker.Item label="Hyderabad" value="Hyderabad" />
              <Picker.Item label="Indian cuisine" value="Indian" />
              <Picker.Item label="Indian Chinese" value="Indian" />
              <Picker.Item label="Indian Singaporean cuisine" value="Indian" />
              <Picker.Item label="Indonesian" value="Indonesian" />
              <Picker.Item label="Inuit" value="Inuit" />
              <Picker.Item label="Italian American" value="Italian" />
              <Picker.Item label="Italian cuisine" value="Italian" />
              <Picker.Item label="Japanese" value="Japanese" />
              <Picker.Item label="Jewish" value="Jewish" />
              <Picker.Item label="Karnataka" value="Karnataka" />
              <Picker.Item label="Kazakh" value="Kazakh" />
              <Picker.Item label="Keralite" value="Keralite" />
              <Picker.Item label="Korean" value="Korean" />
              <Picker.Item label="Kurdish" value="Kurdish" />
              <Picker.Item label="Laotian" value="Laotian" />
              <Picker.Item label="Latvian" value="Latvian" />
              <Picker.Item label="Lithuanian" value="Lithuanian" />
              <Picker.Item label="Louisiana Creole" value="Louisiana" />
              <Picker.Item label="Maharashtrian" value="Maharashtrian" />
              <Picker.Item label="Mangalorean" value="Mangalorean" />
              <Picker.Item label="Malay" value="Malay" />
              <Picker.Item label="Malaysian Chinese cuisine" value="Malaysian" />
              <Picker.Item label="Malaysian Indian cuisine" value="Malaysian" />
              <Picker.Item label="Mediterranean cuisine" value="Mediterranean" />
              <Picker.Item label="Mexican" value="Mexican" />
              <Picker.Item label="Mordovian" value="Mordovian" />
              <Picker.Item label="Mughal" value="Mughal" />
              <Picker.Item label="Native American" value="Native" />
              <Picker.Item label="Nepalese" value="Nepalese" />
              <Picker.Item label="New Mexican" value="New" />
              <Picker.Item label="Odia" value="Odia" />
              <Picker.Item label="Parsi" value="Parsi" />
              <Picker.Item label="Pashtun" value="Pashtun" />
              <Picker.Item label="Polish" value="Polish" />
              <Picker.Item label="Pennsylvania Dutch" value="Pennsylvania" />
              <Picker.Item label="Pakistani" value="Pakistani" />
              <Picker.Item label="Peranakan" value="Peranakan" />
              <Picker.Item label="Persian" value="Persian" />
              <Picker.Item label="Peruvian" value="Peruvian" />
              <Picker.Item label="Portuguese" value="Portuguese" />
              <Picker.Item label="Punjabi" value="Punjabi" />
              <Picker.Item label="Rajasthani" value="Rajasthani" />
              <Picker.Item label="Romanian" value="Romanian" />
              <Picker.Item label="Russian" value="Russian" />
              <Picker.Item label="Sami" value="Sami" />
              <Picker.Item label="Serbian" value="Serbian" />
              <Picker.Item label="Sindhi" value="Sindhi" />
              <Picker.Item label="Slovak" value="Slovak" />
              <Picker.Item label="Slovenian" value="Slovenian" />
              <Picker.Item label="Somali" value="Somali" />
              <Picker.Item label="South Indian" value="South" />
              <Picker.Item label="Sri Lankan" value="Sri" />
              <Picker.Item label="Singaporean" value="Singaporean" />
              <Picker.Item label="Tatar" value="Tatar" />
              <Picker.Item label="Thai" value="Thai" />
              <Picker.Item label="Turkish" value="Turkish" />
              <Picker.Item label="Tamil" value="Tamil" />
              <Picker.Item label="Udupi" value="Udupi" />
              <Picker.Item label="Ukrainian" value="Ukrainian" />
              <Picker.Item label="Yamal" value="Yamal" />
              <Picker.Item label="Zanzibari" value="Zanzibari" />
            </Picker>
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.hideModal}
            >
            
            {modalButtonLabel}
            
            </Button>
          
          </Modal>
          <Modal visible={showStartModal} onDismiss={this.hideModal}>
            <Picker
              selectedValue={start}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  start: itemValue,
                  modalButtonLabel: "OK",
                })
              }>
              <Picker.Item label="24 hours" value="24 hours" />
              <Picker.Item label="00:00" value="00:00" />
              <Picker.Item label="01:00" value="01:00" />
              <Picker.Item label="02:00" value="02:00" />
              <Picker.Item label="03:00" value="03:00" />
              <Picker.Item label="04:00" value="04:00" />
              <Picker.Item label="05:00" value="05:00" />
              <Picker.Item label="06:00" value="06:00" />
              <Picker.Item label="07:00" value="07:00" />
              <Picker.Item label="08:00" value="08:00" />
              <Picker.Item label="09:00" value="09:00" />
              <Picker.Item label="10:00" value="10:00" />
              <Picker.Item label="11:00" value="11:00" />
              <Picker.Item label="12:00" value="12:00" />
              <Picker.Item label="13:00" value="13:00" />
              <Picker.Item label="14:00" value="14:00" />
              <Picker.Item label="15:00" value="15:00" />
              <Picker.Item label="16:00" value="16:00" />
              <Picker.Item label="17:00" value="17:00" />
              <Picker.Item label="18:00" value="18:00" />
              <Picker.Item label="19:00" value="19:00" />
              <Picker.Item label="20:00" value="20:00" />
              <Picker.Item label="21:00" value="21:00" />
              <Picker.Item label="22:00" value="22:00" />
              <Picker.Item label="23:00" value="23:00" />
              <Picker.Item label="24:00" value="24:00" />
            </Picker>
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.hideModal}
            >
            
            {modalButtonLabel}
            
            </Button>
          
          </Modal>
          <Modal visible={showEndModal} onDismiss={this.hideModal}>
            <Picker
              selectedValue={end}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  end: itemValue,
                  modalButtonLabel: "OK",
                })
              }>
              <Picker.Item label="00:00" value="00:00" />
              <Picker.Item label="01:00" value="01:00" />
              <Picker.Item label="02:00" value="02:00" />
              <Picker.Item label="03:00" value="03:00" />
              <Picker.Item label="04:00" value="04:00" />
              <Picker.Item label="05:00" value="05:00" />
              <Picker.Item label="06:00" value="06:00" />
              <Picker.Item label="07:00" value="07:00" />
              <Picker.Item label="08:00" value="08:00" />
              <Picker.Item label="09:00" value="09:00" />
              <Picker.Item label="10:00" value="10:00" />
              <Picker.Item label="11:00" value="11:00" />
              <Picker.Item label="12:00" value="12:00" />
              <Picker.Item label="13:00" value="13:00" />
              <Picker.Item label="14:00" value="14:00" />
              <Picker.Item label="15:00" value="15:00" />
              <Picker.Item label="16:00" value="16:00" />
              <Picker.Item label="17:00" value="17:00" />
              <Picker.Item label="18:00" value="18:00" />
              <Picker.Item label="19:00" value="19:00" />
              <Picker.Item label="20:00" value="20:00" />
              <Picker.Item label="21:00" value="21:00" />
              <Picker.Item label="22:00" value="22:00" />
              <Picker.Item label="23:00" value="23:00" />
              <Picker.Item label="24:00" value="24:00" />
            </Picker>
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.hideModal}
            >
            
            {modalButtonLabel}
            
            </Button>
          
          </Modal>
        </Portal>
      </KeyboardAwareScrollView>
    );
  }
}

EditRestaurantForm.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};
