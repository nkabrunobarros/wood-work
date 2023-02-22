## Getting Started

Use node 16

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Tecnologies used

Mui(https://mui.com/pt/)

Next Js(https://nextjs.org/)

Lucide Icons(https://lucide.dev/)

## Build Image
docker build -t mofreita:1 .

## Export to Portainer
docker tag mofreita:1 registry.nka.pt/nka/mofreita:1
docker push registry.nka.pt/nka/mofreita:1
