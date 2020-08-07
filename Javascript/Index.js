const init = () => {
  view.setActiveScreen('registerScreen')
  
  var firebaseConfig = {
    apiKey: "AIzaSyB8ecxWZFHhFeQCxh1w8KZO57huii-F_XM",
    authDomain: "my-chat-app-dbc1b.firebaseapp.com",
    databaseURL: "https://my-chat-app-dbc1b.firebaseio.com",
    projectId: "my-chat-app-dbc1b",
    storageBucket: "my-chat-app-dbc1b.appspot.com",
    messagingSenderId: "511213860482",
    appId: "1:511213860482:web:fe88f58f868339a59ea69b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user.emailVerified){
      model.currentUser = {
        displayName: user.displayName,
        email: user.email
      }
      view.setActiveScreen('chatScreen')
      
    } else{
      view.setActiveScreen('loginScreen')
      alert('please verify your email')
    }
    
  }
});
}

// firebase.initializaApp(firebaseConfig);
// console.log(firebase.app().name);
// firebase.auth().onAuthStateChanged((user) =>{
//     if(user) {
//         if(user.emailVerified){
//             model.currentUser= {
//                 displayName: user.displayName,
//                 email: user.email
//             }
//             view.setActiveScreen('chatScreen')
//         } else {
//             view.setActiveScreen('loginScreen')
//             alert('Please verify your email')
//         } 
//     } else {
//       view.setActiveScreen('registerScreen')
//   }
// })

window.onload = init;


const messageFunc = async () => {
  const docId = 'NhqHM5MVenV6jse8i8yi'
  const res = await firebase.firestore().collection('Conversations').doc(docId).get()
  const msgList = getDataFromDoc(res)
  console.log(msgList);}


firestoreFunction = async () => {
  //get one document
  const documentId = "gBgDwSym3aHqUAPJQgr2"
  const response = await firebase.firestore().collection('users').doc(documentId).get()

  const user = getDataFromDoc(response)
  // response.data();
  // user.id = response.id;
  console.log(user)

  //get many documents
  const response2 = await firebase.firestore().collection('users').where('phoneNumber', 'array-contains', '091').get()
  console.log(response2)

  const listUser = getDataFromDocs(response2.docs)
  console.log(listUser)

  //add document
  // const userToAdd = {
  //   name: 'Nguyễn Gì Đó',
  //   age: 18,
  //   email: 'zxy@gmail.com'
  // }

  // firebase.firestore().collection('users').add(userToAdd)

  //update documents
  documentIdUpdate = 'enlamAaRktrBott93kp4'
  const dataToUpdate = {
    name: 'Alo Alo',
    phoneNumber: firebase.firestore.FieldValue.arrayUnion('091')
  }

  firebase.firestore().collection('users').doc(documentIdUpdate).update(dataToUpdate)
  //delete document
  const docToDelete = '1lM1aKax9p6wcJ2OKuNO'
  firebase.firestore().collection('users').doc(docToDelete).delete()
}

getDataFromDoc = (doc) => {
  const data = doc.data()
  data.id = doc.id
  return data
}

getDataFromDocs = (docs) => {
    return listData = docs.map(item => getDataFromDoc(item))
  }
  // const listData = []
  // // for (let index = 0; index < docs.length; index++) {
  // //   const element = getDataFromDoc(docs[index]);

  // //   listData.push(element)
  // // }
  // return listData

