"use client"
import Link from 'next/link'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'

const Navbar = () => {
  const {data:session} = useSession()
  const [providers,setProviders] = useState(null)
  const [toggleDropdown,setToggleDropdown] = useState(false)

  useEffect(()=>{
    const handleProvider = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    handleProvider()
  },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex flex-center gap-2'>
        <Image src="/assets/images/logo.svg" 
        className='object-contain'
        width={30}
        height={30}
        alt="Promptopia Logo"
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
      <div className='sm:flex hidden'>
        {
          session?.user?
          (
            <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type='button' className='outline_btn' onClick={signOut}>SignOut</button>
              <Link href="/profile" >
                <Image src={session?.user.image} alt='profile' width={37} height={37} className="rounded-full"/>
              </Link>
            </div>
          ):(
            <>
            {providers && Object.values(providers).map(provider=>(
              <button
                type="button"
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
            </>
          )
        }
      </div>
      <div className='sm:hidden flex relative'>
        {
          session?.user?
          (
          <div className='flex'>
              <Image 
              src={session?.user.image}
              alt='profile'
              width={37}
              height={37}
              className="rounded-full"
              onClick={()=>setToggleDropdown(pre=>!pre)}
              />
              {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href="/profile"
                  classname="dropdown_link"
                  onClick={()=>setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  classname="dropdown_link"
                  onClick={()=>setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={()=>{
                    setToggleDropdown(false)
                    signOut()
                  }}
                >
                  Sign Out
                </button>
              </div>
          )}
          </div>
          
          ):(
            <>
            {providers && Object.values(providers).map(provider=>(
              <button
                type="button"
                key={provider.name}
                onClick={()=>signIn(provider.id)}
                className="mt-5 w-full black_btn"
              >
                Sign In
              </button>
            ))}
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar