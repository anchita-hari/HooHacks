/*
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD6gsHOB9nKTeEP349JhtVDhQ6mb_3FHBM",
    authDomain: "safe-foods-3bfb3.firebaseapp.com",
    databaseURL: "https://safe-foods-3bfb3.firebaseio.com",
    projectId: "safe-foods-3bfb3",
    storageBucket: "safe-foods-3bfb3.appspot.com",
    messagingSenderId: "722920707376",
    appId: "1:722920707376:web:114cfd1c3481698bdf64f5",
    measurementId: "G-9TBZ2T733D"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
*/

function authInt() {
    // FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: (new URLSearchParams(window.location.search)).get("path"),
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                var user = authResult.user;
                var credential = authResult.credential;
                var isNewUser = authResult.additionalUserInfo.isNewUser;
                var providerId = authResult.additionalUserInfo.providerId;
                var operationType = authResult.operationType;
                // Do something with the returned AuthResult.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            }
        },
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
        window.location.assign('<your-privacy-policy-url>');
        }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
}

function checkAuth() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
/*             user.getIdToken().then(function(accessToken) {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                phoneNumber: phoneNumber,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
                }, null, '  ');
            }); */
        } 
        else {
            // User is signed out.
/*             document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null'; */
            window.location.assign("auth.html?path=" + window.location.href);
        }
    }, 
    function(error) {
        console.log(error);
    });
}

function save(cName, key, obj) {
    return firebase.firestore().collection(cName).doc(key).set(
        obj
    ).catch(function(error) {
        alert(error);
        console.error('Error saving object to collection', error);
    });
}

function saveContact(form) {
    var obj = {name: form.name.value, email: form.email.value, message: form.message.value};
    save("contacts", obj.email, obj);
}

function saveVolunteer(form) {
    var obj = {name: form.name.value, email: form.email.value, phone: form.phone.value, transport: form.transportYes.checked, 
        qualifiedAge: form.qualifiedAgeYes.checked, extraInfo: form.extra.value};
    save("volunteers", obj.email, obj);
}

function saveCustomer(form) {
    var obj = {name: form.name.value, phone: form.phone.value, email: form.email.value, address: form.address.value, 
        city: form.city.value, zipcode: form.zipcode.value};
    save("customers", obj.email, obj);
}

function saveOrders(form) {
    var obj = {apples: form.apples.checked, applesQ: form.applesQ.value, bananas: form.bananas.checked, bananasQ: form.bananasQ.value, 
        grapes: form.grapes.checked, grapesQ: form.grapesQ.value, strawberries: form.strawberries.checked, strawberriesQ: form.strawberriesQ.value,
        blueberries: form.blueberries.checked, blueberriesQ: form.blueberriesQ.value, lemons: form.lemons.checked, lemonsQ: form.lemonsQ.value,
        pears: form.pears.checked, pearsQ: form.pearsQ.value, broccoli: form.broccoli.checked, broccoliQ: form.broccoliQ.value, 
        cabbage: form.cabbage.checked, cabbageQ: form.cabbageQ.value, carrots: form.carrots.checked, carrotsQ: form.carrotsQ.value, 
        cauliflower: form.cauliflower.checked, cauliflowerQ: form.cauliflowerQ.value, gbeans: form.gbeans.checked, gbeansQ: form.gbeansQ.value, 
        ginger: form.ginger.checked, gingerQ: form.gingerQ.value, lettuce: form.lettuce.checked, lettuceQ: form.lettuceQ.value, mushrooms: form.mushrooms.checked,
        mushroomsQ: form.mushroomsQ.value, onions: form.onions.checked, onionsQ: form.onionsQ.value, peppers: form.peppers.checked, peppersQ: form.peppersQ.value,
        potatoes: form.potatoes.checked, potatoesQ: form.potatoesQ.value, spinach: form.spinach.checked, spinachQ: form.spinachQ.value,
        tomatoes: form.tomatoes.checked, tomatoesQ: form.tomatoesQ.value, wwbread: form.wwbread.checked, wwbreadQ: form.wwbreadQ.value, 
        whbread: form.whbread.checked, whbreadQ: form.whbreadQ.value, spaghetti: form.spaghetti.checked, spaghettiQ: form.spaghettiQ.value,
        rotini: form.rotini.checked, rotiniQ: form.rotiniQ.value, shells: form.shells.checked, shellsQ: form.shellsQ.value, gfpasta: form.gfpasta.checked,
        gfpastaQ: form.gfpastaQ.value, wmilk: form.wmilk.checked, wmilkQ: form.wmilkQ.value, dmilk: form.dmilk.checked, dmilkQ: form.dmilkQ.value,
        milk2: form.milk2.checked, milk2Q: form.milk2Q.value, nfmilk: form.nfmilk.checked, nfmilkQ: form.nfmilkQ.value,
        smilk: form.smilk.checked, smilkQ: form.smilkQ.value, eggs: form.eggs.checked, eggsQ: form.eggsQ.value, cheddar: form.cheddar.checked, 
        cheddarQ: form.cheddarQ.value, ccheese: form.ccheese.checked, ccheeseQ: form.ccheeseQ.value, butter: form.butter.checked, butterQ: form.butterQ.value,
        tyogurt: form.tyogurt.checked, tyogurtQ: form.tyogurtQ.value, gyogurt: form.gyogurt.checked, gyogurtQ: form.gyogurtQ.value, other: form.other.value
    }
    save("orders", form.email.value, obj);
}

function orderAccepted() {
    document.getElementById("accepted").style.display = "block";
}

function resetPage() {
    document.getElementById("accepted").style.display = "none";
}

function getCollections() {
    firebase.firestore().collection("orders").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
}