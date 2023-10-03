interface props {
    msg: string
}

const NotAvailable = ({msg} : props) => {
  return (
    <div className="w-full flex items-center justify-center h-full">
        <h1 className="text-emerald-400 font-semibold text-center">{msg}</h1>
    </div>
  )
}

export default NotAvailable