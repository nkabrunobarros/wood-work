//  Nodes
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import CustomBreadcrumbs from '../../breadcrumbs';
import InfoCard from '../../cards/infoCard';
import { Edit, Trash } from 'lucide-react';
import Content from '../../content/content';
import PrimaryBtn from '../../buttons/primaryBtn';
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  TextField,
} from '@mui/material';

import styles from '../../../styles/Orders.module.css';
import CustomTable from '../../table/table';
import Router from 'next/router';
import PaginateItemsPerPage from '../../utils/PaginateItemsPerPage';
import displayWithStyle from '../../utils/displayTextWithStyle';
import DisplayCategory from '../../utils/DisplayCategory';

const OrdersScreen = ({ ...props }) => {
  const {
    items,
    categories,
    panelsInfo,
    tableCols,
    breadcrumbsPath,
    detailPage,
    internalPOV,
    cards,
  } = props;

  //  States
  const [number, setNumber] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState();
  const [stock, setStock] = useState('');

  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [showingMin, setShowingMin] = useState(0);
  const [showingMax, setShowingMax] = useState(entries);

  const [itemsPerPage, setItemsPerPage] = useState([]);
  //  Clear Filters to default
  const ClearFilters = () => {
    setNumber('');
    setClient('');
    setCategory('');
    setStock('');
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const calculatePages = () => {
      const numPages = Math.ceil(items.length / entries);
      setTotalPages(numPages);
      const res = PaginateItemsPerPage(items, entries, page - 1);
      setItemsPerPage(res.array);
      setShowingMax(res.showingMax);
      setShowingMin(res.showingMin);
    };
    calculatePages();
  }, [entries, page]);
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
      label:
        'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
  ];
  // eslint-disable-next-line react/prop-types
  const DisplayCol = (col, item, index) => {
    if (col === 'em distribuição') {
      return <a>{displayWithStyle(item.distribuição)}</a>;
    } else if (index === 0) {
      return <a className='link'>Nº {displayWithStyle(item[`${col}`])}</a>;
    }
    switch (col) {
      case 'categoria':
        return <a>{DisplayCategory(item[`${col}`])}</a>;
      case 'ações':
        return (
          <>
            <Edit className='link' />
            <Trash className='link' />
          </>
        );
      default:
        return <a>{displayWithStyle(item[`${col}`])}</a>;
    }
  };
  const onClientChange = (value) => {
    if (value === null) setClient('');
    else setClient(value.label);
  };
  return (
    <Grid component='main'>
      <CssBaseline />
      {/* Breadcrumbs */}
      <CustomBreadcrumbs path={breadcrumbsPath} />
      {/* Statistics Cards */}

      {panelsInfo ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 0,
          }}
        >
          {cards.map((card) => (
            <InfoCard
              key={card.num}
              amount={card.amount}
              color={card.color}
              icon={card.icon}
              title={card.title}
            />
          ))}
        </div>
      ) : null}
      {/* Filters */}
      <Content>
        <div id='pad'>
          <a className='headerTitleSm'>Filtros</a>
          <div className={styles.filters}>
            <div className={styles.filterContainer}>
              <InputLabel htmlFor='email'>Número</InputLabel>
              <OutlinedInput
                margin='normal'
                fullWidth
                id='number'
                name='number'
                autoComplete='number'
                type='number'
                placeholder='Escrever um número'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className={styles.filterContainer}>
              <InputLabel htmlFor='email'>Cliente</InputLabel>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={top100Films}
                onChange={(event, value) => onClientChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    value={client}
                    onChange={(event, value) => setClient(event.target.value)}
                    placeholder='Escrever um nome'
                  />
                )}
              />
            </div>
            <div className={styles.filterContainer}>
              <InputLabel htmlFor='Categoria'>Categoria</InputLabel>
              <Select
                labelId='Categoria'
                id='Categoria'
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={''} disabled>
                  Selecionar uma categoria
                </MenuItem>
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}[{item.id}]
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={styles.filterContainer}>
              <InputLabel htmlFor='Stock'>Stock</InputLabel>
              <Select
                labelId='Stock'
                id='Stock'
                fullWidth
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              >
                <MenuItem value={''} disabled>
                  Selecionar uma estado de stock
                </MenuItem>
                <MenuItem value={'Disponível'}>Disponível</MenuItem>
                <MenuItem value={'Indisponível'}>Indisponível</MenuItem>
              </Select>
            </div>
          </div>
          <div
            style={{
              width: 'fit-content',
              marginLeft: 'auto',
              paddingTop: '1rem',
            }}
          >
            <PrimaryBtn text='Limpar' light onClick={ClearFilters} />
          </div>
        </div>
      </Content>
      {/* Orders */}
      <Content>
        <div
          id='pad'
          className='flex'
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div>
            <a className='headerTitleXl'>{breadcrumbsPath[0].title}</a>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              flexDirection: 'column',
              color: 'var(--grayTexts)',
              fontSize: 'small',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              {internalPOV ? <PrimaryBtn text='Adicionar' /> : null}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}
            >
              Visualizar
              <Select
                value={entries}
                onChange={(e) => setEntries(e.target.value)}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
              Itens
              <div className='spacer'>|</div>
              Mostrar {showingMin} a {showingMax} de {Object.keys(items).length}{' '}
              itens
              <div className='spacer'></div>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                siblingCount={0}
                color='primary'
                className={'pagination'}
              />

            </div>
          </div>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            siblingCount={0}
            color='primary'
            className={'pagination mobile'}
          />
        </div>
        <CustomTable columns={tableCols}>
          {itemsPerPage
            .filter((item) => item.stock.includes(stock))
            .map((item, i) => (
              <tr
                key={item.numero}
                onClick={() =>
                  Router.push({ pathname: `${detailPage}${item.numero}` })
                }
              >
                {tableCols.map((element, i) => (
                  <td key={element.id} data-label={tableCols[i].toUpperCase()}>
                    {DisplayCol(element, item, i)}
                  </td>
                ))}
              </tr>
            ))}
        </CustomTable>
      </Content>
    </Grid>
  );
};
OrdersScreen.propTypes = {
  items: PropTypes.array,
  categories: PropTypes.array,
  tableCols: PropTypes.array,
  panelsInfo: PropTypes.object,
  breadcrumbsPath: PropTypes.array,
  detailPage: PropTypes.string,
  internalPOV: PropTypes.boolean,
  cards: PropTypes.arrayOf(PropTypes.object),
};
export default OrdersScreen;
