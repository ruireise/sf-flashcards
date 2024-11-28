//Main page, shows all the components
"use client"
import Chat from './pages/chat'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Home() {

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="grid grid-cols-4 h-full pt-14">
        <Sidebar />
        <div className="col-span-3">
          <Chat />
        </div>
      </div>
    </div>
  );
}
