import FriendCard from "../../Components/FriendCard";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addFriend } from "./friendListSlice";

const options = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Starred",
    value: "starred",
  },
];

const FriendList = () => {
  const friendList = useSelector((state) => state.friendList);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [sort, setSort] = useState("none");
  const [sortedFriendList, setSortedFriendList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesList, setPagesList] = useState([0]);

  const dispatch = useDispatch();

  useEffect(() => {
    let list = [];
    // sorting
    if (sort === "starred") {
      let result = [];
      let starredItems = friendList.filter((item) => item.isStarred);
      let unstarredItems = friendList.filter((item) => !item.isStarred);
      result.push(...starredItems, ...unstarredItems);
      list = [...result];
    } else {
      list = [...friendList];
    }

    paginate(list);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, friendList, currentPage]);

  useEffect(() => {
    let list = [...friendList];
    paginate(list);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let pageList = [];
    let totalLen = sortedFriendList.length - 1;
    console.log(totalLen);
    for (let i = 0; i <= totalLen; i++) {
      pageList.push(i);
    }
    setPagesList([...pageList]);
  }, [sortedFriendList]);

  const paginate = (list) => {
    let paginatedList = [];
    for (let i = 0; i < friendList.length; i += 4) {
      const deleteCount =
        i + 3 <= friendList.length ? 4 : friendList.length - i;
      let x = list.splice(0, deleteCount);
      paginatedList.push(x);
    }

    setSortedFriendList([...paginatedList]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.length === 0) {
      setSearchResults(null);
    } else {
      let res = friendList.filter((item) => item.name.includes(e.target.value));
      setSearchResults(res);
    }
  };

  const handleAddFriend = () => {
    dispatch(addFriend({ name: input, isStarred: false }));
    setInput("");
    setSearchResults(null);
  };

  return (
    <div>
      <h1>Friends list</h1>

      <div className="topBar">
        <div className="inputWrapper">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a friend's name"
            className="input"
          />
          {input !== "" && (
            <button className="addFriendBtn" onClick={handleAddFriend}>
              Add friend
            </button>
          )}
        </div>

        <div>
          Sort by:{" "}
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSort(e.target.value)}
          >
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {searchResults
        ? searchResults.map((item, i) => <div key={i}>{item.name}</div>)
        : sortedFriendList[currentPage]?.map((item, i) => (
            <FriendCard data={item} key={i} />
          ))}

      <div className="pagination">
        {pagesList.map((page) => (
          <button className="circle" onClick={() => setCurrentPage(page)}>
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
