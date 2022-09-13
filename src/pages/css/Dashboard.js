import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTour, getToursByUser } from '../../redux/features/tourSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { userTours, loading } = useSelector((state) => state.tour);
  const userId = user?.result?._id;
  console.log(userId, 'userId');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId]);

  if (loading) return <Spinner />;

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + '...';
    }
    return str;
  };

  const handleDelete = (id) => {
    console.log('delete');
    if (window.confirm(`Are you sure you want to delete ?`)) {
      dispatch(deleteTour({ id, toast }));
    }
  };
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-12 col-sm-12 text-center">
            <Link to={`/add`} className="card-link">
              Add Data
            </Link>
            {userTours?.length === 0 && (
              <h3 className="text-center">
                No tour Available with the user: {user?.result?.name}
              </h3>
            )}
            {userTours?.length > 0 && (
              <>
                <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
                <hr style={{ maxWidth: '570px' }} />
              </>
            )}
          </div>
          {userTours &&
            userTours?.map((item, index) => (
              <>
                <div className="col-md-3" key={index}>
                  <div className="card mb-3">
                    <img
                      srcSet={item.imageFile}
                      className="card-img-top img-thumbnail rounded"
                      alt={item?.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item?.title}</h5>
                      <p className="card-text">{excerpt(item?.description)}</p>
                      <Link to={`${`/edit/${item._id}`}`} className="card-link">
                        Edit
                      </Link>
                      <Link
                        to="#"
                        className="card-link"
                        onClick={handleDelete(item._id)}
                      >
                        Delete
                      </Link>
                      <Link to={`/view/${item._id}`} className="card-link">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
