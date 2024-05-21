import Header from "./Header"

export const metadata = {
    title: 'Notification',
}

const Page = () => {
    return (<div>
        <Header />
        <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center">Requests</div>
    </div>
    )
}

export default Page