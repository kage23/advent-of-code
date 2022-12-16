import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Day, { loader as dayLoader } from './routes/Day'

import Home from './routes/Home'
import Root from './routes/Root'
import Year, { loader as yearLoader } from './routes/Year'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: ':year/',
        element: <Year />,
        id: 'year',
        loader: yearLoader
      },
      {
        path: ':year/day/:day/',
        element: <Day />,
        id: 'day',
        loader: dayLoader
      }
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App
