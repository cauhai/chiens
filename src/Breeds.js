import React, { useState } from 'react';
import { Space, Button, Input, Table } from 'antd';
import { getBreeds } from './services';
import './Breeds.scss';

const Breeds = () => {
  const [ breedName, setBreedName ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ breeds, setBreeds ] = useState([]);
  const [ serverError, setServerError ] = useState('');
  const onSearch = () => {
    setLoading(true);
    setBreeds([]);
    getBreeds(breedName).then(response => {
      if (response.status === 200) {
        setBreeds(response.data);
      }
      setLoading(false);
      setServerError('');
    }).catch(() => {
      setLoading(false);
      setBreeds([]);
      setServerError('Server encountered an error. Please retry later.');
    });
  };
  const userInputs = (
    <Input.Group>
      {`Breed name `}
      <Input
        placeholder="any partial name"
        value={breedName}
        onChange={e => {
          setBreedName(e.target.value);
          if (!e.target.value) {
            setBreeds([]);
          }
        }}
        onKeyUp={e => {
          if (e.code === 'Enter') {
            onSearch();
          }
        }}
        autoFocus
        allowClear
        style={{ width: 250 }}
        disabled={loading}
      />
      <Button
        type="primary"
        loading={loading}
        disabled={!breedName}
        onClick={onSearch}
      >
        Search breeds
      </Button>
    </Input.Group>
  );
  let results;
  if (serverError) {
    results = <div className="error-message">{serverError}</div>;
  } else {
    results = (
      <Table
        className="table-listing"
        size="small"
        dataSource={breeds}
        columns={columns}
        rowKey={record => record.id}
        showSorterTooltip={false}
        pagination={{ position: ['bottomCenter'], defaultPageSize: 30, hideOnSinglePage: true }}
      />
    );
  }
  return (
    <div className="breeds">
      <Space className="spacing-vertical" direction="vertical">
        <h1>Dog Breeds</h1>
        {userInputs}
        {results}
      </Space>
    </div>
  );
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => (a ? a.name.localeCompare(b.name) : -1),
  },
  {
    title: 'Bred for',
    dataIndex: 'bred_for',
    sorter: (a, b) => (a && a.bred_for ? a.bred_for.localeCompare(b.bred_for || '') : -1),
  },
  {
    title: 'Temperament',
    dataIndex: 'temperament',
  },
];

export default Breeds;
