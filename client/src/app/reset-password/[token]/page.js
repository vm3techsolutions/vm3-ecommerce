import ResetPassword from "@/components/ResetPassword";

export default function Page({ params }) {
  const { token } = params;   // ✅ Next.js gives us token from URL
  return <ResetPassword token={token} />; // pass it as prop
}
