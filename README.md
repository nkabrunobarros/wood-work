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

## DEV
./node_modules/.bin/eslint --fix .
docker build -t mofreita:dev .
docker run -d -p 127.0.0.1:3000:3000 mofreita:dev

## Prod
./node_modules/.bin/eslint --fix .
yarn lint
docker build -t mofreita:1 .
docker tag mofreita:dev registry.nka.pt/nka/mofreita:dev
docker push registry.nka.pt/nka/mofreita:1