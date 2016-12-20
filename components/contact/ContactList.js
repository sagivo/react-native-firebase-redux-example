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
    };

    this.contactsFromHash = this.contactsFromHash.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.contactsFromHash('', nextProps.contacts);
  }

  contactsFromHash(filter, data = this.props.contacts) {
    const filterData = Object.keys(data)
      .map(key => {return {...data[key], id: key}; })
      .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
      .sort(c => c.name);

    this.setState({
      ...this.state,
      dataSource: dataSource.cloneWithRows(filterData),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        { (Object.keys(this.props.contacts).length > 0) ?
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderHeader={() => <SearchContact onSearch={this.contactsFromHash} />}
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