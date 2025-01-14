import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className='text-xl text-white font-bold flex gap-4 tracking-tighter'>
          <p>Privary Policy</p>
          <p>Terms of Service</p>
        </span>
      </div>
    
    </div>
  )
}

export default Footer