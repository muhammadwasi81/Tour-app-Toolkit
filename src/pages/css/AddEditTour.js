import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTour, updateTour } from '../../redux/features/tourSlice';

const initialState = {
  title: '',
  description: '',
  tags: '',
};
const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, userTours } = useSelector((state) => state.tour);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, description, tags } = tourData;

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      console.log(singleTour, 'singleTour');
      setTourData({ ...singleTour });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg(`Please provide a tag name`);
    }
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };
      console.log(updatedTourData, 'updatedTour');

      if (!id) {
        dispatch(createTour({ updatedTourData, navigate, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleClear = () => {
    setTourData({ title: '', description: '' });
  };

  const removeTagData = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const addTagData = (e) => {
    setTagErrMsg(null);
    if (e.target.value !== '') {
      setTourData({ ...tourData, tags: [...tourData.tags, e.target.value] });
    }
  };

  const onImageChange = (e) => {
    console.log(e.target.files[0], 'e.target.files[0]');
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setTourData({ ...tourData, imageFile: e.target.result });
    };
  };
  return (
    <div className="container-fluid">
      <div className="form-box">
        <h1>Add</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="title"
              className="form-control"
              value={title || ''}
              placeholder="Name"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              placeholder="Image"
              onChange={onImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Tag</label>
            <div className="tag-input">
              <ul className="tags">
                {tags &&
                  tags?.map((tag, index) => (
                    <>
                      <li key={index} className="tag">
                        <span className="tag-title">{tag}</span>
                        <span
                          className="tag-close-icon"
                          onclick={() => removeTagData(tag)}
                        >
                          X
                        </span>
                      </li>
                    </>
                  ))}
              </ul>
              <input
                className="tag_input"
                type="text"
                onKeyUp={(e) => (e.key === 'Enter' ? addTagData(e) : null)}
                placeholder="Press enter to add tags"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              value={description}
              onChange={onInputChange}
              placeholder="description"
              cols="30"
              rows="10"
            />
          </div>
          <input
            className="btn btn-primary"
            type="submit"
            defaultValue="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddEditTour;
