import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { TextInput, Button } from 'react-native-paper';

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
  addButton: {},
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
  pickerWrapper: {},
  picker: {
    backgroundColor: 'white',
  },
});
export default class EditReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
    };
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      review: item.comment,
    });
  }

  handlePress = () => {
    const { onEdit } = this.props;
    const { review } = this.state;
    onEdit(review);
  };

  cancelEdit = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { review } = this.state;

    return (
      <ScrollView style={styles.container} extraScrollHeight={220}>
        <TextInput
          style={styles.input}
          underlineColor="#21c393"
          testID="reviewInputText"
          label="Comment"
          value={review}
          multiline
          onChangeText={inputReview => this.setState({
            review: inputReview,
          })
          }
        />

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
      </ScrollView>
    );
  }
}

EditReviewForm.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};
