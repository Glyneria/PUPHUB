import { supabase } from '../lib/supabase'

export async function getEventsByOrgId(orgId) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('org_id', orgId)

  if (error) throw error
  return data
}
