import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProductDetailsFromCard } from '../../actions';
import starburst from '../../assets/starburst.png';
import { useSelector } from 'react-redux';
import { displaySaleIds } from '../../reducers';

const ItemCard = ({ product }) => {
  const dispatch = useDispatch();
  const COLORS = useSelector((state) => state.designSetting);
  // ensure card has sale item data no matter where it's accessed from:
  const saleIds = useSelector(displaySaleIds);

  const {
    _id,
    name,
    price,
    imageSrc,
  } = product;

  let isOnSale = false;
  let discountPrice = 0;

  if (saleIds !== undefined) {
    if (saleIds.includes(_id)) {
      isOnSale = true;
      discountPrice = Math.round(Number(price.slice(1)) * 85) / 100;
    }
  }

  // styled components:

  return (
    <Wrapper
      onClick={() => dispatch(setProductDetailsFromCard(product))}
      to={`/product/${_id}`}
      colors={COLORS}
    >
      <img src={imageSrc} alt="itempic" />
      <div>{name}</div>
      {isOnSale ? (
        <div style={{ display: 'flex' }}>
          <StruckThru style={{ position: 'relative', top: 18 }} colors={COLORS}>
            {price}
          </StruckThru>
          <Special colors={COLORS}>
            <span
              style={{ position: 'relative', top: 14 }}
            >{`$${discountPrice.toFixed(2)}`}</span>
          </Special>
        </div>
      ) : (
        <span>{price}</span>
      )}
    </Wrapper>
  );
};

const Special = styled.div`
  color: ${(props) => props.colors.background};
  padding: 4px;
  z-index: 2;
  background-image: url(${starburst});
  background-repeat: no-repeat;
  background-size: 100%;
  height: 72px;
  width: 96px;
`;

const StruckThru = styled.span`
  text-decoration: line-through;
  color: ${(props) => props.colors.filter};
  margin-right: 8px;
`;

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 240px;
  height: 360px;
  padding: 10px;
  margin: 10px 0;
  box-shadow: 5px 5px 5px grey, 5px 5px 8px ${(props) => props.colors.header};
  color: black;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  transition: 250ms ease-in-out;
  background: ${(props) => props.colors.background};
  &:hover {
    transform: scale(1.01);
  }
  @media (max-width: 420px) {
    transform: scale(0.75);
    &:hover {
      transform: scale(0.78);
    }
  }
`;

export default ItemCard;
