import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

function SearchResults() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  useEffect(() => {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${params.search}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => setSearchedRecipes(res.data.results))
  }, [params.search])

  return (
    <Grid>
      {searchedRecipes.map(item => {
        return (
          <Card key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Card>
        )
      })}
    </Grid>
  )
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default SearchResults