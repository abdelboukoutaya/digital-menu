export default function Page({ params }: { params: { id: string } }) {
    return (
        <main style={{ padding: 40 }}>
            <h1>DEBUG OK</h1>
            <pre>{JSON.stringify(params, null, 2)}</pre>
        </main>
    )
}
