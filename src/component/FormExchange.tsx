'use client'
import React, { useState } from 'react';
import DropdownFrom from './Dropdown'; // Asegúrate de que la ruta sea correcta
import { Button, Input, ScrollShadow } from '@nextui-org/react';
import { Currency } from '@/types';
import { pairCurrences } from '@/api/exchange';

export default function FormExchange({ currencies }: { currencies: Currency[] }) {
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [result, setResult] = useState<string | number>("result");
    const [convert, setConvert] = useState<string>("Convert")
    const [refreshDropdown, setRefreshDropdown] = useState(false);


    async function getPair() {
        console.log(amount)
        if (from == "" || to == "") return alert("Debe de llenar los campos")
        try {
            const pair = await pairCurrences(from, to)
            const pairConvertion = await pair
            setResult(pairConvertion * amount)
            setConvert("Claen")
        } catch (error) {
            console.error("Hubo un error al realizar la conversion: ", error)
        }
    }
    const clean = () => {
        setAmount(0)
        setRefreshDropdown(true);
        setResult("result")
        setConvert("Convert")
    }

    const handleFrom = (e: string) => {
        setFrom(e);
        console.log(e); // Muestra el valor actualizado
    }

    const handleTo = (e: string) => {
        setTo(e);
        console.log(e); // Muestra el valor actualizado

    }

    return (
        <main className="flex min-h-full flex-col items-center p-10" >
            <h1>Exchange</h1>
           
                <div >
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={`${amount}`}
                        onChange={(e) => {
                            setAmount(parseInt(e.target.value))
                        }}
                    />

                    <div className="flex flex-row flex-wrap justify-between items-center mt-10" style={{ marginTop: 10 }}>
                        <div className="flex flex-col items-center">
                            <h2>from</h2>
                            <DropdownFrom currencies={currencies} onChange={handleFrom} refresh={refreshDropdown} />
                        </div>

                        <div className="flex flex-col items-center object-right">
                            <h2>to</h2>
                            <DropdownFrom currencies={currencies} onChange={handleTo} refresh={refreshDropdown} />
                        </div>
                    </div>
                </div>

      

            <Button style={{ marginTop: 10 }} color="success" onClick={() => {
                if (convert == "Convert")
                    getPair()
                else {
                    clean()
                }
            }}>
                {convert}
            </Button>

            <label id="result">
                {result}
            </label>
        </main>
    );
}
