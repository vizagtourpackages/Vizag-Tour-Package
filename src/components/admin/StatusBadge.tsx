export default function StatusBadge({ status }: { status: string }) {
  const getStyles = () => {
    switch(status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStyles()}`}>
      {status || 'pending'}
    </span>
  )
}
