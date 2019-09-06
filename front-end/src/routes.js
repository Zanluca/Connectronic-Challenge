import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import DashBoard from './pages/Dashboard'
import List from './pages/List'
import CategoryRegistration from './pages/CategoryRegistration'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={DashBoard} />
            <Route path='/categorias' exact component={List} />
            <Route path='/categoria/:id' component={CategoryRegistration} />
            <Route path='/nova_categoria' component={CategoryRegistration} />
        </BrowserRouter>
    )
}