import React, { Component } from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
  justify-content: space-between;
`;

const CoverImage = styled.img`
  height: 362px;
  object-fit: cover;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoColumn = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class MovieComponent extends Component {
  render() {
    const { Title, Poster, Year, Type } = this.props.movie;

    return (
      <MovieContainer>
        <CoverImage src={Poster} alt={Title} />
        <MovieName>{Title}</MovieName>
        <InfoColumn>
          <span>Year: {Year}</span>
          <span>Type: {Type}</span>
        </InfoColumn>
      </MovieContainer>
    );
  }
}

export default MovieComponent;
