import { Button } from "@/components/ui/button"
import Header from "./Header"

const Page = () => {

    return (
        <div>
            <Header />
            <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center">
                <h2>Settings</h2>
            </div>
        </div>
    )
}

export default Page