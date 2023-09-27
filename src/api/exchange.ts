//Consulta `https://api.exchangeratesapi.io/v1/convert?access_key=${process.env.API_Access_Key}&from=${from}&to=${to}&amount=${amount}`
// test `https://api.exchangeratesapi.io/v1/convert?access_key=f92d251cc831ccbcdd8a824035479c0d&from=GBP&to=JPY&amount=25`
// https://api.exchangeratesapi.io/v1/latest?access_key=f92d251cc831ccbcdd8a824035479c0d
// https://api.exchangeratesapi.io/v1/latest?access_key=f92d251cc831ccbcdd8a824035479c0d



// http://api.exchangeratesapi.io/v1/latest?access_key=ba8e537252dbfb611172a4c440328b4e&format=1



// http://api.exchangeratesapi.io/v1/convert?access_key=ba8e537252dbfb611172a4c440328b4e&from=USD&to=EUR&amount=25
// Convert endpoint https://api.exchangeratesapi.io/v1/convert?access_key=API_KEY&from=GBP&to=JPY&amount=25

// curl -X GET "https://exchange-rates-api.oanda.com/v2/currencies.json?api_key=m8Ow9VeXpMxvUQ5udz5h6lrx&data_set=CUCB" \
//  -H "Accept: application/json" \
//  -H "Authorization: m8Ow9VeXpMxvUQ5udz5h6lrx" \

import axios from 'axios';
import { ExchangeResponse } from '@/types';

export async function fetchData() {

    try {
        const response = await axios.get('https://exchange-rates-api.oanda.com/v2/currencies.json', {
            params: {
                api_key: process.env.API_KEY_Oanda,
                data_set: 'CUCB'
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.API_KEY_Oanda}`
            }
        });

        if (response.status === 200) {
            // Procesar la respuesta aquí
            return response.data

        } else {
            console.error('Error al obtener los datos. Código de estado:', response.status);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
}

export async function pairCurrences(from: string, to: string) {

    const API_KEY = process.env.API_KEY_ExchangeRate;
    const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

    const fromCurrency = from;
    const toCurrency = to;
    let responsePair: number = 0

    await axios.get<ExchangeResponse>(`${BASE_URL}${API_KEY}/pair/${fromCurrency}/${toCurrency}`)
        .then(response => {
            if (response.data.result === "success") {
                const conversionRate = response.data.conversion_rate;
                console.log(`La tasa de conversión es: ${conversionRate}`);
                responsePair = conversionRate;
            } else {
                console.error('La solicitud no fue exitosa:', response.data);
                responsePair = 0
            }
        })
        .catch(error => {
            console.error('Error al hacer la petición:', error);
        });

        return responsePair

}
