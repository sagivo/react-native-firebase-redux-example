import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import CallItem from './CallItem'
import NoHistory from './NoHistory'

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

export default class ContactList extends Component {

  constructor(props) {
    super(props);

    this.state = { dataSource: dataSource.cloneWithRows(this.props.calls) };
    this.HistoryFromHash = this.HistoryFromHash.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('recived new props??');
    this.HistoryFromHash(nextProps.calls);
  }

  HistoryFromHash(data) {
    const filterData = Object.keys(data)
      .map(key => { return { ...data[key], id: key }; })
      .sort(c => c.timestamp);

    this.setState({
      ...this.state,
      dataSource: dataSource.cloneWithRows(filterData),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        { (Object.keys(this.props.calls).length > 0) ?
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data, rowId) => <CallItem {...data} removeHistory={this.props.removeHistory} />}
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
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});