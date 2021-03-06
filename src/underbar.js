
(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if(n === 0) {
      return [];
    } else {
      return array.slice(-n);
  }
    //return n === undefined ? array[array.length-1] : array.slice(-n);
   
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
      if(Array.isArray(collection)){
        for(var key=0; key<collection.length; key++){
          //iterator(value, index, collection)
          iterator(collection[key], key, collection);
        }
      }else{
        for(var objKey in collection){
          //iterator(value, index, collection)
          iterator(collection[objKey], objKey, collection);
        }
      }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      //capture the first instance where an element in [array] === target
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
      var result = [];
      //(collection, anonymous function)
      _.each(collection, function(item){
        //test === boolean test
        if(test(item)){
          result.push(item);
        }
      });
      return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];
      //(collection, anonymous function)
      _.each(collection, function(item){
        //test === boolean test
        if(!test(item)){
          result.push(item);
        }
      });
      return result;

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    var isFound; //boolean to see if it is found
    _.each(array, function(item){
                        //(array, index)
      isFound = _.indexOf(result, item);
      if(isFound === -1){
        result.push(item); 
      }
    });

    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(item){
      result.push(iterator(item));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) {

    //determine whether we have an accumulator   
    if(accumulator === undefined){
      //if no accumulator: set acuumulator == first item in [collection]
      accumulator = collection[0];
      collection = collection.slice(1);
    }
      //if accumulator: iterate through collection 
        //use _.each to run iterator function on the accumulator with each 'value' in [collection]
        _.each(collection, function(currVal){
          //accumulator is the Total
          accumulator = iterator(accumulator, currVal);
        });

        //save it into the accumulator
    //return the accumulator
      return accumulator; //accumulator CAN BE 
  };

  // Determine if the array or object contains a given value (using `===`).
  //Boolean - 'true' or 'false'
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    /*return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);*/

     return _.reduce(collection, function(startValue, curr){
      if(curr === target){    
        startValue = true;
      } 
      
      return startValue;
    
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;

          //!! === Boolean() --> checks to see if 'true' or 'false'   
    return !!_.reduce(collection, function(startValue, item){
     return startValue && iterator(item);
    },true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
          //(collection, iterator, accumulator)
       return _.reduce(collection, function(startValue, curr){   //startValue is initially 'false'
    
      if (iterator(curr)){
        startValue = true;
      }
      
      return startValue;

    },false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    //arguments logs all objs --> we only have one parameter!
    //arguments - {obj}, {key2, key3}, {bla}
    /*_.each(arguments, function(item){
                    //each(val, key, [array])
      _.each(item, function(value, key){
        //NOTE: THIS WILL OVERWRITE EXISTING KEY
        //First Iteration - item -> {key1: "something"}
        //rewrites key, 'key1' to same value, 'something'
        //obj['key1'] = "something" 
        obj[key] = value;  
      });
    });
    return obj;*/ //return 

      return _.reduce(arguments, function(accum, item){

        for(var prop in item)
          obj[prop] = item[prop];

        return obj;
    }, obj);
  };


  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    //arguments logs all objs --> we only have one parameter!
    //arguments - {obj}, {key2, key3}, {bla}
    _.each(arguments, function(item){
                    //each(val, key, [array])
      _.each(item, function(value, key){
         //check to see if key has a value
         if(obj[key] === undefined)
         obj[key] = value;  
      });
    });
    return obj; //return 
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.

                  /**Google Snippet Debug - Once **/
   // var add = once(function(x,y,z){
   //     return x+y+z;
   // });
   // console.log(add(1,2,3)); //6
   // console.log(add(4,5,6)); //6

  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.

    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
                //func.apply(func, arguments)
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  
              /**Chrome Snippet Debug - Memoize **/
      
      /* var add = memoize(function(x,y,z){
            return x+y+z;
        });

         var mult = memoize(function(x,y,z){
            return x*y*z;
        })        */ 

     //console.log(add(1,2,3)); // computes '6' - 1st time
     //console.log(add(1,2,3)); //gives back stored '6' value - 2nd time
     //console.log(add(6,6,6)); //computes '18' - 1st time
     //console.log(add(1,2,3)) //givs back stored '6' value - 3rd time

  _.memoize = function(func) {
    var store = {}; //this 'object' serves as our cache
    
    //return a function that gives us ability to 'memoize' callback function
    return function() {
      var args = Array.prototype.slice.call(arguments); //[arguments]
      var key = JSON.stringify(args); //"[arguments]"
      console.log(args);
      if(store[key]) {
        return store[key];
      }
      else {
        var val = func.apply(this, arguments);
        store[key] = val;
        return val;
      }
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      //example 'a', 'b' from someFunction('a','b')
      //typeof func === "function" && 
                      //built-in(method).call(obj, parameters)
                      //example result --> ['a','b']
       var parameters = Array.prototype.slice.call(arguments, 2); //[arguments].slice(2);
       
        setTimeout(function(){
          func.apply(this, parameters);
        }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  //WE ASSUME IT WILL TAKE IN JUST ONE PASSED-IN ARGUMENT
  _.shuffle = function(array) {
    
    var newArr = [];
    var copyArr = Array.prototype.slice.call(array);

    //store a new array
    for(var i =0; i< array.length; i++){
      //get a random array 'index'
      var random = Math.floor(Math.random() * copyArr.length);
      newArr.push(copyArr[random]);
      
      //Every Time we push to newArr, 
      //we need to delete that particular array element 
      copyArr.splice(random, 1);      //splice(start, deleteCount - should be '1')
    }
    return newArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {

    return _.map(collection, function(item){
      var method;

      if(typeof functionOrKey === 'string'){
        //assume each 'item' from [collection] is an object that has a key of 'func'
        method = item[functionOrKey]; 
      }else
        //case for each 'item' from [collection] is a 'primitive'
        method = functionOrKey;

      return method.apply(item, args); //method.apply(obj/array, args)
   })
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
      //var sorter;
      //var args = Array.prototype.slice.call(arguments, 2);

      if(typeof iterator === 'string'){
         if(iterator === 'length'){
            return collection.sort(function(a,b){
              return a.length - b.length;
            });
          }

          return collection.sort(function(a,b){
            return a[iterator] - b[iterator];
          });
      }       
      else if(typeof iterator === 'function')
        return collection.sort(function(a,b){
          return iterator(a)- iterator(b);
        });
       
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
            //1. Find length of longest array in arguments
        //arguments are subarrays??
        var args =Array.prototype.slice.call(arguments); //set to [arguments]

        var results = [];
        var resultsBefore = [];
        
        var longest = args.sort(function(a,b){b.length - a.length})[0].length; //this will be a number value....  
        //2. Iterate through each item in arguments
        //3. Push each item to correct array
        for(var i =0; i< longest; i++){
          for(var j=0; j< arguments.length; j++){
           /*First Iteration through 'i'*/
           //[0][0]
           //[1][0]
           //[2][0]
           resultsBefore.push(arguments[j][i]); 
           //console.log("resultsBefore: " + resultsBefore);
          }

          results.push(resultsBefore);
          //console.log("Result: " + results);
          //console.log("");
          resultsBefore = [];
        }
        return results;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var i =0;

    while(i< nestedArray.length){

        //accumulator starts at empty array --> []
        //start === []
                                    //collection, callback, initVal
      nestedArray =  _.reduce(nestedArray, function(start, currItem){
       //var i = 0;
        //[].concat[1] --> [1]
        //[1].concat[2] --> [1,2]
        //[1,2].concat[3, [[4]]] --> [1,2,3, [[4]] ]

       // var i = 1;
        // [1,2,3, [4]];

       // var i = 2; 
        // [1,2,3,4];

        return start.concat(currItem);  
      }, []);
      console.log(JSON.stringify(nestedArray));
      i++;
    }

   return nestedArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var inCommon = [];

    _.each(arguments[0], function(item){
      var isSame = false; //initially is not the same 
    
      for(var i = 1; i < args.length; i++){
          for(var j =0; j<args.length; j++){
            if(item === args[i][j]){
              isSame = true;
            }
          }
        }

      if(isSame)
        inCommon.push(item);

    });        
                                          
    return inCommon;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments);
    var diffArr = [];
    
    //_.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);
    //item --> [1] then [2], then [3], then [4]
    _.each(array, function(item){
      var isDiff = true;
      
      for(var i = 1; i < args.length; i++){
        for(var j =0; j<args.length; j++){
          if(item === args[i][j]){
            isDiff = false;
          }
        }
      }

      if(isDiff)
        diffArr.push(item);
    });        
                                  
    return diffArr;
  };
  

  
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
        /* var parameters = Array.prototype.slice.call(arguments, 2); //[arguments].slice(2);
        return func.apply(this, parameters); 
        setTimeout(function(){
          func.apply(this, parameters);
        }, wait); */
  };
}());