

export const run =  () => {
  const arr = [1, 3, 5, 6, 7, 8, 12]
  const arr0 = [1, 2, 0, 0, 0, 3, 0, 4, 5, 0]
  const arrDup = [0, 0, 1, 2, 2, 3, 3, 4, 6, 6, 6, 7]
  const arrDup2 = [0, 0, 1, 2, 2, 3, 3, 4, 6, 6, 6, 7]
  const arrHuge = randArr()

  /* summing */
  const sum  = (arr: number[]) => {
    let result = 0

    for (let i = 0, j = arr.length -1; i <= j;) {
      result +=  arr[i] 
      if (i < j) result += arr[j]
      i++ 
      j--
    }
    return result
  }
  console.log(`twopointers sum() - array size: ${arr.length}`, sum(arr) )
    
/* finding pair of index  matching a target sum */
  const twoSum =  (arr: number[], target: number) => {
    for (let i = 0, j = arr.length - 1; i < j; ) {
      let sum = arr[i] + arr[j];
      if (sum === target) {
        return [i, j];
      } else if (sum < target) {
        i++;
      } else {
        j--;
      }
    }
  }
  console.log(`twopointers - twoSum() - finding pair index of a sum - array length: ${arr.length}`, twoSum(arr, 8) )

/* sorting array all 0 values go to the end of array and order is kept (two pointer slow-fast)  */
 var moveZeroes = function(nums: number[]) {
    let leftIdx = 0;
    
    for (let i=0; i<nums.length; i++) {
        if (nums[i] !== 0) {
            if (leftIdx === i) {
                leftIdx++
                continue;
            }
            nums[leftIdx] = nums[i];
            nums[i] = 0;
            leftIdx++
        }
    }
    return nums
  };
  console.log(`twopointers - moveZeroes() - set all 0 value at the end of array - array length: ${arrHuge.length}:`, moveZeroes(arrHuge).length, 'elements sorted')


  /* remove duplicate of an array in place put  the duplicate and replace them with '_' at end of array (two pointer slow fast) */
  const removeDuplicates = (nums: (number | string)[]) =>  {
      let indx = 1
      for (let i = 1; i < nums.length; i++) {
          if (nums[i] != nums[indx-1] ){
            nums[indx] = nums[i]
            nums[i] = '_'
            indx++
            continue
          }
            nums[indx -1] =  nums[i]
            nums[i] = '_'
      }
      return nums
  };

  console.log(`twopointers - removeDuplicates() - remove all duplicated values in place - array length: ${arrDup.length}:`, removeDuplicates(arrDup))
  /* find duplicate of an array in place and put them at end of the array (two pointer slow fast) */
  const removeDuplicates2 = (nums: (number | string)[]) =>  {
      let indx = 1
      for (let i = 1; i < nums.length; i++) {
          if (nums[i] != nums[indx-1] ){
            nums[indx] = nums[i]
            indx++
          }
      }
      return nums
  };
  console.log(`twopointers - removeDuplicates2() - put all duplicated values at end of array - array length: ${arrDup2.length}:`, removeDuplicates2(arrDup2))


}

/* helpers */

/**
 * generate an array of random number
 *
 * @param number [size] - [size of array to generate] (default: 1000000)
 * @returns number [the generated array of number]
 */
const randArr = (size = 1000000) => {
  let randNumArr = [] 
  for (let i = 0; i < 1000000; i++) {
   let randNum = Math.floor(Math.random() * 8 + 2)
   randNumArr.push(randNum)
  }
  return randNumArr
}
