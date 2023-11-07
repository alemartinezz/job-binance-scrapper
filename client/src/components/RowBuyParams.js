---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - client
  - src
  - components
description: No description.
---
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import Submit from "../components/buttons/Submit";
import { getStatusBuy, putBuy } from "../services/buy";
import { PAGOS } from "../utils/Constants";
import InputNumber from "./form/InputNumber";
import MultiSelect from "./form/MultiSelect";


const RowBuyParams = ({ currency, currencyValue }) => {

    // set values
    const [buyTask, setBuyTask] = useState(false);
    const [reference, setReference] = useState();
    const [accepted, setAccepted] = useState();
    const [paymentMethods, setPaymentMethods] = useState([]);

    // toggle play / stop button
    const togglePlayStop = async () => {
        await putBuy(currencyValue, reference, accepted, paymentMethods.map(pm => pm.value));
        setBuyTask(p => !p);
    }

    useEffect(() => {

        const fetchStatus = async () => {
            const wsObject = await getStatusBuy(currencyValue);
            setBuyTask(wsObject.status);
            setReference(wsObject.reference);
            setAccepted(wsObject.accepted);
            setPaymentMethods(PAGOS.filter(({value}) => wsObject.paymentMethods.includes(value)));
        }

        fetchStatus();

        return () => {

        };
    }, [currencyValue]);

    return (
        <>
            <div className='flex space-x-8 my-6 items-center justify-between px-4'>
                <div className="w-[120px] text-lg font-bold">{currency}</div>
                <div className="w-[110px]">
                    <InputNumber id="buyReference" title="Referencia" step='0.5' setInputValue={setReference} defaultValue={reference} />
                </div>
                <div className="w-[110px]">
                    <InputNumber id="buyAccepted" title="Aceptado" step='0.5' setInputValue={setAccepted} defaultValue={accepted} />
                </div>
                
                <div className="w-[320px]">
                    <MultiSelect title="Métodos de pago"
                        list={PAGOS}
                        selected={paymentMethods}
                        setSelected={setPaymentMethods}
                    />
                </div>
                <Submit action={togglePlayStop}>
                    {
                        buyTask ?
                            <IoMdPause size={16} />
                            :
                            <FaPlay size={15} />
                    }
                </Submit>
            </div>
            <hr className="h-[2px] bg-black" />
        </>
    );
};

export default RowBuyParams;