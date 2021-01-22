# tptDescriptionAndStandards

###Getting Started
Run npm install
Create  mysqlKey.js and fill in information:

module.exports = {
  password: 'your mysql password',
}

###MySQL Database Setup
Run npm run seed
This will create a database called SandD

###S3 setup
create file AWSkey.js (make sure to .gitignore file). In file paste:
module.exports = {
  accessKey: 'your-acess-key',
  secretKey: 'your-secret-key'
}

###html file:
In index.html update line:
<script src="https://your-bundle-name.s3.us-east-2.amazonaws.com/bundle.js"></script> with your s3 bucket info


###Build Bundle Using Webpack
Run the following to generate the bundle.js file that is needed to generate our color & size selection component

npm run build

###After Set Up
Run the following to initiate the server
npm start
and point your browser to localhost:3002


##API Reference##

**Show Product**
----
Returns json data about a single

* **URL**

  /products/:Id/description-and-standards

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

   `Id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "answerKeyIncluded": "Yes",
    "productDescription": "Bun ethical sriracha iceland denim. Umami knausgaard probably unicorn yolo. Meh v 3 adaptogen hell.",
    "pageLength": 100,
    "teachingDuration": "1 year",
    "standards": {
        "RH.1.2": "   Coffee vice letterpress mumblecore hot. Snackwave master four selfies mixtape. Tilde cold-pressed seitan dreamcatcher belly. Shabby fingerstache before trust +1. Loko williamsburg tousled fanny chips. 8-bit mug mi snackwave plaid."
    }`


**Add Product**
----
Adds a new product to the database

* **URL**

  /products/add

* **Method:**

`POST`

* **Data Params**

  {
      productDescription: string,
      pageLength: integer,
      answerKeyIncluded: boolean 0 or 1,
      teachingDuration: string
  }

* **Success Response:**

  * **Code:** 200 <br />


**Update Product Description**
----
Updates the description of a single product

* **URL**

  /products/updateProductDescription

* **Method:**

`PUT`

* **Data Params**

  {
    id: integer,
    productDescription: string
  }

* **Success Response:**

  * **Code:** 200 <br />


**Remove Product**
----
Removes a single product from the database

* **URL**

  /products/:Id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

   `Id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
