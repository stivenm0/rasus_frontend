import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
            <React.StrictMode>
            <RouterProvider router={router} />
            <ReactQueryDevtools/>
            </React.StrictMode>
          </QueryClientProvider>
  ,
)
