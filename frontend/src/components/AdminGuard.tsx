"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminGuard({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        const role = localStorage.getItem("admin_role")

        if (!token || role !== "admin") {
            router.replace("/admin/login")
        }
    }, [router])

    return <>{children}</>
}
