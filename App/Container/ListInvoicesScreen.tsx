import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {fetchDataInvoices} from '../Services/api';

const ListInvoicesScreen = () => {
  const [invoices, setInvoices] = useState<any>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('none');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchDataInvoices()
        .then(result => {
          setInvoices(result);
          setFilteredInvoices(result);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }, []),
  );

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredInvoices = invoices.filter((invoice: any) =>
      invoice.description.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredInvoices(filteredInvoices);
  };

  const handleViewInvoice = (invoice: any) => {
    // navigation.navigate('ViewInvoice', {invoice});
  };

  const handleSort = (type: string) => {
    console.log('fff:', [...filteredInvoices]);
    setSortType(type);
    let sortedData = [];
    switch (type) {
      case 'date-ascending':
        sortedData = [...filteredInvoices].sort(
          (a, b) => new Date(a.invoiceDate) - new Date(b.invoiceDate),
        );
        break;
      case 'date-descending':
        sortedData = [...filteredInvoices].sort(
          (a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate),
        );
        break;
      case 'amount-ascending':
        sortedData = [...filteredInvoices].sort(
          (a, b) => parseFloat(a.totalAmount) - parseFloat(b.totalAmount),
        );
        break;
      case 'amount-descending':
        sortedData = [...filteredInvoices].sort(
          (a, b) => parseFloat(b.totalAmount) - parseFloat(a.totalAmount),
        );
        break;
      default:
        sortedData = invoices;
        break;
    }
    setFilteredInvoices(sortedData);
  };

  const renderInvoice = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{padding: 16, borderBottomWidth: 1, borderColor: '#ccc'}}
        onPress={() => handleViewInvoice(item)}>
        <Text>ID: {item.invoiceId}</Text>
        <Text>Ref: {item.referenceNo}</Text>
        <Text>Date: {item.invoiceDate}</Text>
        <Text>Des: {item.description}</Text>
        <Text>Amount: {item.totalAmount}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <SearchBar
        placeholder="Search invoices"
        onChangeText={handleSearch}
        value={searchQuery}
        containerStyle={{backgroundColor: '#fff'}}
      />
      <ScrollView
        horizontal
        style={{height: 50}}
        showsHorizontalScrollIndicator={false}>
        <Button
          title="Date ascending"
          onPress={() => handleSort('date-ascending')}
          buttonStyle={{
            backgroundColor: sortType === 'date-ascending' ? '#517fa4' : '#999',
            marginRight: 5,
            marginLeft: 5,
          }}
        />
        <Button
          title="Date descending"
          onPress={() => handleSort('date-descending')}
          buttonStyle={{
            backgroundColor:
              sortType === 'date-descending' ? '#517fa4' : '#999',
            marginRight: 5,
          }}
        />
        <Button
          title="Amount ascending"
          onPress={() => handleSort('amount-ascending')}
          buttonStyle={{
            backgroundColor:
              sortType === 'amount-ascending' ? '#517fa4' : '#999',
            marginRight: 5,
          }}
        />
        <Button
          title="Amount descending"
          onPress={() => handleSort('amount-descending')}
          buttonStyle={{
            backgroundColor:
              sortType === 'amount-descending' ? '#517fa4' : '#999',
            marginRight: 5,
          }}
        />
      </ScrollView>
      <FlatList
        data={filteredInvoices}
        renderItem={renderInvoice}
        keyExtractor={(i, index) => index.toString()}
      />
    </View>
  );
};

export default ListInvoicesScreen;
