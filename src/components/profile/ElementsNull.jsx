function ElementsNull({elements}) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row"><span
            className="inline-block w-auto min-w-[250px] px-6 py-4 text-white  rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-500  dark:shadow-indigo-  text-center"
            >No Tiene {elements}
            </span>
    </div>
  )
}

export default ElementsNull