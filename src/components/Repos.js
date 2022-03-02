import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      //total 객체에 없으면 추가
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      // 있으면 1씩 증가
      total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count };
    }

    return total;
  }, {});

  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  //most stars  per language

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map(item => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  //stars, forks
  const starAndForks = repos.reduce((total, item) => {
    const { name, stargazers_count, forks } = item;
    total[name] = { stars: stargazers_count, forks };
    return total;
  }, {});

  const sortByStarAndFork = identifier => {
    return Object.entries(starAndForks)
      .map(item => {
        const [key, info] = item;
        return { label: key, value: info[identifier] };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={sortByStarAndFork('stars')} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={sortByStarAndFork('forks')} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100%;
  }
  .fusioncharts-container {
    width: 100%;
  }
  svg {
    width: 100%;
    border-radius: var(--radius);
  }
`;

export default Repos;
