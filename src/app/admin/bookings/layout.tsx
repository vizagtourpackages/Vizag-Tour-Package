export default function BookingsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bookings Management</h1>
        <p className="text-gray-600 text-sm">View and manage customer booking requests.</p>
      </div>

      <div>
        {children}
      </div>
    </div>
  )
}
