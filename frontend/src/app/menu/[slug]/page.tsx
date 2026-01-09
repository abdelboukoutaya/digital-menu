<button
  style={{
    marginTop: 40,
    padding: "14px 24px",
    backgroundColor: "#16a34a",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 8,
    cursor: "pointer"
  }}
  onClick={async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        clientSlug: slug,
        items: [
          {
            name: "Commande test",
            price: ""
          }
        ],
        source: "form"
      })
    })

    alert("Commande envoyée ✅")
  }}
>
  Commander
</button>
