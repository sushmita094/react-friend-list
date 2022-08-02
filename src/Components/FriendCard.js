import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteFriend,
  starFriend,
} from "../features/friendList/friendListSlice";

const FriendCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleDelete = (name) => {
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
              <img src="/icons/star-icon-fill.png" alt="star icon" />
            ) : (
              <img src="/icons/star-icon.png" alt="star icon" />
            )}
          </button>
          <button className="deleteBtn" onClick={() => handleDelete(data.name)}>
            <img src="/icons/delete-icon.png" alt="delete icon" />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FriendCard;
