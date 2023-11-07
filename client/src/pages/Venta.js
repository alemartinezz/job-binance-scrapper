---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - client
  - src
  - pages
description: No description.
---
import RowSellParams from "../components/RowSellParams";
import BuyTable from "../components/tables/BuyTable";
import SellTable from "../components/tables/SellTable";
import SubTitle from "../components/titles/SubTitle";
import Title from "../components/titles/Title";
import { MONEDAS } from "../utils/Constants";

const Venta = () => {

    return (
        <section className='flex flex-col flex-grow mx-16'>
            <Title input="Recibir ofertas de compra (vender)" />
            {
                MONEDAS.map((m, i) => <RowSellParams currency={m.label} key={i} currencyValue={m.value} />)
            }

            {
                MONEDAS.map((m, i) =>
                    <div className="space-y-8 mb-16" key={i}>
                        <SubTitle input={`Listado de ofertas ${m.label}`} />
                        <SellTable currency={m.value} />
                    </div>
                )
            }
        </section >
    );
};
export default Venta;