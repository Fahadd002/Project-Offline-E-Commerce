$(() => {
    let db;
    const request = indexedDB.open("diamondhavebdb");
    request.onerror = (event) => {

    };
    request.onsuccess = (event) => {
      db = event.target.result;
      poulateData(db);
     
    };
    request.onupgradeneeded = (event) => {

      // Save the IDBDatabase interface
      db = event.target.result;

      // Create an objectStore for this database
      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };


    ///////////////////////////
    $('#count').html(itemCount().toString()); //count add to cart data

    let data = sessionStorage.getItem("login-data");
    let isLoggedIn = false;
    if (data) {
      data = JSON.parse(data);
      isLoggedIn = true;
    }
    if (isLoggedIn) {
      $("#admin").show();
     
      $("#login").hide();
     
      
    } else {
      $("#admin").hide();
     
      $("#login").show();
     
    }
    $('#count').html(getCartCount().toString());
  });
  function poulateData(db) {
    let recordCount = 0;

    const trx = db.transaction(["products"], "readonly");
    trx.oncomplete = (event) => {
      
      if (recordCount < 1) {
        inputData(db);
      }

      console.log("count done");
    };
    const store = trx.objectStore("products");
    count = store.count();

    count.onsuccess = function () {
      recordCount = count.result;
    };
  }
  function inputData(db) {
   
      const transaction = db.transaction(["products"], "readwrite");
      const objectStore = transaction.objectStore("products");
      for (var i = 0; i < adminData.length; i++) {
        const query = objectStore.add(adminData[i]);
        query.onsuccess = () => {
          console.log('done');
        };
      }
    
  }
  function itemCount(){
    var cart = [];
    var cartdata = localStorage.getItem('cart-data');
    if(cartdata){
      cart = JSON.parse(cartdata)
    }
    let c=0;
    cart.forEach(x => {
      c += Number(x.qty);
    });
    return c;
  }