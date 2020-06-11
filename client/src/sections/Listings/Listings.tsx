import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from "react-apollo";
import { Avatar, Button, List, Spin } from "antd";
import { Listings as ListingsData } from './__generated__/Listings';
import { DeleteListing as DeleteListingData, DeleteListingVariables } from './__generated__/DeleteListing';
import './styles/Listings.css';

const LISTINGS = gql ` 
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

const DELETE_LISTINGS = gql `
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
  const { data, loading, error, refetch } = useQuery<
    ListingsData
  >(LISTINGS);
  
  const [
    deleteListing,
    {
      loading: deleteListingLoading,
      error: deleteListingError }
  ] = useMutation<
    DeleteListingData,
    DeleteListingVariables
  >(DELETE_LISTINGS);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id }});
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listings) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() =>
                handleDeleteListing(listings.id)
              }
            >
              Delete
              </Button>
          ]}
        >
          <List.Item.Meta title={listings.title} description={listings.address}
            avatar={
              <Avatar
                src={listings.image}
                shape="square"
                size={48}
              />}
            />
          </List.Item>
      )}
    />
  ) : null; 

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Try again later</h2>
  }
  
    const deleteListingErrorMessage = deleteListingError
    ? (<h4>Something went wrong</h4> ) : null;
  
  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
    <h2>{title}</h2>
    {listingsList}
        {deleteListingErrorMessage}
        </Spin>
  </div> )
};

