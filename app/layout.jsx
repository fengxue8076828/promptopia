import '@styles/globals.css'
import '@components/Navbar'
import '@components/Provider'
import Navbar from '@components/Navbar'
import Provider from '@components/Provider'

export const metadata = {
    title:"Promtopia",
    description:"Discover and Share AI Prompts"
}

const RootLayout = ({children}) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Navbar />  
                        {children}    
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout