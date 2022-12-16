import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/Home'
import Root from './routes/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      }
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App
