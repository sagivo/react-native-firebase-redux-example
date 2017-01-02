import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View
} from 'react-native';
import * as userActions from '../actions/userActions';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import languages from "../models/languages";

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

function mapStateToProps(state) {
  return {
    languages: state.UserReducer.languages,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser: userActions.updateUser,
    syncUser: userActions.syncUser,
  }, dispatch);
}


class LanguageContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      filter: '',
    };

    this.props.syncUser();

    this.onSearch = this.onSearch.bind(this);
    this.onLanguageSelected = this.onLanguageSelected.bind(this);
    this.filterLanguage = this.filterLanguage.bind(this);
  }

  filterLanguage() {
    const result = [];
    for(const i in languages) {
      if (languages[i].name.toLowerCase().includes(this.state.filter.toLowerCase()))
        result.push({
          name: `${languages[i].name} (${languages[i].nativeName})`,
          code: i,
          selected: this.props.languages && !!this.props.languages[i],
        });
    }
    return result;
  }

  onSearch(filter) {
    this.setState({
      ...this.state,
      filter,
    });
  }

  onLanguageSelected(languageCode) {
    const newLanguages = {...this.props.languages};
    if (newLanguages[languageCode]) delete newLanguages[languageCode];
    else newLanguages[languageCode] = true;

    if (Object.keys(newLanguages).length) this.props.updateUser('languages', newLanguages);
    else alert('must select at least one language');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.input}
            placeholder="Search language..."
            underlineColorAndroid="transparent"
            onChangeText={(aa) => this.onSearch(aa)}
          />
        </View>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.filterLanguage())}
          renderRow={(data) => {return (
            <TouchableHighlight onPress={() => this.onLanguageSelected(data.code)} style={[styles.item, data.selected ? styles.selected : null]}>
              <Text>{data.name}</Text>
            </TouchableHighlight>
          )}}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(LanguageContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  item: {
    padding: 10,
  },
  input: {
    height: 34,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  selected: {
    backgroundColor: 'yellow',
  },
});