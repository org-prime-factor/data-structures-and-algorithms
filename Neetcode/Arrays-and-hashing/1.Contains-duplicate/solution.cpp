class Solution
{
public:
    bool containsDuplicateV1(vector<int> &nums)
    {
        bool ans = false;
        set<int> duplicate;
        vector<int>::iterator it;
        for (it = nums.begin(); it != nums.end(); ++it)
        {
            if (duplicate.contains(*it))
                return ans = true;
            else
                duplicate.insert(*it);
        }
        return ans;
    }

    bool containsDuplicateV2(vector<int> &nums)
    {
        bool ans = false;
        unordered_set<int> duplicate; // started using unordered set in cpp
        /*
        because in cpp set us self balancing binary search tree as in set data is ordered
        and in my question i need no ordering so i switched to
        unordered set in cpp which uses hash table and data item are unordered
        so for function contains i improved TC from o(logn) to constant

        */
        vector<int>::iterator it;
        for (it = nums.begin(); it != nums.end(); ++it)
        {
            if (duplicate.contains(*it))
                return ans = true;
            else
                duplicate.insert(*it);
        }
        return ans;
    }

    bool containsDuplicateV3(vector<int> &nums)
    {
        unordered_set<int> duplicate;
        duplicate.reserve(nums.size());
        /*
        So U:set uses hashing, and if we specify the size of hash table
        we eliminate the need of rehashing if hash table is filled. So we eliminate logn reshashes
        */
        vector<int>::iterator it;
        for (it = nums.begin(); it != nums.end(); ++it)
        {
            if (duplicate.contains(*it))
                return true;
            duplicate.insert(*it);
        }
        return false;
    }
};