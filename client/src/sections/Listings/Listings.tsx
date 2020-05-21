import React from 'react';
import { server } from '../../lib/api';
import { DeleteListingData, DeleteListingVariables, ListingsData } from './types';

const LISTINGS = `
query Listings {
  listings {
    id
    title
    image
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
  }
}
`;

const DELETE_LISTINGS = `
mutation DeleteListing($id: ID!) {
  deleteListing(id: $id) {
    id
  }
}
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const {data} = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTINGS,
      variables: {
        id: "5ec1facb0ab6046c06eea41b"
      }
    });
    console.log(data);
  };

  return ( <div>
    <h2>{title}</h2>
    <button onClick={fetchListings}>
      Query Listings!
      </button>
    <button onClick={deleteListing}>
Delete a listing!
    </button>
  </div> )
};

