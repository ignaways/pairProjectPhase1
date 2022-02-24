/*
npx sequelize-cli model:generate --name Profile --attributes name:string,address:string,gender:string,phoneNumber:string,email:string,birthdayDate:Date

npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string

npx sequelize-cli model:generate --name Product --attributes name:string,description:string,price:integer,imageUrl:string

npx sequelize-cli model:generate --name categories --attributes name:string
*/
// const fs = require('fs')

// const data = JSON.parse(fs.readFileSync('./data/categories.json', 'utf-8'))

//      console.log(data);

const {categories, Product, profile, user } = require(`./models/index.js`)

// Product.findAll()
     // .then((data)=> console.log(data))

     // let tes = `categoryId:1`

     // tes = tes.split(`:`)
     
     // console.log(tes)

var bcrypt = require(`bcryptjs`)
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(`instance.password`, salt);

console.log(hash)