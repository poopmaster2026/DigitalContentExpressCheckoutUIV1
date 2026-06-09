import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = file.name.split('.').pop() || 'bin'
  const filename = `${randomUUID().slice(0, 8)}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`

  await mkdir(UPLOAD_DIR, { recursive: true })
  await writeFile(join(UPLOAD_DIR, filename), buffer)

  return NextResponse.json({
    url: `/uploads/${filename}`,
    filename: file.name,
    sizeBytes: file.size,
  })
}
