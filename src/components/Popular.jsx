import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import {Link} from 'react-router-dom';

function Popular() {
  const [popularRecipes, setPopularRecipes] = useState([])

  useEffect(() => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopularRecipes(JSON.parse(check));
    }  else {
      axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        localStorage.setItem("popular", JSON.stringify(res.data.recipes));
        setPopularRecipes(res.data.recipes);
        console.log(res.data.recipes)
      })
    }
  }, []);

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide options={{
        perPage: 3,
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "5rem"
      }}>
      {popularRecipes.map(recipe => {
        return (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={`/recipe/${recipe.id}`}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient/>
              </Link>
            </Card>
          </SplideSlide>
        )
      })}
      </Splide>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    color: #fff;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Popular