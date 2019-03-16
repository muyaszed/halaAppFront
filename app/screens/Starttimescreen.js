import React from 'react';
import { FlatList, View } from 'react-native';
import { List, Divider } from 'react-native-paper';

class StartTimeScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'startTimeScreen',
    title: 'Choose the Start Time',
    headerStyle: {
      backgroundColor: '#21c393',
    },
  };

  render() {
    const { navigation } = this.props;
    return (
      <FlatList
        data={[
          { key: '24 hours' },
          { key: '00:00' },
          { key: '01:00' },
          { key: '02:00' },
          { key: '03:00' },
          { key: '04:00' },
          { key: '05:00' },
          { key: '06:00' },
          { key: '07:00' },
          { key: '08:00' },
          { key: '09:00' },
          { key: '10:00' },
          { key: '11:00' },
          { key: '12:00' },
          { key: '13:00' },
          { key: '14:00' },
          { key: '15:00' },
          { key: '16:00' },
          { key: '17:00' },
          { key: '18:00' },
          { key: '19:00' },
          { key: '20:00' },
          { key: '21:00' },
          { key: '22:00' },
          { key: '23:00' },
          { key: '24:00' },
        ]}
        renderItem={({ item }) => (
          <View>
            <List.Item
              title={item.key}
              onPress={() => navigation.navigate('Add', { StartTime: item.key, PrevScreen: navigation.state.routeName })}
            />
            <Divider />
          </View>
        )}
      />
    );
  }
}

export default StartTimeScreen;
