import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      minPrice,
      maxPrice,
      price,
      shipping,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, 'category');
  const companies = getUniqueValues(allProducts, 'company');
  const colors = getUniqueValues(allProducts, 'colors');

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(event) => event.preventDefault()}>
          {/* input search */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              className="search-input"
              placeholder="search"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end of input search */}
          {/* category */}
          <div className="form-control">
            <h5>category</h5>
            {categories.map((categoryMap, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  onClick={updateFilters}
                  name="category"
                  className={categoryMap === category ? 'active' : ''}
                >
                  {categoryMap}
                </button>
              );
            })}
          </div>
          {/* end of category */}
          {/* company */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((companyMap, index) => {
                return (
                  <option value={companyMap} key={index}>
                    {companyMap}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of company */}
          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((colorMap, index) => {
                const isActiveColor = color === colorMap;
                if (colorMap === 'all') {
                  return (
                    <button
                      type="button"
                      key={index}
                      name="color"
                      className={isActiveColor ? 'all-btn active' : 'all-btn'}
                      data-color={colorMap}
                      onClick={updateFilters}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    type="button"
                    key={index}
                    name="color"
                    style={{ background: colorMap }}
                    className={isActiveColor ? 'color-btn active' : 'color-btn'}
                    data-color={colorMap}
                    onClick={updateFilters}
                  >
                    {isActiveColor && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
