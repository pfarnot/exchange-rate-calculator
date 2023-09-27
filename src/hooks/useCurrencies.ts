'use client'

import { fetchData } from '@/api/exchange'
import { Currency } from '@/types'
import { useEffect, useState } from 'react'

function useCurrencies() {
  const [options, setOptions] = useState<Currency[]>([])

  useEffect(() => {
    const fetchCurrencies = async () => {
      const currencies = await fetchData()
      setOptions(currencies.currencies)
    }

    fetchCurrencies()
  }, [])

  return options
}

export default useCurrencies