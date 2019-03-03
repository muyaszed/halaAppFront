import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
  },
  hideLocation: {
    display: 'none',
  },
  displayLocation: {
    display: 'flex',
  },
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
      displayAddress: false,
      disabledEndTime: true,
    };
  }


  handlePress = () => {
    const {
      name, address, city, postcode, country, category, cuisine, web, start, end, desc,
    } = this.state;
    const { onAdd } = this.props;
    let location;
    if (address || city || postcode || country) {
      location = `${address},${postcode},${city},${country}`;
    } else {
      location = '';
    }
   
    const data = {
      name,
      location,
      category,
      cuisine,
      web,
      start,
      end,
      desc,
    };
    
    onAdd(data).then((res) => {
      const { navigation } = this.props;
      console.log('Im here', res);
      if (!res) {
        console.log('Im in');
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

  render() {
    const {
      name, address, city, postcode, country, category, cuisine, web, desc, start, end, displayAddress, disabledEndTime,
    } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView 
        style={styles.container}
        extraScrollHeight={100}
      >

        <NavigationEvents 
          onDidFocus={() => { 
            
            
              this.setState({ 
                category: navigation.getParam('Category'),
                cuisine: navigation.getParam('Cuisine'),
                start: navigation.getParam('StartTime'),
              });
              
              if (navigation.getParam('StartTime') !== '24 hours' && navigation.getParam('StartTime') !== undefined) {
                console.log('inside if');
                this.setState({
                  disabledEndTime: false,
                  end: navigation.getParam('EndTime'),
                });
              } else if (navigation.getParam('StartTime') === '24 hours') {
                this.setState({
                  disabledEndTime: true,
                  end: '',
                });
              };
              
            }
            
          }
          
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
          onFocus={() => navigation.navigate('Category')}
        />
        <TextInput
          mode="outlined"
          testID="restaurantCuisineInputText"
          label="Select Cuisine &#62;"
          value={cuisine}
          onChangeText={inputCuisine => this.setState({ cuisine: inputCuisine })}
          onFocus={() => navigation.navigate('Cuisine')}
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
        <Button
          style={styles.button}
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
  onAdd: PropTypes.func.isRequired,
  clearForm: PropTypes.bool.isRequired,
};
