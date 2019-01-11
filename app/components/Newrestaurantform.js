import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default class NewRestaurantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            name: '',
            location: '',
            category: ''
              
        };
    }

    handlePress = () => {
        const {name, location, category} = this.state;
        const { onAdd } = this.props;
        const data = {
            name: name,
            location: location,
            category: category
        }
        onAdd(data);
        this.setState({
            name: '',
            location: '',
            category: ''
        })
    }
    

    render () {
       
        return (
            <View style={{flex: 1}}>
                <TextInput
                    mode="outlined"
                    
                    testID="restaurantNameInputText"
                    label='Name'
                    value={this.state.name}
                    onChangeText={name => this.setState({
                        name
                    })}
                    
                />
                <TextInput
                    mode="outlined"
                    
                    testID="restaurantLocationInputText"
                    label='Location'
                    value={this.state.location}
                    onChangeText={location => this.setState({ location })}
                    
                />
                <TextInput
                    mode="outlined"
                    
                    testID="restaurantCategoryInputText"
                    label='Category'
                    value={this.state.category}
                    onChangeText={category => this.setState({ category })}
                    
                />
                <Button testID='addNewRestaurantButton' mode="outlined" onPress={this.handlePress}>
                    Add
                </Button>
                
            </View>
        )
    }
}