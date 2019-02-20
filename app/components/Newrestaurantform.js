import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput, Button } from 'react-native-paper';

export default class NewRestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      category: '',
      desc: ''
    };
  }

  handlePress = () => {
    const { name, location, category, desc } = this.state;
    const { onAdd } = this.props;
    const data = {
      name,
      location,
      category,
      desc,
    };
    onAdd(data);
    this.setState({
      name: '',
      location: '',
      category: '',
      desc: ''
    });
  };

  render() {
    const { name, location, category, desc } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TextInput
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
          label="Location"
          value={location}
          onChangeText={inputLocation => this.setState({ location: inputLocation })
          }
        />
        <TextInput
          mode="outlined"
          testID="restaurantCategoryInputText"
          label="Category"
          value={category}
          onChangeText={inputCategory => this.setState({ category: inputCategory })
          }
        />
        <TextInput
          mode="outlined"
          testID="restaurantDescInputText"
          label="Description"
          value={desc}
          multiline={true}
          numberOfLines={10}
          onChangeText={inputDesc => this.setState({ desc: inputDesc })
          }
        />
        <Button
          testID="addNewRestaurantButton"
          mode="outlined"
          onPress={this.handlePress}
        >
          Add
        </Button>
      </View>
    );
  }
}

NewRestaurantForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
