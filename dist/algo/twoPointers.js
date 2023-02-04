"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const run = () => {
    const arr = [1, 3, 5, 6, 7, 8, 12];
    const arr0 = [1, 2, 0, 0, 0, 3, 0, 4, 5, 0];
    const arrDup = [0, 0, 1, 2, 2, 3, 3, 4, 6, 6, 6, 7];
    const arrHuge = randArr();
    /* summing */
    const sum = (arr) => {
        let result = 0;
        for (let i = 0, j = arr.length - 1; i <= j;) {
            console.log('loop');
            result += arr[i];
            if (i < j)
                result += arr[j];
            i++;
            j--;
        }
        return result;
    };
    // console.log( sum(arr) )
    /* finding pair of index  matching a target sum */
    const twoSum = (arr, target) => {
        for (let i = 0, j = arr.length - 1; i < j;) {
            let sum = arr[i] + arr[j];
            if (sum === target) {
                return [i, j];
            }
            else if (sum < target) {
                i++;
            }
            else {
                j--;
            }
        }
    };
    // console.log( twoSum(arr, 8) )
    /* sorting array all 0 values go to the end of array and order is kept (two pointer slow-fast)  */
    var moveZeroes = function (nums) {
        let leftIdx = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] !== 0) {
                if (leftIdx === i) {
                    leftIdx++;
                    continue;
                }
                nums[leftIdx] = nums[i];
                nums[i] = 0;
                leftIdx++;
            }
        }
        return nums;
    };
    // console.log('moveZeroes() done:', moveZeroes(arrHuge).length, 'elements sorted')
    /* remove duplicate of an array in place put  the duplicate and replace them with '_' at end of array (two pointer slow fast) */
    const removeDuplicates = (nums) => {
        let indx = 1;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] != nums[indx - 1]) {
                nums[indx] = nums[i];
                nums[i] = '_';
                indx++;
                continue;
            }
            nums[indx - 1] = nums[i];
            nums[i] = '_';
        }
        return nums;
    };
    // console.log(removeDuplicates(arrDup))
    /* find duplicate of an array in place and put them at end of the array (two pointer slow fast) */
    const removeDuplicates2 = (nums) => {
        let indx = 1;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] != nums[indx - 1]) {
                nums[indx] = nums[i];
                indx++;
            }
        }
        return nums;
    };
    // console.log(removeDuplicates2(arrDup))
};
exports.run = run;
/* helpers */
/**
 * generate an array of random number
 *
 * @param number [size] - [size of array to generate] (default: 1000000)
 * @returns number [the generated array of number]
 */
const randArr = (size = 1000000) => {
    let randNumArr = [];
    for (let i = 0; i < 1000000; i++) {
        let randNum = Math.floor(Math.random() * 8 + 2);
        randNumArr.push(randNum);
    }
    return randNumArr;
};
