const fs = require('fs');
const path = require('path');

const generateCrud = (folder, table, singular, fields, title) => {
  const dir = path.join(__dirname, 'src/app/admin', folder);
  const idDir = path.join(dir, '[id]');
  fs.mkdirSync(idDir, { recursive: true });

  // actions.ts
  fs.writeFileSync(path.join(dir, 'actions.ts'), `'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function save${singular}(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const isNew = id === 'new'
  
  const data: any = {
    is_active: formData.get('is_active') === 'on',
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }
  ${fields.map(f => `if (formData.has('${f}')) data.${f} = formData.get('${f}')`).join('\n  ')}

  if (isNew) {
    await supabase.from('${table}').insert([data])
  } else {
    await supabase.from('${table}').update(data).eq('id', id)
  }
  revalidatePath('/admin/${folder}')
  redirect('/admin/${folder}')
}

export async function delete${singular}(id: string) {
  const supabase = await createClient()
  await supabase.from('${table}').delete().eq('id', id)
  revalidatePath('/admin/${folder}')
}

export async function toggle${singular}(id: string, is_active: boolean) {
  const supabase = await createClient()
  await supabase.from('${table}').update({ is_active }).eq('id', id)
  revalidatePath('/admin/${folder}')
}
`);

  // page.tsx (List)
  fs.writeFileSync(path.join(dir, 'page.tsx'), `import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Check, X } from 'lucide-react'
import { delete${singular}, toggle${singular} } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function Page() {
  const supabase = await createClient()
  const { data: items } = await supabase.from('${table}').select('*').order('display_order', { ascending: true })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">${title}</h2>
        </div>
        <Link href="/admin/${folder}/new" className="bg-charcoal hover:bg-charcoal/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Plus size={18} /> Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              ${fields.map(f => `<th className="p-4">${f}</th>`).join('\n              ')}
              <th className="p-4">Order</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                ${fields.map(f => `<td className="p-4">{item.${f}}</td>`).join('\n                ')}
                <td className="p-4">{item.display_order}</td>
                <td className="p-4 text-center">
                  <form action={toggle${singular}.bind(null, item.id, !item.is_active)}>
                    <button type="submit" className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium \${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}\`}>
                      {item.is_active ? <Check size={12} /> : <X size={12} />} {item.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </form>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={\`/admin/${folder}/\${item.id}\`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></Link>
                    <form action={delete${singular}.bind(null, item.id)}><DeleteButton /></form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
`);

  // [id]/page.tsx (Form)
  fs.writeFileSync(path.join(idDir, 'page.tsx'), `import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { save${singular} } from '../actions'

export default async function FormPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const isNew = id === 'new'
  const supabase = await createClient()
  
  let initialData = null
  if (!isNew) {
    const { data } = await supabase.from('${table}').select('*').eq('id', id).single()
    initialData = data
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/${folder}" className="text-gray-500 hover:text-gray-900"><ArrowLeft size={24} /></Link>
        <h2 className="text-2xl font-bold text-gray-900">{isNew ? 'Add' : 'Edit'} ${singular}</h2>
      </div>

      <form action={save${singular}} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <input type="hidden" name="id" value={id} />
        
        ${fields.map(f => `
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">${f}</label>
          ${f === 'description' ? 
            `<textarea name="${f}" defaultValue={initialData?.${f}} rows={4} className="w-full p-3 border rounded-lg" required />` :
            `<input type="text" name="${f}" defaultValue={initialData?.${f}} className="w-full p-3 border rounded-lg" required />`
          }
        </div>
        `).join('')}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
          <input type="number" name="display_order" defaultValue={initialData?.display_order || 0} className="w-full p-3 border rounded-lg" required />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" id="is_active" defaultChecked={isNew ? true : initialData?.is_active} className="w-4 h-4 text-teal" />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button type="submit" className="bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-bold">Save</button>
        </div>
      </form>
    </div>
  )
}
`);
}

generateCrud('travels/trust-points', 'travel_trust_points', 'TrustPoint', ['label', 'icon'], 'Travel Trust Points');
generateCrud('travels/notes', 'travel_notes', 'Note', ['title', 'description'], 'Travel Notes');
