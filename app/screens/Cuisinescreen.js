import React from 'react';
import { FlatList, View } from 'react-native';
import { List, Divider } from 'react-native-paper';

class CuisineScreen extends React.Component {
  static navigationOptions = {
    tabBarTestID: 'cuisineScreen',
    title: 'Choose the cuisine type',
    headerStyle: {
      backgroundColor: '#21c393',
    },
  };

  render() {
    const { navigation } = this.props;
    const prevScreen = navigation.getParam('PrevScreen');

    return (
      <FlatList
        data={[
          { key: 'Ainu' },
          { key: 'Albanian' },
          { key: 'Argentina' },
          { key: 'Andhra' },
          { key: 'Anglo-Indian' },
          { key: 'Arab' },
          { key: 'Armenian' },
          { key: 'Assyrian' },
          { key: 'Awadhi' },
          { key: 'Azerbaijani' },
          { key: 'Balochi' },
          { key: 'Belarusian' },
          { key: 'Bangladeshi' },
          { key: 'Bengali' },
          { key: 'Berber' },
          { key: 'Buddhist' },
          { key: 'Bulgarian' },
          { key: 'Cajun' },
          { key: 'Chechen' },
          { key: 'Chinese cuisine' },
          { key: 'Chinese Islamic' },
          { key: 'Circassian' },
          { key: 'Crimean Tatar' },
          { key: 'Danish' },
          { key: 'Estonian' },
          { key: 'French' },
          { key: 'Filipino' },
          { key: 'Georgian' },
          { key: 'Goan' },
          { key: 'Goan Catholic' },
          { key: 'Greek' },
          { key: 'Gujarati' },
          { key: 'Hyderabad' },
          { key: 'Indian cuisine' },
          { key: 'Indian Chinese' },
          { key: 'Indian Singaporean cuisine' },
          { key: 'Indonesian' },
          { key: 'Inuit' },
          { key: 'Italian American' },
          { key: 'Italian cuisine' },
          { key: 'Japanese' },
          { key: 'Jewish' },
          { key: 'Karnataka' },
          { key: 'Kazakh' },
          { key: 'Keralite' },
          { key: 'Korean' },
          { key: 'Kurdish' },
          { key: 'Laotian' },
          { key: 'Latvian' },
          { key: 'Lithuanian' },
          { key: 'Louisiana Creole' },
          { key: 'Maharashtrian' },
          { key: 'Mangalorean' },
          { key: 'Malay' },
          { key: 'Malaysian Chinese cuisine' },
          { key: 'Malaysian Indian cuisine' },
          { key: 'Mediterranean cuisine' },
          { key: 'Mexican' },
          { key: 'Mordovian' },
          { key: 'Mughal' },
          { key: 'Native American' },
          { key: 'Nepalese' },
          { key: 'New Mexican' },
          { key: 'Odia' },
          { key: 'Parsi' },
          { key: 'Pashtun' },
          { key: 'Polish' },
          { key: 'Pennsylvania Dutch' },
          { key: 'Pakistani' },
          { key: 'Peranakan' },
          { key: 'Persian' },
          { key: 'Peruvian' },
          { key: 'Portuguese' },
          { key: 'Punjabi' },
          { key: 'Rajasthani' },
          { key: 'Romanian' },
          { key: 'Russian' },
          { key: 'Sami' },
          { key: 'Serbian' },
          { key: 'Sindhi' },
          { key: 'Slovak' },
          { key: 'Slovenian' },
          { key: 'Somali' },
          { key: 'South Indian' },
          { key: 'Sri Lankan' },
          { key: 'Singaporean' },
          { key: 'Tatar' },
          { key: 'Thai' },
          { key: 'Turkish' },
          { key: 'Tamil' },
          { key: 'Udupi' },
          { key: 'Ukrainian' },
          { key: 'Yamal' },
          { key: 'Zanzibari' },
        ]}
        renderItem={({ item }) => (
          <View>
            <List.Item
              title={item.key}
              onPress={() => navigation.navigate(prevScreen, { Cuisine: item.key, PrevScreen: navigation.state.routeName })}
            />
            <Divider />
          </View>
        )}
      />
    );
  }
}

export default CuisineScreen;
