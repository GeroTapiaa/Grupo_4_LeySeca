import React from 'react';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import { Root } from '../pages/Root';
import {Home} from '../pages/Home';
import { Product } from '../pages/Products';
import { User } from '../pages/Users';
import { Categorie } from '../pages/Categories';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<Product/>}/>
            <Route path='/users' element={<User/>}/>
            <Route path='/categories' element={<Categorie/>}/>
        </Route>
    )
)

export const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}