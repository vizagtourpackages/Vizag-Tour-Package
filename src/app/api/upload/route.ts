import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { filename, contentType } = body

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: 'Filename and contentType are required' },
        { status: 400 }
      )
    }

    const accountId = process.env.R2_ACCOUNT_ID
    const accessKeyId = process.env.R2_ACCESS_KEY_ID
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
    const bucketName = process.env.R2_BUCKET_NAME
    const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
      console.error('Missing R2 environment variables')
      return NextResponse.json(
        { error: 'Server misconfiguration' },
        { status: 500 }
      )
    }

    const S3 = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filename,
      ContentType: contentType,
    })

    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 })
    
    // Construct the public URL where the file will be accessible after upload
    const fileUrl = `${publicUrl}/${filename}`

    return NextResponse.json({ uploadUrl: signedUrl, fileUrl })
  } catch (error: any) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}
