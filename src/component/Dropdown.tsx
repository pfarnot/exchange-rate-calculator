'use client'
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  ScrollShadow,
} from "@nextui-org/react";
import { Currency } from "@/types";

interface DropdownFromProps {
  currencies: Currency[];
  onChange: (currencyCode: string) => void;
  refresh : boolean;
}

const DropdownFrom: React.FC<DropdownFromProps> = ({ currencies, onChange, refresh }) => {
  const [menuOption, setMenuOption] = useState<string>("Currencies");

  useEffect(() => {
    if (currencies.length > 0) {
      setMenuOption("Currencies");
    }
  }, [currencies, refresh]);


  const handleClickOption = (currency: Currency) => {
    setMenuOption(currency.code);
    onChange(currency.code);
  };

  const listOptions = currencies.map((currency) => (
    <DropdownItem
      key={currency.code}
      onClick={() => handleClickOption(currency)}
    >
      {currency.code}
    </DropdownItem>
  ));

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">{menuOption}</Button>
      </DropdownTrigger>
      <ScrollShadow className="h-[300px]">
        <DropdownMenu aria-label="Dynamic Actions">
          {listOptions}
        </DropdownMenu>
      </ScrollShadow>
    </Dropdown>
  );
};

export default DropdownFrom;
