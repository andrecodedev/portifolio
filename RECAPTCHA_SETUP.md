# 🔐 Como Configurar o Google reCAPTCHA v2

## Passo a Passo para Obter sua Chave

### 1. Acesse o Console do Google reCAPTCHA

Vá para: [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)

### 2. Preencha o Formulário

- **Label**: `Portfólio André Vitor` (ou qualquer nome para identificar)
- **Tipo de reCAPTCHA**: Selecione **reCAPTCHA v2** → "Não sou um robô" (checkbox)
- **Domínios**:
  - `localhost` (para desenvolvimento local)
  - `andrecode.dev.br` (seu domínio em produção)
  - Adicione outros domínios se necessário

### 3. Aceite os Termos

Marque a caixa de "Aceito os Termos de Serviço do reCAPTCHA"

### 4. Clique em "Enviar"

### 5. Copie as Chaves

Após criar, você receberá:

- **Chave do Site (Site Key)**: Use essa no frontend (arquivo `.env`)
- **Chave Secreta (Secret Key)**: Use essa no backend (se tiver validação server-side)

### 6. Configure o Arquivo `.env`

Abra o arquivo `.env` na raiz do projeto e substitua:

```env
VITE_RECAPTCHA_SITE_KEY=sua_chave_do_site_aqui
```

### 7. Reinicie o Servidor de Desenvolvimento

```bash
npm run dev
```

---

## 🧪 Chave de Teste (Desenvolvimento)

O projeto já vem configurado com uma **chave de teste do Google** que funciona apenas em `localhost`:

```
Site Key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
```

⚠️ **IMPORTANTE**: Essa chave de teste **sempre passa a validação** e deve ser usada **apenas para desenvolvimento**. Em produção, substitua pela sua chave real.

---

## 📌 Notas Importantes

- O reCAPTCHA está configurado para tema **escuro (dark)** por padrão
- É **responsivo** e se ajusta automaticamente em mobile, tablet e desktop
- A validação ocorre **antes** do envio do formulário
- Se o usuário não marcar o checkbox, aparece um alerta traduzido em PT, EN e ES

---

## 🔗 Links Úteis

- [Documentação Oficial do Google reCAPTCHA](https://developers.google.com/recaptcha/docs/display)
- [Console do Google reCAPTCHA](https://www.google.com/recaptcha/admin)
- [Biblioteca react-google-recaptcha (NPM)](https://www.npmjs.com/package/react-google-recaptcha)

---

**Desenvolvido por André Vitor** 🚀
