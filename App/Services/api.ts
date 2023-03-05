import axios from 'axios';
import {getAsyncStorage} from '../Functions/AsyncStorageFunction';
import {CustomerInvoiceType} from '../Types/InvoiceType';

const API_BASE_URL = 'https://sandbox.101digital.io/';

export const fetchAccessToken = async () => {
  const url = `${API_BASE_URL}token`;
  const params = new URLSearchParams();
  params.append('client_id', 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa');
  params.append('client_secret', '0Exp4dwqmpON_ezyhfm0o_Xkowka');
  params.append('grant_type', 'password');
  params.append('scope', 'openid');
  params.append('username', 'dung+octopus4@101digital.io');
  params.append('password', 'Abc@123456');

  const response = await axios.post(url, params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
};

export const fetchOrgToken = async (accessToken: string) => {
  const url = `${API_BASE_URL}membership-service/1.2.0/users/me`;
  // const response = await axios.get(url, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //   },
  // });

  // return response.data.memberships[0].token;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  return result.data.memberships[0].token;
};

export const createInvoice = async (
  customerInvoice: CustomerInvoiceType,
  accessToken: string,
  orgToken: string,
) => {
  const url = `${API_BASE_URL}invoice-service/2.0.0/invoices`;

  const invoiceDetail = {
    invoices: [
      {
        bankAccount: {
          bankId: '',
          sortCode: '09-01-01',
          accountNumber: '12345678',
          accountName: 'John Terry',
        },
        customer: {
          firstName: 'Nguyen',
          lastName: 'Dung 2',
          contact: {
            email: 'nguyendung2@101digital.io',
            mobileNumber: '+6597594971',
          },
          addresses: [
            {
              premise: 'CT11',
              countryCode: 'VN',
              postcode: '1000',
              county: 'hoangmai',
              city: 'hanoi',
            },
          ],
        },
        documents: [
          {
            documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
            documentName: 'Bill',
            documentUrl: 'http://url.com/#123',
          },
        ],
        invoiceReference: `#${customerInvoice.reference}`,
        invoiceNumber: `INV${Math.floor(Math.random() * 1000000000)}`,
        currency: 'GBP',
        invoiceDate: customerInvoice.date,

        dueDate: '2021-06-04',
        amount: customerInvoice.amount,
        description: customerInvoice.description,
        customFields: [
          {
            key: 'invoiceCustomField',
            value: 'value',
          },
        ],
        extensions: [
          {
            addDeduct: 'ADD',
            value: 10,
            type: 'PERCENTAGE',
            name: 'tax',
          },
          {
            addDeduct: 'DEDUCT',
            type: 'FIXED_VALUE',
            value: 10.0,
            name: 'discount',
          },
        ],
        items: [
          {
            itemReference: 'itemRef',
            description: 'Honda RC150',
            quantity: 1,
            rate: 1000,
            itemName: 'Honda Motor',
            itemUOM: 'KG',
            customFields: [
              {
                key: 'taxiationAndDiscounts_Name',
                value: 'VAT',
              },
            ],
            extensions: [
              {
                addDeduct: 'ADD',
                value: 10,
                type: 'FIXED_VALUE',

                name: 'tax',
              },
              {
                addDeduct: 'DEDUCT',
                value: 10,
                type: 'PERCENTAGE',
                name: 'tax',
              },
            ],
          },
        ],
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'org-token': orgToken,
      'Operation-Mode': 'SYNC',
    },
    body: JSON.stringify(invoiceDetail),
  });

  const result = await res.json();

  // const response = await axios.post(url, invoice, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //     'org-token': orgToken,
  //   },
  // });

  console.log(result);
};

export const fetchDataInvoices = async () => {
  const accessToken = await getAsyncStorage('access-token');
  const orgToken = await getAsyncStorage('org-token');

  const response = await axios.get(
    'https://sandbox.101digital.io/invoice-service/2.0.0/invoices',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'org-token': orgToken,
        pageSize: '30',
      },
    },
  );

  return response.data.data;
};
