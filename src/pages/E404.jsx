function E404() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="flex flex-col items-center">
        <h1 className="text-[120px] font-extrabold text-gray-700">404</h1>
        <p className="mb-6 text-2xl font-medium text-gray-600">Page Not Found</p>
        <a href="/"
            className="px-4 py-2 font-medium text-white transition-all duration-200 ease-in-out bg-indigo-500 rounded-md hover:bg-indigo-600">
            Go Home
        </a>
    </div>
</main>
  )
}

export default E404