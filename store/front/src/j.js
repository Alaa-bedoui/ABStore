var powerSet = function(str) {
  // Create a helper function to generate all subsets with recursion
  const generateSubsets = (currentIndex, currentSubset) => {
    result.push(currentSubset)
    for (let i=currentIndex; i<str.length; i++) {
      //Add the current character to the subset
      generateSubsets(i+1, currentSubset+str[i]);
        
    }
      console.log("current subset ",result)
  }
  //Sort the characters in the input string
  str = str.split('').sort().join('');
  const result = []
  generateSubsets(0, '');
  return result;
};


