'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitPackageBooking(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('package_bookings').insert([{
    ...data,
    status: 'pending'
  }])

  if (error) {
    console.error('Error saving package booking:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/bookings/packages')
  return { success: true }
}

export async function submitResortBooking(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('resort_bookings').insert([{
    ...data,
    status: 'pending'
  }])

  if (error) {
    console.error('Error saving resort booking:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/bookings/resorts')
  return { success: true }
}

export async function submitCabBooking(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('cab_bookings').insert([{
    ...data,
    status: 'pending'
  }])

  if (error) {
    console.error('Error saving cab booking:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/bookings/cabs')
  return { success: true }
}

export async function updatePackageBookingStatus(id: string, status: string) {
  const supabase = await createClient()
  await supabase.from('package_bookings').update({ status }).eq('id', id)
  revalidatePath('/admin/layout')
  revalidatePath('/admin/bookings/packages')
}

export async function updateResortBookingStatus(id: string, status: string) {
  const supabase = await createClient()
  await supabase.from('resort_bookings').update({ status }).eq('id', id)
  revalidatePath('/admin/layout')
  revalidatePath('/admin/bookings/resorts')
}

export async function updateCabBookingStatus(id: string, status: string) {
  const supabase = await createClient()
  await supabase.from('cab_bookings').update({ status }).eq('id', id)
  revalidatePath('/admin/layout')
  revalidatePath('/admin/bookings/cabs')
}
