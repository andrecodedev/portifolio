# Git Branches e Merge Strategy

Branches são caminhos paralelos no seu código. Aprenda a gerenciar o caos.

## 🌿 Criando e Trocando Branches

```bash
# Cria uma nova branch
git branch nome-da-branch

# Muda para a branch
git checkout nome-da-branch

# Atalho: Cria e troca ao mesmo tempo
git checkout -b nova-feature
```

## 🔀 Merge vs Rebase

<details>
<summary>Quando usar Merge?</summary>
<div>
O Merge preserva o histórico completo e a linha do tempo exata. É ideal para quando você termina uma feature e quer levá-la para a `main`.
</div>
</details>

<details>
<summary>Quando usar Rebase?</summary>
<div>
O Rebase "reescreve" o histórico para parecer uma linha única. É ótimo para manter o histórico limpo, mas perigoso em branches compartilhadas.
</div>
</details>
