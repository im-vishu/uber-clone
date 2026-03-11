import React from 'react'

const UserLogin = () => {
  useState(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const submitHandler = (e) => {
      e.preventDefault()
      setUserData({
        email: email,
        password: password
      })
      setEmail('')
      setPassword('')
    }
  })
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
              <div className='p-7 ' >
                 <img className='w-16 mb-10'  src="https://imgs.search.brave.com/s5zvkbY9IR_KK_s8AdtUeMlDVGu_g341wSpOnBIWPAc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZmF2cG5nLmNvbS8x/NC81LzkvdWJlci1s/b2dvLXViZXItbG9n/by1kWGcydUZuZ190/LmpwZw" alt="" />
<form onSubmit={submitHandler(e)}> 
       <h3 className='text-lg font-medium mb-2'>What's your email </h3>  
       <input
        required
        value= {email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder: text-base'
        type="email"
        placeholder='email@example.com'
        />    

       <h3 className='text-xl mb-2' > Enter password </h3>
             <input 
             required 
             value= {password}
               onChange={(e)=>{
                setPassword(e.target.value)
        }}
             className='bg-[#eeeeee] mb-3 rounded px-2 py-2 border w-full text-lg placeholder: text-base'
             type="password"
             placeholder='password'
             />
             <button
             className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder: text-base'>
              Login</button>
              <p className='text-center'>New here?</p> <Link to={'/signup'} className='bg-blue-600'>Create new Account</Link>
              </form>     
              </div>
           <div>
              <link to={'/captain-login'}
              className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder: text-base'
              >Sign in as Captain</link>
              </div>   
    </div>
  )
}

export default UserLogin
