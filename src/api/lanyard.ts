export async function fetchLanyard(userId: string) {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`)
  if (!res.ok) throw new Error(`Lanyard HTTP ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error('Lanyard returned no success')
  return json.data
}