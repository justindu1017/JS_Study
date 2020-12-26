/*
這邊的輸出為:
Sys start
sys finish
3秒後:printing one 
     first = Justin
3秒後:printing two 
     second = Selene

解析:
  程式會先看到console.log("Sys start");，並且會先print出來
  接著會看到pro("Justin")，這邊的pro是resolve的，我們知道他是settimeout，因此會被丟到web api中，等待到時間結束後會被丟到Callback queue中，等待stack中已經沒東西後就會被丟到stack中
  因為後面還有東西，所以系統會先跑console.log("sys finish")
  此時後stack中已經真的沒東西了，settimeout的東西也差不多跑完了，這時東西也已經被丟到callback queue中了，會在下一個event loop 時被丟到stack裡，這時就會print 出 print one、出 print one、first = Justin，並new出一個pro("Selene")
  由於又是一個pro的promise，也是用到web api的setimeout，所以東西都是相同的:也是會先進到web api中讓他跑3秒後，排到callback queue中， 等到下一個event loop時再console.log中  
  
const pro = (nname) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(nname);
    }, 3000);
  });
};
console.log("Sys start");
pro("Justin")
  .then((rr) => {
    console.log("printing one");
    console.log("first = ", rr);
    return pro("Selene");
  })
  .then((rr) => {
    console.log("printing two");
    console.log("second = ", rr);
  });

console.log("sys finish");
*/
/*
這邊的輸出為:
printing one
first =  Justin
printing two
secondss =  Selene

解析:
  這邊我們可以看到第一個then return 的值，會變成下一個then的參數
const pro = (nname) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(nname);
    }, 3000);
  });
};

pro("Justin")
  .then((rr) => {
    console.log("printing one");
    console.log("first = ", rr);
    return "Selene";
  })
  .then((rr) => {
    console.log("printing two");
    console.log("secondss = ", rr);
  });
*/

/*
這邊的輸出為:
result =  too small!!!
5秒後:result =  31
result =  41

解析:
系統一樣會先跑看到pro(30)，pro(30)也是一個settimeout，所以立刻就被放到web api中等待
由於stack中一樣沒東西，系統立刻看到pro(40)，也是馬上就被放到web api中等待
系統接著看到pro(10)，也是先進到web api 中，此時裡面已經堆了三個settimeout，想當然的，settimeout(,0)一定比較快完成，所以先進入了callback queue中，並且先被print出來
接著是pro(30)進入 callback queue中，再來是pro(40)

const pro = (number) => {
  return new Promise((resolve, reject) => {
    if (number > 20) {
      setTimeout(() => {
        resolve(number + 1);
      }, 5000);
    } else {
      setTimeout(() => {
        reject("too small!!!");
      }, 0);
    }
  });
};

pro(30).then((result) => {
  console.log("result = ", result);
});
pro(40).then((result) => {
  console.log("result = ", result);
});
pro(10).catch((result) => {
  console.log("result = ", result);
});
*/

/*
這邊的輸出為:
15秒後result =  30
4秒後result =  40
NONONO =  too small!!!

解析:
  async裡面可以包await，其中的await會等待他上面的那個完成才會執行。

const pro = (number) => {
  return new Promise((resolve, reject) => {
    if (number > 20) {
      setTimeout(() => {
        resolve(number);
      }, 15000);
    } else {
      reject("too small!!!");
    }
  });
};

const pro2 = (number) => {
  return new Promise((resolve, reject) => {
    if (number > 20) {
      setTimeout(() => {
        resolve(number);
      }, 5000);
    } else {
      reject("too small!!!");
    }
  });
};

async function func() {
  // var today = new Date();
  // var time = today.getMinutes() + ":" + today.getSeconds();
  // console.log(time);
  await pro(30).then((result) => {
    console.log("result = ", result);
  });
  // var today = new Date();
  // var time = today.getMinutes() + ":" + today.getSeconds();
  // console.log(time);
  await pro2(40).then((result) => {
    console.log("result = ", result);
  });

  // var today = new Date();
  // var time = today.getMinutes() + ":" + today.getSeconds();
  // console.log(time);
  await pro(10)
    .then((result) => {
      console.log("result = ", result);
    })
    .catch((result) => {
      console.log("NONONO = ", result);
    });
}

func();
*/
/*
這邊我們可以看到pro1與pro2都進入web api 中了，但因為pro2比較快結束，所以是先印出pro2的
const pro1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("A");
    }, 10000);
  });
};

const pro2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("B");
    }, 5000);
  });
};

pro1().then((result) => {
  console.log(result);
});

pro2().then((result) => {
  console.log(result);
});
*/

/*

我們可以看到，async回傳的是一個Promise物件，故可用then去取得回傳值
const pro = (number) => {
  return new Promise((resolve, reject) => {
    if (number > 20) {
      setTimeout(() => {
        resolve(number);
      }, 5000);
    } else {
      reject("too small!!!");
    }
  });
};

async function func() {
  const a = await pro(30);

  const b = await pro(40);

  return a + b;
}

func().then((result) => {
  console.log(result);
});
*/
