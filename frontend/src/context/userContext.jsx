import React from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {

  const [user, setUser] = useState({
              email:'',
              fullName:{
                            firstName:'', 
                            lastName:''
              }

  })
  return (
    <div>
    <UserDataContext>
              {children}
    </UserDataContext>
      
    </div>
  )
}

export default userContext
