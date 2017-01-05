import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import CallItem from './CallItem'
import NoHistory from './NoHistory'

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ContactList extends Component {

  constructor(props) {
    super(props);

    this.HistoryFromHash = this.HistoryFromHash.bind(this);
    this.state = { dataSource: dataSource.cloneWithRows(this.HistoryFromHash(this.props.calls)) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      dataSource: dataSource.cloneWithRows(this.HistoryFromHash(nextProps.calls)),
    });
  }

  HistoryFromHash(data) {
    return Object.keys(data)
      .map(id => { return { ...data[id], id: parseInt(id) }; })
      .sort(c => c.id);
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
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});