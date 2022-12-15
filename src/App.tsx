import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Yo!!!</div>
  }
])

const App = () => <RouterProvider router={router} />

export default App
