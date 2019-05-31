
# Tlawati API 

## Deploy Using Docker 

 Getting a local instance of this API up and running is very quickly using docker-compose

 1 - Clone the repository and cd to the project folder:

```bash
git clone https://github.com/AbdelkhalekESI/TilawatiAPI 
cd TilawatiAPI 
```

 2 - Build the app image and run the services:

```bash
docker-compose up --build 
```

## Setup Locally 

Clone the repo 

```bash
git clone https://github.com/AdelNamani/TilawatiAPI
cd TilawatiAPI
```

Install dependencies 

```bash
npm i 
```

Create your .env file 

```bash
cp .env.example .env
```

Configure your env with your database informations .

Run startup migrations.

```js
adonis migration:run
```

Generate app key 

```js
adonis key:generate
```

Run the application 

```js
adonis serve --dev 
```