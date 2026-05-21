# Destructuring & Spread

Sintaxe moderna para extrair e clonar dados de forma elegante.

## 📦 Destructuring de Objetos

```javascript
const dev = {
  nome: 'André',
  stack: 'Fullstack',
  nacionalidade: '🇧🇷'
};

// Forma antiga
const nome = dev.nome;

// Com Destructuring (DOC Style)
const { nome, stack } = dev;
```

## 🪄 Spread Operator (...)

Útil para clonar objetos sem manter a referência na memória.

```javascript
const novaStack = { ...dev, frameworks: ['React', 'Node'] };
```
