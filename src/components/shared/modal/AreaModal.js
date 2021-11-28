import React, { useContext, useEffect, useState } from 'react';
import { DBContext } from '../../../db/useDb';
import Button from '../button/Button';
import './AreaModal.css';

export default function Modal({ show, setShow, deskData }) {
  const [nameAM, setNameAM] = useState('');
  const [namePM, setNamePM] = useState('');
  const [fullDay, setFullDay] = useState(true);
  const { editDesk } = useContext(DBContext);

  useEffect(() => {
    const { deskData: data } = deskData;
    if (data) {
      if (data.am === data.pm) {
        setNameAM(data.am);
        setNamePM(data.am);
        setFullDay(true);
      } else {
        if (data.am) {
          setNameAM(data.am);
        }
        if (data.pm) {
          setNamePM(data.pm);
        }
        setFullDay(false);
      }
    } else {
      setNameAM('');
      setNamePM('');
      setFullDay(true);
    }
    return () => {
      setNameAM('');
      setNamePM('');
      setFullDay(true);
    };
  }, [deskData]);

  function handleSubmit(event) {
    event.preventDefault();
    editDesk({
      area: deskData.area,
      desknumber: deskData.desk,
      am: nameAM,
      pm: namePM,
    });
    setShow(false);
  }

  function handleNameAMChange(event) {
    setNameAM(event.target.value);
    if (fullDay) {
      setNamePM(event.target.value);
    }
  }
  function handleNamePMChange(event) {
    setNamePM(event.target.value);
  }
  function handleFullDayChange(event) {
    if (fullDay) {
      setNamePM('');
    } else {
      setNamePM(nameAM);
    }
    setFullDay(!fullDay);
  }
  function handleCancel(event) {
    event.preventDefault();
    setShow(false);
  }
  return show ? (
    <div id="modal-wrapper">
      <div id="modal-backdrop" onClick={() => setShow(false)}></div>
      <div id="modal-content">
        <h3>Desk {deskData.desk}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form__field">
            <input
              type="text"
              id="name-am"
              name="name-am"
              className="form__input"
              autoComplete="off"
              placeholder=" "
              value={nameAM}
              onChange={handleNameAMChange}
            />
            <label htmlFor="name-am" className="form__label">
              Name for AM slot
            </label>
          </div>
          <div className="form__field">
            <label htmlFor="fullDay" className="form__label_checkbox">
              Full day:
            </label>
            <input
              type="checkbox"
              id="fullDay"
              name="fullDay"
              className="form__input_checkbox"
              checked={fullDay}
              onChange={handleFullDayChange}
            />
          </div>
          <div className="form__field">
            <input
              type="text"
              id="name-pm"
              name="name-pm"
              className="form__input"
              autoComplete="off"
              placeholder=" "
              value={namePM}
              onChange={handleNamePMChange}
            />
            <label htmlFor="name-pm" className="form__label">
              Name for PM slot
            </label>
          </div>
          <div className="button-group">
            <Button name="Cancel" onClick={handleCancel} />
            <Button name="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
