import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import AllJobs from './pages/AllJobs'
import CreateJobs from './pages/CreateJobs'
import Profile from './pages/Profile'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accountType, setAccountType] = useState('')

  return (
    <>
      {
        isLoggedIn ?
        <Routes>
          <Route path="/all-jobs" element={ 
            <AllJobs accountType={ accountType } /> 
          } />
          <Route path="/profile" element={ 
            <Profile 
              username={ username } accountType={ accountType } 
              setIsLoggedIn={ setIsLoggedIn } setUsername={ setUsername } 
              setPassword={ setPassword }
            /> 
          } />
          <Route path="/create-job" element={ 
            <CreateJobs username={ username } accountType={ accountType } /> 
          } />
          <Route path="/" element={ 
            <Navigate to="/all-jobs" />
          } />
        </Routes>
        :
        isLoggingIn ?
        <Auth 
          username={ username } setUsername={ setUsername } 
          password={ password } setPassword={ setPassword }
          setIsLoggedIn={ setIsLoggedIn } accountType={ accountType }
          setAccountType={ setAccountType }
        />
        :
        <Landing setIsLoggingIn={ setIsLoggingIn } />
      }
    </>
  );
}

export default App;
