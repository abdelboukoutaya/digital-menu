import EditMenuClient from "./EditMenuClient"

export default function EditMenuPage({
    params
}: {
    params: { id: string }
}) {
    return <EditMenuClient id={params.id} />
}
