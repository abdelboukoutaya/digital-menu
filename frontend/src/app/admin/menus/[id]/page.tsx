export default function Page({ params }: { params: any }) {
    return (
        <main style={{ padding: 40, color: "white" }}>
            <h1>DEBUG PAGE [id]</h1>
            <pre>{JSON.stringify(params, null, 2)}</pre>
        </main>
    )
}
