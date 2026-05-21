# Dominando Versão com Git & GitHub

O Git é o coração do desenvolvimento colaborativo. Sem ele, estaríamos trocando
arquivos por e-mail chamados `projeto_final_v2_agora_vai.zip`.

## 🧠 Mapa Mental: Fluxo de Trabalho

Aqui está a visão geral de como o Git funciona entre seu ambiente local e o
servidor (GitHub).

![Mapa Mental de Fluxo Git](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/1280px-Git-logo.svg.png)
_Clique na imagem para ampliar e estudar os detalhes._

---

## 💻 Comandos Essenciais

Aqui estão os comandos que você vai usar 90% do tempo. Salve como referência na
sua biblioteca!

<details>
<summary>Configuração Inicial</summary>
<div>
Se é sua primeira vez no Git, você precisa se identificar:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "email@exemplo.com"
```

</div>
</details>

<details>
<summary>O Ciclo de Vida do Commit</summary>
<div>
O fluxo básico consiste em três estágios:

1. **Working Directory**: Modificando arquivos.
2. **Staging Area**: Preparando para o commit (git add).
3. **Repository**: Registro permanente no histórico (git commit).

```javascript
function commitChanges(message) {
    const stagedFiles = git.getStagedFiles();
    if (stagedFiles.length === 0) return "Nada para commitar";

    return git.createCommit(stagedFiles, message);
}
```

</div>
</details>
