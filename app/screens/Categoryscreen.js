import React from 'react';
import { FlatList, View } from 'react-native';
import { List, Divider } from 'react-native-paper';

class CategoryScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'categoryScreen',
    title: 'Choose the Category',
    headerStyle: {
      backgroundColor: '#21c393',
    },
  };

  render() {
    const { navigation } = this.props;
    return (
      <FlatList
        data={[
          { key: 'Restaurant' },
          { key: 'Cafe' },
          { key: 'Food Stall' },
          { key: 'Food Truck' },
        ]}
        renderItem={({ item }) => (
          <View>
            <List.Item
              title={item.key}
              onPress={() => navigation.navigate('Add', { Category: item.key })}
            />
            <Divider />
          </View>
        )}
      />
    );
  }
}

export default CategoryScreen;
