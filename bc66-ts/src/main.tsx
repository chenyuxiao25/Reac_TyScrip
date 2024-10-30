import { ReactQueryDevtools } from "@tanStack/react-query-devtools"
import React from 'react'
import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import store from './redux/store.ts'
const queryClient = new QueryClient({

  defaultOptions: {
    queries: {
      refetchOnWindowFocus:false,
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client ={queryClient}>

          <App />
          <ReactQueryDevtools initialIsOpen={ true} />
          
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>



  </React.StrictMode>
      
      

   
  
   
)
