import React, { Component } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import MovieComponent from "./MovieComponent";
import axios from "axios";

const apiKey = "ec9d5882";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmqueary: "",
      timeoutId: null,
      movieList: [],
    };
  }

  handleInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ filmqueary: inputValue });

    clearTimeout(this.state.timeoutId);
    const timeout = setTimeout(() => {
      const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}`;

      axios
        .get(searchUrl)
        .then((response) => {
          if (response.data.Response === "True") {
            console.log(response.data);
            this.setState({ movieList: response.data.Search });
          } else if (
            response.data.Response === "False" &&
            response.data.Error === "Too many results."
          ) {
            console.log("Too many results. Please refine your search.");
          } else {
            console.error(response.data.Error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);

    this.setState({ timeoutId: timeout });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.filmqueary);
  };

  render() {
    const Container = styled.div`
      display: flex;
      flex-direction: column;
    `;

    const Header = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: white;
      align-item: center;
      padding: 10px;
      background-color: black;
      font-size: 25px;
      font-weight: bold;
      box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.9);
    `;
    const AppName = styled.div`
      display: felx;
      flex-direction: row;
      align-item: center;
    `;
    const Imageicon = styled.img`
      weidth: 75px;
      heigth: 75px;
      margin: 5px;
      backgroung-color: white;
    `;
    const SearchBox = styled.div`
      background-color: white;
      display: flex;
      flex-direction: row;
      border-radius: 6px;
      align-item: center;
      margin-left: 20px;
      width: 50%;
      padding: 10px 10px;
    `;
    const SearchIcon = styled.img`
      width: 10px;
      heigth: auto;
    `;
    const SearchInput = styled.input`
      color: black;
      margin-left: 15px;
      outline: none;
      border: none;
      font-size: 16px;
      font-weight: bold;
    `;

    const MovieListContanier = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 30px;
      flex-direction: row;
      gap: 24px;
      justify-content: space-evenly;
    `;
    const ImageSize = styled.div`
      width: 50px;
      heigth: 70px;
      padding: 10px;
      display: flex;
      flex-direction: column;
    `;
    const MoviePage = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: white;
      align-item: center;
      padding: 10px;
      background-color: black;
      font-size: 25px;
      font-weight: bold;
      box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.9);
    `;
    const WellCome = styled.div`
      // color: black;
      margin-left: 15px;
      outline: none;
      border: none;
      font-size: 16px;
      font-weight: bold;
    `;

    return (
      <Container>
        <Header>
          <AppName>
            <Imageicon src="./icons8-film-40.png" />
            Movie Finder
          </AppName>
          <SearchBox>
            <SearchIcon src="./search.svg" />
            <SearchInput
              placeholder="Search Movie"
              value={this.state.filmqueary}
              onChange={this.handleInputChange}
            />
          </SearchBox>
        </Header>
        <MovieListContanier>
          {this.state.movieList?.length ? (
            this.state.movieList.map((movie, index) => (
              <MovieComponent key={index} movie={movie} />
            ))
          ) : (
            <MoviePage>
              <Imageicon src="./icons8-film-40.png" />
              <WellCome> Well Come To Movie Finder</WellCome>
            </MoviePage>
          )}
        </MovieListContanier>
      </Container>
    );
  }
}

export default App;
