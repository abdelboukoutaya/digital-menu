import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "./auth"

export function useRequireAdmin() {
    const router = useRouter()

    useEffect(() => {
        if (!isAdminAuthenticated()) {
            router.replace("/admin")
        }
    }, [router])
}
