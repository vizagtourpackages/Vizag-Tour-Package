'use client'

export default function StatusActions({ 
  id, 
  status, 
  updateAction 
}: { 
  id: string, 
  status: string, 
  updateAction: (id: string, status: string) => Promise<void> 
}) {
  return (
    <div className="flex flex-col gap-2 items-end">
      {status !== 'confirmed' && (
        <button 
          onClick={() => updateAction(id, 'confirmed')}
          className="text-xs font-bold bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 rounded-lg border border-green-200 transition-colors w-full sm:w-auto text-center"
        >
          Confirm
        </button>
      )}
      {status !== 'cancelled' && (
        <button 
          onClick={() => updateAction(id, 'cancelled')}
          className="text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition-colors w-full sm:w-auto text-center"
        >
          Cancel
        </button>
      )}
      {status !== 'pending' && (
        <button 
          onClick={() => updateAction(id, 'pending')}
          className="text-[10px] text-gray-400 hover:text-gray-600 underline"
        >
          Mark Pending
        </button>
      )}
    </div>
  )
}
