import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
