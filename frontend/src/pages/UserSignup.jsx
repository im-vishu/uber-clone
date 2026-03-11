import React from 'react'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()

    setUserData({
    
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password

    })

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
              <div className='p-7 ' >
                 <img className='w-16 mb-10'  src="https://imgs.search.brave.com/s5zvkbY9IR_KK_s8AdtUeMlDVGu_g341wSpOnBIWPAc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZmF2cG5nLmNvbS8x/NC81LzkvdWJlci1s/b2dvLXViZXItbG9n/by1kWGcydUZuZ190/LmpwZw" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e)
        }}> 

     <h3 className='text-base font-medium mb-2'>What's your name?</h3>
     <div className='flex gap-4 mb-6'>
       <input
        required  
        className='bg-[#eeeeee] w-1/2 rounded px-2 py-2 border text-lg placeholder: text-sm'
        type="text"
        placeholder='FirstName'
        value={firstName}
        onChange={(e)=>{
          setFirstName(e.target.value)
        }}
        />
        <input
        required  
        className='bg-[#eeeeee] w-1/2  rounded px-2 py-2 border text-base placeholder: text-sm'
        type="text"
        placeholder='LastName'
         value={lastName}
        onChange={(e)=>{
          setLastName(e.target.value)
        }}
        />
     </div>

       <h3 className='text-base font-medium mb-2'>What's your name </h3>  
       <input
        required  
        className='bg-[#eeeeee] mb-6 rounded px-2 py-2 border w-full text-base placeholder: text-sm'
        type="email"
        placeholder='email@example.com'
         value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        />    

       <h3 className='text-base mb-2' > Enter password </h3>
          <input   
             className='bg-[#eeeeee] mb-6 rounded px-2 py-2 border w-full text-base placeholder: text-sm'
              required
              type="password" 
              placeholder='password'
               value={password}
               onChange={(e)=>{
              setPassword(e.target.value)
        }}
             /> 
             <button
             className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder: text-base'>
              Login</button>
              <p className='text-center'>Already have a account?</p> <Link to={'/login'} className='bg-blue-600'>Login here</Link>
              </form>     
              </div>
           <div>
             <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS message, including by automate means, from Uber and its affiliates to the number provided.</p>
              </div>   
    </div>
  )
}

export default UserSignup
