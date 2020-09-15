import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username))
        }
      });
    axios.get('http://localhost:5000/exercises/' + id)
      .then(response => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  const handleDuration = e => {
    setDuration(e.target.value);
  };

  const handleDate = (date) => {
    setDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username,
      description,
      duration,
      date
    };
    axios.post('http://localhost:5000/exercises/update/'+ id, exercise)
      .then(res => console.log(res.data))
    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <select
            required
            className="form-control"
            value={username}
            onChange={handleUsername}>
            {
              users.map(user => {
                return (
                  <option
                    key={user}
                    value={user}
                  >
                    {user}
                  </option>
                );
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={handleDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes):</label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={handleDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={handleDate}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;