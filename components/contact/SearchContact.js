import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.C2,
  },
  input: {
    height: 34,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 12,
    color: COLORS.C1
      ,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

const SearchContact = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search..."
      underlineColorAndroid="transparent"
      onChangeText={props.onSearch}
    />
  </View>
);

export default SearchContact;