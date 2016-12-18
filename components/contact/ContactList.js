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

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

export default class ContactList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.contacts),
    }

    this.onSearch = this.onSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      dataSource: dataSource.cloneWithRows(nextProps.contacts),
    });
  }

  onSearch(text) {
    const filterData = this.props.contacts
      .filter(contact => contact.name.toLowerCase().includes(text.toLowerCase()));
    this.setState({
      ...this.state,
      dataSource: dataSource.cloneWithRows(filterData),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        { (this.props.contacts.length > 0) ?
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderHeader={() => <SearchContact onSearch={this.onSearch} />}
          renderRow={(data) => <Contact {...data} onCall={this.props.onCall} />}
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
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});