import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import Contact from './Contact'
import SearchContact from './SearchContact'
import NoContacts from './NoContacts'
import { COLORS } from '../../styles';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

export default class ContactList extends Component {

  constructor(props) {
    super(props);

    this.state = { filter: '' };

    this.contactsFromHash = this.contactsFromHash.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  contactsFromHash(data = this.props.contacts) {
    const filterData = data
    .filter(c => c.name.toLowerCase()
    .includes(this.state.filter.toLowerCase()))

    return dataSource.cloneWithRows(filterData);
  }

  onSearch(filter) {
    this.setState({ ...this.state, filter });
  }

  render() {
    return (
      <View style={styles.container}>
        { (Object.keys(this.props.contacts).length > 0) ?
        <ListView
          dataSource={this.contactsFromHash(this.props.contacts)}
          renderHeader={() => <SearchContact onSearch={this.onSearch} />}
          renderRow={(data) => <Contact {...data}
            onLongPress={this.props.onLongPress}
            selected={this.props.selectedContacts.has(data.id)}
            onCall={this.props.onCall} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          enableEmptySections={true}
        />
        :
        <NoContacts />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.C1,
  },
});