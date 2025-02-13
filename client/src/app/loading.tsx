const Loading = () => {
    return (
        <div className="x-loading font-Libre italic flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-100 to-rose-200">
            <div className="text-center">
                <div className="relative">
                    <div className="cupid-heart">
                        <img src="/heart.svg" />
                    </div>
                    <div className="cupid-arrow"></div>
                </div>
                <h1 className="mt-8 text-3xl font-bold text-rose-600">Cupid is aiming...</h1>
                <p className="mt-2 text-lg text-rose-400">Your love is loading</p>
            </div>
        </div>
    )
}

export default Loading

