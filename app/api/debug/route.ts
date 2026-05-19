export async function GET() {
  return Response.json({
    NODE_ENV: process.env.NODE_ENV,
    hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    hasSecret: !!process.env.KEYSTATIC_SECRET,
    hasOwner: !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER,
    hasRepo: !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO,
  })
}