
'use strict'// consume the promise
fetch
  // handling fulfilled promise
  .then(function (result) {
    console.log(result);
  })
  // hanling error
  .catch(function (error) {
    console.log(error);
  });

  console.log('aaaa')




