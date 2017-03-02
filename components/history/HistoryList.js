import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import HistoryItem from './HistoryItem'
import NoHistory from './NoHistory'

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

export default class ContactList extends Component {
  render() {
    return (
      <View style={styles.container}>
        { this.props.calls.length ?
        <ListView
          style={styles.container}
          dataSource={dataSource.cloneWithRows(this.props.calls)}
          renderRow={(data, rowId) => <HistoryItem
            selected={this.props.selectedHistory.has(data.id)}
            {...data}
            onLongPress={this.props.onLongPress}
          />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          enableEmptySections={true}
        />
        :
        <NoHistory />
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
    backgroundColor: '#8E8E8E',
  },
});