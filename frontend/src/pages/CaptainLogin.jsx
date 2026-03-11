import React from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  useState(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    const submitHandler = (e) => {
      e.preventDefault()
      setCaptainData({
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
                 <img className='w-20 mb-3'  src="https://imgs.search.brave.com/cykZ27VRScThHwy8RGxrj9c1g3kAPOiXNfIPS4mdXeU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvVWJlci1FbWJs/ZW0tNzAweDM5NC5w/bmc" alt="" />
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
              <p className='text-center'>Join a fleet?</p> <Link to={'/captain-signup'} className='bg-blue-600'>Register as a Captain</Link>
              </form>     
              </div>
           <div>
              <Link to={'/login'}
              className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder: text-base'
              >Sign in as User</Link>
              </div>   
    </div>
  )
}

export default CaptainLogin
