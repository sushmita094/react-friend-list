import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFriend,
  starFriend,
} from "../features/friendList/friendListSlice";

const FriendCard = ({ data }) => {
  const friendList = useSelector((state) => state.friendList);
  const dispatch = useDispatch();

  const handleDelete = (name) => {
    // handle delete not working
    dispatch(deleteFriend(name));
  };

  return (
    <Card>
      <Card.Body className="cardBody">
        <div>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>is your friend</Card.Text>
        </div>
        <div>
          <button
            className="starBtn"
            onClick={() => dispatch(starFriend(data.name))}
          >
            {data.isStarred ? (
              <img src="/icons/star-icon-fill.png" />
            ) : (
              <img src="/icons/star-icon.png" />
            )}
          </button>
          <button className="deleteBtn" onClick={() => handleDelete(data.name)}>
            <img src="/icons/delete-icon.png" />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FriendCard;
