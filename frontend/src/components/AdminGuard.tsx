"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

type Props = {
    children: React.ReactNode
}

export default function AdminGuard({ children }: Props) {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (!token) {
            router.replace("/admin/login")
        }
    }, [router])

    return <>{children}</>
}
