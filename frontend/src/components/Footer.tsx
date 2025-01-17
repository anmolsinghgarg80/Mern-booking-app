import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <div className="bg-blue-800 py-6">
      <div className="flex justify-between">
        <span className="text-xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className='text-sm text-white font-bold flex gap-2 justify-around tracking-tighter'>
          <p>Privary Policy</p>
          <p>Terms of Service</p>
        </span>
      </div>
    
    </div>
  )
}

export default Footer