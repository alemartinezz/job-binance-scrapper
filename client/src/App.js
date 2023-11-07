---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - client
  - src
description: No description.
---
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Compra from './pages/Compra';
import Venta from './pages/Venta';
function App() {
    return (
        <div className="flex bg-gradient-to-r from-[#FFFAF1] to-[#CAA347] min-h-screen">
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={
                        <Navigate to="/compra" />
                    } />
                    <Route path="/compra" element={
                        <>
                            <Sidebar />
                            <Compra />
                        </>
                    } />
                    <Route path="/venta" element={
                        <>
                            <Sidebar />
                            <Venta />
                        </>
                    } />
                </Routes>
            </BrowserRouter>

        </div >
    );
}

export default App;