export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get('text') ?? ''

  const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:8000'
  const res = await fetch(`${backendUrl}/predict?text=${encodeURIComponent(text)}`, {
    method: 'POST',
  })

  const data = await res.json()
  return Response.json(data)
}
