export default function FullPageLoading() {
    return (<div className='min-h-[calc(100vh-4rem)]  bg-[#2d2d63]'>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
    </div>
    )
}