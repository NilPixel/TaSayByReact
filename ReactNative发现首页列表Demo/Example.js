import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

// just the raw data
const contactsData = [
  { name: 'James', phone: '333-333-333' },
  { name: 'Joe', phone: '333-333-333' },
  { name: 'Sam', phone: '333-333-333' },
  { name: 'Pit', phone: '333-333-333' },
  { name: 'Andres', phone: '333-333-333' },
];

/*
 * this function is going to return the data just as a plain array of objects. i.e:
 * 
 *   [ { type: 'header', name: 'a' },
 *     { name: 'Andres', phone: '333-333-333' },
 *     { type: 'header', name: 'j' },
 *     { name: 'James', phone: '333-333-333' },
 *     { name: 'Joe', phone: '333-333-333' },
 *     { type: 'header', name: 'p' },
 *     { name: 'Pit', phone: '333-333-333' },
 *     { type: 'header', name: 's' },
 *     { name: 'Sam', phone: '333-333-333' } ]
 * 
 *   Notice that some items has a `type` property its value 'header'
 *   Just to differentiate the contacts from the headers.
 */
const prepareData = data => {
  /* First we generate a "directory" as an object like
   * {
   *   a: [ array of contacts...  ],
   *   j: [ array of contacts...  ],
   * }
   * 
   */
  const contactsByLetter = alphabet.reduce((prev, letter) => {
    const perLetter = data.filter(
      contact => contact.name[0].toUpperCase() === letter,
    );
    if (perLetter.length) {
      prev[letter] = perLetter;
    }
    return prev;
  }, {});
  /*
   * and then we turn the "directory" into the flat array as FlatList expects
   */
  let flatData = [];
  Object.keys(contactsByLetter).forEach(key => {
    flatData.push({ type: 'header', name: key });
    flatData.push(...contactsByLetter[key]);
  });
  /*
   *  FlatList needs the items to have an `key` field. We're going to use the
   *  index of the array
   */
  flatData = flatData.map((item, index) => ({key: index, ...item}));
  return flatData;
};

// here the function is called.
const data = prepareData(contactsData);

class Example extends Component {
  /*
   *   For render items (see: https://docs.nativebase.io/COMPONENTS.html#List_Divider)
   */
  renderItem = ({ item }) => (
    <Text>{item.name}</Text>
  );

  render() {
    return (
      <FlatList data={data} renderItem={this.renderItem} />
    );
  }
}

export default Example;
