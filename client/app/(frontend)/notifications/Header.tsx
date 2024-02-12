import { Menu } from "lucide-react";

export default function Header() {
    return (
        <div className="topbar-h flex items-center justify-between">
            <span></span>
            <p className='font-semibold'>Notifications</p>
            <Menu />
        </div>
    )
}
