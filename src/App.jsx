import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import {Header, Footer} from "./components/index"
const App = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}));
        }else{
          dispatch(logout());
        }
      })
      .catch((error)=>{
        console.log("Error :: getting current user :: ", error);
      })
      .finally(()=>setLoading(false));
  }, []);
  return (
    <div>
     {!loading ? (
      <div className="min-h-screen flex flex-wrap content-center bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            TODO: {/* {Outlet} */}
          </main>
          <Footer />
        </div>
      </div>
      ) : null}
    </div>
  )
}

export default App
