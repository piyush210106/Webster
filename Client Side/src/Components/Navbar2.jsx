

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

function Navbar2() {
  return (
    <div>
      <div className='flex flex-row items-center justify-around m-2 p-2 border-2 border-black rounded-2xl'>
        <p className='font-extrabold text-2xl'>DoseMaster</p>
        <button onClick={handleLogin} className='text-xl border-2 rounded-2xl p-2'>Log In with Google</button>
      </div>
    </div>
  )
}

export default Navbar2
