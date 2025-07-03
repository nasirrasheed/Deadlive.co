import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]

  if (token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { paths } = await request.json()

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json({ error: 'Invalid paths' }, { status: 400 })
    }

    // Revalidate each path
    paths.forEach(path => revalidatePath(path))

    return NextResponse.json({ 
      revalidated: true, 
      paths,
      now: Date.now() 
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
