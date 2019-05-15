
# Tlawati API 

## Setup

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

Run the application 

```js
adonis serve --dev 
```