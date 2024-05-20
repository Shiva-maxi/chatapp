import { Outlet } from 'react-router-dom';
import './index.css'
import  { Toaster } from 'react-hot-toast';
function App() {
  return (
     <div>
     <Toaster/>
      <Outlet/>
     </div>
  );
}

export default App;
