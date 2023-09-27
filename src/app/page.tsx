
'use client'
import useCurrencies from "@/hooks/useCurrencies";
import FormExchange from "@/component/FormExchange";

export default function Home() {

  const options = useCurrencies()
  console.log(options)

  return (

    <FormExchange currencies={options} />

  )
}
