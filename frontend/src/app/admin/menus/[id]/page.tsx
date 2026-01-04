import EditMenuClient from "./EditMenuClient"

export default function Page({
    params,
}: {
    params: { id: string }
}) {
    return <EditMenuClient id={params.id} />
}
