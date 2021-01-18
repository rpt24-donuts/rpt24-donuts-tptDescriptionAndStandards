# tptDescriptionAndStandards
Run npm install
npm install
Create  mysqlKey.js and fill in information:

module.exports = {
password: 'your mysql password',

}

MySQL Database Setup
"seed":"mysql -u 'your username' -p  < schema.sql && node schema.js"
This will create a database called SandD

S3 setup
create file AWSkey.js (make sure to .gitignore file). In file paste:
module.exports = {
accessKey: 'your-acess-key',
secretKey: 'your-secret-key'
}

html file:
In index.html update line:
<script src="https://your-bundle-name.s3.us-east-2.amazonaws.com/bundle.js"></script> with your s3 bucket info


Build Bundle Using Webpack
Run the following to generate the bundle.js file that is needed to generate our color & size selection component

npm run build
After Set Up
Run the following to initiate the server

npm run start
and point your browser to localhost:3002
