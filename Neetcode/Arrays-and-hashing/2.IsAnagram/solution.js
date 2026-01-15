/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    let freqOfLettersInS = {};
    let freqOfLettersInT = {};
    for (const letter of s) {
        if (freqOfLettersInS.hasOwnProperty(letter))
            freqOfLettersInS[letter]++;
        else freqOfLettersInS[letter] = 1;
    }

    for (const letter of t) {
        if (freqOfLettersInT.hasOwnProperty(letter))
            freqOfLettersInT[letter]++;

        else freqOfLettersInT[letter] = 1;
    }

    if (Object.keys(freqOfLettersInS).length !== Object.keys(freqOfLettersInT).length)
        return false;

    for (const key in freqOfLettersInS) {
        if (freqOfLettersInS[key] !== freqOfLettersInT[key])
            return false;
    }
    return true;

};
/**
 * The problem is to check if it is avalid anagram or not
 * An anagram is a new word that you form using existing words in word without adding a new word
 * Just mixing and it even need not be a word
 * 
 * So logic is to first put all the src words into map with each letter count
 * and the do the same with target letter word, as exact same letters and same no of letters should be used 
 * we can just if no of words used in both src adn target are same and if one condition fails we can tap out.
 * 
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagramV2 = function(s, t) {
    
    if (s.length !== t.length) return false;

    let freq = {};

    for (let ch of s) {
        freq[ch] = (freq[ch] || 0) + 1;
    }

    for (let ch of t) {
        if (!freq[ch]) return false;
        freq[ch]--;
    }

    return true;


};

/**
 * This is one of the improved version of the same logic
 * Here what i find beautiful is the logic, i was checking if the key exists in the map using
 * hasOwnProperty but the same logic is written beautifully like freq[ch] = (freq[ch]||0)+1
 * checking if you have that or take 0 and add 1 at last.
 * I learned two more ways to check if a key is part of object or now
 * 1. freq[ch]
 * 2. object.hasOwnProperty(keyName)
 * 3. if(key in obj) // the issue in here is it will check all down the prototype chain as well
 * What i also learned is
 * 1. Writing a bettter logic of  freq[ch] = (freq[ch]||0)+1
 * i was initially doing the cpp way freq[ch]++; but that didnt work, because in cpp we define type in map so i guess it would default to 0
 * 
 * And more beautiful thing is we need not count the no of chars i target as well
 * Because we can leverage the JS falsy value
 * as in checking in target he did if(!freq[ch]) 
 * its a simple check, if key not there return underfined which is false negation makes true, so condition return false
 * Now the sexiest past, let say we have 4 A's in target, as we iterating we check the count in s and if we find we decrement it
 * now the best part if all A are reduced to 0 and if we still the same letter in target, but the src count is now 0 which is letter count mismatch
 * hence we say the is letter count mismatch and return false, what a good way to say that.
 * More or less The TC is same, but SC in mine increases with input so mine is ,oinear and his is logarithmic compared to mine onky else kinda linear only
 * 
 */