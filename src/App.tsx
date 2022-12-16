import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
      }
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App
