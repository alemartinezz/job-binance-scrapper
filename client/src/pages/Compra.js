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
import RowBuyParams from "../components/RowBuyParams";
import BuyTable from "../components/tables/BuyTable";
import SubTitle from "../components/titles/SubTitle";
import Title from "../components/titles/Title";
import { MONEDAS } from "../utils/Constants";

const Compra = () => {

    return (
        <section className='flex flex-col flex-grow mx-16'>
            <Title input="Recibir ofertas de venta (comprar)" />
            {
                MONEDAS.map((m, i) => <RowBuyParams currency={m.label} key={i} currencyValue={m.value} />)
            }

            {
                MONEDAS.map((m, i) =>
                    <div className="space-y-8 mb-16" key={i}>
                        <SubTitle input={`Listado de ofertas ${m.label}`} />
                        <BuyTable currency={m.value} />
                    </div>
                )
            }
        </section >
    );
};
export default Compra;