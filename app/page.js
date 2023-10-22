import Mapbox from "./components/mapbox"
import Sidebar from "./components/sidebar"
import Navbar from "./components/navbar"

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <Navbar />
      <div className="h-full grid grid-rows-1 grid-cols-[1fr_4fr] gap-4 px-8">
        <Sidebar />
        <div className="min-h-[750px]">
          <Mapbox />
        </div>
      </div>
    </main>
  )
}
