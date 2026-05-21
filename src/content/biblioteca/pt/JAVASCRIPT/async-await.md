# Async / Await em JavaScript

Lidando com promessas de forma síncrona aos olhos humanos.

## ⏳ O Conceito

O `async/await` é um "açúcar sintático" em cima de Promises. Ele permite
escrever código assíncrono que parece síncrono.

```javascript
async function buscarDados() {
    try {
        const response = await fetch(
            "https://api.github.com/users/andrecodedev",
        );
        const data = await response.json();
        console.log(data.name);
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}
```

## 💡 Regra de Ouro

Você só pode usar `await` dentro de uma função marcada como `async`.
