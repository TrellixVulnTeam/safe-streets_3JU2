import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

const ButtonRemoveFromFavs = ({setRemoveFavModalShow}) => {
  return (
    <Button
      className="w-full py-3 btn-delete-favourite"
      variant="danger"
      title="Delete from favourites"
      onClick={() => setRemoveFavModalShow (true)}
    >
      <i className="fa fa-minus fa-lg mx-4" />
    </Button>
  );
};

export default ButtonRemoveFromFavs;