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
window.onload = init;

