# CNAE Sales Intel — Raio-X Comercial B2B

Aplicativo web de consulta unitária de CNPJ em tempo real focado em qualificação comercial B2B, análise de CNAE, pontuação de ICP, mapa de decisores (QSA) e gatilhos de abordagem.

## Arquitetura de Consulta
1. **Primária:** BrasilAPI (`/api/cnpj/v1/{cnpj}`)
2. **Contingência Automática (7s timeout):** CNPJ.ws (`publica.cnpj.ws/cnpj/{cnpj}`)
3. **Fallback Local:** Exemplos pré-carregados caso haja bloqueio de rede

## Como rodar localmente
```bash
npm install
npm run dev
```

## Como publicar gratuitamente na Web (Vercel)
1. Suba os arquivos deste pacote para um repositório no GitHub.
2. Acesse [vercel.com](https://vercel.com), importe o repositório e clique em **Deploy**.
