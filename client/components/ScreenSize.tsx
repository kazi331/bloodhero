const ScreenSize = () => {
    return (
        <p className='font-medium text-lg p-2 rounded-lg text-center bg-slate-600 text-white my-2'>Current Screen Size is: {window.innerWidth} / {window.innerHeight}</p>
    )
}

export default ScreenSize