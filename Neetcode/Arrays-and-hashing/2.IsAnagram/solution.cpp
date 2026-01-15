class Solution {
public:
    bool isAnagramV1(string s, string t) {
        if (s.length() != t.length())
            return false;
        unordered_map<char, int> l;
        for (char c : s)
            l[c]++;

        for (char c : t) {
            if (l[c] > 0) {
                l[c]--;
                continue;
            }
            return false;
        }
        return true;
    }
};