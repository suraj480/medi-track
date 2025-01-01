# Welcome to your Medicine Tracker Expo app 👋

This is an [Expo](https://expo.dev) project created with [npx create-expo-app@latest]

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

Icons used from https://icons.expo.fyi/Index

## For login authentication i am using firebase
## Firebase steps for authentication
1. Login to firebase
2. goto project
3. click on new web
4. click on register
5. In project run 
6. npm install firebase
7. Copy SDK from firebase website
8. paste SDK in FirebaseConfig.jsx
9. enable email/password authnetication in console(under singIn method)
10. https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account take code of createUserWithEmailAndPassword and paste in signUp.jsx

### adding async-storage
 ```bash
 npx expo install @react-native-async-storage/async-storage
  ```