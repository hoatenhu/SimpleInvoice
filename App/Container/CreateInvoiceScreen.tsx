import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {
  getAsyncStorage,
  setAsyncStorage,
} from '../Functions/AsyncStorageFunction';
import {createInvoice, fetchAccessToken, fetchOrgToken} from '../Services/api';
import {CustomerInvoiceType} from '../Types/InvoiceType';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {styles} from './Style/CreateInvoiceScreen';
import {Root, Toast} from 'react-native-popup-confirm-toast';

const CreateInvoiceScreen = () => {
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [loadingCreateInvoice, setLoadingCreateInvoice] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  const storeToken = async () => {
    const accessToken = await fetchAccessToken();
    console.log('1', accessToken);
    const orgToken = await fetchOrgToken(accessToken);
    console.log('2', orgToken);

    await setAsyncStorage('access-token', accessToken);
    await setAsyncStorage('org-token', orgToken);
  };

  useEffect(() => {
    setInitLoading(true);
    storeToken()
      .catch(err => console.log(err))
      .finally(() => setInitLoading(false));
  }, []);

  const handleSubmit = async () => {
    const accessToken = await getAsyncStorage('access-token');
    const orgToken = await getAsyncStorage('org-token');
    const invoice: CustomerInvoiceType = {
      reference,
      date: dayjs(date).format('YYYY-MM-DD'),
      description,
      amount,
    };
    if (accessToken && orgToken) {
      setLoadingCreateInvoice(true);
      await createInvoice(invoice, accessToken, orgToken);
      setLoadingCreateInvoice(false);
      setReference('');
      setDate(new Date());
      setDescription('');
      setAmount('');

      Toast.show({
        title: 'Success!',
        text: 'You have successfully created invoice',
        backgroundColor: '#109d67',
        timeColor: 'transparent',
        timing: 3000,
        position: 'top',
        statusBarType: 'dark-content',
      });
    } else {
      console.error('Something went wrong!');
      return;
    }
  };
  if (initLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Root>
      <View style={styles.container}>
        <Input
          label="Reference"
          placeholder="Enter reference"
          value={reference}
          onChangeText={setReference}
          keyboardType="numeric"
        />
        <Input
          label="Description"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
        <Input
          label="Amount"
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <View style={styles.datePickerView}>
          <Input
            label="Date"
            placeholder="Enter date"
            value={date.toLocaleDateString()}
            editable={false}
          />
          <DatePicker mode="date" date={date} onDateChange={setDate} />
        </View>

        <Button
          title="Create Invoice"
          onPress={handleSubmit}
          loading={loadingCreateInvoice}
        />
      </View>
    </Root>
  );
};

export default CreateInvoiceScreen;
