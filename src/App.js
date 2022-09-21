import React,{Suspense} from "react";
import {HashRouter} from "react-router-dom";
import PrivateRouter from './router/PrivateRouter'
import routers from './router'
import './App.css';
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={<div>加载中...</div>}>
         <PrivateRouter routers={routers}/>
        </Suspense>
      </HashRouter>
    </div>
  );
}
export default App;
