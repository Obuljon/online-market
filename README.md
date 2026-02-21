# online-market

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Buyurtma va Savatcha API Endpointlari

Quyidagi endpointlar buyurtmalar va foydalanuvchi savatchasi bilan ishlash uchun mo‘ljallangan:

### 1. Barcha mahsulotlarni olish (sahifalangan)
- **GET** `/api/order/getall/:page/:limit`
- Parametrlar:  
  - `page` — Sahifa raqami  
  - `limit` — Har bir sahifadagi mahsulotlar soni  
- Tavsif: Barcha mahsulotlarni sahifalab (pagination) qaytaradi.

### 2. Mahsulotni ID orqali olish
- **GET** `/api/order/getbyid/:id`
- Parametrlar:  
  - `id` — Mahsulotning yagona identifikatori  
- Tavsif: Berilgan ID bo‘yicha mahsulotni qaytaradi.

### 3. Savatchadagi mahsulotlarni sahifalab olish
- **GET** `/api/order/cart/:page/:limit`
- Parametrlar:  
  - `page` — Sahifa raqami  
  - `limit` — Har bir sahifadagi mahsulotlar soni  
- Tavsif: Foydalanuvchi savatchasidagi mahsulotlarni sahifalab qaytaradi.

### 4. Savatchaga mahsulot qo‘shish yoki yangilash
- **POST** `/api/order/addcart`
- Body (JSON):  
  - `_id` — Mahsulot IDsi  
  - `number` — Mahsulot soni  
- Tavsif: Savatchaga mahsulot qo‘shadi yoki mavjud mahsulot sonini yangilaydi. Agar `number` 0 bo‘lsa, mahsulot savatchadan o‘chiriladi.

### 5. Savatchadagi barcha mahsulotlarni o‘chirish
- **DELETE** `/api/order/deletecart`
- Tavsif: Foydalanuvchi savatchasidagi barcha mahsulotlarni o‘chiradi.

### 6. Savatchadan bitta mahsulotni o‘chirish
- **DELETE** `/api/order/deletecart/:id`
- Parametrlar:  
  - `id` — Mahsulot IDsi  
- Tavsif: Savatchadan berilgan IDga ega mahsulotni o‘chiradi.

## Admin API Endpointlari

Quyidagi endpointlar admin foydalanuvchilarni boshqarish uchun ishlatiladi:

### 1. Admin qo‘shish
- **POST** `/api/admin/add`
- Body (JSON):  
  - `name` — Admin ismi  
  - `email` — Admin emaili  
  - `password` — Parol  
- Himoya: Faqat autentifikatsiyadan o‘tgan adminlar uchun (`AuthGuard`)
- Tavsif: Yangi admin foydalanuvchi yaratadi. Agar email allaqachon mavjud bo‘lsa, xatolik qaytaradi.

### 2. Admin login qilish
- **POST** `/api/admin/login`
- Body (JSON):  
  - `email` — Admin emaili  
  - `password` — Parol  
- Tavsif: Admin login qiladi. Agar admin topilmasa va bu birinchi admin bo‘lsa, default admin yaratiladi. To‘g‘ri ma’lumotlar bo‘lsa JWT token qaytariladi.

### 3. Admin o‘z ma’lumotlarini olish
- **GET** `/api/admin/mydata`
- Himoya: Faqat autentifikatsiyadan o‘tgan adminlar uchun (`AuthGuard`)
- Tavsif: Tizimga kirgan admin o‘z ma’lumotlarini ko‘radi.

### 4. Admin ma’lumotlarini yangilash
- **PUT** `/api/admin/update`
- Body (JSON):  
  - Yangilanishi kerak bo‘lgan admin ma’lumotlari  
- Himoya: Faqat autentifikatsiyadan o‘tgan adminlar uchun (`AuthGuard`)
- Tavsif: Tizimga kirgan admin o‘z ma’lumotlarini yangilaydi. Agar yangi email boshqa admin tomonidan ishlatilayotgan bo‘lsa, xatolik qaytaradi.

### 5. Adminni o‘chirish
- **DELETE** `/api/admin/delete`
- Himoya: Faqat autentifikatsiyadan o‘tgan adminlar uchun (`AuthGuard`)
- Tavsif: Tizimga kirgan admin o‘z akkauntini o‘chiradi.

## Mahsulotlar (Products) API Endpointlari

Quyidagi endpointlar mahsulotlarni boshqarish uchun ishlatiladi:

### 1. Mahsulot yaratish
- **POST** `/api/products/create`
- Body (JSON):  
  - Mahsulot nomi va boshqa kerakli ma’lumotlar
- Tavsif: Yangi mahsulot yaratadi. Agar mahsulot nomi allaqachon mavjud bo‘lsa, xatolik qaytaradi.

### 2. Mahsulotni yangilash
- **PUT** `/api/products/update/:id`
- Parametrlar:  
  - `id` — Mahsulot IDsi
- Body (JSON):  
  - Yangilanishi kerak bo‘lgan mahsulot ma’lumotlari
- Tavsif: Berilgan ID bo‘yicha mahsulotni yangilaydi. Agar mahsulot topilmasa yoki nomi boshqa mahsulotda mavjud bo‘lsa, xatolik qaytaradi.

### 3. Mahsulotni o‘chirish
- **DELETE** `/api/products/delete/:id`
- Parametrlar:  
  - `id` — Mahsulot IDsi
- Tavsif: Berilgan ID bo‘yicha mahsulotni o‘chiradi.

### 4. Mahsulotlarni qidirish (search)
- **GET** `/api/products/search/:searchTerm/:page/:limit`
- Parametrlar:  
  - `searchTerm` — Qidirilayotgan so‘z
  - `page` — Sahifa raqami
  - `limit` — Har bir sahifadagi mahsulotlar soni
- Tavsif: Qidiruv so‘ziga mos mahsulotlarni sahifalab qaytaradi.

### 5. Barcha mahsulotlarni olish (sahifalangan)
- **GET** `/api/products/getall/:page/:limit`
- Parametrlar:  
  - `page` — Sahifa raqami
  - `limit` — Har bir sahifadagi mahsulotlar soni
- Tavsif: Barcha mahsulotlarni sahifalab (pagination) qaytaradi.

### 6. Mahsulotni nomi bo‘yicha olish
- **GET** `/api/products/getone/:name`
- Parametrlar:  
  - `name` — Mahsulot nomi
- Tavsif: Berilgan nom bo‘yicha mahsulotni qaytaradi. Agar topilmasa, xatolik qaytaradi.

### 7. Mahsulotni ID bo‘yicha olish
- **GET** `/api/products/getbyid/:id`
- Parametrlar:  
  - `id` — Mahsulot IDsi
- Tavsif: Berilgan ID bo‘yicha mahsulotni qaytaradi. Agar topilmasa, xatolik qaytaradi.

### 8. Test endpoint
- **GET** `/api/products/test`
- Tavsif: Test uchun ishlatiladi, oddiy matn qaytaradi.
# online-market
